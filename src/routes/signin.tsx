import {
  Link,
  createFileRoute,
  redirect,
  useNavigate,
  useRouter,
} from '@tanstack/react-router'
import { useState } from 'react'
import { authClient } from '../lib/auth-client'
import { Button } from '../components/ui/button'
import { Input } from '../components/ui/input'
import { Label } from '../components/ui/label'
import { FieldRoot } from '../components/ui/field'

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
    <main className="mx-auto flex max-w-sm flex-col px-4 pt-24 pb-16">
      <h1 className="text-2xl font-semibold text-foreground">Sign in</h1>
      <p className="mt-1 text-sm text-muted-foreground">
        Enter your credentials to access the CMS.
      </p>

      <form className="mt-8 space-y-4" onSubmit={(event) => void handleSubmit(event)}>
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
            placeholder="Your password"
            autoComplete="current-password"
            required
          />
        </FieldRoot>

        {error ? <p className="text-sm text-red-600">{error}</p> : null}

        <Button type="submit" className="w-full" disabled={status === 'loading'}>
          {status === 'loading' ? 'Signing in...' : 'Sign in'}
        </Button>
      </form>

      <div className="mt-6 flex items-center justify-between text-sm">
        <Link to="/reset" className="text-muted-foreground hover:text-foreground">
          Forgot password?
        </Link>
        <Link to="/signup" className="text-muted-foreground hover:text-foreground">
          Create account
        </Link>
      </div>
    </main>
  )
}
