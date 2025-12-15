"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
async function seedAdmin() {
    const email = "admin@skillforge.com";
    const existingAdmin = await prisma_1.default.user.findUnique({ where: { email } });
    if (existingAdmin) {
        console.log("Admin already exists");
        return;
    }
    const hashPassword = await bcrypt_1.default.hash("admin123", 10);
    await prisma_1.default.user.create({
        data: {
            name: "Super admin",
            email,
            password: hashPassword,
            role: "ADMIN",
        },
    });
    console.log("Admin created Successfully");
}
seedAdmin()
    .catch(console.error)
    .finally(() => process.exit());
