import { createFileRoute } from "@tanstack/react-router";
import { BentoGrid } from "../components/BentoGrid";
import { ProjectsCarousel } from "../components/ProjectsCarousel";

export const Route = createFileRoute("/")({ component: HomePage });

function HomePage() {
	return (
		<div className="flex flex-col gap-24 overflow-x-hidden">
			<header className="mx-auto flex max-w-5xl flex-col gap-8 px-12 pt-24 md:pt-48">
				<h1 className="text-3xl sm:text-4xl md:text-7xl font-semibold">
					nate is <span className="text-muted-foreground">making things</span>{" "}
					<br />
					on the internet.
				</h1>
				<h2 className="text-lg md:text-2xl text-muted-foreground">
					full stack web developer making beautiful, performant, and accessible
					experiences.
				</h2>
			</header>

			<BentoGrid />
			<ProjectsCarousel />
			<div className="h-250 w-full bg-muted">BLAH</div>
		</div>
	);
}
