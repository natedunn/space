import { useConvexMutation } from '@convex-dev/react-query'
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

const zenApi = ((api as unknown) as { zen: any }).zen

export const Route = createFileRoute('/signup')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/cms' })
    }
  },
  component: SignUpPage,
})

function SignUpPage() {
  const navigate = useNavigate()
  const signUp = useConvexMutation(zenApi.core.signUp)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'verify' | 'done'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setStatus('loading')

    try {
      const result = await signUp({
        email,
        password,
        name: name || undefined,
      })

      if ((result as { status?: string }).status === 'verification_required') {
        setStatus('verify')
        return
      }

      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not create account')
      setStatus('idle')
    }
  }

  if (status === 'verify') {
    return (
      <main className="page-wrap px-4 pb-16 pt-10">
        <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
          <p className="eyebrow mb-3">Account created</p>
          <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">
            Check your email
          </h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            A verification code was sent to <strong>{email}</strong>. In local dev it also
            appears in the Convex logs.
          </p>
          <div className="auth-actions mt-8">
            <button
              type="button"
              className="auth-primary"
              onClick={() => void navigate({ to: '/verify', search: { email } })}
            >
              Enter verification code
            </button>
            <button
              type="button"
              className="auth-secondary"
              onClick={() => void navigate({ to: '/signin' })}
            >
              Go to sign in
            </button>
          </div>
        </section>
      </main>
    )
  }

  if (status === 'done') {
    return (
      <main className="page-wrap px-4 pb-16 pt-10">
        <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
          <p className="eyebrow mb-3">Account created</p>
          <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">Ready to sign in</h1>
          <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
            Your account is available now.
          </p>
          <div className="auth-actions mt-8">
            <button
              type="button"
              className="auth-primary"
              onClick={() => void navigate({ to: '/signin' })}
            >
              Go to sign in
            </button>
          </div>
        </section>
      </main>
    )
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow mb-3">Auth</p>
        <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">Create account</h1>
        <p className="mt-4 max-w-xl text-sm leading-6 text-[var(--muted)]">
          Start with email and password, then move into the CMS.
        </p>

        <form className="auth-form mt-8" onSubmit={(event) => void handleSubmit(event)}>
          <label className="auth-field">
            <span>Name</span>
            <input
              type="text"
              value={name}
              onChange={(event) => setName(event.target.value)}
              placeholder="Your name"
              autoComplete="name"
            />
          </label>

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
              placeholder="At least 12 characters"
              autoComplete="new-password"
              minLength={12}
              required
            />
          </label>

          {error ? <p className="auth-error">{error}</p> : null}

          <div className="auth-actions">
            <button type="submit" className="auth-primary" disabled={status === 'loading'}>
              {status === 'loading' ? 'Creating...' : 'Create account'}
            </button>
          </div>
        </form>

        <div className="auth-links mt-6">
          <Link to="/signin">Already have an account?</Link>
        </div>
      </section>
    </main>
  )
}
