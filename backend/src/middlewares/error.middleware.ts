import { Request, Response, NextFunction } from "express";
import multer from "multer";

export const errorHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // Multer file size error
  if (err instanceof multer.MulterError) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(400).json({
        message: "File size must be less than 10 MB",
      });
    }
  }

  // Other errors
  return res.status(500).json({
    message: err.message || "Something went wrong",
  });
};
