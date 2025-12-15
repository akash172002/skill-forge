"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../config/prisma"));
const jwt_1 = require("../utils/jwt");
const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).json({ message: "All feilds are required" });
        }
        const exixtingUser = await prisma_1.default.user.findUnique({ where: { email } });
        if (exixtingUser) {
            return res.status(409).json({ messgae: "User already exixts!!" });
        }
        const hashPassword = await bcrypt_1.default.hash(password, 10);
        const user = await prisma_1.default.user.create({
            data: {
                name,
                email,
                password: hashPassword,
            },
        });
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        res.status(200).json({
            message: "User registered successfully",
            token,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Registration failed" });
    }
};
exports.register = register;
const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await prisma_1.default.user.findUnique({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: "Inavlid credentials" });
        }
        const isMatch = await bcrypt_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials!!!" });
        }
        const token = (0, jwt_1.generateToken)({ id: user.id, role: user.role });
        res.json({
            message: "Login successful",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                role: user.role,
                createdAt: user.createdAt,
            },
        });
    }
    catch (error) {
        res.status(500).json({ message: "Login Failed" });
    }
};
exports.login = login;
