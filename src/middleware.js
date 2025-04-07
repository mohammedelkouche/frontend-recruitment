import { NextResponse } from 'next/server';
import { locales, defaultLocale } from './i18n/config';

export function middleware(request) {
  const pathname = request.nextUrl.pathname;
  
  const pathnameHasLocale = locales.some(
    locale => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );
  
  if (!pathnameHasLocale) {
    return NextResponse.redirect(
      new URL(`/${defaultLocale}${pathname === '/' ? '' : pathname}`, request.url)
    );
  }
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};