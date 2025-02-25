import DataTable from "@/components/DataTable";
import {columns} from "./SaleDetailProductsTableColumns";
import {SoldProductSaleDetail} from "@/Models/SaleDetail";

type SaleDetailProductsTableProps = {
	products: SoldProductSaleDetail[];
};

export default function SaleDetailProductsTable({products}: SaleDetailProductsTableProps) {
	return <DataTable columns={columns} data={products} className="h-64" />;
}
