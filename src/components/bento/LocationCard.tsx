import { MapPin } from "lucide-react";
import { BentoCard } from "./BentoCard";

export function LocationCard() {
	return (
		<BentoCard className="bento-map" label="Location">
			{/* Decorative map background */}
			<div className="bg-halftone absolute inset-0 bg-secondary/50" />

			{/* Pin icon */}
			<div className="relative flex flex-1 items-center justify-center">
				<div className="flex h-12 w-12 items-center justify-center rounded-full bg-foreground/10">
					<MapPin className="h-6 w-6 text-foreground" />
				</div>
			</div>

			{/* Location info */}
			<div className="relative mt-auto">
				<p className="font-semibold">Austin, TX</p>
				<p className="mt-0.5 text-sm text-muted-foreground">
					Previously: Portland, OR &middot; Chicago, IL
				</p>
			</div>
		</BentoCard>
	);
}
