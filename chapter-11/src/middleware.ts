import { NextRequest, NextResponse } from "next/server";

const allowedOrigins: string[] =
  //cors whitelist
  process.env.NODE_ENV === "production"
    ? ["https://www.example.com", "https://example.com"]
    : ["http://localhost:3000"];

export function middleware(request: NextRequest) {
  const origin = request.headers.get("origin");
  console.log(origin);
  if (origin && !allowedOrigins.includes(origin))
    return new NextResponse(null, {
      status: 401,
      statusText: "banned",
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "text/plain",
      },
    });
  else return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
