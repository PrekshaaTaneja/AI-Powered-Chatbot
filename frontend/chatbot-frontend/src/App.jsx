import { useState } from "react";
import ChatPage from "./pages/ChatPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import "./styles/layout.css";

function App() {
  const [activeTab, setActiveTab] = useState("chat");

  return (
    <div className="app-root">
      {/* TOP NAVBAR */}
      <div className="topbar">
        <div className="topbar-title">
          AI Customer Support Chatbot
        </div>

        <div className="topbar-actions">
          <button
            className={activeTab === "chat" ? "active" : ""}
            onClick={() => setActiveTab("chat")}
          >
            Chat
          </button>
          <button
            className={activeTab === "analytics" ? "active" : ""}
            onClick={() => setActiveTab("analytics")}
          >
            Analytics
          </button>
        </div>
      </div>

      {/* MAIN CONTENT */}
      {activeTab === "chat" ? <ChatPage /> : <AnalyticsPage />}
    </div>
  );
}

export default App;
