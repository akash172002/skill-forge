"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const multer_1 = __importDefault(require("multer"));
const errorHandler = (err, req, res, next) => {
    // Multer file size error
    if (err instanceof multer_1.default.MulterError) {
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
exports.errorHandler = errorHandler;
