import { Button } from "@/components/ui/button";
import { useCart } from "./useCart";
import { SaleDTO } from "@/Models/SaleDTO";
import { useMutation } from "@tanstack/react-query";
import { registerSale } from "@/data/sell";
import { LoaderCircle } from "lucide-react";
import { useToast } from "@/hooks/useToast";

export default function SellConfirmButton() {
    const { products, isEmpty, reset } = useCart()
    const { toast } = useToast()

    const { mutateAsync: registerSaleFn, isPending } = useMutation({
        mutationFn: registerSale,
        onSuccess: () => {
            console.log("Trigger offer to export excel...")

            toast({
                variant: 'default',
                description: "Venda Registrada!"
            })

            reset()
        }
    })

    async function onRegisterSale() {

        const sale = products.reduce((acc, { code, amount, discount, price }) => {
            const productTotal = amount * (price - discount);

            acc.total += productTotal;
            acc.amount += amount;
            acc.products.push({ code, amount, discount, price, total: productTotal });
            return acc;
        }, { total: 0, products: [], amount: 0 } as SaleDTO)

        await registerSaleFn(sale)
    }

    return (
        <Button variant="filled" onClick={onRegisterSale} disabled={isEmpty}>
            {isPending && <LoaderCircle />}
            CONCLUIR
        </Button>
    )
}