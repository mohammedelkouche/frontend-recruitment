// middleware.js
import { NextResponse } from 'next/server';
// import { locales, defaultLocale } from './src/i18n/config';
import { locales, defaultLocale } from './i18n/config';

export function middleware(request) {
  // Get pathname from request
  const pathname = request.nextUrl.pathname;
  
  // Check if pathname has a locale
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  // If pathname doesn't have locale, redirect to default locale
  if (!pathnameHasLocale) {
    // e.g. incoming request is /products
    // The new URL is now /en/products
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  // Match all request paths except for the ones starting with:
  // - api (API routes)
  // - _next/static (static files)
  // - _next/image (image optimization files)
  // - favicon.ico (favicon file)
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};