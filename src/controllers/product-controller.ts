import { Request, Response } from "express";
import {
  createProduct,
  deleteProduct,
  showProductById,
  showProductBySKU,
  showProducts,
  updateProduct,
} from "../services/product-service";

export const create = async (req: Request, res: Response) => {
  const { title, price, description, stock, category, brand } = req.body;

  if (
    !title ||
    !price ||
    !description ||
    (!stock && stock != 0) ||
    !category ||
    !brand
  ) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const product = await createProduct({
    title: req.body.title,
    price: req.body.price,
    description: req.body.description,
    stock: req.body.stock,
    category: req.body.category,
    brand: req.body.brand,
  });

  return res.status(201).json({
    message: "Succes Create Product",
    data: product,
  });
};

export const show = async (req: Request, res: Response) => {
  const products = await showProducts();

  return res.status(201).json({
    message: "List Data Product",
    data: products,
  });
};

export const showById = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);

  if (!id) {
    return res.status(400).json({
      message: "Please provide product ID",
    });
  }

  const product = await showProductById(id);

  if (!product) {
    return res.status(404).json({
      message: "Product not found",
      data: null,
    });
  }

  return res.status(201).json({
    message: "Detail Product",
    data: product,
  });
};

export const showBySKU = async (req: Request, res: Response) => {
  const sku = req.params.sku;

  const product = await showProductBySKU(sku);

  return res.status(201).json({
    message: "Detail Product",
    data: product,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const product = await updateProduct(
    {
      title: req.body.title,
      price: req.body.price,
      description: req.body.description,
      stock: req.body.stock,
      category: req.body.category,
      brand: req.body.brand,
    },
    id
  );

  return res.status(201).json({
    message: "Success Update Product",
    data: product,
  });
};

export const remove = async (req: Request, res: Response) => {
  const sku = req.params.sku;

  const product = await deleteProduct(sku);

  return res.status(201).json({
    message: "Success Delete Product",
    data: product,
  });
};
