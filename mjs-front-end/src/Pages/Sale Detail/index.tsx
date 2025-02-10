import { Button } from "@/components/ui/button";
import { getSale } from "@/services/sell";
import { parsePrice } from "@/Utils/Functions/parser";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { ArrowLeft, CircleDollarSign, LoaderCircle } from "lucide-react";
import { Navigate, useNavigate, useParams } from "react-router-dom";

export default function SaleDetailPage() {
  const { saleId } = useParams();
  const navigate = useNavigate()

  const { data: sale, isLoading, error } = useQuery({
      queryKey: ["sale", saleId],
      queryFn: () => getSale(parseInt(saleId!)),
      enabled: !!saleId
    })

  if (!saleId || error) {
    return <Navigate to="/" replace />
  }

  if (isLoading) {
    return <LoaderCircle />
  }

  return (
    <>
      <Button size="icon" onClick={() => navigate("/sales")}>
        <ArrowLeft />
      </Button>
      <div className="w-full p-6 rounded-lg bg-slate-50 shadow-xl shadow-slate-300">

        <div className="grid gap-2">
          <div className="inline-flex justify-between">
            <h3 className="inline-flex items-center gap-2 text-2xl">
              <CircleDollarSign />
              <span>
                Detalhes da venda
              </span>
            </h3>
          </div>
          <div>
            <p>Data: {format(sale!.timestamp, "dd/MM/yyyy 'às' hh:mm")}</p>
            <p>Items Vendidos: {sale!.numItems}</p>
            <p>Total Pago: {parsePrice(sale!.totalPaid)}</p>
          </div>
          <div className="grid grid-cols-4 gap-2">
            {sale!.products.map((product, index) => (
              <div key={`soldProducts-${saleId}-${index}`} className="p-2 outline rounded">
                <p>Amount: {product.numItem}</p>
                <p>Produto: {product.name}</p>
                <p>Total: {parsePrice(product.totalPaid)}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
    )
  
}