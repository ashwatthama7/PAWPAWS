import User from '../models/user.model.js';
import Message from '../models/message.model.js';
import { getReceiverSocketId, io } from "../lib/socket.js";

// Fetch users for sidebar, excluding the logged-in user
export const getUserForSidebar = async (req, res) => {
    try {
        const loggedInUserId = req.user._id;  // From verifyToken middleware
        const filteredUsers = await User.find({ _id: { $ne: loggedInUserId } })
            .select('-password');
        res.status(200).json(filteredUsers);
    } catch (error) {
        console.error("Error fetching users for sidebar:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};

// Get messages between logged-in user and the selected user
export const getMessages = async (req, res) => {
    try {
      const userToChatId = req.params.id;  // The user you want to chat with
      const myId = req.user.id;  // Your own user ID
  
      if (!myId || !userToChatId) {
        return res.status(400).json({ message: "Both sender and receiver are required" });
      }
  
      const messages = await Message.find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId }
        ]
      });
  
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error.message);
      res.status(500).json({ message: "Internal server error" });
    }
  };
  

// Send a new message
export const sendMessage = async (req, res) => {
    try {
      const { text } = req.body;
      const { id: receiverId } = req.params;
      const senderId = req.user.id;
  
      // Ensure both sender and receiver IDs are present
      if (!senderId || !receiverId) {
        return res.status(400).json({ message: "Sender and receiver IDs are required." });
      }
  
      if (!text || text.trim() === "") {
        return res.status(400).json({ message: "Message text is required." });
      }
  
      const newMessage = new Message({ senderId, receiverId, text });
      await newMessage.save();
  
      // Emit the message if the receiver is online
      const receiverSocketId = getReceiverSocketId(receiverId);
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("newMessage", newMessage);
      }
  
      return res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error.message);
      return res.status(500).json({ message: "Internal server error" });
    }
  };
  