require("dotenv").config();
const connectDB = require("../config/db");
const KnowledgeBase = require("../models/KnowledgeBase");
const getEmbedding = require("../utils/embeddingClient");

const run = async () => {
  await connectDB();

  const entries = await KnowledgeBase.find({ embedding: { $exists: false } });

  for (const entry of entries) {
    const embedding = await getEmbedding(entry.question);

    entry.embedding = embedding;
    await entry.save();

    console.log("Embedded:", entry.question);
  }

  process.exit();
};

run();
