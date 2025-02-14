import CartInputs from "./components/Cart/CartInputs";
import CartTotal from "./components/Cart/CartTotal";
import SellProductTable from "./components/Cart/CartProductTable";
import {Check, CreditCard, ShoppingBag, ShoppingCart, Users} from "lucide-react";
import {CartProvider} from "./components/Cart/CartProvider";
import CartConfirmButton from "./components/Cart/CartConfirmButton";
import Page from "@/components/Page";
import MyCard from "@/components/Card";
import {Stepper} from "@/components/Stepper";
import {StepperHeader} from "@/components/Stepper/StepperHeader";
import {StepperContent} from "@/components/Stepper/StepperContent";

export default function NewSalePage() {
	const stepsIcons = [Users, ShoppingCart, CreditCard, Check];

	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title title="Nova Venda" icon={ShoppingBag} />
				</MyCard.Header>
				<MyCard.Content>
					<div className="flex flex-col min-h-96 gap-2">
						<Stepper>
							<StepperHeader />
							<StepperContent stepsIcons={stepsIcons}>
								<p>content 1</p>
								<CartProvider>
									<CartInputs />
									<SellProductTable />
									<CartTotal />
									<CartConfirmButton />
								</CartProvider>
								<p>content 3</p>
								<p>content 4</p>
							</StepperContent>
						</Stepper>
					</div>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
