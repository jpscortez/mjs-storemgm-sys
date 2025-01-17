-- CreateTable
CREATE TABLE "sales" (
    "code" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "num_items" INTEGER NOT NULL,
    "total_paid" REAL NOT NULL,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customer" TEXT NOT NULL
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
