"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

export default function DashboardLayout({ children }) {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const linkClass = (path) =>
    `block px-3 py-2 rounded transition ${
      pathname === path
        ? "bg-orange-500 text-white font-semibold"
        : "hover:text-orange-400"
    }`;

  const handleLogout = async () => {
    try {
      // Example: clear auth cookie / token here
      // await fetch("/api/logout", { method: "POST" });

      // For now just redirect
      router.push("/login");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <div className="h-screen flex overflow-hidden">
      {/* Mobile Top Bar */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-40 bg-gray-900 text-white flex items-center justify-between px-4 py-3">
        <h2 className="text-lg font-bold">Admin Panel</h2>
        <button
          onClick={() => setOpen(!open)}
          className="text-2xl focus:outline-none"
        >
          ☰
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`
          fixed md:static top-0 left-0 z-30 h-full w-64 bg-gray-900 text-white p-5
          transform transition-transform duration-300
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
          flex flex-col
        `}
      >
        <div>
          <h2 className="text-2xl font-bold mb-6 hidden md:block">Admin Panel</h2>

          <nav className="space-y-3 mt-12 md:mt-0">
            <Link
              href="/admin-dashboard/admin-home"
              onClick={() => setOpen(false)}
              className={linkClass("/admin-dashboard/admin-home")}
            >
              🏠 Dashboard
            </Link>

            <Link
              href="/admin-dashboard/users"
              onClick={() => setOpen(false)}
              className={linkClass("/admin-dashboard/users")}
            >
              👥 Users
            </Link>

            <Link
              href="/admin-dashboard/products"
              onClick={() => setOpen(false)}
              className={linkClass("/admin-dashboard/products")}
            >
              📦 Products
            </Link>

            <Link
              href="/admin-dashboard/add-products"
              onClick={() => setOpen(false)}
              className={linkClass("/admin-dashboard/add-products")}
            >
              ➕ Add Products
            </Link>

            <Link
              href="/admin-dashboard/orders"
              onClick={() => setOpen(false)}
              className={linkClass("/admin-dashboard/orders")}
            >
              💳 Orders
            </Link>
          </nav>
        </div>

        {/* Divider + Bottom Links */}
        <div className="mt-auto pt-4 border-t border-gray-700 space-y-2">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:text-orange-400 transition"
          >
            🏡 <span>Home</span>
          </Link>

          <Link
            href="/profile"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 px-3 py-2 rounded hover:text-orange-400 transition"
          >
            👤 <span>Profile</span>
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded text-left hover:text-red-400 transition"
          >
            🚪 <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Content Area */}
      <main className="flex-1 bg-gray-100 pt-14 md:pt-0 overflow-y-auto">
        <div className="p-6 min-h-full">{children}</div>
      </main>
    </div>
  );
}
