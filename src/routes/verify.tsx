import { useConvexMutation } from '@convex-dev/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

const zenApi = ((api as unknown) as { zen: any }).zen

export const Route = createFileRoute('/verify')({
  validateSearch: (search: Record<string, unknown>) => ({
    email: typeof search.email === 'string' ? search.email : '',
  }),
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/cms' })
    }
  },
  component: VerifyPage,
})

function VerifyPage() {
  const navigate = useNavigate()
  const { email } = Route.useSearch()
  const verifyEmail = useConvexMutation(zenApi.core.verifyEmail)
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'done'>('idle')

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')
    setStatus('loading')

    try {
      await verifyEmail({ email, code })
      setStatus('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not verify email')
      setStatus('idle')
    }
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow mb-3">Verification</p>
        <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">Verify email</h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Enter the code sent to <strong>{email || 'your inbox'}</strong>.
        </p>

        {status === 'done' ? (
          <div className="auth-actions mt-8">
            <button
              type="button"
              className="auth-primary"
              onClick={() => void navigate({ to: '/signin' })}
            >
              Continue to sign in
            </button>
          </div>
        ) : (
          <form className="auth-form mt-8" onSubmit={(event) => void handleSubmit(event)}>
            <label className="auth-field">
              <span>Verification code</span>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="123456"
                required
              />
            </label>

            {error ? <p className="auth-error">{error}</p> : null}

            <div className="auth-actions">
              <button type="submit" className="auth-primary" disabled={status === 'loading'}>
                {status === 'loading' ? 'Verifying...' : 'Verify email'}
              </button>
            </div>
          </form>
        )}
      </section>
    </main>
  )
}
