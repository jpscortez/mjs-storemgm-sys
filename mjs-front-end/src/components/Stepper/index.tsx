import {ReactNode} from "react";
import {StepperProvider} from "./StepperProvider";

type StepperProps = {
	children: ReactNode;
};

export function Stepper({children}: StepperProps) {
	return (
		<div className="w-full">
			<StepperProvider>{children}</StepperProvider>
		</div>
	);
}
