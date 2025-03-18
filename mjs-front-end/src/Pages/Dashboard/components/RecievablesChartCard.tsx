import {LineChart} from "@/components/Charts/LineChart";
import {ChartConfig} from "@/components/ui/chart";
import {DollarSign} from "lucide-react";

const chartData = [
	{month: "January", recieved: 186, toBePaid: 0},
	{month: "February", recieved: 305, toBePaid: 0},
	{month: "March", recieved: 237, toBePaid: 0},
	{month: "April", recieved: 73, toBePaid: 0},
	{month: "May", recieved: 209, toBePaid: 20},
	{month: "June", recieved: 214, toBePaid: 140},
];

const chartConfig = {
	recieved: {
		label: "Pago",
		color: "hsl(var(--chart-2))",
	},
	toBePaid: {
		label: "A Receber",
		color: "hsl(var(--chart-1))",
	},
} satisfies ChartConfig;

export function RecievablesChartCard() {
	return (
		<section className="col-span-4 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<DollarSign />
				<h3>Valores a Receber</h3>
			</div>
			<LineChart chartConfig={chartConfig} chartData={chartData}></LineChart>
		</section>
	);
}
