import {ClientOpenAccountsListCard} from "./components/Lists/ClientOpenAccountsListCard";
import {LowStockAlertCard} from "./components/Lists/LowStockAlertCard";
import {SalesByPaymentMethodChartCard} from "./components/Charts/SalesByPaymentMethodChartCard";
import {RecievablesChartCard} from "./components/Charts/RecievablesChartCard";

export default function DashboardPage() {
	return (
		<div className="h-screen grid grid-cols-8 grid-rows-5 gap-4 grid-flow-row-dense">
			<RecievablesChartCard />
			<SalesByPaymentMethodChartCard />
			<ClientOpenAccountsListCard />
			<LowStockAlertCard />
		</div>
	);
}
