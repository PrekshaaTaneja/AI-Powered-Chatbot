import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/conversationList.css";

const ConversationList = ({ onSelect }) => {
  const [conversations, setConversations] = useState([]);

  const fetchConversations = async () => {
    const res = await axios.get(
      "http://localhost:5000/api/history/conversations"
    );
    setConversations(res.data);
  };

  useEffect(() => {
    fetchConversations();
  }, []);

  // ✅ Create new conversation ONLY on button click
  const handleNewConversation = async () => {
    const res = await axios.post(
      "http://localhost:5000/api/chat/start"
    );

    const newConversationId = res.data.conversationId;

    // refresh list
    await fetchConversations();

    // auto-select new conversation
    onSelect(newConversationId);
  };

  return (
    <div className="sidebar">
      <h3 className="sidebar-title">Conversations</h3>

      {/* ✅ NEW CONVERSATION BUTTON */}
      <button
        className="new-conversation-btn"
        onClick={handleNewConversation}
      >
        + New Conversation
      </button>

      <div className="conversation-list">
        {conversations.map((conv) => (
          <div
            key={conv._id}
            className="conversation-item"
            onClick={() => onSelect(conv._id)}
          >
            <span className="conversation-title">
              {conv.title || "Conversation"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ConversationList;
