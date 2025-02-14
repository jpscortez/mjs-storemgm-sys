import {CircleX, LucideIcon} from "lucide-react";
import {createContext, ReactNode, useEffect, useState} from "react";

interface StepperContextType {
	nextStep: () => void;
	previousStep: () => void;
	step: number;
	maxStep: number;
	steps: StepConfig[];
	setSteps: (steps: StepConfig[]) => void;
}
export type StepConfig = {
	icon: LucideIcon;
	stepName?: string;
};

const defaultContextValue: StepperContextType = {
	nextStep: () => {},
	previousStep: () => {},
	step: 0,
	maxStep: 1,
	steps: [{icon: CircleX, stepName: "error"}],
	setSteps: () => {},
};

export const StepperContext = createContext<StepperContextType>(defaultContextValue);

export function StepperProvider({children}: {children: ReactNode}) {
	const [step, setStep] = useState(0);
	const [maxStep, setMaxStep] = useState(1);
	const [steps, setSteps] = useState<StepConfig[]>([]);

	function nextStep() {
		setStep((curr) => {
			return Math.min(4, curr + 1);
		});
	}
	function previousStep() {
		setStep((curr) => {
			return Math.max(0, curr - 1);
		});
	}

	useEffect(() => {
		setMaxStep(steps.length - 1);
	}, [steps]);

	return (
		<StepperContext.Provider value={{step, steps, maxStep, setSteps, nextStep, previousStep}}>
			{children}
		</StepperContext.Provider>
	);
}
