import { Router } from "express";
import upload from "../middlewares/upload.middleware";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  getMyProjects,
  submitProject,
} from "../controllers/project.controller";

const router = Router();

router.post("/submit", authMiddleware, upload.single("file"), submitProject);
router.get("/my", authMiddleware, getMyProjects);

export default router;
