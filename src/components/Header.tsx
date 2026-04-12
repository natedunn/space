import { Link, useRouter } from '@tanstack/react-router'
import { useSession } from 'convex-zen/react'
import { authClient } from '../lib/auth-client'
import { ThemeToggle } from './ThemeToggle'
import { Button } from './ui/button'

export default function Header() {
  const router = useRouter()
  const { isAuthenticated } = useSession()

  async function handleSignOut() {
    await authClient.signOut()
    await router.invalidate()
  }

  return (
    <header className="px-4">
      <nav className="mx-auto flex max-w-5xl items-center justify-between py-3">
        <div className="flex items-center gap-6">
          <Link to="/" className="text-sm font-semibold tracking-tight hover:no-underline">
            nate.space
          </Link>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link
              to="/"
              className="hover:text-foreground hover:no-underline"
              activeProps={{ className: 'text-foreground' }}
            >
              Home
            </Link>
            <Link
              to="/cms"
              className="hover:text-foreground hover:no-underline"
              activeProps={{ className: 'text-foreground' }}
            >
              CMS
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          {isAuthenticated ? (
            <Button variant="ghost" size="sm" onClick={() => void handleSignOut()}>
              Sign out
            </Button>
          ) : (
            <>
              <Button variant="ghost" size="sm" render={<Link to="/signin" />}>
                Sign in
              </Button>
              <Button variant="secondary" size="sm" render={<Link to="/signup" />}>
                Sign up
              </Button>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}
