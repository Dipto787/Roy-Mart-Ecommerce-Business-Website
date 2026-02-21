'use client';

import React, { useEffect, useState } from "react";

const MyOrders = () => {
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
      console.error("Fetch Orders Error:", err);
      setOrders([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders(method);
  }, [method]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case "processing":
        return "bg-yellow-100 text-yellow-700";
      case "completed":
      case "tracking":
        return "bg-green-100 text-green-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 px-3 sm:px-6 py-6">
      
      <div className="max-w-6xl mx-auto">
        
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-purple-700 mb-6">
          🛍️ My Orders
        </h1>

        {/* Selector */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
          <label className="font-semibold text-gray-700 text-sm sm:text-base">
            Select Payment Method:
          </label>

          <select
            value={method}
            onChange={(e) => setMethod(e.target.value)}
            className="w-full sm:w-60 border border-purple-400 focus:ring-2 focus:ring-purple-400 px-3 py-2 rounded-lg outline-none text-sm"
          >
            <option value="sslcommerz">SSLCommerz</option>
            <option value="cod">Cash on Delivery (COD)</option>
          </select>
        </div>

        {loading ? (
          <div className="text-center text-purple-600 font-semibold py-10">
            Loading orders...
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center text-gray-500 py-10">
            No orders found for {method.toUpperCase()}.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {orders.map((order) => (
              <div
                key={order._id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition duration-300 p-4 flex flex-col justify-between"
              >
                {/* Header */}
                <div className="flex flex-col gap-2 mb-3">
                  
                  <div className="flex justify-between items-start gap-2">
                    <h2 className="font-semibold text-gray-800 text-sm break-all">
                      Order #{order.transactionId || order._id}
                    </h2>

                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full whitespace-nowrap ${getStatusColor(order.status)}`}
                    >
                      {order.status || "Pending"}
                    </span>
                  </div>

                </div>

                {/* Body */}
                <div className="space-y-1 text-xs sm:text-sm text-gray-700">
                  <p><strong>Method:</strong> {order.method || "COD"}</p>
                  <p><strong>Items:</strong> {order.carts?.length || order.cart?.length || 0}</p>
                  <p><strong>Amount:</strong> ৳ {order.amount || "N/A"}</p>
                  {order.name && <p><strong>Customer:</strong> {order.name}</p>}
                  {order.email && <p className="break-all"><strong>Email:</strong> {order.email}</p>}
                  {order.address && <p className="break-words"><strong>Address:</strong> {order.address}</p>}
                </div>

              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyOrders;