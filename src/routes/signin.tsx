import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'

export const Route = createFileRoute('/signin')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/cms' })
    }
  },
  component: SignInPage,
})

function SignInPage() {
  const navigate = useNavigate()
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setStatus('loading')

    try {
      await authClient.signIn.email({ email, password })
      await router.invalidate()
      await navigate({ to: '/cms' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not sign in')
      setStatus('idle')
    }
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow mb-3">Auth</p>
        <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">Sign in</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Use your email and password to enter the CMS.
        </p>

        <form className="auth-form mt-8" onSubmit={(event) => void handleSubmit(event)}>
          <label className="auth-field">
            <span>Email</span>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </label>

          <label className="auth-field">
            <span>Password</span>
            <input
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder="Your password"
              autoComplete="current-password"
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <div className="auth-actions">
            <button type="submit" className="auth-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Signing in...' : 'Sign in'}
            </button>
          </div>
        </form>

        <div className="auth-links mt-6">
          <Link to="/reset">Forgot password?</Link>
          <Link to="/signup">Create account</Link>
        </div>
      </section>
    </main>
  )
}
