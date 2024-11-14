import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname

  // Define public paths
  const isPublicPath = path === '/'

  // Temporarily allow all access to dashboard
  if (path.startsWith('/dashboard')) {
    return NextResponse.next()
  }

  // Get auth status from cookie/token
  const isAuthenticated = request.cookies.get('auth')?.value

  // Redirect authenticated users away from public paths
  if (isPublicPath && isAuthenticated) {
    return NextResponse.redirect(new URL('/dashboard', request.url))
  }

  // Allow access to public paths
  if (isPublicPath) {
    return NextResponse.next()
  }

  return NextResponse.next()
}

// Keep the matcher
export const config = {
  matcher: ['/', '/dashboard/:path*', '/chat/:path*', '/calendar/:path*']
} 