import {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useState,
	type ReactNode,
} from "react";

interface MenuContextValue {
	isOpen: boolean;
	toggle: () => void;
	close: () => void;
	commandOpen: boolean;
	setCommandOpen: (open: boolean) => void;
	unlockScroll: () => void;
}

const MenuContext = createContext<MenuContextValue | null>(null);

/** Imperatively release the scroll lock — call before navigating. */
function releaseScrollLock() {
	document.body.style.overflow = "";
	document.body.style.paddingRight = "";
}

/**
 * Navigate to a hash anchor, handling cross-page navigation.
 * Unlocks scroll first, navigates to "/" if needed, then polls
 * for the element instead of using fragile fixed timeouts.
 */
export function scrollToHash(
	hash: string,
	currentPathname: string,
	navigateFn: (opts: { to: string }) => Promise<unknown>,
) {
	releaseScrollLock();

	const doScroll = () => {
		let attempts = 0;
		const poll = () => {
			const el = document.querySelector(hash);
			if (el) {
				el.scrollIntoView({ behavior: "smooth", block: "start" });
			} else if (attempts++ < 50) {
				// ~50 frames ≈ 800ms at 60fps
				requestAnimationFrame(poll);
			}
		};
		requestAnimationFrame(poll);
	};

	if (currentPathname !== "/") {
		void navigateFn({ to: "/" }).then(doScroll);
	} else {
		doScroll();
	}
}

export function MenuProvider({ children }: { children: ReactNode }) {
	const [isOpen, setIsOpen] = useState(false);
	const [commandOpen, setCommandOpen] = useState(false);

	const toggle = useCallback(() => setIsOpen((prev) => !prev), []);
	const close = useCallback(() => setIsOpen(false), []);
	const unlockScroll = useCallback(releaseScrollLock, []);

	// Lock body scroll when menu is open
	useEffect(() => {
		if (isOpen) {
			const scrollbarWidth =
				window.innerWidth - document.documentElement.clientWidth;
			document.body.style.overflow = "hidden";
			document.body.style.paddingRight = `${scrollbarWidth}px`;
			return () => releaseScrollLock();
		}
	}, [isOpen]);

	// Close on Escape key
	useEffect(() => {
		if (!isOpen) return;
		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === "Escape") close();
		};
		document.addEventListener("keydown", handleKeyDown);
		return () => document.removeEventListener("keydown", handleKeyDown);
	}, [isOpen, close]);

	const value = useMemo(
		() => ({
			isOpen,
			toggle,
			close,
			commandOpen,
			setCommandOpen,
			unlockScroll,
		}),
		[isOpen, toggle, close, commandOpen, unlockScroll],
	);

	return (
		<MenuContext.Provider value={value}>{children}</MenuContext.Provider>
	);
}

export function useMenu() {
	const ctx = useContext(MenuContext);
	if (!ctx) throw new Error("useMenu must be used within a MenuProvider");
	return ctx;
}
