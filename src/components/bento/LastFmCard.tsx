import { Music } from "lucide-react";
import { BentoCard } from "./BentoCard";

const recentTracks = [
	{ track: "Myxomatosis", artist: "Radiohead", album: "Hail to the Thief" },
	{ track: "Everything In Its Right Place", artist: "Radiohead", album: "Kid A" },
	{ track: "Reckoner", artist: "Radiohead", album: "In Rainbows" },
];

export function LastFmCard() {
	return (
		<BentoCard className="bento-lastfm" label="Listening">
			<div className="flex flex-1 items-center gap-4">
				{/* Album art placeholder */}
				<div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-lg bg-secondary">
					<Music className="h-6 w-6 text-muted-foreground" />
				</div>
				<div className="min-w-0 flex-1">
					<p className="truncate font-medium">
						{recentTracks[0].track}
					</p>
					<p className="truncate text-sm text-muted-foreground">
						{recentTracks[0].artist} &middot;{" "}
						{recentTracks[0].album}
					</p>
				</div>
				{/* Equalizer bars */}
				<div className="flex items-end gap-0.5">
					{[14, 10, 18, 12].map((h, i) => (
						<span
							key={i}
							className="w-0.5 animate-pulse rounded-full bg-foreground/40"
							style={{
								height: `${h}px`,
								animationDelay: `${(i + 1) * 150}ms`,
								animationDuration: `${800 + (i + 1) * 200}ms`,
							}}
						/>
					))}
				</div>
			</div>
		</BentoCard>
	);
}
