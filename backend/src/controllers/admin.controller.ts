import { Request, Response } from "express";
import prisma from "../config/prisma";
import { sendEmail } from "../utils/email";
import cloudinary from "../config/cloudinary";
import { uploadToS3 } from "../utils/s3upload";
import { generateCertificate } from "../utils/certificate";
import fs from "fs";

export const getAllUser = async (_: Request, res: Response) => {
  const users = await prisma.user.findMany({
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

export const getAllProject = async (_: Request, res: Response) => {
  const project = await prisma.project.findMany({
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
};

export const updateProjectStatus = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { status } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  const project = await prisma.project.update({
    where: { id: projectId },
    data: { status },
  });

  res.json({
    message: `Project ${status.toLowerCase()}`,
    project,
  });
};

export const reviewProject = async (req: Request, res: Response) => {
  const { projectId } = req.params;
  const { status, score, feedback } = req.body;

  if (!["APPROVED", "REJECTED"].includes(status)) {
    return res.status(400).json({ message: "Invalid status" });
  }

  // ✅ 1. Update project & fetch user
  const project = await prisma.project.update({
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
    const certPath = await generateCertificate(
      project.user.name,
      project.title
    );

    const certificateUrl = await uploadToS3(certPath, "certificates");

    // save certificate URL
    await prisma.project.update({
      where: { id: projectId },
      data: {
        certificateUrl,
      },
    });

    fs.unlinkSync(certPath);
  }

  await sendEmail(
    project.user.email,
    "Project Review Update",
    `Hi ${project.user.name},

Your project "${project.title}" was ${status}.

Score: ${score ?? "N/A"}
Feedback: ${feedback ?? "No feedback provided"}`
  );

  res.json({
    message: "Project reviewed successfully",
    project,
  });
};
