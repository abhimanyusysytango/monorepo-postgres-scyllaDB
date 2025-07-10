-- AlterTable
ALTER TABLE "public"."users" ADD COLUMN     "balance" DECIMAL(10,2) NOT NULL DEFAULT 0.00;

-- CreateTable
CREATE TABLE "public"."master_product" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "price" DECIMAL(10,2) NOT NULL,
    "total_unit" INTEGER NOT NULL,
    "sold_unit" INTEGER NOT NULL DEFAULT 0,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "master_product_pkey" PRIMARY KEY ("id")
);

INSERT INTO "public"."master_product" ("name", "description", "price", "total_unit", "sold_unit") VALUES
  ('Product A', 'First demo product', 99.99, 100, 0),
  ('Product B', 'Second demo product', 49.50, 200, 0),
  ('Product C', 'Third demo product', 10.00, 500, 0);
