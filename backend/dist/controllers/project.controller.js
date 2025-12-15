"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getMyProjects = exports.submitProject = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const cloudinary_1 = __importDefault(require("../config/cloudinary"));
const submitProject = async (req, res, next) => {
    try {
        const { title } = req.body;
        if (!req.file) {
            return res.status(400).json({ message: "File required" });
        }
        const uploadResult = await cloudinary_1.default.uploader.upload(req.file.path, {
            folder: "skillforge-projects",
            resource_type: "raw",
        });
        const project = await prisma_1.default.project.create({
            data: {
                title,
                fileUrl: uploadResult.secure_url,
                userId: req.user.id,
            },
        });
        res.status(200).json({
            message: "Project submitted successfully",
            project,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.submitProject = submitProject;
const getMyProjects = async (req, res) => {
    const projects = await prisma_1.default.project.findMany({
        where: { userId: req.user.id },
        orderBy: { createdAt: "desc" },
    });
    res.json(projects);
};
exports.getMyProjects = getMyProjects;
