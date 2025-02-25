import {Separator} from "@/components/ui/separator";
import {SaleDetail} from "@/Models/SaleDetail";
import {formatCode} from "@/Utils/Functions/formatCode";
import {formatPrice} from "@/Utils/Functions/parser";
import {format} from "date-fns";

type SaleDetailPrintContentProps = {
	sale: SaleDetail;
};

export function SaleDetailPrintContent({sale}: SaleDetailPrintContentProps) {
	return (
		<div className="px-8 py-4">
			<header className="border p-2">
				<h2 className="text-center">MJS Materiais Hidráulicos - 48213120000101 Telefone (11) 98463226</h2>
				<p className="text-center">EST CIPRIANO PEROBELLI, 600 - ESTANCIA MARIA ELISA - Jarinu</p>
			</header>
			<p className="text-center">Este documento não possui validade fiscal</p>
			<table className="p-2 w-full">
				<thead className="border">
					<tr>
						<td className="font-bold">Código</td>
						<td className="font-bold">Descrição</td>
						<td className="font-bold">Valor Unitário</td>
						<td className="font-bold">Qtde</td>
						<td className="font-bold">Desc</td>
						<td className="font-bold">Valor Total</td>
					</tr>
				</thead>
				<tbody>
					{sale.products.map((p, index) => (
						<tr key={index}>
							<td>{formatCode(p.code)}</td>
							<td>{p.name}</td>
							<td>{formatPrice(p.price)}</td>
							<td>{p.numItems.toFixed(4)}</td>
							<td>0.00</td>
							<td>{formatPrice(p.totalPaid)}</td>
						</tr>
					))}
				</tbody>
			</table>
			<div className="w-full border px-2 flex justify-between">
				<b>Forma pagamento</b>
				<b>Valor pago</b>
			</div>
			<div className="w-full px-2 flex justify-between">
				<span>{sale.paymentMethod}</span>
				<span>{formatPrice(sale.totalPaid)}</span>
			</div>
			<Separator />
			<div className="grid grid-cols-6 gap-1 py-2">
				<span className="text-end text-xs">
					<b>Total dos itens:</b>
				</span>
				<span className="text-start text-xs">{formatPrice(sale.totalPaid)}</span>
				<span className="text-end text-xs">
					<b>Qtde. Items:</b>
				</span>
				<span className="text-start text-xs">{sale.numItems.toFixed(4)}</span>
				<span className="text-end text-xs">
					<b>Vendedor:</b>
				</span>
				<span className="text-start text-xs"></span>
				<span className="text-end text-xs">
					<b>Valor da Venda:</b>
				</span>
				<span className="text-start text-xs">{formatPrice(sale.totalPaid)}</span>
				<span className="text-end text-xs">
					<b>Desconto:</b>
				</span>
				<span className="text-start text-xs">R$ 0.00</span>
				<span className="text-end text-xs">
					<b>Data da Venda:</b>
				</span>
				<span className="text-start text-xs">{format(sale.timestamp, "dd/MM/yyyy HH:mm")}</span>
			</div>
			<Separator />
			<div className="w-full p-0 m-0 text-xs">
				<div className="w-full text-center py-4">
					<span>
						<b>CONSUMIDOR</b>
					</span>
				</div>
				<div className="grid grid-cols-5">
					<div className="col-span-2">
						<span>
							<b>CPF/CNPJ:</b> {sale.customer.identification}
						</span>
					</div>
					<div>
						<span>
							<b>Cliente:</b> {sale.customer.name}
						</span>
					</div>
				</div>
				<div className="grid grid-cols-4">
					<div className="col-span-3">
						<span>
							<b>Endereço:</b> {sale.customer.address}
						</span>
					</div>
					<div>
						<span>
							<b>Telefone:</b> {sale.customer.phoneNumber}
						</span>
					</div>
				</div>
			</div>
		</div>
	);
}
