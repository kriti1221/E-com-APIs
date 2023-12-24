import { MongoClient } from 'mongodb'

// Connection URL
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);

// Database Name
const dbName = 'ecomdb';

export async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to Mongodb');
}

export const getDb = () => {
    return client.db(dbName);
}
