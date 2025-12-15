"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = __importDefault(require("../config/prisma"));
async function main() {
    await prisma_1.default.project.updateMany({
        where: { certificateUrl: null, status: "APPROVED" },
        data: { certificateUrl: "MIGRATION_PENDING" },
    });
    console.log("Projects updated");
}
main()
    .catch(console.error)
    .finally(() => prisma_1.default.$disconnect());
