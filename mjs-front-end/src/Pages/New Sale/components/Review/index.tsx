import {Button} from "@/components/ui/button";
import {useNewSale} from "../../New Sale Provider/useNewSale";
import {useStepper} from "@/components/Stepper/useStepper";
import {ScrollText} from "lucide-react";
import {formatPrice} from "@/Utils/Functions/parser";
import {Separator} from "@/components/ui/separator";

export function Review() {
	const {onRegisterSale, customer, paymentMethod, total, products} = useNewSale();
	const {previousStep} = useStepper();

	return (
		<div className="h-full flex flex-col gap-2">
			<div className="flex-1 grid grid-cols-2">
				<div className="p-4">
					<div className="h-1/3">
						Cliente
						<p>{customer}</p>
					</div>
					<div className="h-1/3">
						Pagamento
						<p>{paymentMethod}</p>
					</div>
				</div>
				<div className="relative rounded-t-lg border-slate-950 border border-b-transparent flex flex-col p-4 gap-2">
					<div>
						<b className="text-xl">RESUMO</b>
					</div>
					<Separator />
					<div className="flex-1 overflow-y-auto">
						{products.map((p, index) => (
							<div key={index} className="w-full py-2 inline-flex uppercase justify-between">
								<p>{p.name}</p>
								<b>X {p.amount}</b>
							</div>
						))}
					</div>
					<Separator />
					<div className="w-full inline-flex justify-between">
						<div className="inline-flex items-center">
							<ScrollText />
							<b className="text-xl">TOTAL</b>
						</div>
						<div>
							<p className="text-2xl">{formatPrice(total)}</p>
						</div>
					</div>
					<div className="shark-teeth-bottom h-10 bg-gray-800"></div>
					<div className="shark-teeth-bottom h-5 bg-white"></div>
				</div>
			</div>
			<div className="inline-flex justify-between">
				<Button variant="filled" onClick={previousStep}>
					VOLTAR
				</Button>
				<Button onClick={onRegisterSale} variant="filled">
					CONCLUIR VENDA
				</Button>
			</div>
		</div>
	);
}
