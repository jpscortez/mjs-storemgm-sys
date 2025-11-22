import {Button} from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {useMutation} from "@tanstack/react-query";
import {useState} from "react";
import {useToast} from "@/Utils/Hooks/useToast";
import {settleOpenDebtByCodeAndType} from "@/services/openDebts";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {PaymentMethodType} from "@/Models/PaymentMethod";

interface SettleOpenDebtDialogProps {
	customerInDebtCode: number;
}

export function SettleOpenDebtDialog({customerInDebtCode}: SettleOpenDebtDialogProps) {
	const [isOpen, setIsOpen] = useState(false);
	const [paymentMethod, setPaymentMethod] = useState<PaymentMethodType>();
	const {toast} = useToast();

	const {mutateAsync: settleOpenDebtFn} = useMutation({
		mutationFn: settleOpenDebtByCodeAndType,
		onSuccess() {
			toast({
				variant: "default",
				description: "Conta quitada!",
			});
		},
	});

	const handleConfirm = () => {
		if (paymentMethod) {
			settleOpenDebtFn({code: customerInDebtCode, paymentMethod});

			closeDialog();
		}
	};
	const closeDialog = () => setIsOpen(false);

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="success">Quitar Conta</Button>
			</DialogTrigger>
			<DialogContent>
				<DialogTitle>Quitar Conta</DialogTitle>
				<DialogDescription>Confirme o meio de pagamento</DialogDescription>
				<Select
					onValueChange={(value) => setPaymentMethod(value as PaymentMethodType)}
					defaultValue={paymentMethod}
				>
					<SelectTrigger>
						<SelectValue placeholder="Selecione o método de pagamento" />
					</SelectTrigger>
					<SelectContent>
						{Object.values(PaymentMethodType)
							.filter((method) => method != PaymentMethodType.OpenBalance)
							.map((method, index) => (
								<SelectItem key={index} value={method}>
									{method}
								</SelectItem>
							))}
					</SelectContent>
				</Select>
				<DialogFooter>
					<DialogClose asChild>
						<Button variant="default">Cancelar</Button>
					</DialogClose>
					<Button variant="success" onClick={handleConfirm} disabled={!paymentMethod}>
						Confirmar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
