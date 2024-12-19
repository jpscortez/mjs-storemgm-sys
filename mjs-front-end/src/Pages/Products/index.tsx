import { Product } from "@/Models/Product"
import ProductsTable from "./components/ProductsTable"
import { Button } from "@/components/ui/button"

export default function ProductsPage() {

  const products: Product[] = [
    {
      name: 'Apple MacBook Pro 17"',
      code: '0',
      category: 'Laptop',
      price: 2999
    },
    {
      name: 'Microsoft Surface Pro',
      code: '0',
      category: 'Laptop PC',
      price: 1999
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 98
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
    {
      name: 'Magic Mouse 2',
      code: '0',
      category: 'Accessories',
      price: 99
    },
  ]

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-50 grid">
      <Button variant="filled" className="my-2">ADICIONAR</Button>
      <ProductsTable products={products} />
    </div>

  )
}