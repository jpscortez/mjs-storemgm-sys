import MyCard from "@/components/Card";
import Page from "@/components/Page";
import {Users} from "lucide-react";
import CustomersTable from "./components/CustomersTable";
import {useQuery} from "@tanstack/react-query";
import {getCustomers} from "@/services/customers";

export default function CustomersPage() {
	const {data: customers, isLoading} = useQuery({
		queryKey: ["customers"],
		queryFn: getCustomers,
	});

	return (
		<Page>
			<MyCard.Root>
				<MyCard.Header>
					<MyCard.Title title="Clientes" icon={Users}></MyCard.Title>
				</MyCard.Header>
				<MyCard.Content>
					{isLoading ? <div>Carregando...</div> : <CustomersTable customers={customers ?? []} />}
				</MyCard.Content>
			</MyCard.Root>
		</Page>
	);
}
