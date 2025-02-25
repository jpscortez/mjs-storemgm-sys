import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {CustomerDetailDTO} from "@/Models/CustomerDetailDTO";
import {patchCustomerComplements} from "@/services/customers";
import {queryClient} from "@/Utils/react-query";
import {zodResolver} from "@hookform/resolvers/zod";
import {useMutation} from "@tanstack/react-query";
import {Phone, House, IdCard} from "lucide-react";
import {useEffect} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

type EditCustomerCompementsProps = {
	code: number;
	phoneNumber?: string;
	address?: string;
	identification?: string;
	save: boolean;
	closeEditMode: () => void;
};
const editCustomerComplementsFormSchema = z.object({
	phoneNumber: z.string(),
	address: z.string(),
	identification: z.string(),
});

type editCustomerComplementsFormData = z.infer<typeof editCustomerComplementsFormSchema>;

export default function EditCustomerCompements({
	code,
	phoneNumber = "",
	address = "",
	identification = "",
	save,
	closeEditMode,
}: EditCustomerCompementsProps) {
	const form = useForm<editCustomerComplementsFormData>({
		resolver: zodResolver(editCustomerComplementsFormSchema),
		defaultValues: {
			phoneNumber,
			address,
			identification,
		},
	});

	const {mutateAsync: saveComplementsFn} = useMutation({
		mutationFn: patchCustomerComplements,
		async onSuccess(_, {code, phoneNumber, address, identification}) {
			queryClient.setQueryData(["customers", code], (data: CustomerDetailDTO) => {
				return {...data, phoneNumber, address, identification};
			});
			await queryClient.invalidateQueries({queryKey: ["customers", code.toString()]});
			closeEditMode();
		},
	});

	useEffect(() => {
		if (save) {
			const {phoneNumber, address, identification} = form.getValues();
			saveComplementsFn({
				code,
				...(phoneNumber && {phoneNumber}),
				...(address && {address}),
				...(identification && {identification}),
			});
		}
	}, [save, form, saveComplementsFn, code]);

	return (
		<Form {...form}>
			<form className="grid items-end">
				<FormField
					control={form.control}
					name="phoneNumber"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								<Phone />
							</FormLabel>
							<FormControl>
								<Input type="text" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="address"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								<House />
							</FormLabel>
							<FormControl>
								<Input type="string" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
				<FormField
					control={form.control}
					name="identification"
					render={({field}) => (
						<FormItem>
							<FormLabel>
								<IdCard />
							</FormLabel>
							<FormControl>
								<Input type="string" {...field} />
							</FormControl>
						</FormItem>
					)}
				/>
			</form>
		</Form>
	);
}
