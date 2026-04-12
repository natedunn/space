import { useConvexMutation } from '@convex-dev/react-query'
import { Link, createFileRoute, redirect } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { FieldRoot } from '../components/ui/field'

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
    <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
      <h1 className="text-2xl font-semibold text-foreground">Reset password</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        {step === 'request'
          ? 'Enter your email to receive a reset code.'
          : step === 'reset'
            ? 'Enter the code and your new password.'
            : 'Your password has been reset.'}
      </p>

      {step === 'request' ? (
        <form className="mt-8 space-y-4" onSubmit={(event) => void handleRequestReset(event)}>
          <FieldRoot>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </FieldRoot>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full">
            Send reset code
          </Button>
        </form>
      ) : null}

      {step === 'reset' ? (
        <form className="mt-8 space-y-4" onSubmit={(event) => void handleResetPassword(event)}>
          <FieldRoot>
            <Label>Email</Label>
            <Input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              required
            />
          </FieldRoot>

          <FieldRoot>
            <Label>Reset code</Label>
            <Input
              type="text"
              value={code}
              onChange={(event) => setCode(event.target.value)}
              placeholder="123456"
              required
            />
          </FieldRoot>

          <FieldRoot>
            <Label>New password</Label>
            <Input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder="At least 12 characters"
              minLength={12}
              required
            />
          </FieldRoot>

          {error ? <p className="text-sm text-red-600">{error}</p> : null}

          <Button type="submit" className="w-full">
            Set new password
          </Button>
        </form>
      ) : null}

      {step === 'done' ? (
        <div className="mt-8">
          <Button className="w-full" render={<Link to="/signin" />}>
            Return to sign in
          </Button>
        </div>
      ) : null}
    </main>
  )
}
