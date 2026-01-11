import axios from "axios";

const API_URL = "https://ai-powered-chatbot-2d05.onrender.com/api/chat";

export const startConversation = async () => {
  const res = await axios.post(`${API_URL}/start`);
  return res.data.conversationId;
};
