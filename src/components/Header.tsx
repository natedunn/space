import { Link, useRouter } from '@tanstack/react-router'
import { useSession } from 'convex-zen/react'
import { authClient } from '../lib/auth-client'

export default function Header() {
  const router = useRouter()
  const { isAuthenticated, session } = useSession()
  const hasConvexUrl = Boolean(import.meta.env.VITE_CONVEX_URL)

  async function handleSignOut() {
    await authClient.signOut()
    await router.invalidate()
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[color:var(--header)] px-4 backdrop-blur-xl">
      <nav className="page-wrap flex flex-wrap items-center gap-3 py-4">
        <h2 className="m-0 flex-shrink-0 text-base font-semibold tracking-[0.08em] uppercase">
          <Link
            to="/"
            className="inline-flex items-center gap-3 rounded-full border border-[var(--line-strong)] bg-[color:var(--panel-strong)] px-3 py-2 text-sm text-[var(--ink)] no-underline shadow-[0_16px_36px_rgba(37,22,16,0.08)]"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,var(--accent),#ff9a3d)] text-xs font-bold text-white">
              NS
            </span>
            nate.space
          </Link>
        </h2>

        <div className="order-3 flex w-full items-center gap-5 text-sm font-medium text-[var(--muted)] sm:order-2 sm:ml-6 sm:w-auto">
          <Link
            to="/"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            Index
          </Link>
          <Link
            to="/cms"
            className="nav-link"
            activeProps={{ className: 'nav-link is-active' }}
          >
            CMS
          </Link>
          {!isAuthenticated ? (
            <>
              <Link
                to="/signin"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
              >
                Sign in
              </Link>
              <Link
                to="/signup"
                className="nav-link"
                activeProps={{ className: 'nav-link is-active' }}
              >
                Sign up
              </Link>
            </>
          ) : null}
        </div>

        <div className="ml-auto flex items-center gap-3">
          {isAuthenticated ? (
            <div className="hidden rounded-full border border-[var(--line)] bg-[color:var(--panel)] px-3 py-2 text-xs font-semibold text-[var(--muted)] sm:block">
              User {session?.userId.slice(0, 8)}
            </div>
          ) : null}
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[color:var(--panel)] px-3 py-2 text-xs font-semibold tracking-[0.12em] uppercase text-[var(--muted)]">
            <span
              className={`h-2.5 w-2.5 rounded-full ${hasConvexUrl ? 'bg-[var(--accent-cool)]' : 'bg-[var(--accent)]'}`}
            />
            {hasConvexUrl ? 'Convex linked' : 'Convex pending'}
          </div>
          {isAuthenticated ? (
            <button
              type="button"
              onClick={() => void handleSignOut()}
              className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] bg-[color:var(--panel-strong)] px-4 py-2 text-sm font-semibold text-[var(--ink)]"
            >
              Sign out
            </button>
          ) : null}
        </div>
      </nav>
    </header>
  )
}
