export type SaleDetail = {
	saleId: number;
	totalPaid: number;
	numItems: number;
	timestamp: Date;
	products: SoldProductSaleDetail[];
	customer: {code: number; name: string};
	paymentMethod: string;
};

export type SoldProductSaleDetail = {
	name: string;
	numItems: number;
	price: number;
	totalPaid: number;
};
