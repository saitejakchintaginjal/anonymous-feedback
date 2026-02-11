// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// export { default } from "next-auth/middleware";

// // This function can be marked `async` if using `await` inside
// export async function middleware(request: NextRequest) {
//   const token = await getToken({
//     req: request,
//   });
//   const url = request.nextUrl;
//   if (
//     token &&
//     (url.pathname.startsWith("/sign-in") ||
//       url.pathname.startsWith("/sign-up") ||
//       url.pathname.startsWith("/"))
//   ) {
//     return NextResponse.redirect(new URL("/dashboard", request.url));
//   }
//   return NextResponse.redirect(new URL("/home", request.url));
// }

// // See "Matching Paths" below to learn more
// export const config = {
//   matcher: ["/sign-in", "/sign-up", "/", "dashboard/:path*", "/verify/:path*"],
// };

import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const { pathname } = request.nextUrl;

  // If logged in → block auth pages
  if (
    token &&
    (pathname === "/" ||
      pathname.startsWith("/sign-in") ||
      pathname.startsWith("/sign-up"))
  ) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  // If NOT logged in → protect dashboard & verify
  if (
    !token &&
    (pathname.startsWith("/dashboard") || pathname.startsWith("/verify"))
  ) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  // Otherwise allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/sign-in", "/sign-up", "/dashboard/:path*", "/verify/:path*"],
};
