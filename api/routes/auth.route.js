import express from 'express';
import { google, signin, signup, signOut, checkAuth } from '../controllers/auth.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router = express.Router();

router.post("/signup",signup);
router.post("/signin",signin);
router.post('/google',google);
router.get('/signout', signOut);
//yo bhanda tala messaging ko lagi ho
router.get("/check", verifyToken, checkAuth);




//yo bhanda mathi ko messaging ko lagi ho
export default router;