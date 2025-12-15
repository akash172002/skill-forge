import bcrypt from "bcrypt";
import prisma from "../config/prisma";

async function seedAdmin() {
  const email = "admin@skillforge.com";

  const existingAdmin = await prisma.user.findUnique({ where: { email } });

  if (existingAdmin) {
    console.log("Admin already exists");
    return;
  }

  const hashPassword = await bcrypt.hash("admin123", 10);

  await prisma.user.create({
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
