import type { ReactNode } from "react";
import { cn } from "../../lib/utils";

interface BentoCardProps {
	children: ReactNode;
	className?: string;
	label?: string;
}

export function BentoCard({ children, className, label }: BentoCardProps) {
	return (
		<div
			className={cn(
				"relative flex flex-col overflow-hidden rounded-2xl border border-border/60 bg-card p-5",
				className,
			)}
		>
			{label && (
				<span className="mb-3 text-xs font-medium uppercase tracking-wider text-muted-foreground">
					{label}
				</span>
			)}
			{children}
		</div>
	);
}
