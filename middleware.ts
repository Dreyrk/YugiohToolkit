import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSession } from "@/actions/auth/getSession";
import { invalidateSession } from "@/actions/auth/invalidateSession";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const session = await getSession();

  if (pathname.startsWith("/profile")) {
    if (!session.user || session.error) {
      NextResponse.redirect(new URL("/", request.url));
    } else {
      NextResponse.next();
    }
  }

  if (session.invalidate) {
    await invalidateSession();
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
