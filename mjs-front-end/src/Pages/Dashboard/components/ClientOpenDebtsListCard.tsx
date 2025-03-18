import {joinWithMaxLength} from "@/Utils/Functions/joinWithMaxLenght";
import {formatPrice} from "@/Utils/Functions/parser";
import {Users} from "lucide-react";

const users = [
	{
		name: "Rafaela Sanches Araújo",
		openDebts: 100,
	},
	{
		name: "João Cortez",
		openDebts: 200,
	},
	{
		name: "Pricila Rodrigues",
		openDebts: 55,
	},
];

export function ClientOpenDebtsListCard() {
	return (
		<section className="col-span-2 row-span-2 p-6 shadow-2xl rounded-lg">
			<div className="w-full flex flex-row gap-4 items-center pb-2">
				<Users />
				<h3>Contas em aberto</h3>
			</div>
			<div className="text-sm">
				{users.map((u) => (
					<ul className="inline-flex justify-between w-full py-2 border-b">
						<div>{joinWithMaxLength([u.name], 15)}</div>
						<span className="ml-auto">{formatPrice(u.openDebts)}</span>
					</ul>
				))}
			</div>
		</section>
	);
}
