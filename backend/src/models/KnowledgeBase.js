const mongoose = require("mongoose");

const knowledgeBaseSchema = new mongoose.Schema(
  {
    question: {
      type: String,
      required: true,
    },
    answer: {
      type: String,
      required: true,
    },
    keywords: {
      type: [String],
      required: true,
    },
    embedding: {
      type: [Number], // vector
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("KnowledgeBase", knowledgeBaseSchema);
