import {prismaClient} from "../../database/prisma-client";

interface RegisterSaleProps {
	numItems: number;
	totalPaid: number;
	products: {
		code: number;
		numItems: number;
		discount: number;
		price: number;
		valuePaid: number;
	}[];
	soldToCustomer: string;
	paymentMethod: string;
}

const OutstandingBalance = "A Prazo";

async function RegisterSale({
	numItems,
	totalPaid,
	products,
	soldToCustomer,
	paymentMethod,
}: RegisterSaleProps): Promise<number> {
	if (products == undefined || products.length == 0) {
		throw new Error("Cannot register Sale with no Products");
	}
	let newSaleCode: number = -1;

	await prismaClient.$transaction(async (pClient) => {
		// Find Customer
		let customerFound = await pClient.customer.findFirst({
			where: {
				name: {
					equals: soldToCustomer,
				},
			},
		});

		if (!customerFound) {
			customerFound = await pClient.customer.create({
				data: {
					name: soldToCustomer,
				},
			});
		}

		if (!customerFound) {
			throw new Error("Error Getting Customer");
		}

		// Find Products
		const productsFound = await pClient.product.findMany({
			where: {
				code: {
					in: products.map((p) => p.code),
				},
			},
		});

		const productAmountLeft: {[key: number]: number} = {};

		// Check if stock is sufficient for each product
		for (const pSold of products) {
			const product = productsFound.find((p) => p.code === pSold.code);

			if (!product) {
				throw new Error(`Product with code ${pSold.code} not found.`);
			}
			const code = pSold.code;

			if (!productAmountLeft[code]) {
				productAmountLeft[code] = product.stockAmount;
			}

			if (productAmountLeft[code] < pSold.numItems) {
				throw new Error(`Insufficient stock for product ${code}.`);
			} else {
				productAmountLeft[code] -= pSold.numItems;
			}
		}

		// Register Sale
		const data = await pClient.sale.create({
			data: {
				numItems,
				totalPaid,
				customer: {
					connect: {
						code: customerFound.code,
					},
				},
				productSold: {
					create: products.map(({code, numItems, discount, valuePaid, price}) => ({
						product: {
							connect: {code},
						},
						numItems,
						discount,
						valuePaid,
						price,
					})),
				},
				payment: {
					create: {
						method: paymentMethod,
					},
				},
				isOpen: paymentMethod === OutstandingBalance,
			},
		});

		newSaleCode = data.code;

		// Update stock for each product one by one
		for (const {code, numItems} of products) {
			const product = products.find((p) => p.code === code);
			if (product) {
				await pClient.product.update({
					where: {code},
					data: {
						stockAmount: {
							decrement: numItems, // Decrease stock by the quantity sold
						},
					},
				});
			}
		}
	});

	return newSaleCode;
}

export {RegisterSale};
