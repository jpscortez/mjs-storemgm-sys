import React, {ReactNode, useEffect} from "react";
import {useStepper} from "./useStepper";
import {Button} from "../ui/button";
import {LucideIcon} from "lucide-react";

type StepperContetProps = {
	children: ReactNode;
	stepsIcons: LucideIcon[];
};

export function StepperContent({stepsIcons, children}: StepperContetProps) {
	const {step, setSteps, previousStep, nextStep} = useStepper();

	useEffect(() => {
		setSteps(
			stepsIcons.map((i) => {
				return {icon: i};
			})
		);
	}, [setSteps, stepsIcons]);

	return (
		<div className="py-4">
			<div>{React.Children.toArray(children)[step] || null}</div>
			<div>
				<Button onClick={previousStep}>previous</Button>
				<Button onClick={nextStep}>next</Button>
			</div>
		</div>
	);
}
