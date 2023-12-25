import { getDb } from "../../config/mongodb.js";
import bcrypt from 'bcrypt';
export default class UserModel {
    constructor(name, email, password, type, id) {
        this.name = name;
        this.email = email;
        this.password = password;
        this.type = type;
        this._id = id;
    }

    static async SignUp(name, email, password, type) {
        try {
            const db = getDb();
            const collection = db.collection("users");
            const hashedPassword = await bcrypt.hash(password, 12);
            const newUser = new UserModel(
                name, email, hashedPassword, type);
            const result = await collection.insertOne(newUser);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return newUser;
        }
        catch (err) {
            console.log("something went wrong", err);
        }
    }


    static async SignIn(email) {
        try {
            const db = getDb();
            const collection = db.collection("users");
            return await collection.findOne({ email });
        }
        catch (err) {
            console.log(err);
            return res.status(403).send("Password Incorrect");
        }
    }

    static getAll() {
        return users;
    }
}

let users = [
    {
        id: 1,
        name: "Seller",
        email: 'seller@ecom.com',
        password: 'Password1',
        type: 'seller',
    },
];