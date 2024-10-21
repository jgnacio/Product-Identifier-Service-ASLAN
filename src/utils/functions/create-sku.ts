import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function generateSKU(category: string, brand: string): Promise<string> {
  // Validar entradas
  if (!category || category.length < 1) {
    throw new Error("La categoría debe tener al menos 1 caracter.");
  }
  if (!brand || brand.length < 1) {
    throw new Error("La marca debe tener al menos 1 caracter.");
  }
  // Extraer los codigos de las categorías y marcas si son más largos de 3 caracteres
  const categoryCode = category.slice(0, 3).toUpperCase();
  const brandCode = brand.slice(0, 3).toUpperCase();

  // Obtener la fecha actual y convertirla a un formato único
  const dateNow = new Date();
  const timestamp = dateNow.getTime().toString(36).toUpperCase(); // Base 36 para acortar

  // Generar el SKU
  const sku = `${categoryCode}-${brandCode}-${timestamp}`;
  return sku;
}

export default generateSKU;
