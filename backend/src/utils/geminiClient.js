const { GoogleGenerativeAI } = require("@google/generative-ai");
const dotenv = require("dotenv");
dotenv.config();
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-2.5-flash", // or another available model
});

const getAIResponse = async (messages) => {
  try {
    // Convert messages to plain text prompt
    const prompt = messages
      .map((msg) => `${msg.role}: ${msg.content}`)
      .join("\n");

    const result = await model.generateContent(prompt);
    const response = result.response;

    return response.text();
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};

module.exports = getAIResponse;
