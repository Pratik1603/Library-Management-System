import express from 'express';
import cors from 'cors';

import userRoutes from './routes/userRoutes.js';
import mongoose from 'mongoose';
import authRoutes from "./routes/authRoute.js";
import bookRoutes from "./routes/bookRoute.js";
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import commentRoutes from './routes/comment.js';
import issueRoutes from './routes/issueRoute.js';
dotenv.config();

const app = express();
app.use(cors(
    {
        origin:[],
        methods:["POST","GET"],
        credentials:true
    }
));
app.use(express.json());
app.use(cookieParser());
const PORT = process.env.PORT || 6001;
mongoose.connect(process.env.MONGO_URL)
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));

app.get('/', (req, res) => {
    res.send('Server is Running! 🚀');
});

app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/issue',issueRoutes);
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});