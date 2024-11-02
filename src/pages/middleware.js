// middleware.js

import { NextResponse } from 'next/server';

// Define the routes that require authentication
const protectedRoutes = ['/preScreen', '/profile', '/settings']; // Add your protected routes here

export function middleware(req) {
  const token = req.cookies.get('authToken'); // Replace 'authToken' with your actual token key

  // Check if the route is protected and if the user is not logged in
  if (protectedRoutes.includes(req.nextUrl.pathname) && !token) {
    // Redirect to the login page
    const loginUrl = new URL('/login', req.url);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

// Specify the routes where the middleware should apply
export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*', '/settings/:path*'], // Adjust based on your protected routes
};
