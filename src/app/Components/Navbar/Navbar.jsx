"use client";

import useCart from "@/app/lib/hooks/useCart";
import useRole from "@/app/lib/hooks/useRole";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

const Navbar = () => {
  const [show, setShow] = useState(true);
  const [search, setSearch] = useState("");
  const lastScrollY = useRef(0);
  const router = useRouter();

  const { role, loading: roleLoading } = useRole();
  const { data: session, status: sessionStatus } = useSession();
  const { cart } = useCart();

  // Hide on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setShow(!(currentScrollY > lastScrollY.current && currentScrollY > 80));
      lastScrollY.current = currentScrollY;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // 🔎 Search Function
  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    router.push(`/products?q=${search}`);
    setSearch("");
  };

  const ready = sessionStatus !== "loading" && !roleLoading;

  return (
    <div className={`fixed top-0 w-full z-50 bg-black/40 text-neutral-content transition-transform duration-300 ease-in-out ${show ? "translate-y-0" : "-translate-y-full"}`}>
      <div className="max-w-7xl mx-auto px-2 lg:px-4 flex items-center h-16 gap-3">

        {/* Logo */}
        <Link href="/">
          <Image src="/roy-mart-logo.png" width={90} height={40} alt="roy-mart-logo" />
        </Link>

        {/* Desktop Search */}
        <div className="hidden md:flex flex-1 justify-center">
          <form onSubmit={handleSearch} className="flex w-full max-w-4xl">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search RoyMart..."
              className="input input-bordered w-full rounded-r-none text-black"
            />
            <button type="submit" className="btn bg-orange-400 border-orange-400 rounded-l-none">
              <FaSearch className="text-black" />
            </button>
          </form>
        </div>

        {ready && (
          <div className="ml-auto flex items-center gap-6">
            {role === "admin" && (
              <Link href="/admin-dashboard/admin-home" className="px-4 py-2 rounded bg-orange-500 text-white font-medium">Dashboard</Link>
            )}

            {role === "user" && (
              <>
                <Link href="/my-cart" className="relative">
                  <FaShoppingCart size={25} />
                  <span className="badge badge-sm badge-warning absolute -top-3 -right-3">{cart?.length || 0}</span>
                </Link>
                <div className="relative">
                  <FaHeart size={25} />
                  <span className="badge badge-sm badge-error absolute -top-3 -right-3">0</span>
                </div>
              </>
            )}

            {/* Auth */}
            <div className="dropdown dropdown-end">
              {sessionStatus === "authenticated" ? (
                <div>
                  <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-10 rounded-full">
                      <img src={session?.user?.image || "/user.png"} alt="user" />
                    </div>
                  </div>
                  <ul tabIndex={0} className="menu menu-sm text-black dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                    <li><Link href="/my-orders">My Orders</Link></li>
                    <li>
                      <button onClick={() => signOut({ callbackUrl: "/" })} className="w-full text-left">Logout</button>
                    </li>
                  </ul>
                </div>
              ) : (
                <Link href="/login" className="px-5 py-3 rounded-md text-white text-sm font-medium bg-blue-600">Login</Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Search */}
      <div className="md:hidden pb-3 px-4">
        <form onSubmit={handleSearch} className="flex w-full">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search RoyMart..."
            className="input input-bordered w-full h-12 rounded-r-none text-black"
          />
          <button type="submit" className="btn h-12 bg-orange-400 border-orange-400 rounded-l-none">
            <FaSearch className="text-black" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Navbar;