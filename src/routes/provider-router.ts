import { Router } from "express";
import {
  create,
  remove,
  show,
  showById,
  update,
} from "../controllers/provider-controller";

const router: Router = Router();

router.post("/providers", create);
router.get("/providers", show);
router.get("/providers/:id", showById);
router.put("/providers/:id", update);
router.delete("/providers/:id", remove);

export default router;
