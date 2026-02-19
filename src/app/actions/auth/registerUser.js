'use server';
import bcrypt from 'bcrypt'
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";

export default async function registerUser(payload) {
    const userCollection = dbConnect(collectionNameObj.usersCollection);

    const { email, password } = payload;
    if (!email || !password) return { success: false, message: "Email and password required" };

    const existingUser = await userCollection.findOne({ email });
    if (existingUser) {
        return { success: false, message: "User already exists" };
    }

    const hashPassword = await bcrypt.hash(password, 10);
    payload.password = hashPassword;

    const result = await userCollection.insertOne(payload);

    if (result.insertedId) {
        return {
            success: true,
            acknowledged: result.acknowledged,
            insertedId: result.insertedId.toString() // <-- convert ObjectId to string
        };
    } else {
        return { success: false, message: "Registration failed" };
    }
}
