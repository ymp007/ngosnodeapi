const express = require('express');
const userRouter = require('./routers/api/userDB');
const ngoRouter = require('./routers/api/NgoDB');
const categoryRouter = require('./routers/api/categoryDB');
const loginRouter = require('./routers/api/loginRouter');
const productRouter = require('./routers/api/ProductDB');
const connectDB = require('./config/ConnectDB');
const cors = require('cors');
const app = express();


//database Connection
connectDB();
//set a middleware to parse data
app.use(express.json());
app.use(cors());
app.use('/api/ngos',ngoRouter);
app.use('/api/products',productRouter);
app.use('/api/users',userRouter);
app.use('/api/category',categoryRouter);
app.use('/login',loginRouter);

const PORT = process.env.PORT || 5000;

app.listen(PORT);
