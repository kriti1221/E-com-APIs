import { getDb } from "../../config/mongodb.js";
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
            const newUser = new UserModel(
                name, email, password, type);
            const result = await collection.insertOne(newUser);
            console.log(`A document was inserted with the _id: ${result.insertedId}`);
            return newUser;
        }
        catch (err) {
            console.log("something went wrong", err);
        }
    }


    static SignIn(email, password) {
        const user = users.find(
            (u) => u.email == email && u.password == password
        );
        return user;
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