import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";

// ================== GET PRODUCTS ==================
export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);

    const category = searchParams.get("category");
    const q = searchParams.get("q");

    const productCollection = dbConnect(
      collectionNameObj.productCollection
    );

    let query = {};

    if (category) {
      query.category = category;
    }

    if (q) {
      query.title = { $regex: q, $options: "i" };
    }

    const products = await productCollection
      .find(query)
      .sort({ updatedAt: -1, createdAt: -1 })
      .toArray();

    return NextResponse.json(products);

  } catch (error) {
    console.error("❌ Product GET Error:", error);
    return NextResponse.json(
      { message: "Failed to fetch products" },
      { status: 500 }
    );
  }
}

// ================== ADD PRODUCT ==================
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

    const productsCollection = dbConnect(
      collectionNameObj.productCollection
    );

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
      updatedAt: new Date(),
    };

    const result = await productsCollection.insertOne(newProduct);

    return NextResponse.json(
      {
        message: "Product added successfully",
        productId: result.insertedId,
      },
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