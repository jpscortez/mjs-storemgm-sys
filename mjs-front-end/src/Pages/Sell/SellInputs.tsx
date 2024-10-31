import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SoldProduct } from "@/Models/Product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface SellInputsProps {
    addProduct: (newProduct: SoldProduct) => void
}

const addProductToCartFormSchema = z.object({
    code: z
        .coerce
        .number({ invalid_type_error: "Apenas números.", required_error: "Informe o código." })
        .int("Apenas númeors inteiros."),
    description: z.string(),
    amount: z
        .coerce
        .number({ invalid_type_error: "Apenas números.", required_error: "Informe a quantidade." })
        .positive("Quantidade inválida."),
    discount: z
        .coerce
        .number({ invalid_type_error: "Apenas números." })
        .optional(),
})

type addProductToCartFormData = z.infer<typeof addProductToCartFormSchema>

export default function SellInputs({ addProduct }: SellInputsProps) {

    const form = useForm<addProductToCartFormData>({
        resolver: zodResolver(addProductToCartFormSchema),
        defaultValues: {
            amount: 1
        }
    })
    const { handleSubmit } = form;

    const onSubmit = (data: addProductToCartFormData) => {
        const { amount, code: codeStr, description: name, discount } = data
        const code = Number(codeStr);
        const price = getPrice(code)

        addProduct({
            name,
            amount,
            code: code.toString(),
            discount,
            price
        } as SoldProduct)
        // addProduct()
    }

    const getPrice = (code: number) => {
        return 5.99
    }

    return (
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>DESCRIÇÃO</FormLabel>
                                <FormControl>
                                    <Input
                                        className="uppercase"
                                        type="string"
                                        placeholder=""
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
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
                                <FormMessage />
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
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div className="flex-1" />

                    <Button type="submit">ADICIONAR</Button>
                </div>
            </form>
        </Form>
    )
}