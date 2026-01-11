const express = require("express");
const router = express.Router();

const {
  startConversation,
  sendMessage,
} = require("../controllers/chatController");

router.post("/start", startConversation);
router.post("/message", sendMessage);

module.exports = router;
