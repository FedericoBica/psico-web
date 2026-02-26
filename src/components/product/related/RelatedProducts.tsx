import { ProductGridItem } from "../../products/product-grid/ProductGridItem";
import prisma from "@/lib/prisma";

interface Props {
  categoryId: string;
  currentProductId: string;
}

export const RelatedProducts = async ({ categoryId, currentProductId }: Props) => {
  const dbProducts = await prisma.product.findMany({
    where: {
      id: { not: currentProductId },
      isPublished: true,
    },
    take: 10,
    include: { ProductImage: { take: 2 } },
  });

  if (dbProducts.length === 0) return null;

  type DbProduct = typeof dbProducts[number];
  type DbImage = DbProduct["ProductImage"][number];

  const relatedProducts = dbProducts
    .sort(() => 0.5 - Math.random())
    .slice(0, 4)
    .map((p: DbProduct) => ({ ...p, images: p.ProductImage.map((i: DbImage) => i.url) }));

  return (
    <div className="mt-20 pb-20 border-t border-zinc-800 pt-10 px-5 sm:px-0">
      <h2 className="text-2xl font-black uppercase tracking-tighter text-white mb-8 italic">
        También te puede gustar <span className="text-pink-500">✦</span>
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {relatedProducts.map((product: DbProduct & { images: string[] }) => (
          <ProductGridItem
            key={product.id}
            product={product as any}
          />
        ))}
      </div>
    </div>
  );
};