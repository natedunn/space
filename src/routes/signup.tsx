import { useConvexMutation } from '@convex-dev/react-query'
import { Link, createFileRoute, redirect, useNavigate } from '@tanstack/react-router'
import { useState } from 'react'
import { api } from '../../convex/_generated/api'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { FieldRoot } from '../components/ui/field'

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
      <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
        <h1 className="text-2xl font-semibold text-foreground">Check your email</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          A verification code was sent to <strong>{email}</strong>.
        </p>
        <div className="mt-8 flex flex-col gap-2">
          <Button onClick={() => void navigate({ to: '/verify', search: { email } })}>
            Enter verification code
          </Button>
          <Button variant="secondary" onClick={() => void navigate({ to: '/signin' })}>
            Go to sign in
          </Button>
        </div>
      </main>
    )
  }

  if (status === 'done') {
    return (
      <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
        <h1 className="text-2xl font-semibold text-foreground">Account created</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Your account is ready. Sign in to get started.
        </p>
        <div className="mt-8">
          <Button className="w-full" onClick={() => void navigate({ to: '/signin' })}>
            Go to sign in
          </Button>
        </div>
      </main>
    )
  }

  return (
    <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
      <h1 className="text-2xl font-semibold text-foreground">Create account</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Sign up with email and password.
      </p>

      <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
        <FieldRoot>
          <Label>Name</Label>
          <Input
            type="text"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            autoComplete="name"
          />
        </FieldRoot>

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

        <FieldRoot>
          <Label>Password</Label>
          <Input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="At least 12 characters"
            autoComplete="new-password"
            minLength={12}
            required
          />
        </FieldRoot>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Creating...' : 'Create account'}
        </Button>
      </form>

      <div className="mt-6 text-center text-sm">
        <Link to="/signin" className="text-muted-foreground hover:text-foreground">
          Already have an account?
        </Link>
      </div>
    </main>
  )
}
