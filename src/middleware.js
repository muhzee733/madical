import { NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

  // Check if token exists before accessing properties
  const userToken = token?.token; 
  console.log(userToken ,' userToken')

  const { pathname } = req.nextUrl;
  const protectedRoutes = ["/doctor", "/patient"];

  if (!userToken && protectedRoutes.some((route) => pathname.startsWith(route))) {
    const loginUrl = new URL("/login", req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/doctor/:path*", "/patient/:path*"],
};
