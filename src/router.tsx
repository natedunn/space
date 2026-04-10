import { ConvexQueryClient } from '@convex-dev/react-query'
import { QueryClient } from '@tanstack/react-query'
import { createRouter } from '@tanstack/react-router'
import { setupRouterSsrQueryIntegration } from '@tanstack/react-router-ssr-query'
import { ConvexReactClient } from 'convex/react'
import { authClient } from './lib/auth-client'
import { routeTree } from './routeTree.gen'

function isAuthError(error: unknown) {
  return error instanceof Error && /\b(unauthorized|forbidden)\b/i.test(error.message)
}

function createRouterContext() {
  const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL as string)
  authClient.connectConvexAuth(convex)

  const convexQueryClient = new ConvexQueryClient(convex)

  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        queryKeyHashFn: convexQueryClient.hashFn(),
        queryFn: convexQueryClient.queryFn(),
        retry: (failureCount, error) => {
          if (isAuthError(error)) {
            return false
          }
          return failureCount < 2
        },
        staleTime: 5_000,
      },
    },
  })

  convexQueryClient.connect(queryClient)

  return {
    convex,
    convexQueryClient,
    queryClient,
  }
}

export type RouterContext = ReturnType<typeof createRouterContext>

export function getRouter() {
  const context = createRouterContext()

  const router = createRouter({
    routeTree,
    context,
    scrollRestoration: true,
    defaultPreload: false,
    defaultStaleTime: 5_000,
    defaultPreloadStaleTime: 10_000,
  })

  setupRouterSsrQueryIntegration({ router, queryClient: context.queryClient })

  return router
}

declare module '@tanstack/react-router' {
  interface Register {
    router: ReturnType<typeof getRouter>
  }
}
