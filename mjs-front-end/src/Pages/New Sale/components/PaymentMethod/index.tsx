import {useStepper} from "@/components/Stepper/useStepper";
import {Button} from "@/components/ui/button";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {PaymentMethodType} from "@/Models/PaymentMethod";
import {useNewSale} from "../../New Sale Provider/useNewSale";

const paymentMethodSchema = z.object({
	method: z.enum([
		PaymentMethodType.Cash,
		PaymentMethodType.CreditCard,
		PaymentMethodType.DebitCard,
		PaymentMethodType.Pix,
		PaymentMethodType.OpenBalance,
	]),
});

type PaymentMethodFormData = z.infer<typeof paymentMethodSchema>;

export function PaymentMethod() {
	const {previousStep, nextStep} = useStepper();
	const {paymentMethod, setPaymentMethod} = useNewSale();

	const form = useForm<PaymentMethodFormData>({
		resolver: zodResolver(paymentMethodSchema),
		defaultValues: {
			method: paymentMethod,
		},
	});

	const {handleSubmit} = form;

	const onSubmit = (data: PaymentMethodFormData) => {
		setPaymentMethod(data.method);
		nextStep();
	};

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)} className="flex flex-col h-full">
				<div className="w-2/3 space-y-6">
					<FormField
						control={form.control}
						name="method"
						render={({field}) => (
							<FormItem>
								<FormLabel>Meio de Pagamento</FormLabel>
								<Select onValueChange={field.onChange} defaultValue={field.value}>
									<FormControl>
										<SelectTrigger>
											<SelectValue placeholder="Selecione o método de pagamento " />
										</SelectTrigger>
									</FormControl>
									<SelectContent>
										{Object.values(PaymentMethodType).map((method, index) => (
											<SelectItem key={index} value={method}>
												{method}
											</SelectItem>
										))}
									</SelectContent>
								</Select>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex-1" />
				<div className="w-full inline-flex justify-between">
					<Button variant="filled" onClick={previousStep}>
						VOLTAR
					</Button>
					<Button variant="filled" disabled={form.getValues("method") == undefined}>
						CONTINUAR
					</Button>
				</div>
			</form>
		</Form>
	);
}
