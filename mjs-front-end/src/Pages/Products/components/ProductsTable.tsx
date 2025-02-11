import { Product } from "@/Models/Product"
import DataTable from "@/components/DataTable"
import { columns } from "./ProductsTableColumns"

interface ProductsTableProps {
  products: Product[]
}

export default function ProductsTable({ products }: ProductsTableProps) {

  return (
    <DataTable columns={columns} data={products} />
  )
}