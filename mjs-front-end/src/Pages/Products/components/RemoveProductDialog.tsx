import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { deleteProduct } from "@/data/products";
import { Product } from "@/Models/Product";
import { queryClient } from "@/Utils/react-query";
import { useMutation } from "@tanstack/react-query";
import { Trash } from "lucide-react";
import { useState } from "react";

interface RemoveProductDialogProps {
    product: Product
}

export function RemoveProductDialog({ product } : RemoveProductDialogProps) {
    const [isOpen, setIsOpen] = useState(false);

    const { mutateAsync: deleteProductFn } = useMutation({
        mutationFn: deleteProduct,
        onSuccess(_, code) {
            queryClient.setQueryData(['products'], (data: Product[]) => {
                const newData = data.filter((p) => p.code !== code)
                return newData
            })
        },
    })
    
    // Function to handle confirmation (e.g., deleting an item)
    const handleConfirm = () => {
        // Perform your action here (e.g., delete the item)
        deleteProductFn(product.code)
        
        closeDialog(); // Close the dialog after confirming
    };
    const closeDialog = () => setIsOpen(false);

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button size="icon" className="text-red-500 hover:bg-red-500/10">
                    <Trash />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle>Tem certeza de que gostaria de deletar este produto?</DialogTitle>
                <DialogDescription>Essa ação não pode ser desfeita.</DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="default">Cancelar</Button>
                    </DialogClose>
                    <Button variant="filled" className="uppercase" onClick={handleConfirm}>
                        Remover
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}