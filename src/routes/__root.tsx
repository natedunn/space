import {
	ErrorComponent,
	type ErrorComponentProps,
	HeadContent,
	Outlet,
	Scripts,
	createRootRouteWithContext,
	useRouteContext,
} from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";
import { ConvexProvider } from "convex/react";
import { ConvexZenAuthProvider } from "convex-zen/react";
import type { ReactNode } from "react";
import { CommandPalette } from "../components/CommandPalette";
import Footer from "../components/Footer";
import {
	MenuButton,
	MenuContentWrapper,
	MenuPanel,
} from "../components/SideMenu";
import { authClient } from "../lib/auth-client";
import { MenuProvider } from "../lib/menu";
import { ThemeProvider } from "../lib/theme";
import type { RouterContext } from "../router";
import appCss from "../styles.css?url";

const THEME_SCRIPT = `(function(){var t=localStorage.getItem("theme");var d=document.documentElement;if(t==="dark"||(t!=="light"&&window.matchMedia("(prefers-color-scheme: dark)").matches)){d.classList.add("dark")}})()`;

const getSessionServerFn = createServerFn({ method: "GET" }).handler(
	async () => {
		const { getSession } = await import("../lib/auth-server");
		return getSession();
	},
);

function RootRouteErrorComponent({ error }: ErrorComponentProps) {
	console.error("Root route error", error);

	return (
		<RootDocument>
			<div className="mx-auto flex min-h-screen w-full max-w-3xl flex-1 flex-col justify-center gap-4 px-6 py-24">
				<h1 className="text-2xl font-semibold">Something broke while rendering this page.</h1>
				<p className="text-sm text-muted-foreground">
					Check the browser console and dev server logs for the underlying exception.
				</p>
				<div className="rounded-lg border border-border/60 bg-card p-4">
					<ErrorComponent error={error} />
				</div>
			</div>
		</RootDocument>
	);
}

export const Route = createRootRouteWithContext<RouterContext>()({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{ name: "viewport", content: "width=device-width, initial-scale=1" },
			{ title: "nate.space" },
			{
				name: "description",
				content:
					"Personal site foundation with Tailwind v4, TanStack Start, and Convex-ready CMS scaffolding.",
			},
		],
		links: [{ rel: "stylesheet", href: appCss }],
	}),
	staleTime: 0,
	preloadStaleTime: 0,
	notFoundComponent: () => <div>Not found</div>,
	errorComponent: RootRouteErrorComponent,
	beforeLoad: async () => {
		try {
			const session = await getSessionServerFn();
			return {
				isAuthenticated: session !== null,
				session,
			};
		} catch (error) {
			console.error("Failed to load session in root beforeLoad", error);
			return {
				isAuthenticated: false,
				session: null,
			};
		}
	},
	component: RootComponent,
});

function RootComponent() {
	const context = useRouteContext({ from: Route.id });

	return (
		<RootDocument>
			<ThemeProvider>
				<ConvexZenAuthProvider
					client={authClient}
					initialSession={context.session}
				>
					<ConvexProvider client={context.convex}>
						<MenuProvider>
							<MenuPanel />
							<CommandPalette />
							<MenuContentWrapper>
								<MenuButton />
								<Outlet />
								<Footer />
							</MenuContentWrapper>
						</MenuProvider>
					</ConvexProvider>
				</ConvexZenAuthProvider>
			</ThemeProvider>
		</RootDocument>
	);
}

function RootDocument({ children }: { children: ReactNode }) {
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<script
					dangerouslySetInnerHTML={{ __html: THEME_SCRIPT }}
					suppressHydrationWarning
				/>
				<HeadContent />
			</head>
			<body className="flex min-h-screen flex-col font-sans antialiased">
				{children}
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
