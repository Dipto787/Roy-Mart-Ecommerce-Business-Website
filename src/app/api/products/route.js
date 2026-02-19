import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

export const GET = async (req) => {
  const { searchParams } = new URL(req.url);

  const category = searchParams.get("category");
  const q = searchParams.get("q"); // 🔹 search text

  const productCollection = dbConnect(collectionNameObj.productCollection);

  let query = {};

  // 🔹 Category filter
  if (category) {
    query.category = category;
  }

  // 🔹 Name search (case-insensitive)
  if (q) {
    query.title = { $regex: q, $options: "i" };
  }

  // 🔹 Sort by updatedAt first, fallback to createdAt
  const result = await productCollection
    .find(query)
    .sort({ updatedAt: -1, createdAt: -1 }) // 🔥 updated products come first
    .toArray();

  return NextResponse.json(result);
};

 

export async function POST(req) {
  try {

    const body = await req.json();

    const {
      category,
      brand,
      price,
      currency,
      sizes,
      color,
      material,
      title,
      images,
      sold,
    } = body;

    const productsCollection =dbConnect(
      collectionNameObj.productCollection
    )

    const newProduct = {
      category,
      brand,
      price: Number(price),
      currency: currency || "BDT",
      sizes: sizes || [],
      color,
      material,
      title,
      images,
      sold: sold || 0,
      createdAt: new Date(),
      updatedAt: new Date(), // 🔥 add for sorting
      // createdBy: session.user.email, // optional
    };

    const result = await productsCollection.insertOne(newProduct);

    return NextResponse.json(
      { message: "Product added successfully", productId: result.insertedId },
      { status: 201 }
    );
  } catch (error) {
    console.error("❌ Add Product Error:", error);
    return NextResponse.json(
      { message: "Failed to add product" },
      { status: 500 }
    );
  }
}
