-- CreateTable
CREATE TABLE "products" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sell_price" DECIMAL NOT NULL,
    "stock_amount" INTEGER NOT NULL
);
