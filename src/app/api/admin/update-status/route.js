import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function PATCH(req) {
  try {
    const { id, status, method } = await req.json();

    // 1️⃣ Choose collection name based on payment method
    const collectionName =
      method === "cod"
        ? collectionNameObj.codOrdersCollection
        : collectionNameObj.paymentCollection;

    // 2️⃣ Get collection directly
    const collection = await dbConnect(collectionName); // ✅ direct collection

    // 3️⃣ Update status
    const result = await collection.updateOne(
      { _id: new ObjectId(id) },
      { $set: { status } }
    );

    if (result.modifiedCount === 1) {
      return NextResponse.json({ success: true });
    } else {
      return NextResponse.json({ success: false, message: "No document updated" });
    }

  } catch (error) {
    console.error("Update status error:", error);
    return NextResponse.json({ success: false, error: error.message });
  }
}