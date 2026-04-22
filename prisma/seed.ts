import { PrismaClient } from "@prisma/client";
import { defaultSiteConfig } from "../src/lib/default-site-config";

const prisma = new PrismaClient();

async function main() {
  await prisma.appConfig.upsert({
    where: { id: 1 },
    create: {
      id: 1,
      data: defaultSiteConfig as object,
    },
    update: {},
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
