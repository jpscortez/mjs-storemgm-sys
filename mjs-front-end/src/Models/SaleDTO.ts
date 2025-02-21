import {PaymentMethod} from "./PaymentMethod";
export type SaleDTO = {
	products: SaleProductDTO[];
	totalPaid: number;
	numItems: number;
	customer: string;
	paymentMethod: PaymentMethod;
};

export type SaleProductDTO = {
	code: string;
	numItems: number;
	discount: number;
	price: number;
	valuePaid: number;
};
