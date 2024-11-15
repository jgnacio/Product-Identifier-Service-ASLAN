import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRelationProduct = async (
  data: Prisma.SKU_PartNumber_RelationCreateInput
) => {
  const relation_product = await prisma.sKU_PartNumber_Relation.create({
    data: {
      PartNumber: data.PartNumber,
      sku_provider: data.sku_provider,
      price: data.price,
      stock: data.stock,
      products: {
        connect: {
          SKU: data.products.connect?.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: data.providers.connect?.ID_Provider,
        },
      },
    },
    include: {
      providers: true,
      products: true,
    },
  });

  return relation_product;
};

export const showRelationProducts = async () => {
  const relation_products = await prisma.sKU_PartNumber_Relation.findMany({
    include: {
      providers: true,
      products: true,
    },
  });

  return relation_products;
};

export const showRelationProductBySKU = async (SKU_Relation: string) => {
  const relation_product = await prisma.sKU_PartNumber_Relation.findMany({
    where: {
      SKU_Relation: SKU_Relation,
    },
    include: {
      providers: true,
      products: true,
    },
  });
  return relation_product;
};

export const updateRelationProduct = async (
  data: Prisma.SKU_PartNumber_RelationUpdateInput,
  id: number
) => {
  if (data.products && data.providers) {
    const relation_product = await prisma.sKU_PartNumber_Relation.update({
      where: { ID: id },
      data: {
        PartNumber: data.PartNumber,
        price: data.price,
        stock: data.stock,
        products: {
          connect: {
            SKU: data.products.connect?.SKU,
          },
        },
        providers: {
          connect: {
            ID_Provider: data.providers.connect?.ID_Provider,
          },
        },
      },
      include: {
        providers: true,
        products: true,
      },
    });
    return relation_product;
  }
};

export const deleteRelationProduct = async (id: number) => {
  const relation_product = await prisma.sKU_PartNumber_Relation.delete({
    where: {
      ID: id,
    },
  });

  return relation_product;
};

export const deleteRelationProductBySKU = async (SKU_Relation: string) => {
  const productRelations = await prisma.product.findMany({
    where: {
      SKU: SKU_Relation,
    },
  });

  if (!productRelations) {
    throw new Error("Data not found");
  }

  // console.log(productRelations);

  const relation_product = await prisma.sKU_PartNumber_Relation.deleteMany({
    where: {
      SKU_Relation: SKU_Relation,
    },
  });

  // // Delete Products
  await prisma.product.deleteMany({
    where: {
      SKU: SKU_Relation,
    },
  });

  return relation_product;
};
