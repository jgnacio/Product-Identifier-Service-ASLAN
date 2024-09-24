import {
  createProvider,
  deleteProvider,
  showProviders,
  updateProvider,
} from "../provider-service";
import { PrismaClient, Provider } from "@prisma/client";

const prisma = new PrismaClient();

describe("Providers Service", () => {
  let transaction: any;

  beforeEach(async () => {
    await prisma.$connect();
    transaction = await prisma.$transaction(async (tx) => {
      // Limpiar la base de datos antes de cada prueba
      await tx.provider.deleteMany({});
      return tx;
    });
  });

  afterAll(async () => {
    await prisma.provider.deleteMany({});
    await prisma.$disconnect();
  });

  test("GET - should return a list of providers", async () => {
    const response = await showProviders();
    expect(Array.isArray(response)).toBe(true);
  });

  test("POST - should create a new provider", async () => {
    const provider = {
      name: "Provider Test",
      contact: "Contact Test",
      direction: "Address Test",
    };
    const response = await createProvider(provider);
    expect(response.name).toBe(provider.name);
    expect(response.contact).toBe(provider.contact);
    expect(response.direction).toBe(provider.direction);
  });

  test("PUT - should update a provider", async () => {
    const provider = {
      name: "Provider Test",
      contact: "Contact Test",
      direction: "Address Test",
    };
    let createdProvider = await createProvider(provider);

    const updatedProvider = {
      ...createdProvider,
      name: "Provider Test Updated",
      contact: "Contact Test Updated",
      direction: "Address Test Updated",
    };

    const response = await updateProvider(
      updatedProvider,
      createdProvider.ID_Provider
    );
    expect(response).toEqual(expect.objectContaining(updatedProvider));
  });

  test("DELETE - should delete a provider", async () => {
    const provider = {
      name: "Provider Test",
      contact: "Contact Test",
      direction: "Address Test",
    };
    const createdProvider = await createProvider(provider);
    const response = await deleteProvider(createdProvider.ID_Provider);
    expect(response).toBeDefined();

    // Verificar que el proveedor ha sido eliminado
    const deletedProvider = await prisma.provider.findUnique({
      where: { ID_Provider: createdProvider.ID_Provider },
    });
    expect(deletedProvider).toBeNull();
  });

  test("CREATE - Undefined Entry - should throw an error", async () => {
    try {
      await createProvider(undefined as any);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("UPDATE - Undefined Entry - should throw an error", async () => {
    try {
      await updateProvider(undefined as any, 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("UPDATE - Provider not found - should throw an error", async () => {
    try {
      await updateProvider({} as any, 1);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  test("DELETE - Provider not found - should throw an error", async () => {
    try {
      await deleteProvider(NaN);
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
