import { Router } from "express";

import {
  create,
  remove,
  show,
  showBySKU,
  update,
} from "../controllers/relation_products-controller";

const router: Router = Router();

router.post("/relationProducts", create);
router.get("/relationProducts", show);
router.get("/relationProducts/:SKU_Relation", showBySKU);
router.put("/relationProducts/:id", update);
router.delete("/relationProducts/:id", remove);

export default router;
