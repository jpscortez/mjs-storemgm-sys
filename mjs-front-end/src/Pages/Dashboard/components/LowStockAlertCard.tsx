import {joinWithMaxLength} from "@/Utils/Functions/joinWithMaxLenght";
import {Layers} from "lucide-react";
import {twMerge} from "tailwind-merge";

const products = [
	{
		name: "Chuveiro",
		stockAmount: 18,
	},
	{
		name: "Valvula 80mm",
		stockAmount: 15,
	},
	{
		name: "joelho 90 graus soldavel 25mm",
		stockAmount: 5,
	},
];

export function LowStockAlertCard() {
	return (
		<section className="col-span-2 row-span-1 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<Layers />
				<h3>Estoque Baixo</h3>
			</div>
			<div className="text-sm overflow-auto">
				{products.map((u) => (
					<>
						<ul className="inline-flex justify-between w-full py-2">
							<div className="inline-flex items-center gap-2">
								<div
									className={twMerge(
										"size-2 rounded-full",
										u.stockAmount <= 5 ? "bg-red-500" : "bg-yellow-500"
									)}
								/>
								{joinWithMaxLength([u.name], 20)}
							</div>
							<span className="ml-auto">{u.stockAmount}</span>
						</ul>
						<div className="w-full border-b last:hidden" />
					</>
				))}
			</div>
		</section>
	);
}
