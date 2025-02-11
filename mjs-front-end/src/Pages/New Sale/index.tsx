import CartInputs from "./components/Cart/CartInputs";
import CartTotal from "./components/Cart/CartTotal";
import SellProductTable from "./components/Cart/CartProductTable";
import { ShoppingBag } from "lucide-react";
import { CartProvider } from "./components/Cart/CartProvider";
import CartConfirmButton from "./components/Cart/CartConfirmButton";
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
              <CartInputs />
              <SellProductTable />
              <CartTotal />
              <CartConfirmButton />
            </CartProvider>
          </div>
        </MyCard.Content>
      </MyCard.Root>
    </Page>

  )
}