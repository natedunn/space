import { Gamepad2 } from "lucide-react";
import { BentoCard } from "./BentoCard";

const recentGames = [
	{ name: "Elden Ring", hours: 42 },
	{ name: "Balatro", hours: 18 },
];

export function SteamCard() {
	return (
		<BentoCard className="bento-steam" label="Recently Played">
			<div className="flex flex-1 items-center gap-4">
				{/* Game art placeholder */}
				<div className="flex aspect-video w-24 shrink-0 items-center justify-center rounded-lg bg-secondary">
					<Gamepad2 className="h-6 w-6 text-muted-foreground" />
				</div>
				<div className="min-w-0">
					<p className="truncate font-medium">
						{recentGames[0].name}
					</p>
					<p className="text-sm text-muted-foreground">
						{recentGames[0].hours} hrs last 2 weeks
					</p>
					<p className="mt-1 text-xs text-muted-foreground">
						Also playing: {recentGames[1].name}
					</p>
				</div>
			</div>
		</BentoCard>
	);
}
