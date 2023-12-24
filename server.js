// 1. Import express
import express from 'express';
// import bodyParser from 'body-parser';
import productRouter from './src/features/product/product.routes.js';
import UserRouter from './src/features/user/user.routes.js';
import basicAuthorizer from './src/middlewares/basicAuth.middleware.js';
import jwtAuth from './src/middlewares/jwt.middleware.js';
import cors from 'cors';
import { main } from './src/config/mongodb.js';

const server = express();
var corsOptions = {
    origin: 'http://localhost:5500'
}


// server.use((req, res, next) => {
//     res.header('Access-Control-Allow-Origin', 'http://localhost:5500')
//     res.header('Access-Control-Allow-Headers', '*');
//     res.header('Access-Control-Allow-Methods', '*');
//     if (req.method == "OPTIONS") {
//         return res.sendStatus(200);
//     }
//     next();
// });

server.use(express.json());
// for all requests related to product, redirect to product routes.
// localhost:3200/api/products
server.use("/api/products", cors(corsOptions), jwtAuth, productRouter);
server.use('/api/users', UserRouter);

// 3. Default request handler
server.get('/', (req, res) => {
    res.send("Welcome to Ecommerce APIs");
});

server.use((req, res) => {
    res.status(400).send("API not found");
});

// 4. Specify port.
server.listen(3200, () => {
    console.log("Server is running at 3200");
    main();
});

