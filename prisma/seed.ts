import { hashPassword } from '@/app/server/auth';
import { prisma } from '@/app/server/db';

async function main() {
  await prisma.user.deleteMany();
  await prisma.user.create({
    data: { email: 'virgile@algomax.fr', password: await hashPassword({ password: 'abc123' }) },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async e => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
