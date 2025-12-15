"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const upload_middleware_1 = __importDefault(require("../middlewares/upload.middleware"));
const auth_middleware_1 = require("../middlewares/auth.middleware");
const project_controller_1 = require("../controllers/project.controller");
const router = (0, express_1.Router)();
router.post("/submit", auth_middleware_1.authMiddleware, upload_middleware_1.default.single("file"), project_controller_1.submitProject);
router.get("/my", auth_middleware_1.authMiddleware, project_controller_1.getMyProjects);
exports.default = router;
