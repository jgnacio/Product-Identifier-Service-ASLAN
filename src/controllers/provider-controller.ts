import { Request, Response } from "express";

import {
  createProvider,
  deleteProvider,
  showProviders,
  updateProvider,
} from "../services/provider-service";

export const create = async (req: Request, res: Response) => {
  const { name, direction, contact } = req.body;

  if (!name || !direction || !contact) {
    return res.status(400).json({
      message: "Please provide all the required fields",
    });
  }

  const provider = await createProvider({
    name: req.body.name,
    direction: req.body.direction,
    contact: req.body.contact,
  });

  return res.status(201).json({
    message: "Succes Create Provider",
    data: provider,
  });
};

export const show = async (req: Request, res: Response) => {
  const providers = await showProviders();

  return res.status(201).json({
    message: "List Data Provider",
    data: providers,
  });
};

export const update = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const provider = await updateProvider(
    {
      name: req.body.name,
      direction: req.body.direction,
      contact: req.body.contact,
    },
    id
  );

  return res.status(201).json({
    message: "Succes Update Provider",
    data: provider,
  });
};

export const remove = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  const provider = await deleteProvider(id);

  return res.status(201).json({
    message: "Succes Delete Provider",
    data: provider,
  });
};
