import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/cms/")({
	component: CmsPage,
});

function CmsPage() {
	return (
		<main className="mx-auto max-w-5xl px-4 py-16">
			<h1 className="text-2xl font-semibold text-foreground">CMS</h1>
		</main>
	);
}
