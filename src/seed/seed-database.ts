import prisma from '../lib/prisma';
import { initialData } from './seed';

async function main() {
  // Limpiar en orden correcto (respetando foreign keys)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.user.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.post.deleteMany();

  const { categories, products, users } = initialData;

  // Crear usuarios
  await prisma.user.createMany({ data: users });
  console.log('✅ Usuarios creados');

  // Crear categorías
  const categoriesData = categories.map((name) => ({ name }));
  await prisma.category.createMany({ data: categoriesData });
  console.log('✅ Categorías creadas');

  const categoriesDB = await prisma.category.findMany();

  // Crear productos
  for (const product of products) {
    const { category, images, ...rest } = product;

    const dbCategory = categoriesDB.find(
      (c) => c.name.toLowerCase() === category.toLowerCase()
    );

    if (!dbCategory) {
      console.error(`❌ Categoría "${category}" no encontrada`);
      continue;
    }

    const dbProduct = await prisma.product.create({
      data: {
        title:       rest.title,
        description: rest.description,
        price:       rest.price,
        oldPrice:    rest.oldPrice ?? null,
        slug:        rest.slug,
        tags:        rest.tags,
        downloadUrl: rest.downloadUrl,
        isPublished: true,
        categoryId:  dbCategory.id,
      },
    });

    await prisma.productImage.createMany({
      data: images.map((url) => ({ url, productId: dbProduct.id })),
    });

    console.log(`✅ Producto creado: ${dbProduct.title}`);
  }

  console.log('\n🎉 Seed ejecutado con éxito');
  console.log('─────────────────────────────');
  console.log('Admin:  admin@psicoweb.com / 123456');
  console.log('User:   user@psicoweb.com  / 123456');
}

main()
  .catch((e) => {
    console.error('❌ Error en el seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });