import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";
import axios from "axios";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import qs from "qs";

export async function POST(req) {

  const body = await req.json();
  console.log("Pay Info:", body);

  const trxid = new ObjectId().toString();
  body.transactionId = trxid;
  const initiatePayment = {
    store_id: "royma698ebd320d1a5",
    store_passwd: "royma698ebd320d1a5@ssl",   // ✅ must be store_passwd
    total_amount: body.amount,
    currency: "BDT",
    tran_id: trxid,
    success_url: "http://localhost:3000/api/payment/success",
    fail_url: "http://localhost:3000/fail",
    cancel_url: "http://localhost:3000/cancel",
    ipn_url: "http://localhost:3000/ipn-success-payment",
    shipping_method: "NO",
    product_name: "Computer",
    product_category: "Electronic",
    product_profile: "general",
    cus_name: body.name,
    cus_email: body.email,
    cus_add1: body.address,
    cus_city: "Dhaka",
    cus_country: "Bangladesh",
    cus_phone: body.phone,
  };

  const response = await axios.post(
    "https://sandbox.sslcommerz.com/gwprocess/v4/api.php",
    qs.stringify(initiatePayment),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
  let paymentCollection = dbConnect(collectionNameObj.paymentCollection);

  const savePayment = await paymentCollection.insertOne(body);


  console.log("SSL Response 2:", response.data.GatewayPageURL);

  return NextResponse.json({
    success: true,
    gatewayUrl: response.data.GatewayPageURL,
  });
}
