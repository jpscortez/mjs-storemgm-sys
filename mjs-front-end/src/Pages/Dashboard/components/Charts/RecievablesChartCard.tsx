import {LineChart} from "@/components/Charts/LineChart";
import {ChartConfig} from "@/components/ui/chart";
import {format} from "date-fns";
import {DollarSign} from "lucide-react";
import {ptBR} from "date-fns/locale";
import {toCaptalLetter} from "@/Utils/Functions/toCaptalLetter";
import {useQuery} from "@tanstack/react-query";
import {getDashboardSalesByStatus} from "@/services/dashboard";

const chartConfig = {
	Devido: {
		label: "Devido",
		color: "hsl(var(--chart-1))",
	},
	Recebido: {
		label: "Recebido",
		color: "hsl(var(--chart-2))",
	},
} satisfies ChartConfig;

export function RecievablesChartCard() {
	const {data: sales, isLoading} = useQuery({
		queryKey: ["dashboard", "salesByStatus"],
		queryFn: getDashboardSalesByStatus,
	});

	return (
		<section className="col-span-3 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<DollarSign />
				<h3>{`Vendas Acumuladas - ${toCaptalLetter(format(new Date(), "MMMM yyyy", {locale: ptBR}))}`}</h3>
			</div>
			{!isLoading && <LineChart chartConfig={chartConfig} dataKey="day" chartData={sales!}></LineChart>}
		</section>
	);
}
