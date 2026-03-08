-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "shippingAddress" TEXT,
ADD COLUMN     "shippingCity" TEXT,
ADD COLUMN     "shippingDept" TEXT,
ADD COLUMN     "shippingName" TEXT,
ADD COLUMN     "shippingPhone" TEXT;

-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "format" TEXT NOT NULL DEFAULT 'digital';

-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "hasPhysical" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "physicalPrice" DOUBLE PRECISION;
