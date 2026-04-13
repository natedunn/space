import { MapPin } from "lucide-react";
import { BentoCard } from "./BentoCard";

const checkIns = [
	{ venue: "Houndstooth Coffee", area: "Austin, TX", time: "2h ago" },
	{ venue: "BookPeople", area: "Austin, TX", time: "Yesterday" },
	{ venue: "Barton Springs Pool", area: "Austin, TX", time: "3d ago" },
];

export function CheckInsCard() {
	return (
		<BentoCard className="bento-checkins" label="Recent Check-ins">
			<div className="flex flex-1 flex-col divide-y divide-border/50">
				{checkIns.map((c) => (
					<div
						key={c.venue}
						className="flex items-center gap-3 py-2 first:pt-0 last:pb-0"
					>
						<MapPin className="h-3.5 w-3.5 shrink-0 text-muted-foreground" />
						<div className="min-w-0 flex-1">
							<p className="truncate text-sm font-medium">
								{c.venue}
							</p>
							<p className="text-xs text-muted-foreground">
								{c.area}
							</p>
						</div>
						<span className="shrink-0 text-xs text-muted-foreground">
							{c.time}
						</span>
					</div>
				))}
			</div>
		</BentoCard>
	);
}
