-- CreateTable
CREATE TABLE "products" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "description" TEXT NOT NULL,
    "sell_price" DECIMAL NOT NULL,
    "unit" TEXT NOT NULL,
    "stockAmount" INTEGER NOT NULL
);
