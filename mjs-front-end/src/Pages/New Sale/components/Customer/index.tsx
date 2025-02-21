import {useStepper} from "@/components/Stepper/useStepper";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormLabel, FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useNewSale} from "../../New Sale Provider/useNewSale";

const customerFormSchema = z.object({
	customer: z.string(),
});

type customerFormData = z.infer<typeof customerFormSchema>;

export function Customer() {
	const {nextStep} = useStepper();
	const {customer, setCustomer} = useNewSale();

	const form = useForm<customerFormData>({
		resolver: zodResolver(customerFormSchema),
		defaultValues: {
			customer: customer,
		},
	});

	const {handleSubmit} = form;

	const onSubmit = (data: customerFormData) => {
		console.log(data);
		setCustomer(data.customer);
		nextStep();
	};

	return (
		<Form {...form}>
			<form className="h-full flex flex-col items-end" onSubmit={handleSubmit(onSubmit)}>
				<div className="w-full">
					<FormField
						control={form.control}
						name="customer"
						render={({field}) => (
							<FormItem>
								<FormLabel>CLIENTE</FormLabel>
								<FormControl>
									<Input
										type="text"
										placeholder="Busque um Cliente ou Adicione um novo..."
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
				</div>
				<div className="flex-1" />
				<div>
					<Button variant="filled" type="submit" disabled={form.getValues("customer").length < 3}>
						CONTINUAR
					</Button>
				</div>
			</form>
		</Form>
	);
}
