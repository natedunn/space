export default function Footer() {
  return (
    <footer className="mt-auto px-4 py-6">
      <div className="mx-auto max-w-5xl text-xs text-muted-foreground">
        &copy; {new Date().getFullYear()} nate.space
      </div>
    </footer>
  )
}
