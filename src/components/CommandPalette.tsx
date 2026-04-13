import { Dialog } from "@base-ui/react/dialog";
import { useLocation, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeft,
	ArrowRight,
	Check,
	Monitor,
	Moon,
	Search,
	Sun,
} from "lucide-react";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useMenu, scrollToHash } from "../lib/menu";
import { getItems, type RegistryItem } from "../lib/registry";
import { useTheme } from "../lib/theme";
import { cn } from "../lib/utils";

// ---------------------------------------------------------------------------
// Theme sub-context options
// ---------------------------------------------------------------------------
const themeOptions = [
	{ id: "light" as const, label: "Light", icon: Sun },
	{ id: "dark" as const, label: "Dark", icon: Moon },
	{ id: "system" as const, label: "System", icon: Monitor },
];

type ThemeOption = (typeof themeOptions)[number];

const GROUP_LABELS: Record<string, string> = {
	navigation: "Go to",
	sections: "Sections",
	actions: "Actions",
};

// ---------------------------------------------------------------------------
// Component
// ---------------------------------------------------------------------------
export function CommandPalette() {
	const [open, setOpen] = useState(false);
	const [search, setSearch] = useState("");
	const [context, setContext] = useState<"root" | "theme">("root");
	const [selectedIndex, setSelectedIndex] = useState(0);
	const inputRef = useRef<HTMLInputElement>(null);
	const listRef = useRef<HTMLDivElement>(null);

	const navigate = useNavigate();
	const location = useLocation();
	const { toggle: toggleMenu, close: closeMenu, setCommandOpen } = useMenu();
	const { theme, setTheme } = useTheme();

	// ── Cmd+K global listener ───────────────────────────────────────────
	useEffect(() => {
		const handler = (e: KeyboardEvent) => {
			if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
				e.preventDefault();
				setOpen((prev) => !prev);
			}
		};
		document.addEventListener("keydown", handler);
		return () => document.removeEventListener("keydown", handler);
	}, []);

	// ── Sync command open state to context ──────────────────────────────
	useEffect(() => {
		setCommandOpen(open);
	}, [open, setCommandOpen]);

	// ── Reset on open ───────────────────────────────────────────────────
	useEffect(() => {
		if (open) {
			setSearch("");
			setContext("root");
			setSelectedIndex(0);
			closeMenu();
		}
	}, [open, closeMenu]);

	// ── Filtered items ──────────────────────────────────────────────────
	const commandItems = useMemo(() => getItems("command"), []);

	const filteredItems = useMemo(() => {
		if (context !== "root") return [];
		if (!search) return commandItems;
		const q = search.toLowerCase();
		return commandItems.filter((item) =>
			item.label.toLowerCase().includes(q),
		);
	}, [search, context, commandItems]);

	const filteredThemeOptions = useMemo(() => {
		if (context !== "theme") return [];
		if (!search) return [...themeOptions];
		const q = search.toLowerCase();
		return themeOptions.filter((opt) =>
			opt.label.toLowerCase().includes(q),
		);
	}, [search, context]);

	// Flat list for keyboard nav
	const flatItems: (RegistryItem | ThemeOption)[] =
		context === "root" ? filteredItems : filteredThemeOptions;

	// Clamp selected index when list shrinks
	useEffect(() => {
		setSelectedIndex((prev) =>
			Math.min(prev, Math.max(0, flatItems.length - 1)),
		);
	}, [flatItems.length]);

	// Scroll selected item into view
	useEffect(() => {
		const el = listRef.current?.querySelector("[data-selected]");
		el?.scrollIntoView({ block: "nearest" });
	}, [selectedIndex]);

	// ── Grouped items for root context ──────────────────────────────────
	const groupedItems = useMemo(() => {
		if (context !== "root") return null;
		const groups: Record<string, RegistryItem[]> = {};
		for (const item of filteredItems) {
			if (!groups[item.group]) groups[item.group] = [];
			groups[item.group].push(item);
		}
		return groups;
	}, [filteredItems, context]);

	// ── Execute ─────────────────────────────────────────────────────────
	const executeItem = useCallback(
		(item: RegistryItem | ThemeOption) => {
			if ("to" in item && item.to) {
				setOpen(false);
				void navigate({ to: item.to });
			} else if ("hash" in item && item.hash) {
				setOpen(false);
				scrollToHash(item.hash, location.pathname, navigate);
			} else if ("action" in item && item.action === "theme") {
				setContext("theme");
				setSearch("");
				setSelectedIndex(0);
			} else if ("action" in item && item.action === "menu-toggle") {
				setOpen(false);
				requestAnimationFrame(() => toggleMenu());
			} else if ("id" in item && !("group" in item)) {
				// Theme option
				setTheme(
					(item as ThemeOption).id as "light" | "dark" | "system",
				);
				setOpen(false);
			}
		},
		[navigate, location.pathname, toggleMenu, setTheme],
	);

	// ── Keyboard navigation ─────────────────────────────────────────────
	const handleKeyDown = useCallback(
		(e: React.KeyboardEvent) => {
			switch (e.key) {
				case "ArrowDown":
					e.preventDefault();
					setSelectedIndex((prev) =>
						Math.min(prev + 1, flatItems.length - 1),
					);
					break;
				case "ArrowUp":
					e.preventDefault();
					setSelectedIndex((prev) => Math.max(prev - 1, 0));
					break;
				case "Enter":
					e.preventDefault();
					if (flatItems[selectedIndex]) {
						executeItem(flatItems[selectedIndex]);
					}
					break;
				case "Escape":
					if (context !== "root") {
						e.preventDefault();
						e.stopPropagation();
						setContext("root");
						setSearch("");
						setSelectedIndex(0);
					}
					// At root → let Dialog handle close
					break;
			}
		},
		[flatItems, selectedIndex, context, executeItem],
	);

	// ── Back to root helper ─────────────────────────────────────────────
	const goBack = () => {
		setContext("root");
		setSearch("");
		setSelectedIndex(0);
		inputRef.current?.focus();
	};

	// ── Render ──────────────────────────────────────────────────────────
	return (
		<Dialog.Root open={open} onOpenChange={setOpen} modal>
			<Dialog.Portal>
				<Dialog.Backdrop
					className={cn(
						"fixed inset-0 z-[60]",
						"transition-opacity data-[ending-style]:opacity-0 data-[starting-style]:opacity-0",
					)}
				>
					{/* Dark tint layer */}
					<div className="absolute inset-0 bg-black/50" />
					{/* Halftone layer on top */}
					<div className="bg-halftone absolute inset-0 opacity-80" />
				</Dialog.Backdrop>
				<Dialog.Popup
					className={cn(
						"fixed inset-x-4 top-[20%] z-[60] mx-auto w-full max-w-lg overflow-hidden rounded-2xl border border-border/60 bg-popover shadow-2xl outline-none",
						"origin-[var(--transform-origin)] transition-[transform,scale,opacity] data-[ending-style]:scale-95 data-[ending-style]:opacity-0 data-[starting-style]:scale-95 data-[starting-style]:opacity-0",
					)}
				>
					{/* ── Input bar ─────────────────────────────────── */}
					<div className="flex items-center gap-3 border-b border-border/50 px-4">
						{context === "theme" ? (
							<button
								type="button"
								onClick={goBack}
								className="flex cursor-pointer items-center text-muted-foreground transition-colors hover:text-foreground"
							>
								<ArrowLeft className="h-4 w-4" />
							</button>
						) : (
							<Search className="h-4 w-4 shrink-0 text-muted-foreground" />
						)}
						<input
							ref={inputRef}
							value={search}
							onChange={(e) => {
								setSearch(e.target.value);
								setSelectedIndex(0);
							}}
							onKeyDown={handleKeyDown}
							placeholder={
								context === "theme"
									? "Select a theme\u2026"
									: "Type a command\u2026"
							}
							className="h-12 w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
						/>
						<kbd className="shrink-0 rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
							ESC
						</kbd>
					</div>

					{/* ── Results ───────────────────────────────────── */}
					<div
						ref={listRef}
						className="max-h-72 overflow-y-auto p-2"
					>
						{/* Root context — grouped */}
						{context === "root" &&
							groupedItems &&
							Object.entries(groupedItems).map(
								([groupKey, items]) => (
									<div key={groupKey} className="mb-1">
										<p className="px-2 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
											{GROUP_LABELS[groupKey] ?? groupKey}
										</p>
										{items.map((item) => {
											const idx =
												filteredItems.indexOf(item);
											return (
												<button
													key={item.id}
													type="button"
													onClick={() =>
														executeItem(item)
													}
													onMouseEnter={() =>
														setSelectedIndex(idx)
													}
													data-selected={
														idx === selectedIndex ||
														undefined
													}
													className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground outline-none transition-colors data-[selected]:bg-accent"
												>
													<span className="flex-1 text-left">
														{item.label}
													</span>
													{item.action ===
														"theme" && (
														<ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
													)}
													{item.shortcut && (
														<kbd className="rounded border border-border/60 px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
															{item.shortcut}
														</kbd>
													)}
												</button>
											);
										})}
									</div>
								),
							)}

						{/* Theme sub-context */}
						{context === "theme" &&
							filteredThemeOptions.map((opt, i) => (
								<button
									key={opt.id}
									type="button"
									onClick={() => executeItem(opt)}
									onMouseEnter={() => setSelectedIndex(i)}
									data-selected={
										i === selectedIndex || undefined
									}
									className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-sm text-foreground outline-none transition-colors data-[selected]:bg-accent"
								>
									<opt.icon className="h-4 w-4 text-muted-foreground" />
									<span className="flex-1 text-left">
										{opt.label}
									</span>
									{theme === opt.id && (
										<Check className="h-3.5 w-3.5 text-muted-foreground" />
									)}
								</button>
							))}

						{/* Empty state */}
						{flatItems.length === 0 && (
							<p className="px-3 py-6 text-center text-sm text-muted-foreground">
								No results found.
							</p>
						)}
					</div>
				</Dialog.Popup>
			</Dialog.Portal>
		</Dialog.Root>
	);
}
