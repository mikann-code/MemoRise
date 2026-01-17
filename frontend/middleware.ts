import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// バックエンドと二重ロック
// adminページかuserページへのアクセスを制御するミドルウェア
export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/admin")) {

    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    const payload = JSON.parse(atob(token.split(".")[1]));

    if (payload.role !== "admin") {
      return NextResponse.redirect(new URL("/", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
