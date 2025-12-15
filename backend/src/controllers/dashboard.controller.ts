import { Response } from "express";
import prisma from "../config/prisma";
import { AuthRequest } from "../middlewares/auth.middleware";

//User Dashboard

export const userDashboard = async (req: AuthRequest, res: Response) => {
  const userId = req.user.id;

  const [total, pending, approved, rejected, recentProjects] =
    await Promise.all([
      prisma.project.count({ where: { userId } }),
      prisma.project.count({ where: { userId, status: "PENDING" } }),
      prisma.project.count({ where: { userId, status: "APPROVED" } }),
      prisma.project.count({ where: { userId, status: "REJECTED" } }),
      prisma.project.findMany({
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

//Admin Dashboard

export const adminDashboard = async (_: AuthRequest, res: Response) => {
  const [users, projects, pending, approved, rejected] = await Promise.all([
    prisma.user.count(),
    prisma.project.count(),
    prisma.project.count({ where: { status: "PENDING" } }),
    prisma.project.count({ where: { status: "APPROVED" } }),
    prisma.project.count({ where: { status: "REJECTED" } }),
  ]);

  res.json({
    users,
    projects,
    pending,
    approved,
    rejected,
  });
};
