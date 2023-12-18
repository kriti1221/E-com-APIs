import express from 'express';
import ProductRouter from './src/features/product/product.routes.js';
const app = express();

app.get("/", (req, res) => {
    res.send('Welcome to Ecommere APIs');
})

app.use("/api/products", ProductRouter);

app.listen(3400);
console.log("server running at 3400");



