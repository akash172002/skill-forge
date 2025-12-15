"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadToS3 = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const s3_1 = __importDefault(require("../config/s3"));
const client_s3_1 = require("@aws-sdk/client-s3");
const uploadToS3 = async (filePath, folder) => {
    const fileBuffer = fs_1.default.readFileSync(filePath);
    const fileName = `${folder}/${Date.now()}-${path_1.default.basename(filePath)}`;
    const uploadParams = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: fileName,
        Body: fileBuffer,
        ContentLength: fileBuffer.length,
        ContentType: "application/pdf",
    };
    await s3_1.default.send(new client_s3_1.PutObjectCommand(uploadParams));
    return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileName}`;
};
exports.uploadToS3 = uploadToS3;
