import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const url = process.env.DB_URL;

async function connectUsingMongoose() {
    try {
        await mongoose.connect(url);
        console.log("mongodb connected using mongoose")
    }
    catch (err) {
        console.log("Error connecting to the database: ", err)
    }
}

export default connectUsingMongoose;

