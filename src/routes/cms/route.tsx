import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { api } from "../../../convex/_generated/api";
import { convexQuery } from "@convex-dev/react-query";
import { useSuspenseQuery } from "@tanstack/react-query";

export const Route = createFileRoute("/cms")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthenticated) {
			throw redirect({ to: "/signin" });
		}
	},
	loader: async ({ context }) => {
		const isAdmin = await context.queryClient.ensureQueryData(
			convexQuery(api.zen.plugin.systemAdmin.isAdmin),
		);
		// if (!isAdmin) {
		// 	throw redirect({ to: "/" });
		// }

		console.log("isAdmin", isAdmin);
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<div>CMS dashboard here</div>
			<Outlet />
		</div>
	);
}
