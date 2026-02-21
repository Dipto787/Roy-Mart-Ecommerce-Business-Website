import { MongoClient, ServerApiVersion } from "mongodb";

const uri = process.env.DB_URI;

export let collectionNameObj = {
    productCollection: "products",
    usersCollection: "users",
    cartsCollection: "carts",
    paymentCollection: "payments",
    codOrdersCollection: "cod",
};

export default function dbConnect(collectionName) {
    const client = new MongoClient(uri, {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        },
        tls: true,
        tlsAllowInvalidCertificates: false, // set true only for local dev if needed
    });

    return client.db(process.env.DB_NAME).collection(collectionName);
}