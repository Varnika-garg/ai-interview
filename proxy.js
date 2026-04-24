import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)'
])

export default clerkMiddleware((auth, req) => {
  const { userId } = auth()

  // ❗ Agar user login nahi hai → har route pe sign-in bhejo
  if (!userId && req.nextUrl.pathname !== '/sign-in') {
    return Response.redirect(new URL('/sign-in', req.url))
  }

  // ❗ Agar protected route hai → extra safety
  if (userId && isProtectedRoute(req)) {
    auth().protect()
  }
})

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
}