import {ReactNode} from "react";
import {twMerge} from "tailwind-merge";

type CardRootProps = {
	children?: ReactNode;
	className?: string;
};

export function CardRoot({children, className = ""}: CardRootProps) {
	return (
		<div className={twMerge("my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300 grid gap-4", className)}>
			{children}
		</div>
	);
}
