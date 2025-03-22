import Page from "@/components/Page";
import {ClientOpenAccountsListCard} from "./components/ClientOpenAccountsListCard";
import {LowStockAlertCard} from "./components/LowStockAlertCard";
import {SalesByPaymentMethodChartCard} from "./components/SalesByPaymentMethodChartCard";
import {RecievablesChartCard} from "./components/RecievablesChartCard";

export default function DashboardPage() {
	return (
		<Page>
			<div className="h-full grid grid-cols-8 grid-rows-4 gap-4 grid-flow-row-dense">
				<RecievablesChartCard />
				<SalesByPaymentMethodChartCard />
				<ClientOpenAccountsListCard />
				<LowStockAlertCard />
			</div>
		</Page>
	);
}
