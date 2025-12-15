import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import {
  userDashboard,
  adminDashboard,
} from "../controllers/dashboard.controller";

const router = Router();

router.get("/user", authMiddleware, userDashboard);

router.get("/admin", authMiddleware, authorizeRole(["ADMIN"])), adminDashboard;

export default router;
