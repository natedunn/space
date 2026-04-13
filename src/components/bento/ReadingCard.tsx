import { BookOpen } from "lucide-react";
import { BentoCard } from "./BentoCard";

export function ReadingCard() {
	return (
		<BentoCard className="bento-reading" label="Currently Reading">
			<div className="flex flex-1 flex-col items-start gap-3">
				{/* Book cover placeholder */}
				<div className="flex aspect-[2/3] w-16 items-center justify-center rounded-md bg-secondary">
					<BookOpen className="h-5 w-5 text-muted-foreground" />
				</div>
				<div>
					<p className="text-sm font-medium leading-snug">
						A Wizard of Earthsea
					</p>
					<p className="mt-0.5 text-xs text-muted-foreground">
						Ursula K. Le Guin
					</p>
				</div>
				</div>
		</BentoCard>
	);
}
