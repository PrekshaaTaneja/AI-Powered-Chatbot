const express = require("express");
const router = express.Router();
const {
  getConversations,
  getMessages,
} = require("../controllers/historyController");

router.get("/conversations", getConversations);
router.get("/messages/:conversationId", getMessages);

module.exports = router;
