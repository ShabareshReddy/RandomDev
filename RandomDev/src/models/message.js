const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    receiverId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    text: {
      type: String,
      required: false,
      trim: true,
      maxLength: 2000,
    },
    fileUrl: {
      type: String,
      required: false,
    },
    fileType: {
      type: String,
      enum: ["image", "document", "none"],
      default: "none",
    },
  },
  { timestamps: true }
);

// Index for fast history queries
messageSchema.index({ senderId: 1, receiverId: 1 });
messageSchema.index({ createdAt: -1 });

module.exports = mongoose.model("Message", messageSchema);
