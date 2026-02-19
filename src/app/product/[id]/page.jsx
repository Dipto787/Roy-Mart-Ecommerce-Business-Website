"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useParams, useRouter, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import toast from "react-hot-toast";
import useCart from "@/app/lib/hooks/useCart";

const ProductDetails = () => {
  const params = useParams();
  const router = useRouter();
  const pathName = usePathname();

  const { data: session, status } = useSession();
  const { refetchCart } = useCart();

  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);

  const isAdmin = session?.user?.role === "admin";

  // ================= FETCH PRODUCT =================
  useEffect(() => {
    if (!params?.id) return;

    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${params.id}`);
        const data = await res.json();

        if (!data) return;

        setProduct(data);

        if (Array.isArray(data.sizes) && data.sizes.length > 0) {
          setSelectedSize(data.sizes[0]);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        toast.error("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params?.id]);

  // ================= ADD TO CART =================
  const handleAddToCart = async () => {
    if (isAdmin) {
      return toast.error("Admin cannot add products to cart");
    }

    if (status === "unauthenticated") {
      return router.push(`/login?redirect=${encodeURIComponent(pathName)}`);
    }

    if (!product) return;

    const addedCart = {
      product_id: product._id,
      product_name: product.title,
      image: product.images,
      customer_email: session?.user?.email,
      customer_name: session?.user?.name,
      product_price: product.price,
      category: product.category,
      size: selectedSize,
      quantity,
    };

    try {
      const res = await fetch("/api/cart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(addedCart),
      });

      const data = await res.json();

      if (data?.result?.insertedId || data?.result?.modifiedCount > 0) {
        refetchCart();
        toast.success("Product added to cart");
      } else {
        toast.error("Failed to add to cart");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  // ================= LOADING =================
  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!product) return <p className="text-center py-20">Product Not Found</p>;

  // ================= COLOR HELPER =================
  const getColorCode = (colorName) => {
    if (!colorName) return "#ccc";
    const c = colorName.toLowerCase();
    if (c.includes("black")) return "#000";
    if (c.includes("white")) return "#fff";
    if (c.includes("green")) return "green";
    if (c.includes("blue")) return "blue";
    return "#ccc";
  };

  return (
    <div className="min-h-screen bg-gray-50 py-10">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-10">

        {/* ===== Product Images ===== */}
        <div className="w-full h-[400px] md:h-[500px] relative rounded-xl overflow-hidden shadow">
          <Image
            src={product.images}
            alt={product.title}
            fill
            priority
            className="object-cover"
          />
        </div>

        {/* ===== Product Info ===== */}
        <div className="flex flex-col justify-between">
          <div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{product.title}</h1>
            <p className="text-sm text-gray-500 mb-2">{product.brand}</p>

            <p className="text-xl md:text-2xl font-semibold mb-3">
              ৳ {product.price}{" "}
              <span className="text-sm font-normal text-gray-400">
                {product.currency}
              </span>
            </p>

            <p className="text-xs text-gray-500 mb-3">Sold: {product.sold}</p>

            {/* Sizes */}
            {Array.isArray(product?.sizes) && product.sizes.length > 0 && (
              <div className="mb-4">
                <label className="text-sm font-medium mb-1 block">Size</label>
                <select
                  value={selectedSize}
                  onChange={(e) => setSelectedSize(e.target.value)}
                  className="w-full border p-2 rounded"
                >
                  {product.sizes.map((s, i) => (
                    <option key={i} value={s}>{s}</option>
                  ))}
                </select>
              </div>
            )}

            {/* Color */}
            <div className="mb-4">
              <p className="text-sm font-medium">Color</p>
              <div
                className="w-8 h-8 rounded-full border mt-1"
                style={{ backgroundColor: getColorCode(product.color) }}
              ></div>
              <p className="text-xs text-gray-500 mt-1">{product.color}</p>
            </div>

            {/* Material */}
            <div className="mb-4">
              <p className="text-sm font-medium">Material</p>
              <p className="text-xs text-gray-500 mt-1">{product.material}</p>
            </div>

            {/* Quantity */}
            <div className="mb-6 flex items-center gap-3">
              <p className="text-sm font-medium">Quantity</p>
              <div className="flex items-center border rounded w-max">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="px-3 py-1 bg-gray-200"
                >-</button>
                <span className="px-4">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="px-3 py-1 bg-gray-200"
                >+</button>
              </div>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            onClick={handleAddToCart}
            disabled={isAdmin || status === "loading"}
            className={`w-full py-3 rounded-lg font-semibold transition
              ${isAdmin
                ? "bg-gray-400 cursor-not-allowed text-white"
                : "bg-black hover:bg-gray-800 text-white"
              }`}
          >
            {isAdmin ? "Admins can't add to cart" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
