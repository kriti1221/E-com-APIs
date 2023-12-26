import { getDb } from "../../config/mongodb.js";
import { ObjectId } from "mongodb";
export default class ProductModel {
    constructor(id, name, desc, price, imageUrl, category, sizes) {
        this._id = id;
        this.name = name;
        this.desc = desc;
        this.price = price;
        this.imageUrl = imageUrl;
        this.category = category;
        this.sizes = sizes;
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter((product) => {
            return (
                (!minPrice || product.price >= minPrice) &&
                (!maxPrice || product.price <= maxPrice) &&
                (!category || product.category == category));
        });
        return result;
    }

    static async get(id) {
        try {
            const db = getDb();
            const collection = db.collection("products");
            return await collection.findOne({ _id: new ObjectId(id) });
        }
        catch (err) {
            console.log(err);
            return res.status(403).send("Password Incorrect");
        }
    }

    static async add(product) {
        try {
            const db = getDb();
            const collection = db.collection("products");
            const result = await collection.insertOne(product);
            return result;
        }
        catch (err) {
            console.log("something went wrong", err);
        }
    }

    static async GetAll() {
        try {
            const db = getDb();
            const collection = db.collection("products");
            const products = await collection.find().toArray();
            console.log(products);
            return products;
        }
        catch (err) {
            console.log(err);
            return res.status(403).send("Password Incorrect");
        }
    }
}

var products = [
    new ProductModel(
        1,
        'Product 1',
        'Description for Product 1',
        19.99,
        'https://m.media-amazon.com/images/I/51-nXsSRfZL._SX328_BO1,204,203,200_.jpg',
        'Category1'
    ),
    new ProductModel(
        2,
        'Product 2',
        'Description for Product 2',
        29.99,
        'https://m.media-amazon.com/images/I/51xwGSNX-EL._SX356_BO1,204,203,200_.jpg',
        'Category2',
        ['M', 'XL']
    ),
    new ProductModel(
        3,
        'Product 3',
        'Description for Product 3',
        39.99,
        'https://m.media-amazon.com/images/I/31PBdo581fL._SX317_BO1,204,203,200_.jpg',
        'Category3',
        ['M', 'XL', 'S']
    )];