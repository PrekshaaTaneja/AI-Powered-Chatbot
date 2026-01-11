const KnowledgeBase = require("../models/KnowledgeBase");
const getEmbedding = require("./embeddingClient");
const cosineSimilarity = require("./cosineSimilarity");

const searchKnowledgeBase = async (userMessage) => {
  const userEmbedding = await getEmbedding(userMessage);
  const entries = await KnowledgeBase.find({ embedding: { $exists: true } });

  let bestMatch = null;
  let highestScore = 0;

  for (const entry of entries) {
    const score = cosineSimilarity(userEmbedding, entry.embedding);

    if (score > highestScore) {
      highestScore = score;
      bestMatch = entry;
    }
  }

  // Semantic confidence threshold
  if (highestScore >= 0.80) {
    return bestMatch;
  }

  return null;
};

module.exports = searchKnowledgeBase;
