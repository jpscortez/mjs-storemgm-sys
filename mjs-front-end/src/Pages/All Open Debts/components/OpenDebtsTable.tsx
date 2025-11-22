import DataTable from "@/components/DataTable";
import {columns} from "./OpenDebtsTableColumns";
import {useNavigate} from "react-router-dom";
import {OpenDebtSummaryDTO} from "@/Models/OpenDebtSummaryDTO";

interface OpenDebtsTableProps {
	openDebts: OpenDebtSummaryDTO[];
}

export default function OpendDebtsTable({openDebts}: OpenDebtsTableProps) {
	const navigate = useNavigate();

	function navigateToSellDetail(customer: OpenDebtSummaryDTO) {
		navigate(`/customers/${customer.code}`);
	}

	return <DataTable columns={columns} data={openDebts} onRowDblClick={navigateToSellDetail} />;
}
