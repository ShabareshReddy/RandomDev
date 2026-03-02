const express = require("express");
const chatRouter = express.Router();
const { userAuth } = require("../middlewares/auth");
const Message = require("../models/message");
const ConnectionRequest = require("../models/connectionRequest");

// Validate that two users are mutually connected (accepted)
const areConnected = async (userId1, userId2) => {
  const connection = await ConnectionRequest.findOne({
    $or: [
      { fromUserId: userId1, toUserId: userId2, status: "accepted" },
      { fromUserId: userId2, toUserId: userId1, status: "accepted" },
    ],
  });
  return !!connection;
};

// GET /chat/:targetUserId  — load last 50 messages between logged-in user and target
chatRouter.get("/chat/:targetUserId", userAuth, async (req, res) => {
  try {
    const loggedInUser = req.user;
    const { targetUserId } = req.params;

    // Guard: only connected developers can see messages
    const connected = await areConnected(loggedInUser._id, targetUserId);
    if (!connected) {
      return res
        .status(403)
        .json({ message: "You are not connected with this user." });
    }

    const messages = await Message.find({
      $or: [
        { senderId: loggedInUser._id, receiverId: targetUserId },
        { senderId: targetUserId, receiverId: loggedInUser._id },
      ],
    })
      .sort({ createdAt: 1 })
      .limit(50)
      .lean();

    res.json({ data: messages });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = chatRouter;
