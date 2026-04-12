import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<div className="mx-auto w-full max-w-5xl flex flex-col">
			<header className="py-48 flex flex-col gap-8">
				<h1 className="text-7xl font-semibold">
					Nate is making <br />
					things on the internet.
				</h1>
				<h2 className="text-2xl text-muted-foreground">
					Full stack web developer making beautiful, performant, and accessible
					experiences.
				</h2>
			</header>
			{/* boxes */}
			<div className="min-h-96 w-full bg-muted"></div>
		</div>
	);
}
