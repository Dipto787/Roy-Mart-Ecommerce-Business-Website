"use client";
import Image from "next/image";
import { useState } from "react";
import useCart from "../lib/hooks/useCart";
import Link from "next/link";
import toast from "react-hot-toast";
import { useSession } from "next-auth/react";

export default function CartPage() {
    const { cart, refetchCart } = useCart();
    const [localQty, setLocalQty] = useState({});
    const { data: session, status: sessionStatus } = useSession();
    console.log(session)
    const removeItem = async (id) => {
        await fetch(`/api/cart?id=${id}`, { method: "DELETE" });
        toast.success('product deleted');
        refetchCart();
    };

    const updateQty = async (id) => {
        const qty = localQty[id];
        if (!qty || qty < 1) return alert("Quantity must be at least 1");

        await fetch(`/api/cart`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ id, quantity: qty }),
        });
        refetchCart();
        toast.success('product quantity updated');
    };

    const handlePayment = async () => {

        const totalAmount = cart.reduce(
            (sum, cart) => sum + cart.product_price * cart.quantity,
            0
        );
        console.log(totalAmount)

        const res = await fetch("/api/payment/init", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                amount: totalAmount,
                name: session?.user?.name,
                email: session?.user?.email,
                address: "Dhaka",
                carts: cart,
                status: 'pending'
                // cartItems: cart   // চাইলে backend এ cart পাঠাতে পারো
            }),
        });

        const data = await res.json();
        if (data?.gatewayUrl) {
            window.location.replace(data.gatewayUrl)
        }
        console.log("Response from server:", data);
    };



    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-center text-2xl font-semibold tracking-widest mb-10">
                SHOPPING CART
            </h1>

            <div className="grid lg:grid-cols-3 gap-10">
                {/* Cart Items */}
                <div className="lg:col-span-2 space-y-6">
                    {cart.map((item) => (
                        <div
                            key={item._id}
                            className="grid grid-cols-1 sm:grid-cols-6 gap-4 items-center border-b pb-6"
                        >
                            {/* Image */}
                            <div className="relative w-24 h-24 mx-auto sm:mx-0">
                                <Image
                                    src={item.image}
                                    alt={item.product_name}
                                    fill
                                    className="object-cover rounded"
                                />
                            </div>

                            {/* Info */}
                            <div className="sm:col-span-2 text-center sm:text-left">
                                <p className="font-medium">{item.product_name}</p>
                                <p className="text-sm text-gray-500">{item.category}</p>
                            </div>

                            {/* Qty */}
                            <div className="flex flex-col items-center sm:items-start gap-2">
                                <input
                                    type="number"
                                    min="1"
                                    defaultValue={item.quantity}
                                    onChange={(e) =>
                                        setLocalQty((prev) => ({
                                            ...prev,
                                            [item._id]: Number(e.target.value),
                                        }))
                                    }
                                    className="w-20 border rounded px-2 py-1 text-center"
                                />
                                <Link href={'/my-cart'}
                                    onClick={() => updateQty(item._id)}
                                    className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                    Update
                                </Link>
                                <Link href={'/my-cart'}>
                                    <button
                                        onClick={() => removeItem(item._id)}
                                        className="text-xs bg-gray-800 cursor-pointer hover:bg-black text-white px-3 py-1 rounded"
                                    >
                                        Remove
                                    </button>
                                </Link>
                            </div>

                            {/* Price */}
                            <p className="font-semibold text-center sm:text-right">
                                ৳{item.product_price * item.quantity}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Summary */}
                <div className="bg-blue-50 p-6 rounded-lg shadow-sm h-fit">
                    <h2 className="text-xl font-bold mb-6 text-center">
                        Order Summary
                    </h2>

                    <div className="bg-white p-4 rounded mb-6 space-y-3">
                        <div className="flex justify-between">
                            <span>Sub-Total</span>
                            <span>
                                ৳{cart.reduce(
                                    (sum, item) => sum + item.product_price * item.quantity,
                                    0
                                )}
                            </span>
                        </div>
                        <div className="flex justify-between font-bold text-lg">
                            <span>Total</span>
                            <span>
                                ৳{cart.reduce(
                                    (sum, item) => sum + item.product_price * item.quantity,
                                    0
                                )}
                            </span>
                        </div>
                    </div>
                    <Link href={'/category/Sweater'}>
                        <button className="w-full border border-black py-3 mb-3 hover:bg-black hover:text-white transition">
                            CONTINUE SHOPPING
                        </button>
                    </Link>
                    <button onClick={handlePayment} className="w-full bg-black text-white py-3 hover:bg-gray-900 transition">
                        CHECKOUT
                    </button>
                </div>
            </div>
        </div>
    );
}
