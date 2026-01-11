const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    conversationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Conversation",
      required: true,
    },
    sender: {
      type: String,
      enum: ["user", "bot"],
      required: true,
    },
    content: {
      type: String,
      required: true,
    }, 
    source: {
      type: String,
      enum: ["knowledge_base", "ai"],
      default: "ai",
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Message", messageSchema);
