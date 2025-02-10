import DataTable from "@/store/DataTable"
import { columns } from "./SalesTableColumns"
import { Sale } from "@/Models/Sale"
import { useNavigate } from "react-router-dom";

interface SalesTableProps {
  sales: Sale[]
}

export default function SalesTable({ sales: products }: SalesTableProps) {
  const navigate = useNavigate();

  function navigateToSellDetail(sale: Sale)
  {
    navigate(`/sales/${sale.saleId}`)
  }

  return (
    <DataTable columns={columns} data={products} onRowDblClick={navigateToSellDetail} />
  )
}