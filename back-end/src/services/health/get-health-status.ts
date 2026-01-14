import {prismaClient} from "../../database/prisma-client";

export function GetHealthStatus() {
	return prismaClient.$queryRaw`SELECT 1`.catch(() => false).then(() => true);
}
