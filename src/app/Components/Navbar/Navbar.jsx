'use client';

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

const Navbar = () => {
    return (
        <div className="w-full bg-neutral text-neutral-content">
            <div className="max-w-7xl mx-auto px-2 lg:px-4">

                {/* Top Navbar */}
                <div className="flex items-center h-16 gap-3 md:justify-between">

                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
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
                    <div className="ml-auto flex items-center gap-6">

                        {/* Cart */}
                        <div className="relative cursor-pointer">
                            <FaShoppingCart size={25} />
                            <span className="badge badge-sm badge-warning absolute -top-3 -right-3">
                                0
                            </span>
                        </div>

                        {/* Wishlist */}
                        <div className="relative cursor-pointer">
                            <FaHeart size={25} />
                            <span className="badge badge-sm badge-error absolute -top-3 -right-3">
                                0
                            </span>
                        </div>

                        {/* Login */}
                        <button className="btn border-none bg-orange-400 text-black px-4">
                            Login
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <div className="md:hidden pb-3">
                    <div className="flex w-full">
                        <input
                            type="text"
                            placeholder="Search RoyMart..."
                            className="input input-bordered w-full h-12 text-base rounded-r-none text-black"
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