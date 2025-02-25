import DataTable from "@/components/DataTable";
import {columns} from "./CustomerPurchasesTableColumns";
import {useNavigate} from "react-router-dom";
import {CustomerDetailPurchasesDTO} from "@/Models/CustomerDetailDTO";

interface CustomerPurchasesTableProps {
	purchases: CustomerDetailPurchasesDTO[];
}

export default function CustomerPurchasesTable({purchases}: CustomerPurchasesTableProps) {
	const navigate = useNavigate();

	function navigateToSellDetail(purchase: CustomerDetailPurchasesDTO) {
		navigate(`/sales/${purchase.code}`);
	}

	return <DataTable columns={columns} data={purchases} onRowDblClick={navigateToSellDetail} />;
}
