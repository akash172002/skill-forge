import fs from "fs";
import path from "path";
import s3 from "../config/s3";
import { PutObjectCommand } from "@aws-sdk/client-s3";

export const uploadToS3 = async (filePath: string, folder: string) => {
  const fileBuffer = fs.readFileSync(filePath);
  const fileName = `${folder}/${Date.now()}-${path.basename(filePath)}`;

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    Body: fileBuffer,
    ContentLength: fileBuffer.length,
    ContentType: "application/pdf",
  };

  await s3.send(new PutObjectCommand(uploadParams));

  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
