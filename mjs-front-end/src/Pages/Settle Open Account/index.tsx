import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {formatPrice} from "@/Utils/Functions/parser";
import {Handshake, LoaderCircle} from "lucide-react";
import {Navigate, useParams} from "react-router-dom";
import SettleOpenAccountProductsTable from "./components/SettleOpenAccountProductsTable";
import {getOpenAccountByCode, settleOpenAccountByCode} from "@/services/openAccounts";
import {useMutation, useQuery} from "@tanstack/react-query";
import {Button} from "@/components/ui/button";
import {useToast} from "@/Utils/Hooks/useToast";

export default function SettleOpenAccountPage() {
	const {customerCode} = useParams();
	const {toast} = useToast();

	const {
		data: openAccount,
		isLoading,
		error,
	} = useQuery({
		queryKey: ["sale", customerCode],
		queryFn: () => getOpenAccountByCode(parseInt(customerCode!)),
		enabled: !!customerCode,
	});

	const {mutateAsync: settleOpenAccountFn} = useMutation({
		mutationFn: settleOpenAccountByCode,
		onSuccess() {
			toast({
				variant: "default",
				description: "Conta quitada!",
			});
		},
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
							<p>Cliente: {openAccount!.name}</p>
							<p>Total Devido: {formatPrice(openAccount!.total)}</p>
						</div>
						<SettleOpenAccountProductsTable products={openAccount!.products} />
						<div className="flex justify-end">
							<div className="grid text-end">
								<b>TOTAL A PAGAR</b>
								<span className="text-xl">{formatPrice(openAccount!.total)}</span>
							</div>
						</div>
						<Button variant="success" onClick={() => settleOpenAccountFn(openAccount!.code)}>
							Quitar dívida
						</Button>
					</div>
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
