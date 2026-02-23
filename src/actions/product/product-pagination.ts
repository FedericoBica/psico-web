'use server';

import prisma from '@/lib/prisma';

interface PaginationOptions {
  page?: number;
  take?: number;
  category?: string;
}

type ProductWithImages = {
  id: string;
  title: string;
  description: string;
  price: number;
  oldPrice: number | null;
  slug: string;
  tags: string[];
  downloadUrl: string;
  isPublished: boolean;
  categoryId: string;
  ProductImage: { id: number; url: string }[];
  category: { id: string; name: string };
};

export const getPaginatedProductsWithImages = async ({
  page = 1,
  take = 12,
  category,
}: PaginationOptions) => {
  if (isNaN(Number(page))) page = 1;
  if (page < 1) page = 1;

  try {
    const whereClause = {
      isPublished: true,
      ...(category ? { category: { name: category.toLowerCase() } } : {}),
    };

    const products = await prisma.product.findMany({
      take,
      skip: (page - 1) * take,
      include: {
        ProductImage: {
          take: 2,
          select: { id: true, url: true },
        },
        category: true,
      },
      orderBy: { title: 'asc' },
      where: whereClause,
    });

    const totalCount = await prisma.product.count({ where: whereClause });
    const totalPages = Math.ceil(totalCount / take);

    return {
      currentPage: page,
      totalPages,
      products: (products as ProductWithImages[]).map((product) => ({
        ...product,
        images: product.ProductImage.map((image) => image.url),
        ProductImage: product.ProductImage,
        category: product.category.name,
      })),
    };

  } catch (error) {
    console.log(error);
    throw new Error('No se pudo cargar los productos');
  }
};