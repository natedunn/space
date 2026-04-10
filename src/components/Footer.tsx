export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="mt-20 border-t border-[var(--line)] px-4 pb-10 pt-8 text-[var(--muted)]">
      <div className="page-wrap flex flex-col gap-2 text-sm sm:flex-row sm:items-center sm:justify-between">
        <p className="m-0">&copy; {year} nate.space</p>
        <p className="m-0 uppercase tracking-[0.16em] text-[11px]">
          TanStack Start, Tailwind v4, Convex-ready
        </p>
      </div>
    </footer>
  )
}
