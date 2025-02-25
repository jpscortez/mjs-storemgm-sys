export type SaleDetail = {
	saleId: number;
	totalPaid: number;
	numItems: number;
	timestamp: Date;
	products: SoldProductSaleDetail[];
	customer: {
		code: number;
		name: string;
		curtomerSince: Date;
		phoneNumber?: string;
		address?: string;
		identification?: string;
	};
	paymentMethod: string;
};

export type SoldProductSaleDetail = {
	code: number;
	name: string;
	numItems: number;
	price: number;
	totalPaid: number;
};
