import {Check, CreditCard, ShoppingBag, ShoppingCart, Users} from "lucide-react";
import {NewSaleProvider} from "./New Sale Provider/NewSaleProvider";
import Page from "@/components/Page";
import MyCard from "@/components/Card";
import {Stepper} from "@/components/Stepper";
import {StepperHeader} from "@/components/Stepper/StepperHeader";
import {StepperContent} from "@/components/Stepper/StepperContent";
import {Cart} from "./components/Cart";
import {Customer} from "./components/Customer";
import {PaymentMethod} from "./components/PaymentMethod";
import {Review} from "./components/Review";

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
							<NewSaleProvider>
								<StepperContent stepsIcons={stepsIcons}>
									<Customer />
									<Cart />
									<PaymentMethod />
									<Review />
								</StepperContent>
							</NewSaleProvider>
						</Stepper>
					</div>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
