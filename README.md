# AI Customer Support Chatbot

An AI-powered customer support chatbot built with Node.js, Express, React, and Google's Gemini AI. Features real-time chat, conversation analytics, and intelligent knowledge base search.

## Features

- **Real-time Chat**: Instant messaging with WebSocket support using Socket.io
- **AI-Powered Responses**: Intelligent responses generated using Google's Gemini AI
- **Knowledge Base Integration**: Semantic search through embedded knowledge base using cosine similarity
- **Conversation History**: Persistent storage and retrieval of chat conversations
- **Analytics Dashboard**: Insights into chat performance and user interactions
- **Rate Limiting**: Built-in protection against abuse with configurable limits

## Tech Stack

- **Backend**: Node.js, Express.js, MongoDB, Socket.io
- **Frontend**: React, Vite
- **AI**: Google Generative AI (Gemini)
- **Database**: MongoDB with Mongoose ODM

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)
- Google Gemini API key

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-powered-chatbot
   ```

2. **Set up the backend**
   ```bash
   cd backend
   npm install
   ```

3. **Configure environment variables**

   Create a `.env` file in the `backend` directory with the following variables:
   ```
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   GEMINI_API_KEY=your_google_gemini_api_key
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Set up the frontend** (in a new terminal)
   ```bash
   cd ../frontend/chatbot-frontend
   npm install
   npm run dev
   ```

6. **Access the application**

   Open your browser and navigate to `http://localhost:5173` (frontend) and `http://localhost:5000` (backend API).

### Usage

- **Chat Interface**: Start conversations with the AI chatbot
- **Analytics**: View conversation statistics and insights
- **History**: Browse previous conversations

## API Endpoints

- `POST /api/chat/message` - Send a chat message
- `GET /api/history` - Retrieve conversation history
- `GET /api/analytics` - Get analytics data

## Project Structure

```
├── backend/
│   ├── src/
│   │   ├── controllers/     # Route handlers
│   │   ├── models/         # MongoDB schemas
│   │   ├── routes/         # API routes
│   │   ├── sockets/        # WebSocket handlers
│   │   ├── utils/          # Utility functions
│   │   └── config/         # Database configuration
│   └── package.json
├── frontend/
│   └── chatbot-frontend/
│       ├── src/
│       │   ├── components/  # React components
│       │   ├── pages/      # Page components
│       │   ├── services/   # API and socket services
│       │   └── styles/     # CSS stylesheets
│       └── package.json
└── README.md
```

## Contributing

We welcome contributions! Please feel free to submit issues and pull requests.

## Support

If you encounter any issues or have questions:

- Create an issue on GitHub
- Check the project documentation for more details</content>
<parameter name="filePath">c:\Users\Hp\Desktop\Projects\AI powered chatbot\README.md