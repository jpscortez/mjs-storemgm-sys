import { useQuery } from "@tanstack/react-query"
import { CircleDollarSign } from "lucide-react"
import SalesTable from "./components/SalesTable"
import { getSales } from "@/services/sell"
import Page from "@/components/Page"
import MyCard from "@/components/Card"

export default function AllSalesPage() {
    const { data: sales, isLoading } = useQuery({
        queryKey: ['sales'],
        queryFn: getSales,
      })
    
      return (
        <Page>
          <MyCard.Root>
            <MyCard.Header>
              <MyCard.Title icon={CircleDollarSign} title="Minhas Vendas" />
            </MyCard.Header>
            <MyCard.Content>
              {
                isLoading ? <div>Carregando...</div> :
                  <SalesTable sales={sales ?? []} />
              }
            </MyCard.Content>
          </MyCard.Root>
        </Page>
    
      )
}