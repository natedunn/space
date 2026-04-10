import { Link, createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({ component: App })

const surfaces = [
  {
    name: 'Writing',
    summary: 'Long-form essays, field notes, and drafts with enough structure to evolve.',
  },
  {
    name: 'Projects',
    summary: 'Case studies, experiments, and build logs that can later pull from live CMS entries.',
  },
  {
    name: 'Signals',
    summary: 'Short updates, saved links, and small observations that should be cheap to publish.',
  },
]

const milestones = [
  'Convex client and React Query are wired into the app shell.',
  'A dedicated CMS route defines the editor-facing surface we can grow into.',
  'The next backend pass can focus on schema, documents, and publishing workflows.',
]

function App() {
  return (
    <main className="page-wrap px-4 pb-16 pt-10">
      <section className="panel fade-up relative overflow-hidden rounded-[2rem] px-6 py-8 sm:px-10 sm:py-12">
        <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,var(--line-strong),transparent)]" />
        <div className="absolute -right-20 -top-16 h-56 w-56 rounded-full bg-[radial-gradient(circle,rgba(255,106,61,0.24),transparent_68%)]" />
        <div className="absolute bottom-0 left-0 h-40 w-40 rounded-full bg-[radial-gradient(circle,rgba(13,124,134,0.18),transparent_70%)]" />

        <div className="relative grid gap-10 lg:grid-cols-[minmax(0,1.4fr)_minmax(19rem,0.85fr)]">
          <div>
            <p className="eyebrow mb-4">Personal publishing system</p>
            <h1 className="display-title max-w-4xl text-5xl leading-[0.95] sm:text-7xl">
              Rebuilding <span className="text-[var(--accent)]">nate.space</span>{' '}
              as a site with a CMS, not a starter template.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-[var(--muted)] sm:text-lg">
              The old demo content is gone. This shell is now oriented around a
              personal site that can publish writing, projects, notes, and
              structured content from Convex.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                to="/cms"
                className="inline-flex items-center justify-center rounded-full bg-[var(--ink)] px-5 py-3 text-sm font-semibold text-white no-underline transition hover:-translate-y-0.5 hover:bg-[var(--accent)]"
              >
                Open CMS plan
              </Link>
              <a
                href="https://docs.convex.dev/quickstart/tanstack-start"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--line-strong)] bg-[color:var(--panel-strong)] px-5 py-3 text-sm font-semibold text-[var(--ink)] no-underline transition hover:-translate-y-0.5 hover:border-[var(--accent)]"
              >
                Convex quickstart
              </a>
            </div>
          </div>

          <div className="panel-grid self-start rounded-[1.5rem] border border-[var(--line)] bg-[color:var(--panel-strong)] p-5">
            <div className="space-y-2">
              <p className="eyebrow">Build status</p>
              <p className="m-0 text-3xl font-semibold text-[var(--ink)]">
                Tailwind v4 active
              </p>
              <p className="m-0 text-sm leading-6 text-[var(--muted)]">
                Convex is installed and the app shell is ready to accept the
                deployment URL once you run <code>npx convex dev</code>.
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              {[
                ['Frontend shell', 'Replaced starter sections with a publishing-focused layout.'],
                ['Data layer', 'Router context and React Query are prepared for Convex-backed content.'],
                ['CMS direction', 'A dedicated route now outlines collections and workflow decisions.'],
              ].map(([title, detail]) => (
                <div
                  key={title}
                  className="rounded-[1.25rem] border border-[var(--line)] bg-white/60 p-4"
                >
                  <p className="m-0 text-sm font-semibold text-[var(--ink)]">
                    {title}
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                    {detail}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-4 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
        <div className="panel rounded-[1.75rem] p-6 sm:p-8">
          <p className="eyebrow mb-4">Publishing surfaces</p>
          <div className="grid gap-4 md:grid-cols-3">
            {surfaces.map((surface, index) => (
              <article
                key={surface.name}
                className="rounded-[1.5rem] border border-[var(--line)] bg-white/65 p-5 fade-up"
                style={{ animationDelay: `${index * 90 + 60}ms` }}
              >
                <p className="m-0 text-lg font-semibold text-[var(--ink)]">
                  {surface.name}
                </p>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {surface.summary}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 rounded-[1.5rem] border border-dashed border-[var(--line-strong)] bg-[var(--paper)] p-5">
            <p className="eyebrow mb-3">Implementation milestones</p>
            <ul className="m-0 space-y-3 pl-5 text-sm leading-6 text-[var(--muted)]">
              {milestones.map((milestone) => (
                <li key={milestone}>{milestone}</li>
              ))}
            </ul>
          </div>
        </div>

        <aside className="panel rounded-[1.75rem] p-6 sm:p-8">
          <p className="eyebrow mb-4">Next pass</p>
          <div className="space-y-4 text-sm leading-6 text-[var(--muted)]">
            <p className="m-0">
              After you connect Convex, the next concrete step is to define
              content tables for documents, collections, and navigation.
            </p>
            <p className="m-0">
              That gives us a real backend to power both the public site and the
              CMS authoring interface from the same source of truth.
            </p>
          </div>
          <div className="mt-6 rounded-[1.5rem] border border-[var(--line)] bg-white/70 p-4">
            <p className="m-0 text-xs font-semibold tracking-[0.14em] uppercase text-[var(--muted)]">
              Command you’ll run
            </p>
            <pre className="mt-3 overflow-x-auto text-sm text-[var(--ink)]">
              <code>npx convex dev</code>
            </pre>
          </div>
        </aside>
      </section>
    </main>
  )
}
