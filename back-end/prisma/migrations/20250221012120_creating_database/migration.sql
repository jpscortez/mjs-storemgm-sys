-- CreateTable
CREATE TABLE "products" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "sell_price" DECIMAL NOT NULL,
    "stock_amount" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "sales" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "num_items" INTEGER NOT NULL,
    "total_paid" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerCode" INTEGER NOT NULL,
    CONSTRAINT "sales_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "customers" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "products_sold" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "product_code" INTEGER NOT NULL,
    "sale_code" INTEGER NOT NULL,
    "num_items" INTEGER NOT NULL,
    "price" REAL NOT NULL,
    "discount" REAL NOT NULL,
    "value_paid" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "products_sold_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products" ("code") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "products_sold_sale_code_fkey" FOREIGN KEY ("sale_code") REFERENCES "sales" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "customers" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "payments" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "method" TEXT NOT NULL,
    "sale_code" INTEGER NOT NULL,
    CONSTRAINT "payments_sale_code_fkey" FOREIGN KEY ("sale_code") REFERENCES "sales" ("code") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_sale_code_key" ON "payments"("sale_code");
