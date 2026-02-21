import bcrypt from "bcrypt";
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";

export default async function loginUser(payload) {
  const { email, password } = payload;
  const userCollection = dbConnect(collectionNameObj.usersCollection);
  const user = await userCollection.findOne({ email });
  if (!user) return null;

  const isPasswordOk = await bcrypt.compare(password, user.password);
  if (!isPasswordOk) return null;

  return user;
}