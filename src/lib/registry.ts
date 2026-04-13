// ---------------------------------------------------------------------------
// Centralised navigation / command registry
// ---------------------------------------------------------------------------
// Every navigable destination and action lives here. Components pull from this
// list via `getItems()` so we never duplicate links.

export interface RegistryItem {
	id: string;
	label: string;
	group: "navigation" | "sections" | "actions";
	locations: {
		command?: boolean;
		mainNav?: boolean;
		sectionNav?: boolean;
	};
	to?: string; // TanStack Router path
	hash?: string; // Scroll-to anchor
	action?: string; // Named action key
	shortcut?: string; // Human-readable shortcut
}

export const registry: RegistryItem[] = [
	// ── Navigation ──────────────────────────────────────────────────────
	{
		id: "home",
		label: "Home",
		group: "navigation",
		locations: { command: true, mainNav: true },
		to: "/",
	},
	{
		id: "cms",
		label: "CMS",
		group: "navigation",
		locations: { command: true, mainNav: true },
		to: "/cms",
	},

	// ── Sections ────────────────────────────────────────────────────────
	{
		id: "console",
		label: "Console",
		group: "sections",
		locations: { command: true, sectionNav: true },
		hash: "#console",
	},
	{
		id: "projects",
		label: "Projects",
		group: "sections",
		locations: { command: true, sectionNav: true },
		hash: "#projects",
	},

	// ── Actions ─────────────────────────────────────────────────────────
	{
		id: "theme",
		label: "Change theme\u2026",
		group: "actions",
		locations: { command: true },
		action: "theme",
	},
	{
		id: "menu-toggle",
		label: "Toggle menu",
		group: "actions",
		locations: { command: true },
		action: "menu-toggle",
		shortcut: "\u2318\\",
	},
];

/** Return every item that should appear at a given location. */
export function getItems(location: keyof RegistryItem["locations"]) {
	return registry.filter((item) => item.locations[location]);
}
