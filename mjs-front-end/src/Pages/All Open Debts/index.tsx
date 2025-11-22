import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {getOpenDebtsSummary} from "@/services/openDebts";
import {useQuery} from "@tanstack/react-query";
import {Handshake} from "lucide-react";
import OpenDebtsTable from "./components/OpenDebtsTable";

export default function AllOpenDebtsPage() {
	const {data: openDebts, isLoading} = useQuery({
		queryKey: ["open-debts-list"],
		queryFn: getOpenDebtsSummary,
	});

	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title icon={Handshake} title="Contas em Aberto" />
				</MyCard.Header>
				<MyCard.Content>
					{isLoading ? <div>Carregando...</div> : <OpenDebtsTable openDebts={openDebts ?? []} />}
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
