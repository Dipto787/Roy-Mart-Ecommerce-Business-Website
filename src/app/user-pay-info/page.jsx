"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useCart from "../lib/hooks/useCart";

export default function UserPayInfo() {
  const router = useRouter();
  const { data: session } = useSession();
  const { cart, refetchCart } = useCart();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    district: "",
    zipCode: "",
    villageName: "",
    houseNo: "",
    roadNo: "",
    landmark: "",
    additionalNotes: "",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate required fields
    if (!formData.name || !session?.user?.email || !formData.phone || !formData.address || !formData.district) {
      return toast.error("Please fill all required fields!");
    }

    if (!cart || cart.length === 0) {
      return toast.error("Your cart is empty!");
    }

    try {
      setLoading(true);

      // Calculate total amount
      const totalAmount = cart.reduce((sum, item) => sum + item.product_price * item.quantity, 0);

      // Post COD order
      const res = await fetch("/api/payment/cod", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          email: session.user.email,
          userId: session.user.email,
          paymentMethod: "COD",
          cart,
          amount: totalAmount,
        }),
      });

      const data = await res.json();

      if (data.success) {
        toast.success("Order placed successfully!");
        refetchCart(); // refresh cart in UI
        router.push("/my-orders");
      } else {
        toast.error(data.message || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      toast.error("Server error. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold mb-6 text-center">Delivery Information</h1>

      <form onSubmit={handleSubmit} className="space-y-4 bg-white p-6 rounded shadow">
        {/* Full Name */}
        <div>
          <label className="block font-medium mb-1">Full Name *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Email (readonly) */}
        <div>
          <label className="block font-medium mb-1">Email *</label>
          <input
            type="email"
            value={session?.user?.email || ""}
            readOnly
            className="w-full border px-3 py-2 rounded bg-gray-100 cursor-not-allowed"
          />
        </div>

        {/* Phone */}
        <div>
          <label className="block font-medium mb-1">Phone Number *</label>
          <input
            type="number"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block font-medium mb-1">Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="2"
            required
          />
        </div>

        {/* District */}
        <div>
          <label className="block font-medium mb-1">District *</label>
          <input
            type="text"
            name="district"
            value={formData.district}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        {/* Village Name */}
        <div>
          <label className="block font-medium mb-1">Village Name</label>
          <input
            type="text"
            name="villageName"
            value={formData.villageName}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* House No */}
        <div>
          <label className="block font-medium mb-1">House No</label>
          <input
            type="text"
            name="houseNo"
            value={formData.houseNo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Road No */}
        <div>
          <label className="block font-medium mb-1">Road No</label>
          <input
            type="text"
            name="roadNo"
            value={formData.roadNo}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* ZIP */}
        <div>
          <label className="block font-medium mb-1">ZIP / Postal Code</label>
          <input
            type="text"
            name="zipCode"
            value={formData.zipCode}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Landmark */}
        <div>
          <label className="block font-medium mb-1">Landmark (Optional)</label>
          <input
            type="text"
            name="landmark"
            value={formData.landmark}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block font-medium mb-1">Additional Notes</label>
          <textarea
            name="additionalNotes"
            value={formData.additionalNotes}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
            rows="2"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className={`w-full py-3 rounded text-white ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit Delivery Info"}
        </button>
      </form>
    </div>
  );
}