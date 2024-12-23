import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Trash } from "lucide-react";
import { useState } from "react";

export function RemoveProductDialog() {
    const [isOpen, setIsOpen] = useState(false);


    // Function to handle confirmation (e.g., deleting an item)
    const handleConfirm = () => {
        // Perform your action here (e.g., delete the item)
        console.log('Item deleted!');
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