"use client";
import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import OurTopCategories from "./Components/our-top-categories/OurTopCategories";
import { CartProvider } from "@/Providers/CartProvider";

export default function ClientWrapper({ children }) {
  const pathname = usePathname();
 const hideOnAuth =
  pathname === "/login" ||
  pathname === "/register" ||
  pathname === "/user-pay-info" || 
  pathname.startsWith("/admin-dashboard");


  return (
    <CartProvider>
      {!hideOnAuth && <Navbar />}
      {!hideOnAuth && <OurTopCategories />}
      {children}
      {!hideOnAuth && <Footer />}
    </CartProvider>
  );
}
