import { Request, Response } from "express";

import {
  createRelationProduct,
  deleteRelationProduct,
  deleteRelationProductBySKU,
  showRelationProductBySKU,
  showRelationProducts,
  updateRelationProduct,
} from "../services/relation_products-service";

export const create = async (req: Request, res: Response) => {
  const { PartNumber, price, stock } = req.body;

  if (!PartNumber || !price || (!stock && stock != 0)) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const relation_product = await createRelationProduct({
    PartNumber: req.body.PartNumber,
    sku_provider: req.body.sku_provider,
    price: req.body.price,
    stock: req.body.stock,
    products: {
      connect: {
        SKU: req.body.products.connect?.SKU,
      },
    },
    providers: {
      connect: {
        ID_Provider: req.body.providers.connect?.ID_Provider,
      },
    },
  });

  return res.status(201).json({
    message: "Succes Create Relation Product",
    data: relation_product,
  });
};

export const show = async (req: Request, res: Response) => {
  const relation_products = await showRelationProducts();

  return res.status(201).json({
    message: "List Data Relation Product",
    data: relation_products,
  });
};

export const showBySKU = async (req: Request, res: Response) => {
  const SKU_Relation = req.params.SKU_Relation;
  const relation_product = await showRelationProductBySKU(SKU_Relation);

  return res.status(201).json({
    message: "List Data Relation Product",
    data: relation_product,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const relation_product = await updateRelationProduct(
    {
      PartNumber: req.body.PartNumber,
      price: req.body.price,
      stock: req.body.stock,
      products: {
        connect: {
          SKU: req.body.products.connect?.SKU,
        },
      },
      providers: {
        connect: {
          ID_Provider: req.body.providers.connect?.ID_Provider,
        },
      },
    },
    id
  );

  return res.status(201).json({
    message: "Succes Update Relation Product",
    data: relation_product,
  });
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const relation_product = await deleteRelationProduct(id);

  return res.status(201).json({
    message: "Succes Delete Relation Product",
    data: relation_product,
  });
};

export const removeBySKU = async (req: Request, res: Response) => {
  const SKU_Relation = req.params.SKU_Relation;
  console.log(SKU_Relation);
  const relation_product = await deleteRelationProductBySKU(SKU_Relation);

  return res.status(201).json({
    message: "Succes Delete Relation Product",
    data: relation_product,
  });
};
