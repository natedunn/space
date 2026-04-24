import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/cms/book/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/cms/book/"!</div>
}
