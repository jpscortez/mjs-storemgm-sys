import SellInputs from "./components/SellInputs";
import SellTotal from "./components/SellTotal";
import SellProductTable from "./components/SellProductTable";
import { ShoppingBag } from "lucide-react";
import { CartProvider } from "./components/CartProvider";
import SellConfirmButton from "./components/SellConfirmButton";
import Page from "@/components/Page";
import MyCard from "@/components/Card";

export default function NewSalePage() {

  return (
    <Page>
      <MyCard.Root>
        <MyCard.Header>
          <MyCard.Title title="Nova Venda" icon={ShoppingBag}/>
        </MyCard.Header>
        <MyCard.Content>
          <div className="flex flex-col min-h-96 gap-2">
            <CartProvider>
              <SellInputs />
              <SellProductTable />
              <SellTotal />
              <SellConfirmButton />
            </CartProvider>
          </div>
        </MyCard.Content>
      </MyCard.Root>
    </Page>

  )
}