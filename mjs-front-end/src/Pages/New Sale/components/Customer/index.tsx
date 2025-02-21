import {useStepper} from "@/components/Stepper/useStepper";
import {Button} from "@/components/ui/button";
import {Form, FormField, FormItem, FormLabel, FormControl} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {zodResolver} from "@hookform/resolvers/zod";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {useNewSale} from "../../New Sale Provider/useNewSale";
import {useEffect, useState} from "react";
import {getCustomersByPartialName} from "@/services/customers";
import {Separator} from "@/components/ui/separator";

const customerFormSchema = z.object({
	customer: z.string(),
});

type customerFormData = z.infer<typeof customerFormSchema>;

export function Customer() {
	const {nextStep} = useStepper();
	const {customer, setCustomer} = useNewSale();
	const [filteredNames, setFilteredNames] = useState<string[]>([]);
	const [customerFound, setCustomerFound] = useState(false);

	const form = useForm<customerFormData>({
		resolver: zodResolver(customerFormSchema),
		defaultValues: {
			customer: customer,
		},
	});

	const {handleSubmit, watch, setValue} = form;

	const onSubmit = (data: customerFormData) => {
		setCustomer(data.customer);
		nextStep();
	};

	const customerChanged = watch("customer");

	useEffect(() => {
		if (customerChanged.length > 0) {
			getCustomersByPartialName(customerChanged).then((namesFound) => setFilteredNames(namesFound));
		}
	}, [customerChanged, setFilteredNames]);

	return (
		<Form {...form}>
			<form className="h-full flex flex-col items-end gap-2" onSubmit={handleSubmit(onSubmit)}>
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
										autoComplete="off"
										disabled={customerFound}
										placeholder="Busque ou Crie um Cliente"
										{...field}
									/>
								</FormControl>
							</FormItem>
						)}
					/>
					<div className="relative pt-2" />
					{!customerFound && customerChanged.length > 0 && (
						<div className="absolute rounded-lg border shadow-lg">
							<p className="p-2 uppercase text-sm">Clientes Cadastrados</p>
							<div className="mx-2">
								<Separator className="w-full" />
							</div>
							<div
								className="p-2 font-thin hover:bg-gray-100 cursor-pointer"
								onClick={() => setCustomerFound(true)}
							>
								Novo Cliente: {customerChanged}
							</div>
							{filteredNames.map((sugestedName, index) => (
								<div
									key={index}
									className="p-2 font-thin hover:bg-gray-100 cursor-pointer"
									onClick={() => {
										setValue("customer", sugestedName);
										setCustomerFound(true);
									}}
								>
									{sugestedName}
								</div>
							))}
						</div>
					)}
				</div>
				<div>
					{customerChanged.length > 0 && (
						<Button
							variant="outline"
							type="button"
							onClick={() => {
								setCustomerFound(false);
								form.reset();
							}}
						>
							Limpar
						</Button>
					)}
				</div>
				<div className="flex-1" />
				<div>
					<Button variant="filled" type="submit" disabled={!customerFound}>
						CONTINUAR
					</Button>
				</div>
			</form>
		</Form>
	);
}
