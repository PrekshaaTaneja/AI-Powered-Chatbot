import "../styles/emptyState.css";

const EmptyState = ({ onPromptClick }) => {
  const prompts = [
    "What is customer support?",
    "Explain loan interest calculation",
    "How can I apply for a loan?",
  ];

  return (
    <div className="empty-state">
      <div className="empty-icon">🤖</div>
      <h2>AI Customer Support Chatbot</h2>
      <p>Ask me anything related to support, loans, or services.</p>

      <div className="prompt-list">
        {prompts.map((text, index) => (
          <button
            key={index}
            onClick={() => onPromptClick(text)}
            className="prompt-btn"
          >
            {text}
          </button>
        ))}
      </div>
    </div>
  );
};

export default EmptyState;
