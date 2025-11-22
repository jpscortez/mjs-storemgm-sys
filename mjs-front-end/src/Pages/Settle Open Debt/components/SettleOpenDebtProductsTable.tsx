import DataTable from "@/components/DataTable";
import {columns} from "./SettleOpenDebtProductsTableColumns";
import {ProductsOpenDebtDTO} from "@/Models/OpenDebtDTO";

interface SettleOpenDebtProductsTableProps {
	products: ProductsOpenDebtDTO[];
}

export default function SettleOpenDebtProductsTable({products: customers}: SettleOpenDebtProductsTableProps) {
	return <DataTable columns={columns} data={customers} emptyDataMsg="Não há Contas em Aberto" />;
}
