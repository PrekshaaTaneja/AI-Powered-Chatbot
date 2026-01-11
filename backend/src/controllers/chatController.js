const Conversation = require("../models/Conversation");
const Message = require("../models/Message");
const getAIResponse = require("../utils/geminiClient");
const searchKnowledgeBase = require("../utils/knowledgeBaseSearch");

// Start new conversation
exports.startConversation = async (req, res) => {
  try {
    console.log("Start conversation hit");
    console.log("Request body:", req.body);

    const conversation = await Conversation.create({
      userId: req.body?.userId || null,
    });

    console.log("Conversation created:", conversation._id);

    res.status(201).json({
      success: true,
      conversationId: conversation._id,
    });
  } catch (error) {
    console.error("🔥 START CONVERSATION ERROR 🔥");
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};

// Send message

exports.sendMessage = async (req, res) => {
  try {
    const { conversationId, message } = req.body;

    // 1. Save user message
    await Message.create({
      conversationId,
      sender: "user",
      content: message,
    });

    // 2. Try Knowledge Base first
    const kbAnswer = await searchKnowledgeBase(message);

    if (kbAnswer) {
      await Message.create({
        conversationId,
        sender: "bot",
        content: kbAnswer.answer,
        source: "knowledge_base",
      });

      await Conversation.findByIdAndUpdate(conversationId, {
        lastMessageAt: Date.now(),
      });

      return res.json({
        success: true,
        reply: kbAnswer.answer,
        source: "knowledge_base",
      });
    }

    // 3. Fetch previous messages for context
    const previousMessages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .limit(5);

    const aiMessages = [
      {
        role: "system",
        content: "You are a helpful customer support assistant.",
      },
      ...previousMessages.map((msg) => ({
        role: msg.sender === "user" ? "user" : "assistant",
        content: msg.content,
      })),
      { role: "user", content: message },
    ];

    // 4. Call Gemini AI
    console.log("Calling Gemini AI with messages:", aiMessages);
    const aiReply = await getAIResponse(aiMessages);
    console.log("Gemini AI reply:", aiReply);

    // 5. Save AI response
    await Message.create({
      conversationId,
      sender: "bot",
      content: aiReply,
      source: "ai",
    });

    await Conversation.findByIdAndUpdate(conversationId, {
      lastMessageAt: Date.now(),
    });

    return res.json({
      success: true,
      reply: aiReply,
      source: "ai",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate response" });
  }
};
