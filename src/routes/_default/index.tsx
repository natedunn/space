import { createFileRoute } from "@tanstack/react-router";
import { BentoGrid } from "../../components/BentoGrid";
import { Tilde, TildeWatermark } from "../../components/PixelNate";
import { ProjectsCarousel } from "../../components/ProjectsCarousel";

export const Route = createFileRoute("/_default/")({ component: HomePage });

function HomePage() {
	return (
		<div className="flex flex-col gap-48 overflow-x-clip">
			<header className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 md:px-12 pt-24 md:pt-48">
				<TildeWatermark className="absolute inset-x-0 top-24 bottom-0 m-auto w-[80%] md:w-full text-foreground opacity-5 md:top-48 dark:opacity-3" />
				<h1 className="relative text-3xl sm:text-4xl md:text-7xl font-semibold">
					<span className="relative inline-block">
						<Tilde className="absolute -top-1 md:left-1.5 left-0.5 w-4 md:w-7.5 opacity-50" />
						n
					</span>
					ate is <span className="">making things</span> <br />
					<span className="text-muted-foreground">on the internet.</span>
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
