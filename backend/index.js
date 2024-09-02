import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import cors from 'cors';

import authRouter from './routes/auth.route.js';
import messageRouter from './routes/message.route.js';
import userRouter from './routes/user.route.js';
import { app, server } from './socket/socket.js';

// Load environment variables
dotenv.config();

// Middleware setup
app.use(cookieParser());
app.use(cors());
app.use(express.json());

// Database connection without deprecated options
mongoose.connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to database');
    })
    .catch((err) => {
        console.log('Database connection error:', err);
    });

// Routes
app.use('/api/auth', authRouter);
app.use('/api/message', messageRouter);
app.use('/api/user', userRouter);

// Error handling middleware
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal server error';
    res.status(statusCode).json({
        success: false,
        statusCode,
        message
    });
});

// Start the server
server.listen(4000, () => {
    console.log("Server is running on port 4000");
});
