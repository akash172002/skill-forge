import { NextFunction, Response } from "express";
import prisma from "../config/prisma";
import cloudinary from "../config/cloudinary";
import { AuthRequest } from "../middlewares/auth.middleware";

export const submitProject = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title } = req.body;

    if (!req.file) {
      return res.status(400).json({ message: "File required" });
    }

    const uploadResult = await cloudinary.uploader.upload(req.file.path, {
      folder: "skillforge-projects",
      resource_type: "raw",
    });

    const project = await prisma.project.create({
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
  } catch (error: any) {
    next(error);
  }
};

export const getMyProjects = async (req: AuthRequest, res: Response) => {
  const projects = await prisma.project.findMany({
    where: { userId: req.user.id },
    orderBy: { createdAt: "desc" },
  });

  res.json(projects);
};
