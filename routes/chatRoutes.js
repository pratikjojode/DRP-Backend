// chatRoutes.js
const express = require("express");
const Chat = require("../models/chatModel");
const router = express.Router();

router.get("/:room", async (req, res) => {
  try {
    const messages = await Chat.find({ room: req.params.room }).populate(
      "sender",
      "name"
    );
    res.json(messages);
  } catch (error) {
    console.error("Error fetching chat messages:", error);
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
