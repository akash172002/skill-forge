import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import { authorizeRole } from "../middlewares/role.middleware";
import {
  getAllProject,
  getAllUser,
  reviewProject,
  updateProjectStatus,
} from "../controllers/admin.controller";

const router = Router();

router.get("/users", authMiddleware, authorizeRole(["ADMIN"]), getAllUser);

router.get(
  "/projects",
  authMiddleware,
  authorizeRole(["ADMIN"]),
  getAllProject
);

router.patch(
  "/projects/:projectId/status",
  authMiddleware,
  authorizeRole(["ADMIN"]),
  updateProjectStatus
);

router.patch(
  "/projects/:projectId/review",
  authMiddleware,
  authorizeRole(["ADMIN"]),
  reviewProject
);

export default router;
