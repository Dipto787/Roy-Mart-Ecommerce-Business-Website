"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

export default function AdminProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all"); // ✅ default = all

  // 🔹 Load products (search + category)
  const loadProducts = async (query = "", cat = "all") => {
    setLoading(true);
    try {
      let url = `/api/products?q=${query}`;

      if (cat !== "all") {
        url += `&category=${cat}`;
      }

      const res = await fetch(url);
      const data = await res.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to load products", err);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Auto load on category change
  useEffect(() => {
    loadProducts(search, category);
  }, [category]);

  // 🔹 Delete
const handleDelete = async (id) => {
  const result = await Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  });

  if (!result.isConfirmed) return;

  try {
    const res = await fetch(`/api/products/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      throw new Error("Failed to delete product");
    }

    await Swal.fire({
      title: "Deleted!",
      text: "Your product has been deleted.",
      icon: "success",
      timer: 1500,
      showConfirmButton: false,
    });

    loadProducts(search, category); // reload products
  } catch (err) {
    console.error(err);

    Swal.fire({
      title: "Error!",
      text: "Something went wrong ❌",
      icon: "error",
    });
  }
};

  // 🔹 Search submit
  const handleSearch = (e) => {
    e.preventDefault();
    loadProducts(search, category);
  };

  // 🔹 Slice title
  const sliceTitle = (title, max = 60) =>
    title?.length > max ? title.slice(0, max) + "..." : title;

  return (
    <div className="p-4 sm:p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Products Management</h1>

      {/* 🔍 Search + Filter */}
      <form
        onSubmit={handleSearch}
        className="mb-6 flex flex-col sm:flex-row gap-2"
      >
        <input
          type="text"
          placeholder="Search product..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full border rounded-lg px-4 py-2"
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full sm:w-52 border rounded-lg px-4 py-2"
        >
          {/* ✅ NEW */}
          <option value="all">All Products</option>
          <option value="Denim">Denim</option>
          <option value="Sweater">Sweater</option>
          <option value="Hoodie">Hoodie</option>
          <option value="Rashguard">Rashguard</option>
          <option value="Jacket">Jacket</option>
        </select>

        <button
          type="submit"
          className="bg-blue-600 text-white px-5 py-2 rounded-lg"
        >
          Filter
        </button>
      </form>

      {loading ? (
        <p className="text-center py-10">Loading products...</p>
      ) : (
        <div className="grid gap-4">
          {products.map((product) => (
            <div
              key={product._id}
              className="flex flex-col sm:flex-row sm:items-center sm:justify-between 
              bg-white shadow rounded-2xl p-4 gap-4"
            >
              <div className="flex gap-4">
                <Image
                  src={product?.images}
                  alt={product.title}
                  width={80}
                  height={80}
                  className="rounded-xl object-cover"
                />

                <div>
                  <h2 className="font-semibold">
                    {sliceTitle(product.title)}
                  </h2>
                  <p className="text-gray-500">৳ {product.price}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Link
                  href={`/admin-dashboard/products/update/${product._id}`}
                  className="bg-blue-600 text-white px-3 py-2  rounded-lg"
                >
                  Update
                </Link>

                <button
                  onClick={() => handleDelete(product._id)}
                  className="bg-red-600 text-white px-3 py-2 cursor-pointer rounded-lg"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}

          {products.length === 0 && (
            <p className="text-center text-gray-500">No products found.</p>
          )}
        </div>
      )}
    </div>
  );
}