import { parsePrice } from "@/Utils/Functions/parser"
import { useCart } from "../useCart"


export default function CartTotal() {
    const { products } = useCart()

    return (
        <div className="flex justify-between px-2">
            <h3 className="font-bold text-2xl">TOTAL</h3>
            <div className="flex p-2">
                <div className="flex flex-col w-20 text-center">
                    <b>QTDE</b>
                    <span className="text-xl">
                        {products.map((p) => p.amount).reduce((total, p) => total += p, 0)}
                    </span>
                </div>
                <div className="flex flex-col w-40 text-right">
                    <b>TOTAL A PAGAR</b>
                    <span className="text-xl">
                        {parsePrice(products.map((p) => p.amount * p.price).reduce((total, p) => total += p, 0))}
                    </span>
                </div>
            </div>
        </div>
    )
}