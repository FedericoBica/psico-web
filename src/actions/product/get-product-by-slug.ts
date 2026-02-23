'use server';

import prisma from '@/lib/prisma';

export const getProductBySlug = async (slug: string) => {
  try {
    const product = await prisma.product.findFirst({
      include: {
        ProductImage: {
          select: {
            id: true,
            url: true,
          },
        },
        category: {
          select: {
            name: true,
          },
        },
      },
      where: { slug },
    });

    if (!product) return null;

    return {
      ...product,
      images: product.ProductImage.map((image: { id: number; url: string }) => image.url),
      category: product.category.name,
    };

  } catch (error) {
    console.log(error);
    throw new Error('Error al obtener producto por slug');
  }
};