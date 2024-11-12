import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/authRoutes.js';
import historyRoutes from './routes/historyRoutes.js';
import cookieParser from 'cookie-parser';
import cors from "cors"
import jsonwebtoken from 'jsonwebtoken';

dotenv.config();
connectDB();

const app = express();
// app.use(cors())
app.use(cors({
    // origin: 'https://escout.netlify.app', // Your frontend URL
    origin: 'http://localhost:5173', // Your frontend URL
    credentials: true, // Allow credentials (cookies) to be included
}));

app.use(express.json());
app.use(cookieParser());  // Middleware to parse cookies



app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/history', historyRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
