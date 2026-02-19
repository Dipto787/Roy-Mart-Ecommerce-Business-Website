import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import { NextResponse } from "next/server";
import axios from "axios";
import { ObjectId } from "mongodb";

export async function POST(req) {

  const formData = await req.formData();
  const val_id = formData.get("val_id");
  const tran_id = formData.get("tran_id");

  try {

    // 🔥 Step 1: Validate SSLCommerz Payment
    const validationResponse = await axios.get(
      "https://sandbox.sslcommerz.com/validator/api/validationserverAPI.php",
      {
        params: {
          val_id: val_id,
          store_id: "royma698ebd320d1a5",
          store_passwd: "royma698ebd320d1a5@ssl",
          format: "json",
        },
      }
    );

    const validationData = validationResponse.data;

    const paymentCollection = dbConnect(collectionNameObj.paymentCollection);
    const cartCollection = dbConnect(collectionNameObj.cartsCollection);

    // ❌ If payment invalid
    if (validationData.status !== "VALID") {
      return NextResponse.redirect(
        `http://localhost:3000/fail?tran_id=${tran_id}`
      );
    }

    // ✅ Update payment status
    await paymentCollection.updateOne(
      { transactionId: tran_id },
      { $set: { status: "paid" } }
    );

    // ✅ Get payment document
    const payment = await paymentCollection.findOne({
      transactionId: tran_id
    });

    // 🗑️ Delete cart items
    if (payment?.carts?.length > 0) {

      const cartIds = payment.carts.map(item =>
        new ObjectId(item._id)
      );

      await cartCollection.deleteMany({
        _id: { $in: cartIds }
      });

    }

    return NextResponse.redirect(
      `http://localhost:3000/success?tran_id=${tran_id}`
    );

  } catch (error) {

    console.error("Validation Error:", error);

    return NextResponse.redirect(
      `http://localhost:3000/fail?tran_id=${tran_id}`
    );
  }
}
