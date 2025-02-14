import Page from "@/components/Page";
import {Check, CreditCard, PackageOpen, ShoppingCart, Users} from "lucide-react";
import MyCard from "@/components/Card";
import {Stepper} from "@/components/Stepper";
import {StepperContent} from "@/components/Stepper/StepperContent";
import {StepperHeader} from "@/components/Stepper/StepperHeader";

export default function TestPage() {
	const stepsIcons = [Users, ShoppingCart, CreditCard, Check];

	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title icon={PackageOpen} title="Título teste" />
				</MyCard.Header>
				<MyCard.Content>
					<Stepper>
						<StepperHeader />
						<StepperContent stepsIcons={stepsIcons}>
							<p>content 1</p>
							<p>content 2</p>
							<p>content 3</p>
							<p>content 4</p>
						</StepperContent>
					</Stepper>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
