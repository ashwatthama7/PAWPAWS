import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:5173"],
  },
});

export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

// Store online users
const userSocketMap = {};  // {userId: socketId}

// Handle message sending in WebSocket server
io.on("connection", (socket) => {
  console.log("A user connected", socket.id);

  const userId = socket.handshake.query.userId;
  if (userId) {
    userSocketMap[userId] = socket.id;
  } else {
    console.error("No userId provided during connection");
  }

  socket.on("sendMessage", (message) => {
    // Assuming 'message' has a 'receiverId'
    const receiverSocketId = userSocketMap[message.receiverId];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", message);  // Emit message to receiver
    }
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected", socket.id);
    if (userId && userSocketMap[userId]) {
      delete userSocketMap[userId];
    }
  });
});


export { io, app, server };
