import DataTable from "@/components/DataTable";
import {columns} from "./SettleOpenAccountProductsTableColumns";
import {ProductsOpenAccountDTO} from "@/Models/OpenAccountDTO";

interface SettleOpenAccountProductsTableProps {
	products: ProductsOpenAccountDTO[];
}

export default function SettleOpenAccountProductsTable({products: customers}: SettleOpenAccountProductsTableProps) {
	return <DataTable columns={columns} data={customers} />;
}
