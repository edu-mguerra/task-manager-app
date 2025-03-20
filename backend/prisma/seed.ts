import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {

  const categories = [
    'Trabalho',
    'Estudos',
    'Pessoal',
    'Saúde',
    'Projetos',
  ];

  for (const categoryName of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: categoryName },
    });

    if (!existingCategory) {
      await prisma.category.create({
        data: { name: categoryName },
      });
      console.log(`Categoria criada: ${categoryName}`);
    }
  }
}

main()
  .catch((e) => {
    throw e;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
