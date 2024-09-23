import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createProvider = async (data: Prisma.ProviderCreateInput) => {
  const provider = await prisma.provider.create({
    data: {
      name: data.name,
      direction: data.direction,
      contact: data.contact,
    },
  });

  return provider;
};

export const showProviders = async () => {
  const providers = await prisma.provider.findMany();

  return providers;
};

export const updateProvider = async (
  data: Prisma.ProviderUpdateInput,
  id: number
) => {
  const providerToUpdate = await prisma.provider.findUnique({
    where: { ID_Provider: id },
  });

  if (!providerToUpdate) {
    throw new Error("Provider not found");
  }

  const provider = await prisma.provider.update({
    where: { ID_Provider: id },
    data: {
      name: data.name || providerToUpdate.name,
      direction: data.direction || providerToUpdate.direction,
      contact: data.contact || providerToUpdate.contact,
    },
  });

  return provider;
};

export const deleteProvider = async (id: number) => {
  const provider = await prisma.provider.delete({
    where: {
      ID_Provider: id,
    },
  });

  return provider;
};
