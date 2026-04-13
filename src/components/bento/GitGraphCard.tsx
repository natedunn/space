import { BentoCard } from "./BentoCard";
import { cn } from "../../lib/utils";

// Deterministic pseudo-random data so it doesn't shift between renders
const SEED_DATA = (() => {
	const weeks = 52;
	const days = 7;
	const data: number[][] = [];
	let seed = 42;
	const rand = () => {
		seed = (seed * 16807 + 0) % 2147483647;
		return (seed - 1) / 2147483646;
	};
	for (let w = 0; w < weeks; w++) {
		const week: number[] = [];
		for (let d = 0; d < days; d++) {
			const r = rand();
			// Weighted toward lower values
			if (r < 0.35) week.push(0);
			else if (r < 0.55) week.push(1);
			else if (r < 0.75) week.push(2);
			else if (r < 0.9) week.push(3);
			else week.push(4);
		}
		data.push(week);
	}
	return data;
})();

const LEVEL_CLASSES = [
	"bg-secondary",
	"bg-emerald-200 dark:bg-emerald-900/80",
	"bg-emerald-400 dark:bg-emerald-700/80",
	"bg-emerald-500 dark:bg-emerald-500/70",
	"bg-emerald-700 dark:bg-emerald-400/80",
];

export function GitGraphCard() {
	return (
		<BentoCard className="bento-git" label="Contributions">
			<p className="mb-3 text-sm text-muted-foreground">
				1,247 contributions in the last year
			</p>
			<div className="flex flex-1 items-center overflow-hidden">
				<div
					className="grid w-full gap-[3px]"
					style={{
						gridTemplateColumns: `repeat(52, 1fr)`,
						gridTemplateRows: `repeat(7, 1fr)`,
						gridAutoFlow: "column",
					}}
				>
					{SEED_DATA.flatMap((week, w) =>
						week.map((level, d) => (
							<div
								key={`${w}-${d}`}
								className={cn(
									"aspect-square rounded-[2px]",
									LEVEL_CLASSES[level],
								)}
							/>
						)),
					)}
				</div>
			</div>
		</BentoCard>
	);
}
