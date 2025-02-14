import {useEffect, useState} from "react";
import {Progress} from "../ui/progress";
import {useStepper} from "./useStepper";
import {twMerge} from "tailwind-merge";

export function StepperHeader() {
	const [progress, setProgress] = useState(0);
	const {step, maxStep, steps} = useStepper();

	useEffect(() => {
		setProgress(Math.ceil((step / maxStep) * 100));
	}, [maxStep, step]);
	return (
		<div className="relative inline-flex h-6 w-full items-center">
			<Progress value={progress} />
			<div className="absolute left-0 z-4 w-full inline-flex justify-between">
				{steps?.map(({icon: Icon}, index) => (
					<div
						key={index}
						className={twMerge(
							"rounded-full p-2",
							index <= step ? "bg-slate-700 text-slate-50" : "bg-slate-50 outline text-slate-500 "
						)}
					>
						<Icon />
					</div>
				))}
			</div>
		</div>
	);
}
