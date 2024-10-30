import { Button } from "@/components/ui/button";
import SellInputs from "./SellInputs";
import SellTotal from "./SellTotal";
import { SoldProduct } from "@/Models/Product";
import SellProductTable from "./SellProductTable";

export default function SellPage() {
  const addedProducts: SoldProduct[] = [
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
    {
      name: 'Apple MacBook Pro 17"',
      code: '0000',
      category: 'Laptop',
      price: 2999,
      amount: 2
    },
  ]

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-700">
      <div>
        <h2 className="text-2xl py-4">Venda</h2>
      </div>
      <div className="flex flex-col min-h-96 gap-2">
        <SellInputs />
        <SellProductTable products={addedProducts} />
        <SellTotal />
        <Button>CONCLUIR</Button>
      </div>
    </div>

  )
}