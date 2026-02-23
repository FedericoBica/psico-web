export const revalidate = 604800;

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { ProductMobileSlideshow, ProductSlideshow } from "@/components";
import { getProductBySlug } from "@/actions";
import { currencyFormat } from "@/utils";
import { AddToCart } from "@/app/(shop)/product/[slug]/ui/AddToCart";

interface Props {
  params: { slug: string };
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  return {
    title: product?.title ?? "Producto no encontrado",
    description: product?.description ?? "",
    openGraph: {
      title: product?.title ?? "Producto no encontrado",
      description: product?.description ?? "",
      images: product?.images[0] ? [product.images[0]] : [],
    },
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) notFound();

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">

      {/* Slideshow */}
      <div className="col-span-1 md:col-span-2">
        <ProductMobileSlideshow
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        <div className="hidden md:block max-h-[600px] overflow-hidden rounded-xl">
          <ProductSlideshow
            title={product.title}
            images={product.images}
          />
        </div>
      </div>

      {/* Detalles */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-2xl uppercase tracking-tight`}>
          {product.title}
        </h1>

        {/* Precio */}
        <div className="flex flex-wrap items-baseline gap-3 mt-4 mb-6">
          <span className="text-4xl font-black text-white">
            {currencyFormat(product.price)}
          </span>
          {product.oldPrice && product.oldPrice > product.price && (
            <div className="flex items-center gap-2 bg-pink-500/10 border border-pink-500/20 py-1 px-2 rounded-lg">
              <span className="text-sm text-zinc-500 line-through">
                {currencyFormat(product.oldPrice)}
              </span>
              <span className="text-pink-500 text-[10px] font-black uppercase">
                -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}% OFF
              </span>
            </div>
          )}
        </div>

        <AddToCart product={product} />

        <h3 className="font-black text-xs mt-10 uppercase tracking-[0.2em] text-zinc-500">
          Descripción
        </h3>
        <p className="font-light text-zinc-300 leading-relaxed mt-2">
          {product.description}
        </p>
      </div>
    </div>
  );
}