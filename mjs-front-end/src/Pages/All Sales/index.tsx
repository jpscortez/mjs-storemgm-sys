import { useQuery } from "@tanstack/react-query"
import { CircleDollarSign } from "lucide-react"
import SalesTable from "./components/SalesTable"
import { getSales } from "@/services/sell"

export default function AllSalesPage() {
    const { data: sales, isLoading } = useQuery({
        queryKey: ['sales'],
        queryFn: getSales,
      })
    
      return (
        <div className="w-full my-6 p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300">
          <div className="grid">
            <div className="inline-flex justify-between">
              <h3 className="inline-flex items-center gap-2 text-2xl">
                <CircleDollarSign />
                <span>
                  Minhas Vendas
                </span>
              </h3>
            </div>
            {
              isLoading ? <div>Carregando...</div> :
                <SalesTable sales={sales ?? []} />
            }
          </div>
        </div>
    
      )
}