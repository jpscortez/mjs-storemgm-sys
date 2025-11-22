import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {formatPrice} from "@/Utils/Functions/parser";
import {Handshake, LoaderCircle} from "lucide-react";
import {Navigate, useParams} from "react-router-dom";
import SettleOpenDebtProductsTable from "./components/SettleOpenDebtProductsTable";
import {getOpenDebtByCode} from "@/services/openDebts";
import {useQuery} from "@tanstack/react-query";
import {SettleOpenDebtDialog} from "./components/SettleDebtDialog";

export default function SettleOpenDebtPage() {
	const {customerCode} = useParams();

	const {
		data: openDebt,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sale", customerCode],
		queryFn: () => getOpenDebtByCode(parseInt(customerCode!)),
		enabled: !!customerCode,
	});

	if (!customerCode || error) {
		return <Navigate to="/" replace />;
	}

	if (isLoading) {
		return <LoaderCircle />;
	}

	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title icon={Handshake} title="Quitar Conta" />
				</MyCard.Header>
				<MyCard.Content>
					<div className="grid gap-2">
						<div>
							<p>Cliente: {openDebt!.name}</p>
							<p>Total Devido: {formatPrice(openDebt!.total)}</p>
						</div>
						<SettleOpenDebtProductsTable products={openDebt!.products} />
						<div className="flex justify-end">
							<div className="grid text-end">
								<b>TOTAL A PAGAR</b>
								<span className="text-xl">{formatPrice(openDebt!.total)}</span>
							</div>
						</div>
						<SettleOpenDebtDialog customerInDebtCode={openDebt!.code} />
					</div>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
