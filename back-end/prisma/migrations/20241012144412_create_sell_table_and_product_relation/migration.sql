-- CreateTable
CREATE TABLE "product_sell" (
    "sell_code" INTEGER NOT NULL,
    "productCode" INTEGER NOT NULL,
    "amount" INTEGER NOT NULL,
    "totalPrice" DECIMAL NOT NULL,

    PRIMARY KEY ("sell_code", "productCode"),
    CONSTRAINT "product_sell_sell_code_fkey" FOREIGN KEY ("sell_code") REFERENCES "sells" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "product_sell_productCode_fkey" FOREIGN KEY ("productCode") REFERENCES "products" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "sells" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "client" TEXT NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
