import {Pie, PieChart as PieChartComponent} from "recharts";

import {ChartConfig, ChartContainer, ChartLegend, ChartTooltip, ChartTooltipContent} from "@/components/ui/chart";

type PieChartProps = {
	chartConfig: ChartConfig;
	dataKey: string;
	nameKey: string;
	chartData: {[key: string]: string | number}[] | undefined;
};

export function PieChart({chartConfig, dataKey, nameKey, chartData}: PieChartProps) {
	console.log(chartData);
	return (
		<ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px]">
			<PieChartComponent>
				<ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
				<Pie
					data={chartData}
					dataKey={dataKey}
					nameKey={nameKey}
					innerRadius={30}
					labelLine={true}
					label={({payload, ...props}) => {
						return (
							<text
								cx={props.cx}
								cy={props.cy}
								x={props.x}
								y={props.y}
								textAnchor={props.textAnchor}
								dominantBaseline={props.dominantBaseline}
								fill="hsla(var(--foreground))"
							>
								{`${payload[dataKey]}`}
							</text>
						);
					}}
				/>
				<ChartLegend />
			</PieChartComponent>
		</ChartContainer>
	);
}
