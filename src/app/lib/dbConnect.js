
import { MongoClient, ServerApiVersion } from 'mongodb'
const uri = process.env.DB_URI;
export let collectionNameObj = {
    productCollection: 'products',
    usersCollection: 'users',
    cartsCollection: 'carts',
    paymentCollection: 'payments'
}
export default function dbConnect(collectionName) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

    return client.db(process.env.DB_NAME).collection(collectionName)
}


