import {CartesianGrid, XAxis, YAxis, AreaChart, Area} from "recharts";
import {ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

type LineChartProps = {
	chartConfig: ChartConfig;
	chartData: {[key: string]: string | number}[] | undefined;
};

export function LineChart({chartConfig, chartData}: LineChartProps) {
	return (
		<ChartContainer config={chartConfig}>
			<AreaChart
				accessibilityLayer
				data={chartData}
				margin={{
					left: 12,
					right: 12,
				}}
			>
				<CartesianGrid vertical={false} />
				<XAxis
					dataKey="month"
					tickLine={false}
					axisLine={false}
					tickMargin={8}
					tickFormatter={(value) => value.slice(0, 3)}
				/>
				<YAxis tickLine={false} axisLine={false} tickMargin={8} tickCount={3} />

				<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />

				<defs>
					{Object.keys(chartConfig).map((c) => (
						<linearGradient key={c} id={`fill${c}`} x1="0" y1="0" x2="0" y2="1">
							<stop offset="5%" stopColor={`var(--color-${c})`} stopOpacity={0.8} />
							<stop offset="95%" stopColor={`var(--color-${c})`} stopOpacity={0.1} />
						</linearGradient>
					))}
				</defs>
				{Object.keys(chartConfig).map((c) => (
					<Area
						key={c}
						dataKey={c}
						type="linear"
						fill={`url(#fill${c})`}
						fillOpacity={0.4}
						stroke={`var(--color-${c})`}
						stackId="a"
					/>
				))}
			</AreaChart>
		</ChartContainer>
	);
}
