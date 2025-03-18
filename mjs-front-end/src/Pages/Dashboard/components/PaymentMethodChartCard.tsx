import {PieChart} from "@/components/Charts/PieChart";
import {ChartConfig} from "@/components/ui/chart";
import {CreditCard} from "lucide-react";

const chartData = [
	{paymentMethod: "cash", visitors: 200, fill: "var(--color-cash)"},
	{paymentMethod: "creditCart", visitors: 187, fill: "var(--color-creditCart)"},
	{paymentMethod: "debitCard", visitors: 90, fill: "var(--color-debitCard)"},
	{paymentMethod: "pix", visitors: 130, fill: "var(--color-pix)"},
];

const chartConfig = {
	visitors: {
		label: "Visitors",
	},
	cash: {
		label: "Dinheiro",
		color: "hsl(var(--chart-2))",
	},
	creditCart: {
		label: "Cartão de Crédito",
		color: "hsl(var(--chart-1))",
	},
	debitCard: {
		label: "Cartão de Débito",
		color: "hsl(var(--chart-3))",
	},
	pix: {
		label: "Pix",
		color: "hsl(var(--chart-4))",
	},
} satisfies ChartConfig;

export function PaymentMethodChartCard() {
	return (
		<section className="col-span-3 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<CreditCard />
				<h3>Meios de Pagamento</h3>
			</div>
			<PieChart chartConfig={chartConfig} chartData={chartData} dataKey="visitors" nameKey="paymentMethod" />
		</section>
	);
}
