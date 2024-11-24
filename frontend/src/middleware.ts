import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const isAuthPage = path === '/login'
  const isAuthenticated = request.cookies.get('auth')?.value

  // Redirect authenticated users to dashboard if they try to access login page
  if (isAuthPage && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Redirect unauthenticated users to login page if they try to access protected routes
  if (!isAuthPage && !isAuthenticated && !path.includes('api')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/login', '/dashboard/:path*', '/chat/:path*', '/calendar/:path*']
} 