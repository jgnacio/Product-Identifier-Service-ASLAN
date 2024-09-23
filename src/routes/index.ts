import { Router } from "express";
import ProductRouter from "./product-router";
import ProviderRouter from "./provider-router";
import RelationProductsRouter from "./relation_products-router";

const router: Router = Router();

router.use("/api/", ProductRouter);
router.use("/api/", ProviderRouter);
router.use("/api/", RelationProductsRouter);

export default router;
