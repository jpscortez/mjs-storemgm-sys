import {PieChart} from "@/components/Charts/PieChart";
import {ChartConfig} from "@/components/ui/chart";
import {PaymentMethodType} from "@/Models/PaymentMethod";
import {getSalesByPaymentMethod} from "@/services/dashboard";
import {useQuery} from "@tanstack/react-query";
import {CreditCard} from "lucide-react";
import {useEffect, useState} from "react";

const chartDataDefault: SalesByPaymentChartData[] = [
	{paymentMethod: "Dinheiro", label: PaymentMethodType.Cash, total: 0, fill: "var(--color-Dinheiro)"},
	{paymentMethod: "Credito", label: PaymentMethodType.CreditCard, total: 0, fill: "var(--color-Credito)"},
	{paymentMethod: "Debito", label: PaymentMethodType.DebitCard, total: 0, fill: "var(--color-Debito)"},
	{paymentMethod: "Pix", label: PaymentMethodType.Pix, total: 0, fill: "var(--color-Pix)"},
	{
		paymentMethod: "Prazo",
		label: PaymentMethodType.OutstandingBalance,
		total: 0,
		fill: "var(--color-Prazo)",
	},
];

type SalesByPaymentChartData = {
	paymentMethod: string; // Accepts any string
	label: PaymentMethodType; // Accepts any string
	total: number; // Accepts any number
	fill: string; // Accepts any string
};

const chartConfig = {
	total: {
		label: "Total",
	},
	Dinheiro: {
		label: "Dinheiro",
		color: "hsl(var(--chart-2))",
	},
	Credito: {
		label: "Cartão de Crédito",
		color: "hsl(var(--chart-1))",
	},
	Debito: {
		label: "Cartão de Débito",
		color: "hsl(var(--chart-3))",
	},
	Pix: {
		label: "Pix",
		color: "hsl(var(--chart-4))",
	},
	Prazo: {
		label: "A Prazo",
		color: "hsl(var(--chart-5))",
	},
} satisfies ChartConfig;

export function SalesByPaymentMethodChartCard() {
	const {data: sales, isLoading} = useQuery({
		queryKey: ["dashboard", "salesByPaymentMethod"],
		queryFn: getSalesByPaymentMethod,
	});
	const [chartData, setChartData] = useState(chartDataDefault);

	useEffect(() => {
		if (sales) {
			setChartData(chartDataDefault);
			sales.forEach((s) => {
				setChartData((old) => {
					const curr = old.find((cd) => cd.label === s.paymentMethod);
					if (curr) {
						curr.total = s.total;
					}
					return old;
				});
			});
			setChartData((old) => old.filter((curr) => curr.total > 0));
		}
	}, [sales, chartData]);

	return (
		<section className="col-span-3 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<CreditCard />
				<h3>Meios de Pagamento</h3>
			</div>
			{!isLoading && (
				<PieChart chartConfig={chartConfig} chartData={chartData} nameKey="paymentMethod" dataKey="total" />
			)}
		</section>
	);
}
