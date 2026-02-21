'use client';

import useCart from '@/app/lib/hooks/useCart';
import useRole from '@/app/lib/hooks/useRole';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useRef, useState } from 'react';
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa"; 

const Navbar = () => {
  const [show, setShow] = useState(true);
  const lastScrollY = useRef(0);

  const { role, loading: roleLoading } = useRole();
  const { data: session, status: sessionStatus } = useSession();
  const { cart } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 🔒 Don't render role UI until BOTH are ready
  const ready = sessionStatus !== "loading" && !roleLoading;

  return (
    <div
      className={`fixed top-0 w-full z-50 bg-black/40 text-neutral-content
      transition-transform duration-300 ease-in-out
      ${show ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-2 lg:px-4">

        {/* Top Navbar */}
        <div className="flex items-center h-16 gap-3">

          {/* Logo */}
          <Link href="/">
            <Image
              src="/roy-mart-logo.png"
              width={90}
              height={40}
              alt="roy-cart-logo"
            />
          </Link>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-1 justify-center">
            <div className="flex w-full max-w-4xl">
              <input
                type="text"
                placeholder="Search RoyMart..."
                className="input input-bordered w-full rounded-r-none text-black"
              />
              <button className="btn bg-orange-400 border-orange-400 rounded-l-none">
                <FaSearch className="text-black" />
              </button>
            </div>
          </div>

          {/* Right Side */}
          {ready && (
            <div className="ml-auto flex items-center gap-6">

              {/* 🔐 Role Based Actions */}
              {role === "admin" && (
                <Link
                  href="/admin-dashboard/admin-home"
                  className="px-4 py-2 rounded bg-orange-500 text-white font-medium"
                >
                  Dashboard
                </Link>
              )}

              {role === "user" && (
                <>
                  <Link href="/my-cart" className="relative cursor-pointer">
                    <FaShoppingCart size={25} />
                    <span className="badge badge-sm badge-warning absolute -top-3 -right-3">
                      {cart?.length || 0}
                    </span>
                  </Link>

                  <div className="relative cursor-pointer">
                    <FaHeart size={25} />
                    <span className="badge badge-sm badge-error absolute -top-3 -right-3">
                      0
                    </span>
                  </div>
                </>
              )}

              {/* User Dropdown */}
              <div className="dropdown dropdown-end">
                {sessionStatus === 'loading' ? (
                  <div className="avatar">
                    <div className="ring-primary ring-offset-base-100 w-10 rounded-full ring-2 ring-offset-2">
                      <img src=" " alt="loading" />
                    </div>
                  </div>
                ) : sessionStatus === 'authenticated' ? (
                  <div>
                    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                      <div className="w-10 rounded-full">
                        <img src={session?.user?.image || "/user.png"} alt="user" />
                      </div>
                    </div>

                    <ul
                      tabIndex={0}
                      className="menu menu-sm text-black dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow"
                    >
                      <li><a>Settings</a></li>
                      <li><Link href={'/my-orders'}>My Orders</Link></li>
                      <li>
                        <button
                          onClick={() => signOut({ callbackUrl: "/" })}
                          className="w-full text-left"
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                ) : (
                  <Link
                    href="/login"
                    className="px-5 py-3 rounded-md text-white text-sm font-medium bg-blue-600 hover:bg-blue-500 transition-colors duration-200"
                  >
                    Login
                  </Link>
                )}
              </div>

            </div>
          )}

        </div>

        {/* Mobile Search */}
        <div className="md:hidden pb-3">
          <div className="flex w-full">
            <input
              type="text"
              placeholder="Search RoyMart..."
              className="input input-bordered w-full h-12 rounded-r-none text-black"
            />
            <button className="btn h-12 bg-orange-400 border-orange-400 rounded-l-none">
              <FaSearch className="text-black" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Navbar;
