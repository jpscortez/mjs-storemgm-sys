-- CreateTable
CREATE TABLE "products" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "sell_price" DECIMAL(65,30) NOT NULL,
    "stock_amount" INTEGER NOT NULL,

    CONSTRAINT "products_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "sales" (
    "code" SERIAL NOT NULL,
    "num_items" INTEGER NOT NULL,
    "total_paid" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "customerCode" INTEGER NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "products_sold" (
    "id" SERIAL NOT NULL,
    "product_code" INTEGER NOT NULL,
    "sale_code" INTEGER NOT NULL,
    "num_items" INTEGER NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "value_paid" DOUBLE PRECISION NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_sold_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "code" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "phone_number" TEXT,
    "address" TEXT,
    "identification" TEXT,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("code")
);

-- CreateTable
CREATE TABLE "payments" (
    "code" SERIAL NOT NULL,
    "method" TEXT NOT NULL,
    "sale_code" INTEGER NOT NULL,

    CONSTRAINT "payments_pkey" PRIMARY KEY ("code")
);

-- CreateIndex
CREATE UNIQUE INDEX "payments_sale_code_key" ON "payments"("sale_code");

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_customerCode_fkey" FOREIGN KEY ("customerCode") REFERENCES "customers"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sold" ADD CONSTRAINT "products_sold_product_code_fkey" FOREIGN KEY ("product_code") REFERENCES "products"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "products_sold" ADD CONSTRAINT "products_sold_sale_code_fkey" FOREIGN KEY ("sale_code") REFERENCES "sales"("code") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "payments" ADD CONSTRAINT "payments_sale_code_fkey" FOREIGN KEY ("sale_code") REFERENCES "sales"("code") ON DELETE RESTRICT ON UPDATE CASCADE;
