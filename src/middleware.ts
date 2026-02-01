import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const host = req.headers.get("host");
  if (!host) return NextResponse.next();

  if (host.startsWith("www.")) {
    const url = req.nextUrl.clone();
    url.host = host.replace(/^www\./u, "");
    return NextResponse.redirect(url, 308);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/:path*"
};

