"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

const OurShop = ({ category = "Jacket" }) => {
  const [products, setProducts] = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [size, setSize] = useState("All");
  const [color, setColor] = useState("All");
  const [brand, setBrand] = useState("All");
  const [maxPrice, setMaxPrice] = useState(5000);
  const [sort, setSort] = useState("default");

  const [showFilters, setShowFilters] = useState(false); // 🔥 Mobile toggle

  useEffect(() => {
    fetch(`http://localhost:3000/api/products?category=${category}`)
      .then(res => res.json())
      .then(data => {
        setProducts(data);
        setFiltered(data);
      });
  }, [category]);

  useEffect(() => {
    let temp = [...products];

    if (size !== "All") temp = temp.filter(p => p.sizes.includes(size));
    if (color !== "All") temp = temp.filter(p => p.color === color);
    if (brand !== "All") temp = temp.filter(p => p.brand === brand);

    temp = temp.filter(p => p.price <= maxPrice);

    if (sort === "sold") temp.sort((a, b) => b.sold - a.sold);
    if (sort === "priceLow") temp.sort((a, b) => a.price - b.price);
    if (sort === "priceHigh") temp.sort((a, b) => b.price - a.price);

    setFiltered(temp);
  }, [size, color, brand, maxPrice, sort, products]);

  const colors = ["All", ...new Set(products.map(p => p.color))];
  const brands = ["All", ...new Set(products.map(p => p.brand))];

  return (
    <div className="min-h-screen bg-gray-50">

      {/* ===== Banner ===== */}
      <div className="relative h-[240px]">
        <Image
          src="https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f"
          alt="Jacket Collection"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl font-bold">Premium Jacket Collection</h1>
          <p className="mt-2">Stay warm. Look sharp. Feel confident.</p>
        </div>
      </div>

      {/* ===== Mobile Filter Button ===== */}
      <div className="md:hidden px-4 py-4">
        <button
          onClick={() => setShowFilters(true)}
          className="w-full bg-black text-white py-2 rounded-lg"
        >
          Open Filters
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-6 grid grid-cols-1 md:grid-cols-4 gap-8">

        {/* ===== Filters ===== */}
        <div className={`bg-white p-5  rounded-xl shadow md:block ${showFilters ? "block" : "hidden"} md:relative fixed md:static top-0 left-0 w-72 h-full z-50 lg:z-30`}>
          <div className="flex justify-between md:hidden mb-3">
            <h2 className="font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}>✖</button>
          </div>

          <h2 className="text-xl font-semibold mb-4">Filter Products</h2>

          {/* Size */}
          <h2 className="text-xl font-semibold mb-1">Size</h2>
          <select className="w-full border p-2 rounded mb-3" onChange={(e) => setSize(e.target.value)}>
            <option>All</option><option>S</option><option>M</option><option>L</option><option>XL</option><option>XXL</option>
          </select>
          <h2 className="text-xl font-semibold mb-1">Color</h2>
          {/* Color */}
          <select className="w-full border p-2 rounded mb-3" onChange={(e) => setColor(e.target.value)}>
            {colors.map((c, i) => <option key={i}>{c}</option>)}
          </select>

          {/* Brand */}
           <h2 className="text-xl font-semibold mb-1">Brand</h2>
          <select className="w-full border p-2 rounded mb-3" onChange={(e) => setBrand(e.target.value)}>
            {brands.map((b, i) => <option key={i}>{b}</option>)}
          </select>

          {/* Sort */}
           <h2 className="text-xl font-semibold mb-1">Sort</h2>
          <select className="w-full border p-2 rounded mb-3" onChange={(e) => setSort(e.target.value)}>
            <option value="default">Sort By</option>
            <option value="sold">Most Sold</option>
            <option value="priceLow">Price: Low → High</option>
            <option value="priceHigh">Price: High → Low</option>
          </select>

          {/* Price */}
          <input
            type="range"
            min="500"
            max="8000"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full"
          />
          <p className="text-sm mt-1">Up to ৳ {maxPrice}</p>
        </div>

        {/* ===== Products ===== */}
        <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <Link href={`/product/${p._id}`} key={p._id} className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden">
              <div className="relative h-64">
                <Image src={p.images} alt={p.title} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-sm line-clamp-2">{p.title}</h3>
                <p className="text-xs text-gray-500">{p.brand}</p>
                <p className="text-lg font-bold mt-2">৳ {p.price}</p>
            
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default OurShop;
