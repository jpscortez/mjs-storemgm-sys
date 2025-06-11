import {PrismaClient} from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
	const encryptedPassword = await bcrypt.hash("aosjhdbf192873", 10);
	await prisma.user.create({
		data: {
			name: "Admin",
			username: "admin",
			password: encryptedPassword,
		},
	});
}

main()
	.then(async () => {
		await prisma.$disconnect();
	})
	.catch(async (e) => {
		console.error(e);
		await prisma.$disconnect();
	});
