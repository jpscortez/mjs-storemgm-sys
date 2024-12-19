import { Button } from "@/components/ui/button";
import SellInputs from "./SellInputs";
import SellTotal from "./SellTotal";
import { SoldProduct } from "@/Models/Product";
import SellProductTable from "./SellProductTable";
import { useState } from "react";

export default function SellPage() {
  const [addedProducts, addProducts] = useState<SoldProduct[]>([])

  function onProductSubmitted(newProduct: SoldProduct) {
    addProducts((oldProductList) => {
      return [...oldProductList, newProduct]
    }
    )
  }

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300">
      <div>
        <h2 className="text-2xl py-4">Venda</h2>
      </div>
      <div className="flex flex-col min-h-96 gap-2">
        <SellInputs addProduct={onProductSubmitted} />
        <SellProductTable products={addedProducts} />
        <SellTotal products={addedProducts} />
        <Button variant="filled">CONCLUIR</Button>
      </div>
    </div>

  )
}