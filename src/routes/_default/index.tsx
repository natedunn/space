import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useRef } from "react";
import { BentoGrid } from "../../components/BentoGrid";
import { Tilde, TildeWatermark } from "../../components/PixelNate";
import { ProjectsCarousel } from "../../components/ProjectsCarousel";

export const Route = createFileRoute("/_default/")({ component: HomePage });

const HERO_WORD_DELAYS = [0, 45, 90, 135, 190, 235, 280];

function HomePage() {
	const watermarkRef = useRef<SVGSVGElement>(null);

	useEffect(() => {
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			return;
		}

		const watermark = watermarkRef.current;
		if (!watermark) {
			return;
		}

		let frame = 0;

		const updateParallax = () => {
			const offset = Math.max(-10, Math.min(10, window.scrollY * 0.02));
			watermark.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`;
		};

		const onScroll = () => {
			cancelAnimationFrame(frame);
			frame = window.requestAnimationFrame(updateParallax);
		};

		updateParallax();
		window.addEventListener("scroll", onScroll, { passive: true });

		return () => {
			cancelAnimationFrame(frame);
			window.removeEventListener("scroll", onScroll);
		};
	}, []);

	return (
		<div className="flex flex-col overflow-x-clip">
			{/* <div className="mx-auto flex max-w-5xl w-full px-6 md:px-12 pt-10">
				<div
					aria-hidden="true"
					className="h-0.75 w-full text-foreground/40 bg-[repeating-linear-gradient(to_right,currentColor_0_14px,transparent_14px_26px)]"
				/>
			</div> */}
			<div className="relative mx-auto flex max-w-5xl flex-col gap-8 px-6 md:px-12 py-12 md:py-56 mt-12 md:mt-20">
				<header>
					<h1 className="relative text-3xl sm:text-4xl md:text-7xl font-semibold">
						<span
							className="hero-fade-word relative inline-block"
							style={{ animationDelay: `${HERO_WORD_DELAYS[0]}ms` }}
						>
							<span className="relative inline-block">
								<Tilde className="absolute -top-1 md:left-1.5 left-0.5 w-4 md:w-7.5 opacity-50" />
								n
							</span>
							ate
						</span>{" "}
						<span
							className="hero-fade-word inline-block"
							style={{ animationDelay: `${HERO_WORD_DELAYS[1]}ms` }}
						>
							is
						</span>{" "}
						<span
							className="hero-fade-word inline-block"
							style={{ animationDelay: `${HERO_WORD_DELAYS[2]}ms` }}
						>
							making
						</span>{" "}
						<span
							className="hero-fade-word inline-block"
							style={{ animationDelay: `${HERO_WORD_DELAYS[3]}ms` }}
						>
							things
						</span>{" "}
						<br />
						<span className="text-muted-foreground">
							<span
								className="hero-fade-word inline-block"
								style={{ animationDelay: `${HERO_WORD_DELAYS[4]}ms` }}
							>
								on
							</span>{" "}
							<span
								className="hero-fade-word inline-block"
								style={{ animationDelay: `${HERO_WORD_DELAYS[5]}ms` }}
							>
								the
							</span>{" "}
							<span
								className="hero-fade-word inline-block"
								style={{ animationDelay: `${HERO_WORD_DELAYS[6]}ms` }}
							>
								internet.
							</span>
						</span>
					</h1>
					<h2
						className="hero-fade-copy mt-6 text-lg md:text-2xl text-muted-foreground"
						style={{ animationDelay: "720ms" }}
					>
						full stack web developer making beautiful, performant, and
						accessible experiences.
					</h2>
				</header>
				<TildeWatermark
					ref={watermarkRef}
					className="hero-parallax absolute inset-x-0 inset-y-1/2 m-auto w-[80%] md:w-full text-foreground opacity-7 dark:opacity-5"
				/>
			</div>

			<div className="mt-28">
				<BentoGrid />
			</div>
			<ProjectsCarousel />
			<div className="max-w-5xl mx-auto h-250 w-full bg-muted">BLAH</div>
		</div>
	);
}
