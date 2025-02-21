export type PaymentMethod = {
	type: PaymentMethodType;
};

export enum PaymentMethodType {
	CreditCard = "Cartão de crédito",
	DebitCard = "Cartão de débito",
	Pix = "Pix",
	Cash = "Dinheiro",
}
