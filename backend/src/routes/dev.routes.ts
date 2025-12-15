import { Router } from "express";
import bcrypt from "bcrypt";
import prisma from "../config/prisma";

const router = Router();

router.post("/create-admin", async (req, res) => {
  const { email, password, name } = req.body;

  const hashed = await bcrypt.hash(password, 10);

  const admin = await prisma.user.create({
    data: {
      name,
      email,
      password: hashed,
      role: "ADMIN",
    },
  });

  res.json({ message: "Admin created", admin });
});

export default router;
