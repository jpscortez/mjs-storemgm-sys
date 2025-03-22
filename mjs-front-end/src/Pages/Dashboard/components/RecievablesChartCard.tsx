import {LineChart} from "@/components/Charts/LineChart";
import {ChartConfig} from "@/components/ui/chart";
import {DollarSign} from "lucide-react";

const chartData = [
	{month: "January", Recebido: 186, Devido: 0},
	{month: "February", Recebido: 305, Devido: 0},
	{month: "March", Recebido: 237, Devido: 0},
	{month: "April", Recebido: 73, Devido: 0},
	{month: "May", Recebido: 209, Devido: 20},
	{month: "June", Recebido: 214, Devido: 140},
];

const chartConfig = {
	Recebido: {
		label: "Recebido",
		color: "hsl(var(--chart-2))",
	},
	Devido: {
		label: "Devido",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function RecievablesChartCard() {
	return (
		<section className="col-span-4 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<DollarSign />
				<h3>Vendas</h3>
			</div>
			<LineChart chartConfig={chartConfig} chartData={chartData}></LineChart>
		</section>
	);
}
