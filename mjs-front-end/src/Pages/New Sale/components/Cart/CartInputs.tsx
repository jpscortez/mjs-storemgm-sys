import {Button} from "@/components/ui/button";
import {Form, FormControl, FormField, FormItem, FormLabel} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {getProduct} from "@/services/products";
import {Product, SoldProduct} from "@/Models/Product";
import {zodResolver} from "@hookform/resolvers/zod";
import {useEffect, useState} from "react";
import {useForm} from "react-hook-form";
import {z} from "zod";

import {formatPrice} from "@/Utils/Functions/parser";
import {useNewSale} from "../../New Sale Provider/useNewSale";

const addProductToCartFormSchema = z
	.object({
		code: z
			.string()
			.refine((val) => val !== null, {message: "Campo obrigatório."})
			.refine((val) => Number.isInteger(Number.parseInt(val)), "Apenas números inteiros.")
			.refine((val) => Number.isInteger(Number.parseInt(val)) && Number.parseInt(val) > 0, "Código invalido"),
		productName: z.string().min(1),
		amount: z.coerce
			.number({invalid_type_error: "Apenas números.", required_error: "Informe a quantidade."})
			.positive("Quantidade inválida."),
		maxAmount: z.number().optional(),
		discount: z.coerce.number({invalid_type_error: "Apenas números."}).optional(),
		price: z.number(),
	})
	.refine((data) => !data.maxAmount || data.maxAmount >= data.amount, {
		message: "Quantidade maior que em estoque",
		path: ["amount"],
	});

type addProductToCartFormData = z.infer<typeof addProductToCartFormSchema>;

export default function CartInputs() {
	const {addProduct} = useNewSale();
	const [product, setProduct] = useState<Product>();

	const form = useForm<addProductToCartFormData>({
		resolver: zodResolver(addProductToCartFormSchema),
		defaultValues: {
			code: "",
			amount: 1,
			productName: "",
			discount: 0,
		},
	});
	const {
		handleSubmit,
		reset,
		watch,
		trigger,
		setError,
		setValue,
		formState: {errors},
	} = form;

	const onSubmit = (data: addProductToCartFormData) => {
		const {amount, code: codeStr, productName: name, price} = data;
		const code = Number(codeStr);

		addProduct({
			name,
			amount,
			code: code.toString(),
			discount: 0,
			price,
		} as SoldProduct);

		reset({});
		setProduct(undefined);
	};
	const codeChanged = watch("code");

	useEffect(() => {
		if (codeChanged) {
			getProduct(Number.parseInt(codeChanged))
				.then((p) => {
					setValue("productName", p.name);
					setValue("price", p.sellPrice);
					setValue("maxAmount", p.stockAmount);
					setProduct(p);
					trigger();
				})
				.catch(() => {
					setValue("productName", "");
					setValue("price", -1);
					setValue("maxAmount", undefined);
					setError("code", {type: "manual", message: "Código de produto não encontrado"});
					setError("productName", {type: "manual"});
					setProduct(undefined);
				});
		}
	}, [codeChanged, setError, setValue, trigger]);

	return (
		<Form {...form}>
			<form onSubmit={handleSubmit(onSubmit)}>
				<div className="grid grid-cols-5 gap-2 items-end">
					<>
						<FormField
							control={form.control}
							name="code"
							render={({field}) => (
								<FormItem>
									<FormLabel>CÓDIGO</FormLabel>
									<FormControl>
										<Input type="number" className="remove-arrow" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="amount"
							render={({field}) => (
								<FormItem>
									<FormLabel>QTDE</FormLabel>
									<FormControl>
										<Input type="number" placeholder="" className="remove-arrow" {...field} />
									</FormControl>
								</FormItem>
							)}
						/>
						<div className="col-span-2" />
						<Button variant="filled" type="submit">
							ADICIONAR
						</Button>
					</>
					<>
						<div className="inline-flex col-span-5">
							<div className="h-0 p-0 overflow-visible inline-flex items-center">
								{errors.code && <p className="text-red-900 italic text-sm">{errors.code.message}</p>}
								{errors.productName && (
									<p className="text-red-900 italic text-sm">{errors.productName.message}</p>
								)}
								{errors.amount && (
									<p className="text-red-900 italic text-sm">{errors.amount.message}</p>
								)}
								{errors.discount && (
									<p className="text-red-900 italic text-sm">{errors.discount.message}</p>
								)}
							</div>
						</div>
					</>
					<>
						<div className="grid col-span-2">
							<p>PRODUTO</p>
							<i className="font-thin text-sm">
								{product ? product.name : "Procure um produto pelo código"}
							</i>
						</div>
						<div className="grid text-end">
							<p></p>
							<i className="font-thin text-sm">{form.getValues("amount")}</i>
						</div>
						<div className="grid text-end">
							<p>PREÇO UN</p>
							<div className="text-sm inline-flex justify-between">
								<p>X</p>
								<i className="font-thin text-sm">{product ? formatPrice(product.sellPrice) : "-"}</i>
							</div>
						</div>
						<div className="grid text-end">
							<p>SUBTOTAL</p>
							<p className="text-sm">
								{product ? formatPrice(product.sellPrice * form.getValues("amount")) : "-"}
							</p>
						</div>
					</>
				</div>
			</form>
		</Form>
	);
}
