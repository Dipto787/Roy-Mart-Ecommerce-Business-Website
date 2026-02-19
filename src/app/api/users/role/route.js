import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";

// 👉 GET current user's role
export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await usersCollection.findOne({
      email: session.user.email,
    });

    return NextResponse.json({ role: user?.role || "user" });
  } catch (err) {
    console.error("GET /api/users/role error:", err);
    return NextResponse.json({ role: "user" }, { status: 500 });
  }
}

// 👉 ADMIN ONLY: Update another user's role
export async function POST(req) {
  try {
    const session = await getServerSession(authOptions);

    // 🔐 Must be logged in
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const usersCollection = dbConnect(collectionNameObj.usersCollection);

    // 🔐 Check if current user is admin
    const currentUser = await usersCollection.findOne({
      email: session.user.email,
    });

    if (!currentUser || currentUser.role !== "admin") {
      return NextResponse.json(
        { message: "Forbidden: Admins only" },
        { status: 403 }
      );
    }

    // 👉 Data to update
    const { email, role } = await req.json();
    if (!email || !role) {
      return NextResponse.json(
        { message: "Email and role are required" },
        { status: 400 }
      );
    }

    // 👉 Update target user's role
    const result = await usersCollection.updateOne(
      { email },
      { $set: { role } }
    );

    return NextResponse.json({
      message: "Role updated successfully",
      modifiedCount: result.modifiedCount,
    });
  } catch (err) {
    console.error("POST /api/users/role error:", err);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
