import { Prisma, PrismaClient } from "@prisma/client";
import generateSKU from "../utils/functions/create-sku";
import { requestCreateProduct } from "./productEntities";

const prisma = new PrismaClient();

export const createProduct = async (data: requestCreateProduct) => {
  // Create New SKU
  const SKU = await generateSKU(data.category, data.brand);
  const product = await prisma.product.create({
    data: {
      title: data.title,
      price: data.price,
      SKU: SKU,
      description: data.description,
      stock: data.stock,
      category: data.category,
      brand: data.brand,
    },
  });

  return product;
};

export const showProducts = async () => {
  const products = await prisma.product.findMany({
    include: {
      relations: true,
    },
  });

  return products;
};

export const showProductById = async (id: number) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const product = await prisma.product.findUnique({
    where: {
      ID: id,
    },
    include: {
      relations: true,
    },
  });

  return product;
};

export const showProductBySKU = async (sku: string) => {
  const product = await prisma.product.findUnique({
    where: {
      SKU: sku,
    },
    include: {
      relations: true,
    },
  });

  return product;
};

export const updateProduct = async (
  data: Prisma.ProductUpdateInput,
  id: number
) => {
  const productToUpdate = await prisma.product.findUnique({
    where: {
      ID: id,
    },
  });

  if (!productToUpdate) {
    throw new Error("Product not found");
  }

  const product = await prisma.product.update({
    where: { ID: id },
    data: {
      title: data.title || productToUpdate.title,
      price: data.price || productToUpdate.price,
      SKU: data.SKU || productToUpdate.SKU,
      description: data.description || productToUpdate.description,
      stock: data.stock || productToUpdate.stock,
      category: data.category || productToUpdate.category,
      brand: data.brand || productToUpdate.brand,
    },
  });

  return product;
};

export const deleteProduct = async (id: number) => {
  if (!id) {
    throw new Error("ID is required");
  }

  const productToDelete = await prisma.product.findUnique({
    where: {
      ID: id,
    },
  });

  if (!productToDelete) {
    return null;
  }

  const product = await prisma.product.delete({
    where: {
      ID: id,
    },
  });

  return product;
};
