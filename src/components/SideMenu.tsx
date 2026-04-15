import { Link, useLocation, useNavigate } from "@tanstack/react-router";
import { Command, X } from "lucide-react";
import { useEffect, useRef, type ReactNode } from "react";
import { useMenu, scrollToHash } from "../lib/menu";
import { getItems } from "../lib/registry";
import { cn } from "../lib/utils";
import { ThemeToggle } from "./ThemeToggle";

const EASE = "ease-[cubic-bezier(0.32,0.72,0,1)]";
const DURATION = "duration-500";

// ---------------------------------------------------------------------------
// Hamburger button — sticky, lives INSIDE the content flow
// ---------------------------------------------------------------------------
export function MenuButton() {
	const { toggle } = useMenu();

	// Cmd+\ (or Ctrl+\ on non-Mac) toggles the menu
	useEffect(() => {
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "\\" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				toggle();
			}
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [toggle]);

	return (
		<div className="pointer-events-none sticky top-4 z-[100] mx-auto w-full max-w-5xl px-4 xl:px-0">
			<div className="xl:-ml-14">
				<button
					type="button"
					onClick={toggle}
					aria-label="Open menu"
					className="pointer-events-auto flex h-10 w-10 cursor-pointer flex-col items-start justify-center gap-1 rounded-lg bg-background/70 pl-2.5 backdrop-blur-sm transition-colors hover:bg-accent/80"
				>
					<span className="h-[2px] w-5 rounded-full bg-foreground" />
					<span className="h-[2px] w-3.5 rounded-full bg-foreground" />
					<span className="h-[2px] w-2 rounded-full bg-foreground" />
				</button>
			</div>
		</div>
	);
}

// ---------------------------------------------------------------------------
// Slide-out panel + backdrop + close button
// ---------------------------------------------------------------------------
const navItems = getItems("mainNav");
const sectionLinks = getItems("sectionNav");

