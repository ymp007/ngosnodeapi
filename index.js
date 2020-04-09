const express = require('express');
const userRouter = require('./routers/api/userDB');
const ngoRouter = require('./routers/api/NgoDB');
const categoryRouter = require('./routers/api/categoryDB');
const loginRouter = require('./routers/api/loginRouter');
const connectDB = require('./config/ConnectDB');

const app = express();


//database Connection
connectDB();
//set a middleware to parse data
app.use(express.json());

app.use('/api/ngos',ngoRouter);
app.use('/api/users',userRouter);
app.use('/api/category',categoryRouter);
app.use('/login',loginRouter);


app.listen(5000);
