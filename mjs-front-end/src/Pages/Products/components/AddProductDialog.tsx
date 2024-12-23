import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { createProduct } from "@/data/products";
import { useToast } from "@/hooks/use-toast";
import { Product } from "@/Models/Product";
import { queryClient } from "@/Utils/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const newProductFormSchema = z.object({
    code: z
        .coerce
        .number({ invalid_type_error: "Apenas números." })
        .int("Apenas númeors inteiros."),
    description: z.string(),
    sellPrice: z.coerce.number(),
    stockUnits: z.coerce.number().int()
})

type NewProductFormData = z.infer<typeof newProductFormSchema>

export function AddProductDialog() {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast()

    const { mutateAsync: createProductFn, isPending } = useMutation({
        mutationFn: createProduct,
        onSuccess(_, { code, description, sellPrice, stockUnits }) {
            // const cached = queryClient.getQueryData(['products'])

            queryClient.setQueryData(['products'], (data: Product[]) => {
                return [...data, { code, description, sellPrice, stockUnits }]
            })
        },
    })

    const form = useForm<NewProductFormData>({
        resolver: zodResolver(newProductFormSchema)
    })
    const { handleSubmit, reset } = form;

    async function onSubmit({ code, description, sellPrice, stockUnits }: NewProductFormData) {
        try {
            await createProductFn({ code, description, sellPrice, stockUnits })

            reset()
            toast({
                variant: 'default',
                description: "Produto cadastrado!"
            })

            setIsDialogOpen(false)

        } catch (err) {
            alert(`Erro ao cadastrar produto. ${err}`)
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={(open) => { setIsDialogOpen(open); reset() }}>
                <DialogTrigger asChild>
                    <Button variant="filled" size="icon" className="my-2 rounded-full font-bold">
                        <Plus />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            NOVO PRODUTO
                        </DialogTitle>
                        <DialogDescription>
                            Cadastre um novo produto no estoque.
                        </DialogDescription>
                    </DialogHeader>

                    <Form {...form}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormField
                                name="code"
                                control={form.control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel>CÓDIGO</FormLabel>
                                            <Input
                                                type="number"
                                                className="remove-arrow"
                                                {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                name="description"
                                control={form.control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel>DESCRIÇÃO</FormLabel>
                                            <Input
                                                className="uppercase"
                                                type="string"
                                                placeholder=""
                                                {...field}
                                            />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                name="sellPrice"
                                control={form.control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel>PREÇO</FormLabel>
                                            <Input
                                                type="number"
                                                className="remove-arrow"
                                                {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />
                            <FormField
                                name="stockUnits"
                                control={form.control}
                                render={({ field }) => (
                                    <FormControl>
                                        <FormItem>
                                            <FormLabel>UNIDADES</FormLabel>
                                            <Input
                                                type="number"
                                                className="remove-arrow"
                                                {...field} />
                                            <FormMessage />
                                        </FormItem>
                                    </FormControl>
                                )}
                            />

                            <DialogFooter className="my-2">
                                <Button variant="default" onClick={() => setIsDialogOpen(false)}>
                                    Cancelar
                                </Button>
                                <Button variant="filled" className="uppercase" type="submit">
                                    {isPending ? 'Cadastrando...' : 'Cadastrar'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}