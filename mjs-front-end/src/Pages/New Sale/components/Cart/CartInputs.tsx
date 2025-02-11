import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getProduct } from "@/services/products";
import { SoldProduct } from "@/Models/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useCart } from "../useCart";

const addProductToCartFormSchema = z.object({
    code: z
        .string()
        .refine(val => val !== null, { message: "Campo obrigatório." })
        .refine(val => Number.isInteger(Number.parseInt(val)), "Apenas números inteiros.")
        .refine(val => Number.isInteger(Number.parseInt(val)) && Number.parseInt(val) > 0, "Código invalido"),
    productName: z.string().min(1),
    amount: z
        .coerce
        .number({ invalid_type_error: "Apenas números.", required_error: "Informe a quantidade." })
        .positive("Quantidade inválida."),
    maxAmount: z
        .number().optional(),
    discount: z
        .coerce
        .number({ invalid_type_error: "Apenas números." })
        .optional(),
    price: z
        .number()
}).refine((data) => !data.maxAmount || data.maxAmount >= data.amount, {
    message: 'Quantidade maior que em estoque',
    path: ['amount'],
  });

type addProductToCartFormData = z.infer<typeof addProductToCartFormSchema>

export default function CartInputs() {
    const { addProduct } = useCart()

    const form = useForm<addProductToCartFormData>({
        resolver: zodResolver(addProductToCartFormSchema),
        defaultValues: {
            code: "",
            amount: 1,
            productName: "",
            discount: 0
        }
    })
    const { handleSubmit, reset, watch, trigger, setError, setValue, formState : { errors } } = form;

    const onSubmit = (data: addProductToCartFormData) => {
        const { amount, code: codeStr, productName: name, discount, price } = data
        const code = Number(codeStr);

        addProduct({
            name,
            amount,
            code: code.toString(),
            discount,
            price
        } as SoldProduct)

        reset({})
    }
    const codeChanged = watch("code")
    useEffect(() => {
        if(codeChanged) {
            getProduct(Number.parseInt(codeChanged))
                .then((p) => {
                    setValue("productName", p.name)
                    setValue("price", p.sellPrice)
                    setValue("maxAmount", p.stockAmount)
                    trigger()
                })
                .catch(() => {
                    setValue("productName", "")
                    setValue("price", -1)
                    setValue("maxAmount", undefined)
                    setError("code", {type: "manual", message:"Código de produto não encontrado"})
                    setError("productName", {type: "manual"})
                })
        }
    }, [codeChanged, setError, setValue, trigger])

    return (
        <div>
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex gap-2 items-end">
                        <FormField
                            control={form.control}
                            name="code"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>CÓDIGO</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number"
                                            className="remove-arrow"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="productName"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Produto</FormLabel>
                                    <FormControl>
                                        <Input
                                            disabled
                                            className="uppercase"
                                            type="string"
                                            placeholder=""
                                            {...field}
                                        />
                                    </FormControl>
                                </FormItem>

                            )}
                        />
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>QTDE</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number" placeholder="" className="remove-arrow"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="discount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>DESCONTO</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="number" placeholder="" className="remove-arrow"
                                            {...field} />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <div className="flex-1" />

                        <Button
                            variant="filled"
                            type="submit"
                        >
                            ADICIONAR
                        </Button>
                    </div>
                </form>
            </Form>
            <div className="error-messages">
                {errors.code && <p className="text-red-900 italic text-sm">{errors.code.message}</p>}
                {errors.productName && <p className="text-red-900 italic text-sm">{errors.productName.message}</p>}
                {errors.amount && <p className="text-red-900 italic text-sm">{errors.amount.message}</p>}
                {errors.discount && <p className="text-red-900 italic text-sm">{errors.discount.message}</p>}
            </div>
        </div>
    )
}