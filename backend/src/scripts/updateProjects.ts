import prisma from "../config/prisma";

async function main() {
  await prisma.project.updateMany({
    where: { certificateUrl: null, status: "APPROVED" },
    data: { certificateUrl: "MIGRATION_PENDING" },
  });

  console.log("Projects updated");
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
