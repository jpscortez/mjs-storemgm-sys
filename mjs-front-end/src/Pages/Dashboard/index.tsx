import Page from "@/components/Page";
import {ClientOpenDebtsListCard} from "./components/ClientOpenDebtsListCard";
import {LowStockAlertCard} from "./components/LowStockAlertCard";
import {PaymentMethodChartCard} from "./components/PaymentMethodChartCard";
import {RecievablesChartCard} from "./components/RecievablesChartCard";

export default function DashboardPage() {
	return (
		<Page>
			<div className="h-full grid grid-cols-8 grid-rows-4 gap-4 grid-flow-row-dense">
				<RecievablesChartCard />
				<PaymentMethodChartCard />
				<ClientOpenDebtsListCard />
				<LowStockAlertCard />
			</div>
		</Page>
	);
}
