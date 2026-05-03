import { Router, type IRouter } from "express";
import healthRouter from "./health.js";
import listingsRouter from "./listings.js";
import contactRouter from "./contact.js";
import adminRouter from "./admin.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(listingsRouter);
router.use(contactRouter);
router.use(adminRouter);

export default router;
