import { createTanStackAuthServer } from 'convex-zen/tanstack-start'
import { authMeta } from '../../convex/zen/_generated/meta'
import { api } from '../../convex/_generated/api'

const authServer = createTanStackAuthServer({
  convexUrl: import.meta.env.VITE_CONVEX_URL as string,
  convexFunctions: ((api as unknown) as { zen: any }).zen,
  meta: authMeta,
})

export const {
  handler,
  getSession,
  fetchAuthAction,
  fetchAuthMutation,
  fetchAuthQuery,
} = authServer
