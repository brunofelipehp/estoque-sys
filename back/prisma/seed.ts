import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash(process.env.USER_PASSWORD_ROOT as string, 10);

  await prisma.user.upsert({
    where: { email: 'root@system.com' },
    update: {},
    create: {
      name: 'Estoque user',
      email: 'root@system.com',
      password: hashedPassword,
      role: 'ROOT',
    },
  });

  console.log('Root user created');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
