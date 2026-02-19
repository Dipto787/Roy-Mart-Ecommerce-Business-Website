
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET(req) {
  try {
    const session = await getServerSession(authOptions);
    console.log('diptraj',session)
    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);

    const currentUser = await usersCollection.findOne({
      email:session?.user?.email,
    });

    if (currentUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const users = await usersCollection.find({}).toArray();
    return NextResponse.json(users);
  } catch (error) {
    console.error("GET /api/users error:", error);
    return NextResponse.json(
      { message: "Failed to fetch users" },
      { status: 500 }
    );
  }
}
