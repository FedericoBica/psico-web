'use server';

import prisma from "@/lib/prisma";

export const getPaginatedProductsAdmin = async ({
  page = 1,
  take = 12,
}: {
  page?: number;
  take?: number;
}) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: { take: 1, select: { url: true } },
        category: true,
      },
    });

    type DbProduct = typeof products[number];
    type DbImage = DbProduct["ProductImage"][number];

    const totalCount = await prisma.product.count();

    return {
      currentPage: page,
      totalPages: Math.ceil(totalCount / take),
      products: products.map((product: DbProduct) => ({
        ...product,
        images: product.ProductImage.map((image: DbImage) => image.url),
      })),
    };
  } catch (error) {
    throw new Error("No se pudo cargar los productos del admin");
  }
};