import {format} from "date-fns";

export function formatPrice(value: number) {
	return value.toLocaleString("pt-BR", {style: "currency", currency: "BRL"});
}

export function formatDate(date: Date, withTime: boolean = false) {
	return format(date, withTime ? "dd/MM/yyy 'às' HH:mm" : "dd/MM/yyyy");
}
