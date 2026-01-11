const Conversation = require("../models/Conversation");
const Message = require("../models/Message");

exports.getAnalytics = async (req, res) => {
  try {
    const totalConversations = await Conversation.countDocuments();
    const totalMessages = await Message.countDocuments();

    const aiMessages = await Message.countDocuments({ source: "ai" });
    const kbMessages = await Message.countDocuments({ source: "knowledge_base" });

    res.json({
      totalConversations,
      totalMessages,
      aiMessages,
      kbMessages,
    });
  } catch (error) {
    console.error("Analytics error:", error);
    res.status(500).json({ error: "Failed to fetch analytics" });
  }
};
