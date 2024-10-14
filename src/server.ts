import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  let allRelations = await prisma.sKU_PartNumber_Relation.findMany();
  let allProviders = await prisma.provider.findMany();
  let allProducts = await prisma.product.findMany();

  // const newProvider = await createNewProvider(
  //   "Unicom",
  //   "2402 0000",
  //   "Constitución 1618, 11800 Montevideo, Departamento de Montevideo"
  // );
  // console.log("New Provider:", newProvider);

  console.log("All Relations:", allRelations);
  console.log("All Providers:", allProviders);
  console.log("All Products:", allProducts);

  // // obtengo el proveedor con el nombre "Unicom"
  // const provider = await prisma.provider.findFirst({});

  // //  Crea una nueva relación SKU-PartNumber
  // const partNumberProvider = "1234-ASUS-0002";
  // if (provider) {
  //   const newRelation = await prisma.sKU_PartNumber_Relation.create({
  //     data: {
  //       SKU_Relation: "LAP-ASUS-0002",
  //       ID_Provider: provider.ID_Provider,
  //       PartNumber: partNumberProvider,
  //       price: 999.99,
  //       stock: 100,
  //     },
  //   });
  //   console.log("New Relation:", newRelation);
  // }

  // allRelations = await prisma.sKU_PartNumber_Relation.findMany();
  // allProviders = await prisma.providers.findMany();
  // allProducts = await prisma.products.findMany();

  // console.log("All Relations:", allRelations);
  // console.log("All Providers:", allProviders);
  // console.log("All Products:", allProducts);

  // Buscar por SKU Interno
  // const sku = "LAP-ASUS-0001";
  // const product = await prisma.product.findFirst({ where: { SKU: sku } });
  // console.log(
  //   "Busqueda de relaciones para el SKU:",
  //   sku,
  //   "Correspondiente al producto",
  //   product?.title
  // );
  // const relations = await searchRelationsBySKU(sku);
  // console.log("Relations:", relations);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });

// async function createNewProduct(
//   category: string,
//   brand: string,
//   provider: any,
//   partNumber: string
// ) {
//   const sku = await generateSKU(category, brand);
//   const newProduct = prisma.product.create({
//     data: {
//       SKU: sku,
//       title: "Asus Zenbook 14",
//       category: "Laptops",
//       brand: "Asus",
//       price: 999,
//       stock: 100,
//       description: "A powerful laptop for work and play",
//     },
//   });
//   return newProduct;
// }

// async function generateSKU(category: string, brand: string) {
//   const categoryCode = category.slice(0, 3).toUpperCase();
//   const brandCode = brand.slice(0, 4).toUpperCase();

//   // Contamos los productos que existen ya en esta categoría y marca
//   const count = await prisma.product.count({
//     where: {
//       category: category,
//       brand: brand,
//     },
//   });

//   const sequence = (count + 1).toString(16).toUpperCase().padStart(4, "0");

//   // Genera el SKU
//   const sku = `${categoryCode}-${brandCode}-${sequence}`;
//   return sku;
// }

async function createNewProvider(
  name: string,
  contact: string,
  direction: string
) {
  const newProvider = prisma.provider.create({
    data: {
      name: name,
      contact: contact,
      direction: direction,
    },
  });
  return newProvider;
}

// async function searchRelationsBySKU(sku: string) {
//   const relations = await prisma.sKU_PartNumber_Relation.findMany({
//     where: {
//       SKU_Relation: sku,
//     },
//     include: {
//       providers: true, // Incluye los datos del proveedor en la consulta
//     },
//   });
//   return relations;
// }
