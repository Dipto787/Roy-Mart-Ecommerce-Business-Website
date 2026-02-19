import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET,
  });
  

  console.log("👉 MIDDLEWARE TOKEN:", token);

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/admin-dashboard")) {
    if (!token || token.role !== "admin") {
      console.log("⛔ BLOCKED:", pathname);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin-dashboard/:path*"],
};
