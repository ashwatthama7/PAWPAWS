import express from 'express';
import { verifyToken } from '../utils/verifyUser.js'; // Middleware for authentication
import { getUserForSidebar, getMessages, sendMessage } from '../controllers/message.controller.js'; // Controller functions

const router = express.Router();

// Route to get users for the sidebar
router.get("/users", verifyToken, getUserForSidebar);

// Route to get messages for a specific user by ID
router.get("/:id", verifyToken, getMessages);//yo line le message tanne ho

// Route to send a message to a specific user by ID
router.post("/send/:id", verifyToken, sendMessage);

export default router;
