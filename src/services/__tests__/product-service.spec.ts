import {
  showProducts,
  createProduct,
  deleteProduct,
  showProductById,
  showProductBySKU,
  updateProduct,
} from "../product-service";
import { PrismaClient, Product } from "@prisma/client";

const prisma = new PrismaClient();

describe("Products Service", () => {
  let transaction: any;

  beforeEach(async () => {
    await prisma.$connect();
    transaction = await prisma.$transaction(async (tx) => {
      // Limpiar la base de datos antes de cada prueba
      await tx.product.deleteMany({});
      return tx;
    });
  });

  afterAll(async () => {
    await prisma.$disconnect();
  });

  test("GET - should return a list of products", async () => {
    const response = await showProducts();
    expect(response).toBeDefined();
    expect(Array.isArray(response)).toBe(true);
  });

  test("POST - should create a new product", async () => {
    const product = {
      title: "Product Test",
      price: 100,
      description: "Product Test Description",
      stock: 10,
      category: "Test",
      brand: "Test",
    };

    const response = await createProduct(product);
    expect(response).toBeDefined();
    expect(response.title).toBe(product.title);
  });

  test("GET - should return a product by ID", async () => {
    const product = {
      title: "Product Test",
      price: 100,
      description: "Product Test Description",
      stock: 10,
      category: "Test",
      brand: "Test",
    };

    const createdProduct = await createProduct(product);
    const response = await showProductById(createdProduct.ID);
    if (!response) {
      throw new Error("Product not found");
    }
    expect(response.ID).toBe(createdProduct.ID);
  });

  test("GET - should return a product by SKU", async () => {
    const product = {
      title: "Product Test",
      price: 100,
      description: "Product Test Description",
      stock: 10,
      category: "Test",
      brand: "Test",
    };

    const createdProduct = await createProduct(product);
    const response = await showProductBySKU(createdProduct.SKU);
    if (!response) {
      throw new Error("Product not found");
    }
    expect(response.SKU).toBe(createdProduct.SKU);
  });

  test("PUT - should update a product", async () => {
    const product = {
      title: "Product Test",
      price: 100,
      description: "Product Test Description",
      stock: 10,
      category: "Test",
      brand: "Test",
    };

    let createdProduct = await createProduct(product);
    const updatedProduct = {
      ...createdProduct,
      title: "Product Test Updated",
      price: 200,
      description: "Product Test Description Updated",
    };

    const response = await updateProduct(updatedProduct, createdProduct.ID);
    expect(response).toEqual(expect.objectContaining(updatedProduct));
  });

  test("DELETE - should delete a product", async () => {
    const product = {
      title: "Product Test",
      price: 100,
      description: "Product Test Description",
      stock: 10,
      category: "Test",
      brand: "Test",
    };

    const createdProduct = await createProduct(product);
    const response = await deleteProduct(createdProduct.ID);
    expect(response).toBeDefined();

    // Verificar que el producto ha sido eliminado
    const deletedProduct = await showProductById(createdProduct.ID);
    expect(deletedProduct).toBeNull();
  });
});
