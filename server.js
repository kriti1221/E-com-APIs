
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cors from 'cors';
import { main } from './src/config/mongodb.js';
import connectUsingMongoose from './src/config/mongooseConfig.js';

const server = express();



var corsOptions = {
    origin: 'http://localhost:5500'
}


server.use(express.json());
server.use("/api/products", cors(corsOptions), jwtAuth, productRouter);
server.use('/api/users', UserRouter);

server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
});

server.use((req, res) => {
    res.status(400).send("API not found");
});

server.listen(3200, () => {
    console.log("Server is running at 3200");
    // main();
    connectUsingMongoose();
});

