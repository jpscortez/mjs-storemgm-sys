import {PaymentMethodType} from "./PaymentMethod";

export type SalesByPaymentMethodDTO = {
	paymentMethod: PaymentMethodType;
	total: number;
};
