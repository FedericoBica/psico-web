"use server";

import prisma from "@/lib/prisma";

export const getProductsForRecommendations = async (
  excludedIds: string[],
  categories: string[]
) => {
  try {
    const products = await prisma.product.findMany({
      where: {
        id: { notIn: excludedIds },
        isPublished: true,
        category: {
          name: { in: categories, mode: "insensitive" },
        },
      },
      take: 8,
      include: { ProductImage: { take: 2 } },
    });

    type DbProduct = typeof products[number];
    type DbImage = DbProduct["ProductImage"][number];

    return products
      .sort(() => 0.5 - Math.random())
      .slice(0, 4)
      .map((p: DbProduct) => ({
        ...p,
        images: p.ProductImage.map((i: DbImage) => i.url),
      }));
  } catch (error) {
    return [];
  }
};