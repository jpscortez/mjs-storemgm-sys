import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {getSale} from "@/services/sale";
import {useQuery} from "@tanstack/react-query";
import {format} from "date-fns";
import {CircleDollarSign, LoaderCircle} from "lucide-react";
import {Navigate, useParams} from "react-router-dom";
import SaleDetailProductsTable from "./components/SaleDetailProductsTable";
import {formatPrice} from "@/Utils/Functions/parser";
import {SaleDetailPrintContent} from "./components/SaleDetailPrintContent";
import {PrintableContent} from "@/components/PrintableContent";

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
		<Page backUri="/sales">
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title title="Detalhes da venda" icon={CircleDollarSign}></MyCard.Title>
					<MyCard.Actions>
						<PrintableContent content={<SaleDetailPrintContent sale={sale!} />} />
					</MyCard.Actions>
				</MyCard.Header>
				<MyCard.Content>
					<div>
						<p>Data: {format(sale!.timestamp, "dd/MM/yyyy 'às' HH:mm")}</p>
						<p>Cliente: {sale!.customer.name}</p>
						<p>Pagamento: {sale!.paymentMethod}</p>
						<p>Valor Pago: {formatPrice(sale!.totalPaid)}</p>
					</div>
					<SaleDetailProductsTable products={sale!.products} />
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
