"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewProject = exports.updateProjectStatus = exports.getSingleProject = exports.getAllProject = exports.getAllUser = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
const email_1 = require("../utils/email");
const s3upload_1 = require("../utils/s3upload");
const certificate_1 = require("../utils/certificate");
const fs_1 = __importDefault(require("fs"));
const getAllUser = async (_, res) => {
    const users = await prisma_1.default.user.findMany({
        select: {
            id: true,
            name: true,
            email: true,
            role: true,
            createdAt: true,
        },
    });
    res.json(users);
};
exports.getAllUser = getAllUser;
const getAllProject = async (_, res) => {
    const projects = await prisma_1.default.project.findMany({
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
        orderBy: { createdAt: "desc" },
    });
    res.status(200).json(projects);
};
exports.getAllProject = getAllProject;
const getSingleProject = async (req, res) => {
    const { projectId } = req.params;
    const project = await prisma_1.default.project.findUnique({
        where: { id: projectId },
        include: {
            user: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                },
            },
        },
    });
    if (!project) {
        return res.status(404).json({ message: "Project not found" });
    }
    res.status(200).json(project);
};
exports.getSingleProject = getSingleProject;
const updateProjectStatus = async (req, res) => {
    const { projectId } = req.params;
    const { status } = req.body;
    if (!["APPROVED", "REJECTED"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    const project = await prisma_1.default.project.update({
        where: { id: projectId },
        data: { status },
    });
    res.json({
        message: `Project ${status.toLowerCase()}`,
        project,
    });
};
exports.updateProjectStatus = updateProjectStatus;
const reviewProject = async (req, res) => {
    const { projectId } = req.params;
    const { status, score, feedback } = req.body;
    if (!["APPROVED", "REJECTED"].includes(status)) {
        return res.status(400).json({ message: "Invalid status" });
    }
    const project = await prisma_1.default.project.update({
        where: { id: projectId },
        data: {
            status,
            score,
            feedback,
        },
        include: {
            user: {
                select: {
                    email: true,
                    name: true,
                },
            },
        },
    });
    if (status === "APPROVED") {
        const certPath = await (0, certificate_1.generateCertificate)(project.user.name, project.title);
        const certificateUrl = await (0, s3upload_1.uploadToS3)(certPath, "certificates");
        // save certificate URL
        await prisma_1.default.project.update({
            where: { id: projectId },
            data: {
                certificateUrl,
            },
        });
        fs_1.default.unlinkSync(certPath);
    }
    await (0, email_1.sendEmail)(project.user.email, "Project Review Update", `Hi ${project.user.name},

Your project "${project.title}" was ${status}.

Score: ${score ?? "N/A"}
Feedback: ${feedback ?? "No feedback provided"}`);
    res.json({
        message: "Project reviewed successfully",
        project,
    });
};
exports.reviewProject = reviewProject;
