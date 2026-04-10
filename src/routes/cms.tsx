import { createFileRoute, redirect } from '@tanstack/react-router'
import { useSession } from 'convex-zen/react'

export const Route = createFileRoute('/cms')({
  beforeLoad: ({ context }) => {
    if (!context.isAuthenticated) {
      throw redirect({ to: '/signin' })
    }
  },
  component: CmsRoute,
})

const collections = [
  ['Pages', 'Homepage, about, now, and other durable top-level documents.'],
  ['Writing', 'Essays and notes with status, slug, publish date, and rich body content.'],
  ['Projects', 'Structured case studies with links, roles, timeline, and media.'],
  ['Navigation', 'Menus, featured blocks, and homepage modules editable outside code.'],
]

const workflow = [
  'Run `npx convex dev` to create the deployment, `.env.local`, and generated client code.',
  'Define schema tables and indexes for documents, collections, and publishing status.',
  'Add Convex queries and mutations for listing, editing, and publishing entries.',
  'Build a protected authoring UI on this route against those queries and mutations.',
]

function CmsRoute() {
  const { session } = useSession()
  const convexUrl = import.meta.env.VITE_CONVEX_URL
  const isConnected = typeof convexUrl === 'string' && convexUrl.length > 0

  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="panel rounded-[2rem] px-6 py-8 sm:px-10 sm:py-10">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow mb-3">CMS workspace</p>
            <h1 className="display-title text-5xl leading-[0.96] sm:text-6xl">
              Authoring surface for the personal site.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-[var(--muted)]">
              This route is the control room. It currently documents the content
              model and bootstrap sequence so we can turn it into a real editor
              once Convex is connected.
            </p>
            <p className="mt-4 text-sm font-medium text-[var(--ink)]">
              Signed in as {session?.userId ?? 'authenticated user'}.
            </p>
          </div>

          <div className="rounded-[1.5rem] border border-[var(--line)] bg-white/70 px-4 py-3 text-sm text-[var(--muted)]">
            <span className="mr-2 inline-block h-2.5 w-2.5 rounded-full bg-[var(--accent-cool)] align-middle" />
            {isConnected ? 'Convex URL detected' : 'Waiting for Convex deployment'}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1.05fr)_minmax(20rem,0.95fr)]">
        <div className="panel rounded-[1.75rem] p-6 sm:p-8">
          <p className="eyebrow mb-4">Planned collections</p>
          <div className="grid gap-4 md:grid-cols-2">
            {collections.map(([name, detail]) => (
              <article
                key={name}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white/65 p-5"
              >
                <p className="m-0 text-lg font-semibold text-[var(--ink)]">
                  {name}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {detail}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div className="grid gap-4">
          <section className="panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="eyebrow mb-4">Bootstrap sequence</p>
            <ol className="m-0 space-y-3 pl-5 text-sm leading-6 text-[var(--muted)]">
              {workflow.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </section>

          <section className="panel rounded-[1.75rem] p-6 sm:p-8">
            <p className="eyebrow mb-4">Backend files now in place</p>
            <pre className="overflow-x-auto text-sm text-[var(--ink)]">
              <code>{`convex/
  schema.ts
  site.ts
  documents.ts
  _generated/  # created by npx convex dev`}</code>
            </pre>
          </section>
        </div>
      </section>
    </main>
  )
}
