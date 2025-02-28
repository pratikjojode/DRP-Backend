// server.js
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const feedbackRoutes = require("./routes/feedbackRoutes");
const userRoutes = require("./routes/userRoutes");
const blogRoutes = require("./routes/blogRoutes");
const chatRoutes = require("./routes/chatRoutes");
const courseRoutes = require("./routes/courseRoutes");
const inquiryRoutes = require("./routes/inquiryRoutes");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const http = require("http");
const socketIo = require("socket.io");
const Chat = require("./models/chatModel");
const path = require("path");

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
  cors: { origin: "*", methods: ["GET", "POST"], credentials: true },
});

io.on("connection", (socket) => {
  console.log(`New user connected: ${socket.id}`);

  socket.on("joinRoom", ({ room }) => {
    socket.join(room);
    console.log(`User joined room: ${room}`);
  });

  socket.on("sendMessage", async ({ message, sender, receiver, room }) => {
    try {
      const newMessage = new Chat({ sender, receiver, message, room });
      await newMessage.save();
      const savedMessage = await Chat.findById(newMessage._id).populate(
        "sender",
        "name"
      );
      io.to(room).emit("receiveMessage", savedMessage);
    } catch (error) {
      console.error("Error saving message:", error);
    }
  });

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

app.use(express.json());
app.use(cors({ origin: "*", credentials: true }));
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

app.get("/", (req, res) => {
  res.send("DRP Backend is running successfully! 🚀");
});

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/blogs", blogRoutes);
app.use("/api/v1/courses", courseRoutes);
app.use("/api/v1/inquiry", inquiryRoutes);
app.use("/api/v1/chat", chatRoutes);
app.use("/api/v1/feedbacks", feedbackRoutes);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
