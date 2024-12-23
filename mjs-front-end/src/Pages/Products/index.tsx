import ProductsTable from "./components/ProductsTable"
import { AddProductDialog } from "./components/AddProductDialog"
import { getProducts } from "@/data/products"
import { useQuery } from "@tanstack/react-query"
import { PackageOpen } from "lucide-react"

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className="w-full my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300">
      <div className="grid">
        <div className="inline-flex justify-between">
          <h3 className="inline-flex items-center gap-2 text-2xl">
            <PackageOpen />
            <span>
              Produtos
            </span>
          </h3>
          <AddProductDialog />
        </div>
        {
          isLoading ? <div>Carregando...</div> :
            <ProductsTable products={products ?? []} />
        }
      </div>
    </div>

  )
}