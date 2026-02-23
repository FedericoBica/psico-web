'use server';

import prisma from '@/lib/prisma';

export const getProductsByTerm = async (term: string) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        isPublished: true,
        OR: [
          { title: { contains: term, mode: 'insensitive' } },
          { description: { contains: term, mode: 'insensitive' } },
          { tags: { has: term.toLowerCase() } },
        ],
      },
      include: {
        ProductImage: {
          take: 2,
          select: { url: true },
        },
      },
      take: 12,
    });

    return products.map((product: typeof products[number]) => ({
      ...product,
      images: product.ProductImage.map((image: { url: string }) => image.url),
    }));

  } catch (error) {
    console.log(error);
    return [];
  }
};