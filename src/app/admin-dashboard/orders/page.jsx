'use client';

import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

const AdminOrders = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [method, setMethod] = useState("sslcommerz");

    const fetchOrders = async (selectedMethod) => {
        setLoading(true);
        try {
            let res, data;

            if (selectedMethod === "cod") {
                res = await fetch("/api/payment/cod");
                data = await res.json();
                if (data.success) setOrders(data.orders);
                else setOrders([]);
            } else {
                res = await fetch("/api/payment/success");
                data = await res.json();
                if (data.success) setOrders(data.payments);
                else setOrders([]);
            }

        } catch (err) {
            console.error(err);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchOrders(method);
    }, [method]);

    const handleStatusChange = async (id, newStatus) => {
        try {
            const res = await fetch("/api/admin/update-status", {
                method: "PATCH", 
                body: JSON.stringify({ id, status: newStatus, method }),
            });

            const data = await res.json();

            if (data.success) {
                Swal.fire({
                    icon: "success",
                    title: "Status Updated",
                    timer: 1200,
                    showConfirmButton: false,
                });
                fetchOrders(method); // 🔥 refetch
            }
        } catch (error) {
            console.error(error);
        }
    };

    const showAddressDetails = (order) => {
        Swal.fire({
            title: `<span style="color:#4f46e5;font-weight:bold;">📍 Delivery Address</span>`,
            html: `
        <div style="text-align:left;font-size:14px;line-height:1.6">
          <p><strong>Village:</strong> ${order.villageName || "N/A"}</p>
          <p><strong>House No:</strong> ${order.houseNo || "N/A"}</p>
          <p><strong>Road No:</strong> ${order.roadNo || "N/A"}</p>
          <p><strong>Landmark:</strong> ${order.landmark || "N/A"}</p>
          <p><strong>District:</strong> ${order.district || "N/A"}</p>
          <p><strong>Zip Code:</strong> ${order.zipCode || "N/A"}</p>
          <hr style="margin:8px 0;" />
          <p><strong>Full Address:</strong><br/> ${order.address || "N/A"}</p>
          <p><strong>Additional Notes:</strong><br/> ${order.additionalNotes || "None"}</p>
        </div>
      `,
            width: 500,
            confirmButtonColor: "#4f46e5"
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-8">
            <div className="bg-white rounded-xl shadow-lg p-6">

                <div className="flex justify-between mb-6">
                    <h1 className="text-2xl font-bold">📊 Admin Orders</h1>

                    <select
                        value={method}
                        onChange={(e) => setMethod(e.target.value)}
                        className="border px-3 py-2 rounded-md"
                    >
                        <option value="sslcommerz">SSLCommerz</option>
                        <option value="cod">Cash on Delivery</option>
                    </select>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full text-sm border">
                        <thead className="bg-gray-200">
                            <tr>
                                <th className="p-3 border">Order ID</th>
                                <th className="p-3 border">User</th>
                                <th className="p-3 border">Amount</th>
                                <th className="p-3 border">Status</th>
                                <th className="p-3 border">Change</th>
                            </tr>
                        </thead>
                        <tbody>
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-6 font-semibold text-gray-500">
                                        Loading orders...
                                    </td>
                                </tr>
                            ) : orders.length === 0 ? (
                                <tr>
                                    <td colSpan="5" className="text-center p-8">
                                        <div className="flex flex-col items-center justify-center">
                                            <p className="text-lg font-semibold text-red-500">
                                                ❌ No Orders Found
                                            </p>
                                            <p className="text-sm text-gray-500 mt-2">
                                                Please select another payment method.
                                            </p>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                orders.map((order) => (
                                    <tr key={order._id} className="hover:bg-gray-50">
                                        <td className="p-3 border break-all">
                                            {order.transactionId || order._id}
                                        </td>

                                        <td className="p-3 border">
                                            <button
                                                onClick={() => showAddressDetails(order)}
                                                className="text-blue-600 font-semibold hover:underline"
                                            >
                                                {order.name}
                                            </button>
                                        </td>

                                        <td className="p-3 border">
                                            ৳ {order.amount}
                                        </td>

                                        <td className="p-3 border font-semibold">
                                            {order.status}
                                        </td>

                                        <td className="p-3 border">
                                            <select
                                                value={order.status}
                                                onChange={(e) =>
                                                    handleStatusChange(order._id, e.target.value)
                                                }
                                                className="border px-2 py-1 rounded"
                                            >
                                                <option value="processing">Processing</option>
                                                <option value="tracking">Tracking</option>
                                                <option value="delivered">Delivered</option>
                                                <option value="cancelled">Cancelled</option>
                                            </select>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
};

export default AdminOrders;