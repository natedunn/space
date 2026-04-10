import { createTanStackAuthClient, systemAdminClient } from 'convex-zen/tanstack-start'
import { authMeta } from '../../convex/zen/_generated/meta'
import { api } from '../../convex/_generated/api'

export const authClient = createTanStackAuthClient({
  convexFunctions: ((api as unknown) as { zen: any }).zen,
  meta: authMeta,
  plugins: [systemAdminClient()],
})

export type AppAuthClient = typeof authClient
