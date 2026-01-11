import { io } from "socket.io-client";

const SOCKET_URL = "https://ai-powered-chatbot-2d05.onrender.com";

export const socket = io(SOCKET_URL, {
  autoConnect: false,
});
