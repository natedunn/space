import { createFileRoute, Outlet } from "@tanstack/react-router";
import { CommandPalette } from "../../components/CommandPalette";
import Footer from "../../components/Footer";
import {
	MenuButton,
	MenuContentWrapper,
	MenuPanel,
} from "../../components/SideMenu";
import { MenuProvider } from "../../lib/menu";

export const Route = createFileRoute("/_default")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<MenuProvider>
			<MenuPanel />
			<CommandPalette />
			<MenuContentWrapper>
				<MenuButton />
				<Outlet />
				<Footer />
			</MenuContentWrapper>
		</MenuProvider>
	);
}
