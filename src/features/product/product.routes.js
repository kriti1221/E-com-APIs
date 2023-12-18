import express from 'express';
import ProductController from './product.controller.js';

const ProductRouter = express.Router();

const productController = new ProductController();

ProductRouter.get('/', productController.getAllProducts);
ProductRouter.post('/', productController.addProduct);






export default ProductRouter;
