const Message = require("../models/Message");
const Conversation = require("../models/Conversation");
const searchKnowledgeBase = require("../utils/knowledgeBaseSearch");
const getAIResponse = require("../utils/geminiClient");
const { addToQueue } = require("../utils/messageQueue");

const chatSocket = (io) => {
  io.on("connection", (socket) => {
    console.log("User connected:", socket.id);

    // Join a conversation room
    socket.on("joinConversation", (conversationId) => {
      socket.join(conversationId);
      console.log(`Socket ${socket.id} joined ${conversationId}`);
    });

    // Handle incoming message
    socket.on("sendMessage", ({ conversationId, message }) => {

      // 🔴 TYPING ON (emit only to sender)
      socket.emit("typing", true);

      addToQueue(async () => {
        try {
          // 1️⃣ Save user message
          await Message.create({
            conversationId,
            sender: "user",
            content: message,
          });

          io.to(conversationId).emit("newMessage", {
            sender: "user",
            content: message,
          });

          // 2️⃣ Knowledge Base check
          const kbAnswer = await searchKnowledgeBase(message);

          let reply;
          let source;

          if (kbAnswer) {
            reply = kbAnswer.answer;
            source = "knowledge_base";
          } else {
            // 🔴 Clean AI context (NO system / fallback messages)
            const previousMessages = await Message.find({
              conversationId,
              sender: { $in: ["user", "bot"] },
              source: { $ne: "system" },
            })
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

            // 🔴 FORCE typing indicator to be visible
            await new Promise((res) => setTimeout(res, 800));

            reply = await getAIResponse(aiMessages);
            source = "ai";
          }

          // 3️⃣ Save bot reply
          await Message.create({
            conversationId,
            sender: "bot",
            content: reply,
            source,
          });

          await Conversation.findByIdAndUpdate(conversationId, {
            lastMessageAt: Date.now(),
          });

          io.to(conversationId).emit("newMessage", {
            sender: "bot",
            content: reply,
            source,
          });

          // ✅ TYPING OFF AFTER BOT MESSAGE
          socket.emit("typing", false);

        } catch (error) {
          console.error("Queued message error:", error.message);

          const fallbackReply =
            "Sorry, I’m currently experiencing high traffic. Please try again in a few moments.";

          await Message.create({
            conversationId,
            sender: "bot",
            content: fallbackReply,
            source: "system",
          });

          io.to(conversationId).emit("newMessage", {
            sender: "bot",
            content: fallbackReply,
            source: "system",
          });

          // ✅ TYPING OFF EVEN ON ERROR
          socket.emit("typing", false);
        }
      });
    });

    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

module.exports = chatSocket;
