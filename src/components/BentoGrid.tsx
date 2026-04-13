import { CheckInsCard } from "./bento/CheckInsCard";
import { CurrentTimeCard } from "./bento/CurrentTimeCard";
import { GitGraphCard } from "./bento/GitGraphCard";
import { LastFmCard } from "./bento/LastFmCard";

import { ReadingCard } from "./bento/ReadingCard";
import { SteamCard } from "./bento/SteamCard";

export function BentoGrid() {
	return (
		<section>
			<div className="mx-auto max-w-5xl px-12">
				<div className="mb-8">
					<h3 id="console" className="text-2xl font-semibold">Console</h3>
					<p className="mt-2 text-muted-foreground">
						A few things about what I'm up to.
					</p>
				</div>

				<div className="bento-grid">
					<LastFmCard />
					<CurrentTimeCard />
					<ReadingCard />
					<GitGraphCard />
					<SteamCard />
					<CheckInsCard />
				</div>
			</div>
		</section>
	);
}
