import { MongoClient } from 'mongodb'

// Connection URL
// const url = process.env.DB_URL;
// const client = new MongoClient(url);

// Database Name
const dbName = 'ecomdb';

export async function main() {
    // Use connect method to connect to the server
    await MongoClient.connect(process.env.DB_URL);
    console.log('Connected successfully to Mongodb');
}

export const getDb = () => {
    return client.db(dbName);
}
