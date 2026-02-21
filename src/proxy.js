// src/app/middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import dbConnect, { collectionNameObj } from "@/app/lib/dbConnect";

export async function proxy(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin-dashboard")) {
    if (!token) return NextResponse.redirect(new URL("/login", req.url));

    // Fresh role check from DB
    const userCollection = dbConnect(collectionNameObj.usersCollection);
    const user = await userCollection.findOne({ email: token.email });

    if (!user || user.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*"],
};