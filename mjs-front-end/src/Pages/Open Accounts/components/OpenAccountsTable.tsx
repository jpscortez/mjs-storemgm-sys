import DataTable from "@/components/DataTable";
import {columns} from "./OpenAccountsTableColumns";
import {useNavigate} from "react-router-dom";
import {CustomerSummaryDTO} from "@/Models/CustomerSummaryDTO";

interface CustomersTableProps {
	customers: CustomerSummaryDTO[];
}

export default function CustomersTable({customers}: CustomersTableProps) {
	const navigate = useNavigate();

	function navigateToSellDetail(customer: CustomerSummaryDTO) {
		navigate(`/customers/${customer.code}`);
	}

	return <DataTable columns={columns} data={customers} onRowDblClick={navigateToSellDetail} />;
}
