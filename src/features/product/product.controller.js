import ProductModel from "./product.model.js";

export default class ProductController {

    async getAllProducts(req, res) {
        const products = await ProductModel.GetAll();
        res.status(200).send(products);
    }

    async addProduct(req, res) {
        const { name, price, sizes } = req.body;
        const newProduct = {
            name,
            price: parseFloat(price),
            sizes: sizes.split(','),
            imageUrl: null,
        };
        const createdRecord = await ProductModel.add(newProduct);
        res.status(201).send(createdRecord);
    }

    rateProduct(req, res) { }

    async getOneProduct(req, res) {
        try {
            const id = req.params.id;
            const product = await ProductModel.get(id);
            if (!product) {
                res.status(404).send('Product not found');
            }
            else {
                return res.status(200).send(product);
            }
        }
        catch (err) {
            console.log(err);
            res.status(500).send("Internal server error");
        }
    }

    filterProducts(req, res) {
        const minPrice = req.query.minPrice;
        const maxPrice = req.query.maxPrice;
        const category = req.query.category;
        const product = ProductModel.filter(minPrice, maxPrice, category);
        return res.status(200).send(product);
    }

}