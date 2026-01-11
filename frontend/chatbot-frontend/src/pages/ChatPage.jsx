import { useEffect, useRef, useState } from "react";
import { socket } from "../services/socket";
import { startConversation } from "../services/api";
import "../styles/chat.css";
import "../styles/layout.css";
import ConversationList from "../components/ConversationList";
import EmptyState from "../components/EmptyState";
import axios from "axios";

const ChatPage = () => {
  const [conversationId, setConversationId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  /* ================= SOCKET SETUP ================= */
  useEffect(() => {
    socket.connect();

    socket.off("newMessage");
    socket.off("errorMessage");
    socket.off("typing");

    socket.on("newMessage", (msg) => {
      setIsTyping(false);
      setMessages((prev) => [...prev, msg]);
    });

    socket.on("typing", (status) => {
      setIsTyping(status);
    });

    socket.on("errorMessage", (msg) => {
      setIsTyping(false);
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: msg },
      ]);
    });

    return () => {
      socket.disconnect();
    };
  }, []);

  /* ================= AUTO SCROLL ================= */
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


  /* ================= LOAD CONVERSATION ================= */
  const loadConversation = async (id) => {
    setConversationId(id);
    setMessages([]);

    const res = await axios.get(
      `https://ai-powered-chatbot-2d05.onrender.com/api/history/messages/${id}`
    );

    setMessages(res.data);
    socket.emit("joinConversation", id);
  };

  /* ================= SEND MESSAGE ================= */
  const sendMessage = (text) => {
    const finalMessage = text ?? input;
    if (!finalMessage.trim() || !conversationId) return;

    setIsTyping(true);

    socket.emit("sendMessage", {
      conversationId,
      message: finalMessage,
    });

    setInput("");
  };

  /* ================= INITIAL CONVERSATION ================= */
  useEffect(() => {
    const init = async () => {
      const id = await startConversation();
      setConversationId(id);
      socket.emit("joinConversation", id);
    };
    init();
  }, []);

  return (
    <div className="app-layout">
      {/* LEFT SIDEBAR */}
      <ConversationList onSelect={loadConversation} />

      {/* RIGHT CHAT PANEL */}
      <div className="chat-panel">
        <div className="chat-container">
          <div className="chat-messages">
            {messages.length === 0 ? (
              <EmptyState
                onPromptClick={(text) => sendMessage(text)}
              />
            ) : (
              messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${
                    msg.sender === "user" ? "user" : "bot"
                  }`}
                >
                  {msg.content}
                </div>
              ))
            )}

            {/* Typing Indicator */}
            {messages.length > 0 && isTyping && (
                <div className="message bot typing">
                    Bot is typing<span className="dots">...</span>
                </div>
                )}


            <div ref={messagesEndRef} />
          </div>

          {/* INPUT */}
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a message..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={() => sendMessage()}>Send</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
