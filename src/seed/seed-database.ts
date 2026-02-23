import prisma from '../lib/prisma';
import { initialData } from './seed';
import bcryptjs from 'bcryptjs';

async function main() {
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();

  const { categories, products, users } = initialData;

  await prisma.user.createMany({ data: users });

  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({ data: categoriesData });

  const categoriesDB = await prisma.category.findMany();

  for (const product of products) {
    const { category, images, ...rest } = product;

    const dbCategory = categoriesDB.find(
      (c) => c.name.toLowerCase() === category.toLowerCase()
    );

    if (!dbCategory) {
      console.error(`Error: La categoría "${category}" no existe.`);
      continue;
    }

    const dbProduct = await prisma.product.create({
      data: {
        title:       rest.title,
        description: rest.description,
        price:       rest.price,
        slug:        rest.slug,
        tags:        rest.tags,
        downloadUrl: rest.downloadUrl,
        isPublished: true,
        categoryId:  dbCategory.id,
      }
    });

    await prisma.productImage.createMany({
      data: images.map((url) => ({ url, productId: dbProduct.id })),
    });
  }

  console.log('Seed ejecutado con éxito');
}

(() => {
  if (process.env.NODE_ENV === 'production') return;
  main();
})();