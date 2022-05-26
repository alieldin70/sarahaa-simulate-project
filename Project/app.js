const express = require('express');
const connectDB = require('./DB/connection');
const { userRouter, messageRouter, authRouter } = require('./modules/index.router');
const app = express()
require('dotenv').config();
const path=require('path');
const port = process.env.PORT
app.use(express.json());
app.use('/uploads',express.static(path.join(__dirname,'./uploads')))
app.use(userRouter, messageRouter, authRouter);
connectDB();
app.listen(port, () => {
    console.log(`server is runnin on port ......${port}`);
});