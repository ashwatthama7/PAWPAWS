import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRouter from './routes/user.route.js';
import authRouter from './routes/auth.route.js';
import cookieParser from 'cookie-parser';
import listingRouter from './routes/listing.route.js';
import messageRouter from './routes/message.route.js';
import {app, server} from './lib/socket.js'; //importing socket io instance
import cors from "cors";

app.use(cors({
  origin: "http://localhost:5173",  // Allow frontend to access backend
  credentials: true, // Allow cookies and authentication headers
}));

dotenv.config();

mongoose.connect(process.env.MONGO)
.then(()=> {
console.log('Connected to MongoDB!!');
})
.catch((err) => {
    
        console.log(err);
    });


app.use(express.json());


app.use(cookieParser());

server.listen(3000,() => {
    console.log('Server is running on port 3000');
 });

app.use('/api/user',userRouter);
app.use('/api/auth',authRouter);

app.use('/api/listing',listingRouter); //listing router

app.use('/api/message',messageRouter); //message router


//middle ware for exception handling if username and email already exists!!
app.use((err,req, res, next) =>{
    const statusCode = err.statusCode||500;
    const message = err.message ||'Internal server error';
    return res.status(statusCode).json({
        success: false,
        statusCode,
        message,
    });
});


  
  