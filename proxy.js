import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isProtectedRoute = createRouteMatcher([
  '/dashboard(.*)',
  '/forum(.*)'
])

export default clerkMiddleware((auth, req) => {
  const { userId } = auth()

  // ❗ Sirf protected routes ko guard karo
  if (isProtectedRoute(req) && !userId) {
    return auth().redirectToSignIn()
  }
})

export const config = {
  matcher: [
    '/((?!_next|.*\\..*).*)',
    '/(api|trpc)(.*)',
  ],
}