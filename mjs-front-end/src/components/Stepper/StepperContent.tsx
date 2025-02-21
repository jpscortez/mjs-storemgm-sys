import React, {ReactNode, useEffect} from "react";
import {useStepper} from "./useStepper";
import {LucideIcon} from "lucide-react";

type StepperContentProps = {
	children: ReactNode;
	stepsIcons: LucideIcon[];
};

export function StepperContent({stepsIcons, children}: StepperContentProps) {
	const {step, setSteps} = useStepper();

	useEffect(() => {
		setSteps(
			stepsIcons.map((i) => {
				return {icon: i};
			})
		);
	}, [setSteps, stepsIcons]);

	return (
		<div className="py-4 h-full flex flex-col">
			<div className="flex-1">{React.Children.toArray(children)[step] || null}</div>
		</div>
	);
}
