import axios from "axios";

const API_URL = "http://localhost:5000/api/chat";

export const startConversation = async () => {
  const res = await axios.post(`${API_URL}/start`);
  return res.data.conversationId;
};
