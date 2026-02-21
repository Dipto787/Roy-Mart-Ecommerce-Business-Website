import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

// 🔹 GET (Public - anyone can view)
export async function GET(req, { params }) {
  const { id } = await params;
  const productCollection = dbConnect(collectionNameObj.productCollection);
  const result = await productCollection.findOne({ _id: new ObjectId(id) });
  return NextResponse.json(result);
}

// 🔐 DELETE (Admin Only)
export async function DELETE(req, { params }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    return NextResponse.json(
      { message: "Unauthorized: Admin only" },
      { status: 403 }
    );
  }

  const { id } = await params;
  const productCollection = dbConnect(collectionNameObj.productCollection);

  await productCollection.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}

// 🔐 PATCH (Admin Only)
export async function PATCH(req, { params }) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json(
        { message: "Unauthorized: Admin only" },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await req.json();

    const productsCollection =  dbConnect(
      collectionNameObj.productCollection
    );

    const result = await productsCollection.updateOne(
      { _id: new ObjectId(id) },
      {
        $set: {
          title: body.title,
          category: body.category,
          brand: body.brand,
          price: Number(body.price),
          currency: body.currency,
          color: body.color,
          material: body.material,
          sizes: body.sizes,
          images: body.images,
          sold: Number(body.sold),
          updatedAt: new Date(), // 🔥 move updated item to top
        },
      }
    );

    if (result.matchedCount === 0) {
      return NextResponse.json(
        { message: "❌ Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: "✅ Product updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("PATCH /api/products/[id] error:", error);
    return NextResponse.json(
      { message: "❌ Internal server error" },
      { status: 500 }
    );
  }
}
