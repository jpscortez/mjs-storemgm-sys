import DataTable from "@/components/DataTable";
import {columns} from "./SalesTableColumns";
import {SaleSummaryDTO} from "@/Models/SaleSummaryDTO";
import {useNavigate} from "react-router-dom";

interface SalesTableProps {
	sales: SaleSummaryDTO[];
}

export default function SalesTable({sales: products}: SalesTableProps) {
	const navigate = useNavigate();

	function navigateToSellDetail(sale: SaleSummaryDTO) {
		navigate(`/sales/${sale.code}`);
	}

	return <DataTable columns={columns} data={products} onRowDblClick={navigateToSellDetail} />;
}
