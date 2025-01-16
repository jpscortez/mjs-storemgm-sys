import { Button } from "@/components/ui/button";
import SellInputs from "./SellInputs";
import SellTotal from "./SellTotal";
import SellProductTable from "./SellProductTable";
import { CircleDollarSign } from "lucide-react";
import { CartProvider } from "./components/CartProvider";

export default function SellPage() {

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300">
      <div>
        <h2 className="inline-flex gap-2 items-center text-2xl py-4">
          <CircleDollarSign />
          <span>
            Venda
          </span>
        </h2>
      </div>
      <div className="flex flex-col min-h-96 gap-2">
      <CartProvider>
        <SellInputs />
        <SellProductTable />
        <SellTotal />
        <Button variant="filled">CONCLUIR</Button>
      </CartProvider>
      </div>
    </div>

  )
}