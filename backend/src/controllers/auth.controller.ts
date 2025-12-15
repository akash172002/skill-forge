import e, { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";
import { generateToken } from "../utils/jwt";

export const register = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All feilds are required" });
    }

    const exixtingUser = await prisma.user.findUnique({ where: { email } });

    if (exixtingUser) {
      return res.status(409).json({ messgae: "User already exixts!!" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashPassword,
      },
    });

    const token = generateToken({ id: user.id, role: user.role });

    res.status(200).json({
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Registration failed" });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Inavlid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials!!!" });
    }

    const token = generateToken({ id: user.id, role: user.role });

    res.json({
      message: "Login successful",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Login Failed" });
  }
};
