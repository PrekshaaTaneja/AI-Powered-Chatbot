const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

// Get all conversations that have messages
exports.getConversations = async (req, res) => {
  try {
    const conversations = await Conversation.aggregate([
      {
        $lookup: {
          from: "messages",
          localField: "_id",
          foreignField: "conversationId",
          as: "messages",
        },
      },
      {
        $match: {
          "messages.0": { $exists: true }, // ✅ only non-empty
        },
      },
      {
        $addFields: {
          lastMessageAt: {
            $max: "$messages.createdAt",
          },
        },
      },
      {
        $sort: { lastMessageAt: -1 },
      },
      {
        $project: {
          messages: 0, // don't send messages
        },
      },
    ]);

    res.json(conversations);
  } catch (error) {
    console.error("Get conversations error:", error);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};


// Get messages for one conversation
exports.getMessages = async (req, res) => {
  try {
    const { conversationId } = req.params;

    const messages = await Message.find({ conversationId })
      .sort({ createdAt: 1 })
      .select("sender content source createdAt");

    res.json(messages);
  } catch (error) {
    console.error("Get messages error:", error);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};
