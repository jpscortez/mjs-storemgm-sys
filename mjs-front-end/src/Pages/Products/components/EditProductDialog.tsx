import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogFooter, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { updateProduct } from "@/services/products";
import { useToast } from "@/hooks/useToast";
import { Product } from "@/Models/Product";
import { queryClient } from "@/Utils/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface EditProductDialogProps {
    product: Product
}

const editProductFormSchema = z.object({
    code: z
        .coerce
        .number({ invalid_type_error: "Apenas números." })
        .int("Apenas númeors inteiros."),
    description: z.string(),
    sellPrice: z.coerce.number(),
    stockUnits: z.coerce.number().int()
})

type EditProductFormData = z.infer<typeof editProductFormSchema>

export function EditProductDialog({ product }: EditProductDialogProps) {

    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const { toast } = useToast()

    const { mutateAsync: editProductFn, isPending } = useMutation({
        mutationFn: updateProduct,
        onMutate: (updatedRow) => {
            
            queryClient.setQueryData(['products'], (oldData: Product[]) =>
                oldData.map((row) =>
                    row.code === updatedRow.code ? { ...row, ...updatedRow } : row
                )
            );
        },
    })

    const { code, name: description, sellPrice, stockAmount: stockUnits } = product
    const form = useForm<EditProductFormData>({
        resolver: zodResolver(editProductFormSchema),
        defaultValues: { code, description, sellPrice, stockUnits }
    })
    const { handleSubmit } = form;

    async function onSubmit({ code, description, sellPrice, stockUnits }: EditProductFormData) {
        try {
            await editProductFn({ code, name: description, sellPrice, stockAmount: stockUnits })

            toast({
                variant: 'default',
                description: "Alteração salva!!"
            })

            setIsDialogOpen(false)

        } catch (err) {
            alert(`Erro ao salvar alterações: ${err}`)
        }
    }

    return (
        <>
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <Button size="icon">
                        <Pencil />
                    </Button>
                </DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            Editar Produto
                        </DialogTitle>
                        <DialogDescription>
                            Edite o produto no estoque.
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
                                                disabled
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
                                    {isPending ? 'Salvando...' : 'Salvar'}
                                </Button>
                            </DialogFooter>
                        </form>
                    </Form>
                </DialogContent>
            </Dialog>
        </>
    )
}