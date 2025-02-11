import MyCard from "@/components/Card";
import Page from "@/components/Page";
import { getSale } from "@/services/sell";
import { parsePrice } from "@/Utils/Functions/parser";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { CircleDollarSign, LoaderCircle } from "lucide-react";
import { Navigate, useParams } from "react-router-dom";

export default function SaleDetailPage() {
  const { saleId } = useParams();

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
      <Page backUri="/sales">
        <MyCard.Root>
          <MyCard.Header>
            <MyCard.Title title="Detalhes da venda" icon={CircleDollarSign}></MyCard.Title>
          </MyCard.Header>
          <MyCard.Content>
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
          </MyCard.Content>
        </MyCard.Root>
      </Page>
    </>
    )
  
}