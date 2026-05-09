import { createTanStackAuthClient, systemAdminClient } from 'convex-zen/tanstack-start'
import { authMeta } from '../../convex/zen/_generated/meta'
import { api } from '../../convex/_generated/api'

function rewritePortlessDevUrl(input: RequestInfo | URL): RequestInfo | URL {
	if (typeof window !== 'undefined') {
		return input
	}

	const portlessUrl = process.env.PORTLESS_URL
	const host = process.env.HOST
	const port = process.env.PORT

	if (!portlessUrl || !host || !port) {
		return input
	}

	const portlessOrigin = new URL(portlessUrl).origin

	const rewriteUrl = (value: string) => {
		const url = new URL(value)
		if (url.origin !== portlessOrigin) {
			return value
		}
		url.protocol = 'http:'
		url.hostname = host
		url.port = port
		return url.toString()
	}

	if (typeof input === 'string') {
		return rewriteUrl(input)
	}

	if (input instanceof URL) {
		return new URL(rewriteUrl(input.toString()))
	}

	const rewrittenUrl = rewriteUrl(input.url)
	if (rewrittenUrl === input.url) {
		return input
	}

	return new Request(rewrittenUrl, input)
}

export const authClient = createTanStackAuthClient({
  convexFunctions: ((api as unknown) as { zen: any }).zen,
  fetch: (input, init) => fetch(rewritePortlessDevUrl(input), init),
  meta: authMeta,
  plugins: [systemAdminClient()],
})

export type AppAuthClient = typeof authClient
