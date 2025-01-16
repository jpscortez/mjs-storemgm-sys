import { Button } from "@/components/ui/button";
import { useCart } from "./useCart";
import { SaleDTO } from "@/Models/SaleDTO";

export default function SellConfirmButton() {
    const { products } = useCart()

    function onSubmit() {

        const sale = products.reduce((acc, { code, amount, discount, price }) => {
            const productTotal = amount * (price - discount);

            acc.total += productTotal;
            acc.amount += amount;
            acc.products.push({ code, amount, discount, price, total: productTotal });
            return acc;
        }, { total: 0, products: [], amount: 0 } as SaleDTO)

        console.log(sale)
    }

    return (
        <Button variant="filled" onClick={onSubmit}>CONCLUIR</Button>
    )
}