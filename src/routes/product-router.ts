import { Router } from "express";
import {
  create,
  show,
  update,
  remove,
  showById,
  showBySKU,
} from "../controllers/product-controller";

const router: Router = Router();

router.post("/products", create);
router.get("/products", show);
router.get("/products/:id", showById);
router.get("/products/sku/:sku", showBySKU);
router.put("/products/:id", update);
router.delete("/products/:sku", remove);

export default router;
