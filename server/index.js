import express from 'express'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import cors from 'cors'
import multer from 'multer';
import userroutes from './routes/user_route.js'
import authroutes from './routes/authroutes.js'
import postroutes from './routes/postroutes.js'
import commentroutes from './routes/comment_route.js'
import cookieParser from 'cookie-parser';
dotenv.config()



const app=express()

app.use(cookieParser());
app.use(express.json())


app.use(cors({
  origin: 'https://ravishankar2003.github.io/mern-blog',
  credentials:true
}));

app.use(express.json({ limit: '10mb' })); // Increase body size limit if needed
app.use(express.urlencoded({ limit: '10mb', extended: true }));


mongoose.connect(process.env.MONGODB_URI)
.then(()=> console.log('mongodb connected'))
.catch((err)=> console.log(err) );


const storage = multer.memoryStorage(); // Store files in memory
const upload = multer({
  storage,
  limits: { fileSize: 1 * 1024 * 1024 }, // Limit file size to 1MB
});


app.use('/api/user',upload.single('profilePicture'), userroutes)
app.use('/api/auth',authroutes)
app.use('/api/post', postroutes)
app.use('/api/comment', commentroutes)


app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
      success: false,
      statusCode,
      message,
    });
  });


app.listen(process.env.PORT||3000, ()=>{
    console.log('server on port 3000')
})
