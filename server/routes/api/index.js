import { Router } from "express";
import todoRoutes from "./todo/todoRoutes.js";

const router = Router();

router.use("/todo", todoRoutes);

export default router;
