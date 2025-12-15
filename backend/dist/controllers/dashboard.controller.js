"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminDashboard = exports.userDashboard = void 0;
const prisma_1 = __importDefault(require("../config/prisma"));
//User Dashboard
const userDashboard = async (req, res) => {
    const userId = req.user.id;
    const [total, pending, approved, rejected, recentProjects] = await Promise.all([
        prisma_1.default.project.count({ where: { userId } }),
        prisma_1.default.project.count({ where: { userId, status: "PENDING" } }),
        prisma_1.default.project.count({ where: { userId, status: "APPROVED" } }),
        prisma_1.default.project.count({ where: { userId, status: "REJECTED" } }),
        prisma_1.default.project.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            take: 5,
        }),
    ]);
    res.json({
        total,
        pending,
        approved,
        rejected,
        recentProjects,
    });
};
exports.userDashboard = userDashboard;
//Admin Dashboard
const adminDashboard = async (_, res) => {
    const [users, projects, pending, approved, rejected] = await Promise.all([
        prisma_1.default.user.count(),
        prisma_1.default.project.count(),
        prisma_1.default.project.count({ where: { status: "PENDING" } }),
        prisma_1.default.project.count({ where: { status: "APPROVED" } }),
        prisma_1.default.project.count({ where: { status: "REJECTED" } }),
    ]);
    res.json({
        users,
        projects,
        pending,
        approved,
        rejected,
    });
};
exports.adminDashboard = adminDashboard;
