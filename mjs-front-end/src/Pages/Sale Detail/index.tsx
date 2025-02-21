import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {getSale} from "@/services/sell";
import {formatPrice} from "@/Utils/Functions/parser";
import {useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {CircleDollarSign, LoaderCircle} from "lucide-react";
import {Navigate, useParams} from "react-router-dom";

export default function SaleDetailPage() {
	const {saleId} = useParams();

	const {
		data: sale,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sale", saleId],
		queryFn: () => getSale(parseInt(saleId!)),
		enabled: !!saleId,
	});

	if (!saleId || error) {
		return <Navigate to="/" replace />;
	}

	if (isLoading) {
		return <LoaderCircle />;
	}

	return (
		<>
			<Page backUri="/sales">
				<MyCard.Root>
					<MyCard.Header>
						<MyCard.Title title="Detalhes da venda" icon={CircleDollarSign}></MyCard.Title>
					</MyCard.Header>
					<MyCard.Content>
						<div>
							<p>Data: {format(sale!.timestamp, "dd/MM/yyyy 'às' hh:mm")}</p>
							<p>Cliente: {sale!.customer.name}</p>
							<p>Pagamento: {sale!.paymentMethod}</p>
						</div>
						<div className="outline rounded bg-slate-700">
							<div className="p-2 grid grid-cols-5 gap-2">
								<p className="col-span-2 text-white">Produto</p>
								<p className="text-end text-white">Preço UN</p>
								<p className="text-end text-white">Quantidade</p>
								<p className="text-end text-white">Subtotal</p>
							</div>
							{sale!.products.map((product, index) => (
								<div className="p-2 col-span-5 grid grid-cols-5 gap-2 bg-slate-50">
									<p className="col-span-2" key={`soldProducts-${saleId}-Produto-${index}`}>
										{product.name}
									</p>
									<p className="text-end" key={`soldProducts-${saleId}-PreçoUn-${index}`}>
										{formatPrice(product.price)}
									</p>
									<p className="text-end" key={`soldProducts-${saleId}-Amount-${index}`}>
										{product.numItems}
									</p>
									<p className="text-end" key={`soldProducts-${saleId}-Total-${index}`}>
										{formatPrice(product.totalPaid)}
									</p>
								</div>
							))}
							<div className="p-2 grid grid-cols-5 gap-2">
								<p className="col-span-3 text-white">TOTAL</p>
								<p className="text-end text-white">{sale!.numItems}</p>
								<p className="text-end text-white">{formatPrice(sale!.totalPaid)}</p>
							</div>
						</div>
					</MyCard.Content>
				</MyCard.Root>
			</Page>
		</>
	);
}
