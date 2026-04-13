import { useEffect, useState } from "react";
import { BentoCard } from "./BentoCard";

const MY_TZ = "America/Chicago";

function formatTime(tz: string) {
	return new Intl.DateTimeFormat("en-US", {
		hour: "numeric",
		minute: "2-digit",
		second: "2-digit",
		hour12: true,
		timeZone: tz,
	}).format(new Date());
}

function getTzLabel(tz: string) {
	return new Intl.DateTimeFormat("en-US", {
		timeZoneName: "short",
		timeZone: tz,
	})
		.formatToParts(new Date())
		.find((p) => p.type === "timeZoneName")?.value;
}

export function CurrentTimeCard() {
	const [showMine, setShowMine] = useState(true);
	const [time, setTime] = useState<string | null>(null);
	const [tzLabel, setTzLabel] = useState<string | null>(null);
	const [visitorTz, setVisitorTz] = useState(MY_TZ);

	useEffect(() => {
		setVisitorTz(Intl.DateTimeFormat().resolvedOptions().timeZone);
	}, []);

	const activeTz = showMine ? MY_TZ : visitorTz;

	useEffect(() => {
		const tick = () => {
			setTime(formatTime(activeTz));
			setTzLabel(getTzLabel(activeTz) ?? null);
		};
		tick();
		const id = setInterval(tick, 1000);
		return () => clearInterval(id);
	}, [activeTz]);

	return (
		<BentoCard className="bento-time" label="Current Time">
			<div className="flex flex-1 flex-col justify-center">
				<p className="text-3xl font-semibold tabular-nums">
					{time ?? "--:--:--"}
				</p>
				<p className="mt-1 text-sm text-muted-foreground">
					{tzLabel ?? "..."}
				</p>
			</div>
			{visitorTz !== MY_TZ && (
				<button
					type="button"
					onClick={() => setShowMine((p) => !p)}
					className="mt-2 cursor-pointer text-xs text-muted-foreground underline decoration-dotted underline-offset-2 transition-colors hover:text-foreground"
				>
					{showMine ? "Show your time" : "Show my time"}
				</button>
			)}
		</BentoCard>
	);
}
