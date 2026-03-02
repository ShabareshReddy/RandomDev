require('dotenv').config();
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const { connectionDB } = require("./config/database.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("./models/user");
const Message = require("./models/message");
const ConnectionRequest = require("./models/connectionRequest");

const app = express();
const server = http.createServer(app);

const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173",
  "https://randomdev.vercel.app",
];

/* ── CORS ── */
app.use(cors({ origin: ALLOWED_ORIGINS, credentials: true }));
app.use(express.json());
app.use(cookieParser());

/* ── Routes ── */
const authRouter    = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");
const userRouter    = require("./routes/user");
const chatRouter    = require("./routes/chat");
const uploadRouter  = require("./routes/upload");

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);
app.use("/", userRouter);
app.use("/", chatRouter);
app.use("/", uploadRouter);
app.use("/uploads", express.static("uploads"));

/* ── Socket.io ── */
const io = new Server(server, {
  cors: { origin: ALLOWED_ORIGINS, credentials: true },
});

// Helper: validate that two users have an accepted connection
const areConnected = async (id1, id2) => {
  const conn = await ConnectionRequest.findOne({
    $or: [
      { fromUserId: id1, toUserId: id2, status: "accepted" },
      { fromUserId: id2, toUserId: id1, status: "accepted" },
    ],
  });
  return !!conn;
};

// Middleware: authenticate every socket via JWT cookie
io.use(async (socket, next) => {
  try {
    // Cookies arrive in socket.handshake.headers.cookie
    const rawCookie = socket.handshake.headers.cookie || "";
    const tokenMatch = rawCookie.match(/(?:^|;\s*)token=([^;]+)/);
    if (!tokenMatch) return next(new Error("AUTH_REQUIRED"));

    const decoded = jwt.verify(tokenMatch[1], process.env.JWT_SECRET);
    const user = await User.findById(decoded._id).select("_id firstName lastName avatar");
    if (!user) return next(new Error("USER_NOT_FOUND"));

    socket.data.user = user;
    next();
  } catch {
    next(new Error("AUTH_FAILED"));
  }
});

io.on("connection", (socket) => {
  const me = socket.data.user;
  console.log(`Socket connected: ${me.firstName} (${me._id})`);

  // Client joins a chat with a specific user
  socket.on("joinChat", async ({ targetUserId }) => {
    try {
      const connected = await areConnected(me._id, targetUserId);
      if (!connected) {
        socket.emit("error", { message: "Not connected with this user." });
        return;
      }
      // Deterministic room — same for both participants
      const room = [me._id.toString(), targetUserId].sort().join("_");
      socket.join(room);
      socket.data.room = room;
    } catch (err) {
      socket.emit("error", { message: err.message });
    }
  });

  // Client sends a message
  socket.on("sendMessage", async ({ targetUserId, text, fileUrl, fileType }) => {
    try {
      if ((!text || !text.trim()) && !fileUrl) return;
      const connected = await areConnected(me._id, targetUserId);
      if (!connected) return;

      const message = await Message.create({
        senderId:   me._id,
        receiverId: targetUserId,
        text:       text ? text.trim() : "",
        fileUrl:    fileUrl || "",
        fileType:   fileType || "none",
      });

      const room = [me._id.toString(), targetUserId].sort().join("_");
      
      // Broadcast to both participants in the room
      io.to(room).emit("receiveMessage", {
        _id:        message._id,
        senderId:   me._id,
        receiverId: targetUserId,
        text:       message.text,
        fileUrl:    message.fileUrl,
        fileType:   message.fileType,
        createdAt:  message.createdAt,
        senderName: me.firstName,
      });
    } catch (err) {
      socket.emit("error", { message: err.message });
    }
  });

  socket.on("disconnect", () => {
    console.log(`Socket disconnected: ${me.firstName}`);
  });
});

/* ── Start ── */
connectionDB()
  .then(() => {
    console.log("Database connection established");
    server.listen(process.env.PORT || 3000, () => {
      console.log("Server listening on port " + (process.env.PORT || 3000));
    });
  })
  .catch((err) => {
    console.log("Cannot connect to DB:", err.message);
  });
