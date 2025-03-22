import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {Handshake} from "lucide-react";

export default function OpenAccountsPage() {
	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title icon={Handshake} title="Contas em Aberto" />
				</MyCard.Header>
				<MyCard.Content></MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
