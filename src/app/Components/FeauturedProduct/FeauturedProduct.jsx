"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function FeaturedProducts() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const loadProducts = async () => {
      const res = await fetch("http://localhost:3000/api/products");
      const data = await res.json();

      // 🔥 Sort by sold (highest first)
      const bestSelling = data
        .sort((a, b) => b.sold - a.sold)
        .slice(0, 8);

      setProducts(bestSelling);
    };

    loadProducts();
  }, []);

  return (
    <section className="py-16 bg-black text-white">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-10 text-center">
          <h2 className="text-3xl md:text-4xl font-bold">🔥 Best Sellers</h2>
          <p className="text-gray-400 mt-2">
            Most loved by our customers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((item) => (
            <div
              key={item._id}
              className="bg-neutral-900 rounded-xl overflow-hidden border border-white/10 hover:border-white/30 transition"
            >
              <div className="relative h-64 w-full">
                <Image
                  src={item.images}
                  alt={item.title}
                  fill
                  className="object-cover"
                />
                <span className="absolute top-3 left-3 bg-white text-black text-xs px-3 py-1 rounded-full font-semibold">
                  Best Seller
                </span>
              </div>

              <div className="p-4 space-y-2">
                <h3 className="text-sm font-semibold line-clamp-2">
                  {item.title}
                </h3>

                <p className="text-gray-400 text-xs">
                  {item.brand} • {item.color}
                </p>

                <div className="flex items-center justify-between pt-2">
                  <span className="text-lg font-bold">
                    {item.price} {item.currency}
                  </span>

                  <Link
                    href={`/product/${item._id}`}
                    className="text-sm bg-white text-black px-3 py-1.5 rounded-md hover:bg-gray-200 transition"
                  >
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
