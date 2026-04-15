import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/cms")({
	beforeLoad: ({ context }) => {
		if (!context.isAuthenticated) {
			throw redirect({ to: "/signin" });
		}
	},
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div>
			<Outlet />
		</div>
	);
}
