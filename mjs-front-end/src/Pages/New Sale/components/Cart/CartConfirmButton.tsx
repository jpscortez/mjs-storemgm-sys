import {Button} from "@/components/ui/button";
import {useStepper} from "@/components/Stepper/useStepper";
import {useNewSale} from "../../New Sale Provider/useNewSale";

export default function CartConfirmButton() {
	const {previousStep, nextStep} = useStepper();
	const {isCartReady: isEmpty} = useNewSale();

	const onConfirm = () => {
		nextStep();
	};

	return (
		<div className="w-full inline-flex justify-between">
			<Button variant="filled" onClick={previousStep}>
				VOLTAR
			</Button>
			<Button variant="filled" onClick={onConfirm} disabled={isEmpty}>
				CONTINUAR
			</Button>
		</div>
	);
}
