import ProductsTable from "./components/ProductsTable"
import { AddProductDialog } from "./components/AddProductDialog"
import { getProducts } from "@/services/products"
import { useQuery } from "@tanstack/react-query"
import { PackageOpen } from "lucide-react"
import Page from "@/components/Page"
import MyCard from "@/components/Card"

export default function ProductsPage() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <Page>
      <MyCard.Root>
        <MyCard.Header>
          <MyCard.Title icon={PackageOpen} title="Produtos"></MyCard.Title>
          <MyCard.Actions>
            <AddProductDialog />
          </MyCard.Actions>
        </MyCard.Header>
        <MyCard.Content>
        {
          isLoading ? <div>Carregando...</div> :
            <ProductsTable products={products ?? []} />
        }
        </MyCard.Content>
      </MyCard.Root>
    </Page>

  )
}