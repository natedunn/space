import { useConvexMutation } from '@convex-dev/react-query'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'

const zenApi = ((api as unknown) as { zen: any }).zen

export const Route = createFileRoute('/reset')({
  beforeLoad: ({ context }) => {
    if (context.isAuthenticated) {
      throw redirect({ to: '/cms' })
    }
  },
  component: ResetPage,
})

function ResetPage() {
  const requestPasswordReset = useConvexMutation(zenApi.core.requestPasswordReset)
  const resetPassword = useConvexMutation(zenApi.core.resetPassword)

  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [step, setStep] = useState<'request' | 'reset' | 'done'>('request')
  const [error, setError] = useState('')

  async function handleRequestReset(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      await requestPasswordReset({ email })
      setStep('reset')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not send reset email')
    }
  }

  async function handleResetPassword(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError('')

    try {
      await resetPassword({ email, code, newPassword })
      setStep('done')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Could not reset password')
    }
  }

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="auth-shell panel rounded-[2rem] p-6 sm:p-8">
        <p className="eyebrow mb-3">Recovery</p>
        <h1 className="display-title text-4xl leading-[0.96] sm:text-5xl">
          Reset password
        </h1>
        <p className="mt-4 text-sm leading-6 text-[var(--muted)]">
          Request a reset code, then set a new password.
        </p>

        {step === 'request' ? (
          <form className="auth-form mt-8" onSubmit={(event) => void handleRequestReset(event)}>
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

            {error ? <p className="auth-error">{error}</p> : null}

            <div className="auth-actions">
              <button type="submit" className="auth-primary">
                Send reset code
              </button>
            </div>
          </form>
        ) : null}

        {step === 'reset' ? (
          <form className="auth-form mt-8" onSubmit={(event) => void handleResetPassword(event)}>
            <label className="auth-field">
              <span>Email</span>
              <input
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </label>

            <label className="auth-field">
              <span>Reset code</span>
              <input
                type="text"
                value={code}
                onChange={(event) => setCode(event.target.value)}
                placeholder="123456"
                required
              />
            </label>

            <label className="auth-field">
              <span>New password</span>
              <input
                type="password"
                value={newPassword}
                onChange={(event) => setNewPassword(event.target.value)}
                placeholder="At least 12 characters"
                minLength={12}
                required
              />
            </label>

            {error ? <p className="auth-error">{error}</p> : null}

            <div className="auth-actions">
              <button type="submit" className="auth-primary">
                Set new password
              </button>
            </div>
          </form>
        ) : null}

        {step === 'done' ? (
          <div className="auth-actions mt-8">
            <Link className="auth-primary" to="/signin">
              Return to sign in
            </Link>
          </div>
        ) : null}
      </section>
    </main>
  )
}