export function MenuPanel() {
	const { isOpen, close } = useMenu();
	const location = useLocation();
	const navigate = useNavigate();
	const shelfRef = useRef<HTMLDivElement>(null);

	// Kill transition during resize so the shelf width follows instantly
	useEffect(() => {
		let timer: ReturnType<typeof setTimeout>;
		const onResize = () => {
			shelfRef.current?.classList.add("!transition-none");
			clearTimeout(timer);
			timer = setTimeout(() => {
				shelfRef.current?.classList.remove("!transition-none");
			}, 150);
		};
		window.addEventListener("resize", onResize);
		return () => {
			window.removeEventListener("resize", onResize);
			clearTimeout(timer);
		};
	}, []);

	const goToSection = (hash: string) => {
		close();
		scrollToHash(hash, location.pathname, navigate);
	};

	// Build a flat stagger index across all items
	let staggerIndex = 0;

	return (
		<>
			{/* ---- backdrop with dither ---- */}
			<div
				className={cn(
					"bg-halftone fixed inset-0 z-30 transition-opacity",
					DURATION,
					EASE,
					isOpen ? "opacity-60" : "pointer-events-none opacity-0",
				)}
				onClick={close}
				aria-hidden="true"
			/>

			{/* ---- left shelf — covers clip artifacts ---- */}
			<div
				ref={shelfRef}
				className={cn(
					"fixed inset-y-0 left-0 z-30 border-r transition-all",
					DURATION,
					EASE,
					isOpen
						? "translate-x-0 border-white/[0.06] bg-background shadow-[4px_0_24px_rgba(0,0,0,0.1)] dark:shadow-[4px_0_24px_rgba(0,0,0,0.4)]"
						: "pointer-events-none -translate-x-48 border-transparent bg-transparent shadow-none",
				)}
				style={{
					width: "max(12rem, calc((100vw - 64rem) / 2 + 12rem))",
				}}
				aria-hidden="true"
			/>

			{/* ---- fixed panel with X close + nav ---- */}
			<div className="pointer-events-none fixed inset-x-0 top-0 z-50">
				<div className="mx-auto w-full max-w-5xl px-4 xl:px-0">
					<div className="xl:-ml-14">
						{/* X close button */}
						<button
							type="button"
							onClick={close}
							aria-label="Close menu"
							className={cn(
								"pointer-events-auto mt-4 flex h-10 w-10 cursor-pointer items-center justify-center rounded-lg transition-all hover:bg-accent/80",
								DURATION,
								EASE,
								isOpen
									? "scale-100 opacity-100"
									: "pointer-events-none scale-75 opacity-0",
							)}
						>
							<X className="h-5 w-5 text-foreground" strokeWidth={2.5} />
						</button>

						{/* Shortcut hint */}
						<span
							className={cn(
								"pointer-events-none mt-2 inline-flex items-center gap-1.5 text-xs text-muted-foreground transition-all",
								DURATION,
								EASE,
								isOpen
									? "translate-x-0 opacity-60"
									: "-translate-x-2 opacity-0",
							)}
						>
							<kbd className="inline-flex items-center gap-1 rounded border border-foreground/30 bg-muted px-1.5 py-0.5 text-foreground">
								<Command className="h-2.5 w-2.5" />
								<span className="font-mono text-[10px]">\</span>
							</kbd>
							<span>to toggle</span>
						</span>

						<nav
							aria-label="Main navigation"
							className={cn(
								"pointer-events-auto mt-6 flex max-w-[10rem] flex-col gap-3 transition-all",
								DURATION,
								EASE,
								isOpen
									? "translate-x-0 opacity-100"
									: "-translate-x-3 opacity-0 pointer-events-none",
							)}
						>
							{navItems.map((item) => {
								const itemIdx = staggerIndex++;
								const isHome = item.to === "/";
								return (
									<div
										key={item.id}
										className="flex flex-col gap-2"
									>
										<Link
											to={item.to!}
											onClick={close}
											className={cn(
												"text-2xl font-medium text-muted-foreground decoration-foreground/30 underline-offset-4 transition-all hover:text-foreground hover:underline",
												DURATION,
												EASE,
												isOpen
													? "translate-x-0 opacity-100"
													: "-translate-x-2 opacity-0",
											)}
											style={{
												transitionDelay: isOpen
													? `${100 + itemIdx * 60}ms`
													: "0ms",
											}}
											activeProps={{
												className: "text-foreground",
											}}
										>
											{item.label}
										</Link>

										{isHome &&
											sectionLinks.length > 0 && (
												<div className="flex flex-col gap-1.5 pl-3">
													{sectionLinks.map(
														(section) => {
															const secIdx =
																staggerIndex++;
															return (
																<button
																	key={section.id}
																	type="button"
																	onClick={() =>
																		goToSection(section.hash!)
																	}
																	className={cn(
																		"cursor-pointer text-left text-sm text-muted-foreground decoration-foreground/30 underline-offset-4 transition-all hover:text-foreground hover:underline",
																		DURATION,
																		EASE,
																		isOpen
																			? "translate-x-0 opacity-100"
																			: "-translate-x-2 opacity-0",
																	)}
																	style={{
																		transitionDelay: isOpen
																			? `${100 + secIdx * 60}ms`
																			: "0ms",
																	}}
																>
																	{section.label}
																</button>
															);
														},
													)}
												</div>
											)}
									</div>
								);
							})}

							{/* theme toggle */}
							<div
								className={cn(
									"relative z-50 pt-1 transition-all",
									DURATION,
									EASE,
									isOpen
										? "translate-x-0 opacity-100"
										: "-translate-x-2 opacity-0",
								)}
								style={{
									transitionDelay: isOpen
										? `${100 + staggerIndex * 60}ms`
										: "0ms",
								}}
							>
								<ThemeToggle />
							</div>
						</nav>
					</div>
				</div>
			</div>
		</>
	);
}

// ---------------------------------------------------------------------------
// Content wrapper – shifts right & dims when menu is open
// ---------------------------------------------------------------------------
export function MenuContentWrapper({ children }: { children: ReactNode }) {
	const { isOpen, commandOpen } = useMenu();

	return (
		<div
			className={cn(
				"relative flex min-h-screen flex-col transition-all",
				DURATION,
				EASE,
				isOpen
					? "translate-x-48 opacity-50 grayscale"
					: commandOpen
						? "grayscale"
						: "translate-x-0 scale-100 opacity-100 grayscale-0",
			)}
		>
			{children}
		</div>
	);
}
