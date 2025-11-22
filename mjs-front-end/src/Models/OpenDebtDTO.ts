import {OpenDebtSummaryDTO} from "./OpenDebtSummaryDTO";
import {SoldProductSaleDetail} from "./SaleDetail";

export type OpenDebtDTO = OpenDebtSummaryDTO & {
	products: ProductsOpenDebtDTO[];
};

export type ProductsOpenDebtDTO = SoldProductSaleDetail & {
	timestamp: Date;
};
