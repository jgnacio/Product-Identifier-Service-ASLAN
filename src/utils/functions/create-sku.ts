import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateSKU(category: string, brand: string) {
  const categoryCode = category.slice(0, 3).toUpperCase();
  const brandCode = brand.slice(0, 4).toUpperCase();

  // Obtener el Proxmio ID de producto en la base de datos
  const count = await prisma.product.count();

  const sequence = (count + 1).toString(16).toUpperCase().padStart(4, "0");

  // Genera el SKU
  const sku = `${categoryCode}-${brandCode}-${sequence}`;
  return sku;
}

export default generateSKU;
