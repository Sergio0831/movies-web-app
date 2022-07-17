import { movies } from '../data/movies';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// export const main = async () => {
//   await prisma.movie.createMany({
//     data: movies
//   });
// };

export const main = async () => {
  await prisma.movie.createMany({
    data: movies
  });
};

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
