import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import { ObjectId } from "mongodb";
export const POST = async (req) => {
  const body = await req.json();
  console.log(body)
  let { customer_email, quantity, product_price, product_name } = body;
  console.log(customer_email, quantity, product_price, product_name)
  const cartCollection = dbConnect(collectionNameObj.cartsCollection);
  let isExist = await cartCollection.findOne({ customer_email: customer_email, product_name: product_name });
  if (isExist) {
    let filter = { _id: isExist._id };
    let updatedDoc = {
      $set: {
        quantity: quantity + isExist.quantity,
      }
    };
    const result = await cartCollection.updateOne(filter, updatedDoc);
    return NextResponse.json({ result });
  }

  const result = await cartCollection.insertOne(body);
  return NextResponse.json({ result })
};
export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const email = searchParams.get("email");

  const cartCollection = dbConnect(collectionNameObj.cartsCollection);
  const data = await cartCollection.find({ customer_email: email }).toArray();
  return NextResponse.json(data);
}

export async function DELETE(req) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  const cartCollection = dbConnect(collectionNameObj.cartsCollection);
  await cartCollection.deleteOne({ _id: new ObjectId(id) });

  return NextResponse.json({ success: true });
}

export async function PATCH(req) {
  const body = await req.json();
  const { id, quantity } = body;

  const cartCollection = dbConnect(collectionNameObj.cartsCollection);
  await cartCollection.updateOne(
    { _id: new ObjectId(id) },
    { $set: { quantity } }
  );

  return NextResponse.json({ success: true });
}
