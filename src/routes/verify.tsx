import { useConvexMutation } from '@convex-dev/react-query'
import { createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { FieldRoot } from '../components/ui/field'

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

  if (status === 'done') {
    return (
      <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
        <h1 className="text-2xl font-semibold text-foreground">Email verified</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          You can now sign in to your account.
        </p>
        <div className="mt-8">
          <Button className="w-full" onClick={() => void navigate({ to: '/signin' })}>
            Continue to sign in
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
      <h1 className="text-2xl font-semibold text-foreground">Verify email</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter the code sent to <strong>{email || 'your inbox'}</strong>.
      </p>

      <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <FieldRoot>
          <Label>Verification code</Label>
          <Input
            type="text"
            value={code}
            onChange={(event) => setCode(event.target.value)}
            placeholder="123456"
            required
          />
        </FieldRoot>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Verifying...' : 'Verify email'}
        </Button>
      </form>
    </main>
  )
}
