import Page from "@/components/Page";
import {ShoppingBasket} from "lucide-react";
import {HomePageShortCutBtn} from "./components/HomePageShortCutBtn";

export default function HomePage() {
	return (
		<Page>
			<div className="grid grid-cols-6 gap-4">
				<HomePageShortCutBtn to="/new-sale" caption="Nova Venda" icon={ShoppingBasket} />
			</div>
		</Page>
	);
}
