
import bcrypt from 'bcrypt'
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
export default async function loginUser(payload) {
    const { email, password } = payload;
    console.log(password)
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email });
    console.log('user', user)
    if (!user) return null;
    let isPasswordOk = await bcrypt.compare(password, user.password);
    if (!isPasswordOk) return null;


    return user;
}
