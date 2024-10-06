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
import { fileURLToPath } from 'url';
import path from 'path';
dotenv.config();
const app=express();
// Convert `import.meta.url` to a path
const __dirname=path.resolve();

const corsOptions = {
    origin: function (origin, callback) {
        callback(null, true); // Allow all origins
    },
    credentials: true // Allows credentials to be sent
}

// Enable CORS for all requests or specify your frontend URL
app.use(cors(corsOptions));


app.use(express.json());

const PORT = 8000;

mongoose.connect("mongodb+srv://pratikgupta1603:Pratik%402003@cluster0.dpwlcw0.mongodb.net/")
.then(() => {
    app.listen(PORT, ()=> console.log(`Server Port: ${PORT}`));
})
.catch((error) => console.log(`${error} did not connect`));


app.use('/api/user', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/book', bookRoutes);
app.use('/api/comment', commentRoutes);
app.use('/api/issue',issueRoutes);

app.use(express.static(path.join(__dirname,'client/dist')));
app.get('*',(req,res)=>{
    res.sendFile(path.join(__dirname,'client','dist','index.html'));
})
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
});