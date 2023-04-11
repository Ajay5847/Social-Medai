const express = require('express');
const dbConnect = require('./dbConnect');
const dotenv = require('dotenv');
const morgan = require('morgan'); // to know the type of request and time
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const postsRouter = require('./Routes/postsRouter');
const userRouter = require('./Routes/userRouter');
const cookieParser = require('cookie-parser');
const cloudinary = require('cloudinary').v2;
dotenv.config("./.env");

// Configuration 
cloudinary.config({
    secure: true,
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const app = express();
app.use(express.json({limit: "10mb"}));
app.use(morgan("common"));
app.use(cookieParser());
let origin = 'http://localhost:3000'
if(process.env.NODE_ENV === "production"){
    origin = process.env.CLIENT_DOMAIN;
  }
app.use(cors({
    credentials: true,
    origin
}))

app.use('/auth', authRouter);
app.use('/posts', postsRouter);
app.use('/user', userRouter);

app.get('/', (req, res) => {
    res.json({
        data: "Ok"
    });
})

const MY_PORT = process.env.PORT;
dbConnect();

app.listen(MY_PORT, () => {
    console.log("Listening on ",MY_PORT);
})




