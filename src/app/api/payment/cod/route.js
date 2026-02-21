import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export async function POST(req) {
  try {
    const body = await req.json();

    // Validate required fields
    const requiredFields = ["name", "email", "phone", "address", "district", "paymentMethod", "cart", "amount"];
    for (let field of requiredFields) {
      if (!body[field]) {
        return new Response(
          JSON.stringify({ success: false, message: `${field} is required` }),
          { status: 400 }
        );
      }
    }

    // Connect to DB
    const codCollection = dbConnect(collectionNameObj.codOrdersCollection);
    const cartCollection = dbConnect(collectionNameObj.cartsCollection);

    // Insert COD order
    const result = await codCollection.insertOne({
      ...body,
      createdAt: new Date(),
      status: "processing", // initial order status
    });

    // After inserting order, delete all cart items of this user
    await cartCollection.deleteMany({customer_email:body.userId});

    return new Response(
      JSON.stringify({ success: true, orderId: result.insertedId }),
      { status: 200 }
    );
  } catch (err) {
    console.error("COD Order POST Error:", err);
    return new Response(
      JSON.stringify({ success: false, message: "Server error" }),
      { status: 500 }
    );
  }
}


export async function GET() {
  try {
    // Connect to DB
    const codCollection = dbConnect(collectionNameObj.codOrdersCollection);

    // Fetch all orders, sorted by latest
    const orders = await codCollection
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return NextResponse.json({ success: true, orders });
  } catch (err) {
    console.error("COD Orders GET Error:", err);
    return NextResponse.json({ success: false, message: "Server error" });
  }
}