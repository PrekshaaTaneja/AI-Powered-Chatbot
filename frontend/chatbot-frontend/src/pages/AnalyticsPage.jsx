import { useEffect, useState } from "react";
import axios from "axios";
import "../styles/analytics.css";

const AnalyticsPage = () => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const res = await axios.get(
        "http://localhost:5000/api/analytics"
      );
      setStats(res.data);
    };

    fetchStats();
  }, []);

  if (!stats) return <div className="analytics-loading">Loading...</div>;

  return (
    <div className="analytics-page">
      <h2>Chatbot Analytics</h2>

      <div className="analytics-grid">
        <div className="card">
          <h4>Total Conversations</h4>
          <p>{stats.totalConversations}</p>
        </div>

        <div className="card">
          <h4>Total Messages</h4>
          <p>{stats.totalMessages}</p>
        </div>

        <div className="card">
          <h4>AI Responses</h4>
          <p>{stats.aiResponses}</p>
        </div>

        <div className="card">
          <h4>KB Responses</h4>
          <p>{stats.kbResponses}</p>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
