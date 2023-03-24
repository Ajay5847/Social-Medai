const express = require('express');
const dbConnect = require('./dbConnect');
const dotenv = require('dotenv');
const morgan = require('morgan'); // to know the type of request and time
const cors = require('cors');
const authRouter = require('./Routes/authRouter');
const postsRouter = require('./Routes/postsRouter');
const userRouter = require('./Routes/userRouter');
const cookieParser = require('cookie-parser');
dotenv.config("./.env");

const app = express();
app.use(express.json());
app.use(morgan("common"));
app.use(cookieParser());
app.use(cors({
    credentials: true,
    origin: 'http://localhost:3000'
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




