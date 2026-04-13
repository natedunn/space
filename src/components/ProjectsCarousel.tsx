import {
	Asterisk,
	ChevronLeft,
	ChevronRight,
	Command,
	Compass,
	Grip,
	Hash,
	Plus,
} from "lucide-react";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type ComponentType,
} from "react";
import { useMenu } from "../lib/menu";
import { cn } from "../lib/utils";

// ---------------------------------------------------------------------------
// Data
// ---------------------------------------------------------------------------
interface Project {
	name: string;
	description: string;
	gradient: string;
	icon: ComponentType<{ className?: string; strokeWidth?: number }>;
}

const projects: Project[] = [
	{
		name: "Auralyx",
		description: "A headless CMS for modern development teams",
		gradient: "from-teal-400 via-emerald-300 to-cyan-200",
		icon: Hash,
	},
	{
		name: "Orbital",
		description: "Monitoring and observability for edge applications",
		gradient: "from-green-300 via-emerald-200 to-teal-100",
		icon: Grip,
	},
	{
		name: "Bloom",
		description: "Beautiful, accessible design system components",
		gradient: "from-violet-400 via-purple-300 to-fuchsia-200",
		icon: Asterisk,
	},
	{
		name: "Navyn",
		description: "A routing framework for complex single-page apps",
		gradient: "from-orange-400 via-amber-300 to-yellow-200",
		icon: Compass,
	},
	{
		name: "GetPlaneta",
		description: "Climate data analytics for the enterprise",
		gradient: "from-slate-700 via-slate-800 to-slate-900",
		icon: Command,
	},
	{
		name: "Soon",
		description: "An exciting new project in development",
		gradient: "from-neutral-800 to-neutral-900",
		icon: Plus,
	},
];

// ---------------------------------------------------------------------------
// Carousel
// ---------------------------------------------------------------------------
const CARD_GAP = 20; // gap-5 = 1.25rem = 20px

export function ProjectsCarousel() {
	const scrollRef = useRef<HTMLDivElement>(null);
	const { isOpen: menuOpen } = useMenu();
	const [canScrollLeft, setCanScrollLeft] = useState(false);
	const [canScrollRight, setCanScrollRight] = useState(true);

	const updateScrollState = useCallback(() => {
		const el = scrollRef.current;
		if (!el) return;
		setCanScrollLeft(el.scrollLeft > 1);
		setCanScrollRight(
			el.scrollLeft < el.scrollWidth - el.clientWidth - 1,
		);
	}, []);

	useEffect(() => {
		const el = scrollRef.current;
		if (!el) return;
		updateScrollState();
		el.addEventListener("scroll", updateScrollState, { passive: true });
		window.addEventListener("resize", updateScrollState);
		return () => {
			el.removeEventListener("scroll", updateScrollState);
			window.removeEventListener("resize", updateScrollState);
		};
	}, [updateScrollState]);

	const scroll = (direction: 1 | -1) => {
		const el = scrollRef.current;
		if (!el) return;
		const card = el.querySelector("[data-card]") as HTMLElement | null;
		const step = card ? card.offsetWidth + CARD_GAP : 308;
		el.scrollBy({ left: direction * step, behavior: "smooth" });
	};

	return (
		<section>
			{/* Header — contained inside max-w-5xl */}
			<div className="mx-auto mb-8 max-w-5xl px-12">
				<div className="flex items-end justify-between">
					<div>
						<h3 id="projects" className="text-2xl font-semibold">Projects</h3>
						<p className="mt-2 text-muted-foreground">
							A collection of recent and notable projects.
						</p>
					</div>

					{/* Step arrows */}
					<div className="flex gap-1">
						<button
							type="button"
							onClick={() => scroll(-1)}
							disabled={!canScrollLeft}
							aria-label="Previous projects"
							className={cn(
								"flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
								!canScrollLeft &&
									"pointer-events-none opacity-20",
							)}
						>
							<ChevronLeft className="h-4 w-4" />
						</button>
						<button
							type="button"
							onClick={() => scroll(1)}
							disabled={!canScrollRight}
							aria-label="Next projects"
							className={cn(
								"flex h-8 w-8 cursor-pointer items-center justify-center rounded-full text-muted-foreground transition-colors hover:text-foreground",
								!canScrollRight &&
									"pointer-events-none opacity-20",
							)}
						>
							<ChevronRight className="h-4 w-4" />
						</button>
					</div>
				</div>
			</div>

			{/* Scroll track — left edge aligned with container, overflows right */}
			<div className="relative">
				{/* Left fade */}
				<div
					className={cn(
						"pointer-events-none absolute -left-4 inset-y-0 z-10 w-64 transition-opacity duration-300",
						canScrollLeft ? "opacity-100" : "opacity-0",
					)}
					style={{
						background:
							"linear-gradient(to right, var(--background) 10%, color-mix(in srgb, var(--background) 80%, transparent) 30%, color-mix(in srgb, var(--background) 40%, transparent) 55%, color-mix(in srgb, var(--background) 10%, transparent) 80%, transparent)",
					}}
				/>

				{/* Right fade */}
				<div
					className={cn(
						"pointer-events-none absolute -right-4 inset-y-0 z-10 w-52 transition-opacity duration-300",
						canScrollRight ? "opacity-100" : "opacity-0",
					)}
					style={{
						background:
							"linear-gradient(to left, var(--background) 10%, color-mix(in srgb, var(--background) 80%, transparent) 30%, color-mix(in srgb, var(--background) 40%, transparent) 55%, color-mix(in srgb, var(--background) 10%, transparent) 80%, transparent)",
					}}
				/>

				<div
					ref={scrollRef}
					className="no-scrollbar flex gap-5 overflow-x-auto overflow-y-hidden snap-x snap-mandatory py-2 transition-[mask-image]"
					style={{
						paddingLeft:
							"max(3rem, calc((100vw - 64rem) / 2 + 3rem))",
						scrollPaddingLeft:
							"max(3rem, calc((100vw - 64rem) / 2 + 3rem))",
						paddingRight: "calc(100vw - 18rem)",
						...(menuOpen
							? {
									maskImage:
										"linear-gradient(to right, transparent 0px, black 24px)",
									WebkitMaskImage:
										"linear-gradient(to right, transparent 0px, black 24px)",
								}
							: {}),
					}}
				>
					{projects.map((project) => (
						<div
							key={project.name}
							data-card
							className="w-72 shrink-0 snap-start"
						>
							<ProjectCard {...project} />
						</div>
					))}
				</div>
			</div>
		</section>
	);
}

// ---------------------------------------------------------------------------
// Card
// ---------------------------------------------------------------------------
function ProjectCard({ name, description, gradient, icon: Icon }: Project) {
	return (
		<div
			className={cn(
				"group relative aspect-[3/4] w-full cursor-pointer overflow-hidden rounded-2xl bg-gradient-to-br transition-transform duration-300 ease-out hover:scale-[1.02]",
				gradient,
			)}
		>
			{/* Centred icon */}
			<div className="absolute inset-0 flex items-center justify-center">
				<Icon
					className="h-16 w-16 text-white/60 transition-all duration-300 group-hover:text-white/80"
					strokeWidth={1.5}
				/>
			</div>

			{/* Bottom text */}
			<div className="absolute inset-x-0 bottom-0 p-5">
				<h4 className="text-base font-semibold text-white">{name}</h4>
				<p className="mt-1 line-clamp-2 text-sm leading-snug text-white/60">
					{description}
				</p>
			</div>
		</div>
	);
}
