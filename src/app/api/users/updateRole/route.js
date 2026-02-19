import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth"; 
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { email, role } = await req.json();

    if (!email || !role) {
      return NextResponse.json(
        { message: "Email and role are required" },
        { status: 400 }
      );
    }

  
    const usersCollection = dbConnect(collectionNameObj.usersCollection);

    const currentUser = await usersCollection.findOne({
      email: session?.user?.email,
    });

    if (currentUser?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const result = await usersCollection.updateOne(
      { email },
      { $set: { role } }
    );

    if (result.modifiedCount > 0) {
      return NextResponse.json({ message: "User role updated successfully" });
    } else {
      return NextResponse.json(
        { message: "No changes made or user not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    console.error("POST /api/users/updateRole error:", error);
    return NextResponse.json(
      { message: "Failed to update user role" },
      { status: 500 }
    );
  }
}
