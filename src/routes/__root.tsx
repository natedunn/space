import {
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
import Footer from "../components/Footer";
// import Header from "../components/Header";
import { authClient } from "../lib/auth-client";
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
	beforeLoad: async () => {
		try {
			const session = await getSessionServerFn();
			return {
				isAuthenticated: session !== null,
				session,
			};
		} catch {
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
						<div className="flex min-h-screen flex-col">
							{/* <Header /> */}
							<Outlet />
							<Footer />
						</div>
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
