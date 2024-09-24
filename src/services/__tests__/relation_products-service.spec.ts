import {
  createRelationProduct,
  deleteRelationProduct,
  showRelationProductBySKU,
  showRelationProducts,
  updateRelationProduct,
} from "../relation_products-service";
import { Prisma, PrismaClient, Provider } from "@prisma/client";
import { createProduct, showProducts } from "../product-service";
import { createProvider, showProviders } from "../provider-service";

const prisma = new PrismaClient();

describe("Relation Products Tests", () => {
  let transaction: any;

  beforeEach(async () => {
    await prisma.$connect();
    transaction = await prisma.$transaction(async (tx) => {
      // Limpiar la base de datos antes de cada prueba
      await tx.sKU_PartNumber_Relation.deleteMany({});
      await tx.provider.deleteMany({});
      await tx.product.deleteMany({});
      return tx;
    });
  });

  afterAll(async () => {
    await prisma.sKU_PartNumber_Relation.deleteMany({});
    await prisma.provider.deleteMany({});
    await prisma.product.deleteMany({});
    await prisma.$disconnect();
  });

  test("Create a new relation product", async () => {
    const productTest = await createProduct({
      title: "Product Test Laptop",
      price: 1000,
      description: "Product Test Description",
      stock: 10,
      category: "Laptop",
      brand: "ASUS",
    });
    const providerTest = await createProvider({
      name: "Provider Test 01",
      contact: "Contact Test 01",
      direction: "Address Test 01",
    });

    const relationProduct: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-123",
      price: 1000,
      stock: 10,
      products: {
        connect: {
          SKU: productTest.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: providerTest.ID_Provider,
        },
      },
    };

    const response = await createRelationProduct(relationProduct);

    expect(response.PartNumber).toBe(relationProduct.PartNumber);
    expect(response.price).toBe(relationProduct.price);
    expect(response.stock).toBe(relationProduct.stock);
    expect(response.products).toBeDefined();
    expect(response.providers).toBeDefined();
  });

  test("Update a relation product", async () => {
    const newProduct = await createProduct({
      title: "Product Test Laptop",
      price: 1000,
      description: "Product Test Description",
      stock: 10,
      category: "Laptop",
      brand: "ASUS",
    });

    const newProvider = await createProvider({
      name: "Provider Test 01",
      contact: "Contact Test 01",
      direction: "Address Test 01",
    });

    const newRelationProduct: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-123",
      price: 1000,
      stock: 10,
      products: {
        connect: {
          SKU: newProduct.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: newProvider.ID_Provider,
        },
      },
    };

    const relationProduct = await createRelationProduct(newRelationProduct);

    const relationProductUpdate: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-321",
      price: 999,
      stock: 15,
      products: {
        connect: {
          SKU: newProduct.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: newProvider.ID_Provider,
        },
      },
    };

    const response = await updateRelationProduct(
      relationProductUpdate,
      relationProduct.ID
    );

    if (!response) {
      throw new Error("Relation Product not updated");
    }

    expect(response.PartNumber).toBe(relationProductUpdate.PartNumber);
    expect(response.price).toBe(relationProductUpdate.price);
    expect(response.stock).toBe(relationProductUpdate.stock);
    expect(response.products).toBeDefined();
    expect(response.providers).toBeDefined();
  });

  test("Show all relation products", async () => {
    const relationProducts = await showRelationProducts();
    expect(Array.isArray(relationProducts)).toBe(true);
  });

  test("Show relation product by SKU", async () => {
    const newProduct = await createProduct({
      title: "Product Test Laptop",
      price: 1000,
      description: "Product Test Description",
      stock: 10,
      category: "Laptop",
      brand: "ASUS",
    });

    const newProvider = await createProvider({
      name: "Provider Test 01",
      contact: "Contact Test 01",
      direction: "Address Test 01",
    });

    const newRelationProduct: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-123",
      price: 1000,
      stock: 10,
      products: {
        connect: {
          SKU: newProduct.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: newProvider.ID_Provider,
        },
      },
    };

    const relationProduct = await createRelationProduct(newRelationProduct);

    const response = await showRelationProductBySKU(newProduct.SKU);

    if (!response) {
      throw new Error("Relation Product not found");
    }

    expect(response[0].PartNumber).toBe(relationProduct.PartNumber);
    expect(response[0].price).toBe(relationProduct.price);
    expect(response[0].stock).toBe(relationProduct.stock);
    expect(response[0].products).toBeDefined();
    expect(response[0].providers).toBeDefined();
  });

  test("Delete a relation product", async () => {
    const newProduct = await createProduct({
      title: "Product Test Laptop",
      price: 1000,
      description: "Product Test Description",
      stock: 10,
      category: "Laptop",
      brand: "ASUS",
    });

    const newProvider = await createProvider({
      name: "Provider Test 01",
      contact: "Contact Test 01",
      direction: "Address Test 01",
    });

    const newRelationProduct: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-123",
      price: 1000,
      stock: 10,
      products: {
        connect: {
          SKU: newProduct.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: newProvider.ID_Provider,
        },
      },
    };

    const relationProduct = await createRelationProduct(newRelationProduct);

    const response = await deleteRelationProduct(relationProduct.ID);

    expect(response).toBeDefined();
  });

  test("Create a new relation product with a product on multiple providers", async () => {
    const productTest = await createProduct({
      title: "Product Test Laptop",
      price: 1000,
      description: "Product Test Description",
      stock: 10,
      category: "Laptop",
      brand: "ASUS",
    });

    const providerTest = await createProvider({
      name: "Provider Test 01",
      contact: "Contact Test 01",
      direction: "Address Test 01",
    });

    const providerTest2 = await createProvider({
      name: "Provider Test 02",
      contact: "Contact Test 02",
      direction: "Address Test 02",
    });

    const relationProduct: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "ASUS-123",
      price: 1000,
      stock: 10,
      products: {
        connect: {
          SKU: productTest.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: providerTest.ID_Provider,
        },
      },
    };

    const relationProduct2: Prisma.SKU_PartNumber_RelationCreateInput = {
      PartNumber: "123-ASUS",
      price: 999,
      stock: 3,
      products: {
        connect: {
          SKU: productTest.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: providerTest2.ID_Provider,
        },
      },
    };

    const response = await createRelationProduct(relationProduct);
    const response2 = await createRelationProduct(relationProduct2);

    expect(response.PartNumber).toBe(relationProduct.PartNumber);
    expect(response.price).toBe(relationProduct.price);
    expect(response.stock).toBe(relationProduct.stock);
    expect(response.products).toBeDefined();
    expect(response.providers).toBeDefined();

    expect(response.products.SKU).toBe(productTest.SKU);
    expect(response.providers.ID_Provider).toBe(providerTest.ID_Provider);

    expect(response2.PartNumber).toBe(relationProduct2.PartNumber);
    expect(response2.price).toBe(relationProduct2.price);
    expect(response2.stock).toBe(relationProduct2.stock);
    expect(response2.products).toBeDefined();
    expect(response2.providers).toBeDefined();

    expect(response2.products.SKU).toBe(productTest.SKU);
    expect(response2.providers.ID_Provider).toBe(providerTest2.ID_Provider);
  });
});
