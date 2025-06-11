import {SoldProductSaleDetail} from "./SaleDetail";

export type OpenAccountDTO = {
	code: number;
	name: string;
	total: number;
	products: ProductsOpenAccountDTO[];
};

export type ProductsOpenAccountDTO = SoldProductSaleDetail & {
	timestamp: Date;
};
