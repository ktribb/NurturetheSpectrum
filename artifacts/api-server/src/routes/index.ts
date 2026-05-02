import { Router, type IRouter } from "express";
import healthRouter from "./health";
import listingsRouter from "./listings";
import contactRouter from "./contact";
import adminRouter from "./admin";

const router: IRouter = Router();

router.use(healthRouter);
router.use(listingsRouter);
router.use(contactRouter);
router.use(adminRouter);

export default router;
