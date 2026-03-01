export const revalidate = 604800; //7 días

import { Metadata, ResolvingMetadata } from "next";
import { notFound } from "next/navigation";

import { titleFont } from "@/config/fonts";
import {
  ProductMobileSlideshow,
  ProductSlideshow,
} from "@/components";
import { getProductBySlug } from "@/actions";
import { AddToCart } from './ui/AddToCart';

// NUEVOS COMPONENTES PREMIUM
import { ProductHighlights } from "@/components/product/ui/ProductHighlights";
import { ProductDetailedFeature } from "@/components/product/ui/PremiumFeatures";
import { ProductSteps } from "@/components/product/ui/ProductSteps";
import { RelatedProducts } from "@/components/product/related/RelatedProducts";
import { IoStar, IoStarHalf, IoStarOutline } from "react-icons/io5";
import { currencyFormat } from "@/utils";

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

return (
    <div className="mt-5 mb-20 flex flex-col px-4 sm:px-0">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Slideshow */}
        <div className="col-span-1 md:col-span-2">
          <ProductMobileSlideshow
            title={product.title}
            images={product.images}
            className="block md:hidden"
          />
          <div className="hidden md:block max-h-[600px] overflow-hidden rounded-2xl border border-sage-100 shadow-sm">
            <ProductSlideshow
              title={product.title}
              images={product.images}
            />
          </div>
        </div>

        {/* Detalles de Compra */}
        <div className="col-span-1">
          <h1 className={`${titleFont.className} antialiased font-bold text-3xl text-gray-800 leading-tight`}>
            {product.title}
          </h1>

          <div className="flex flex-wrap items-baseline gap-3 mt-6 mb-8">
            <span className="text-4xl font-light text-gray-900">
              {currencyFormat(product.price)}
            </span>

            {product.oldPrice && product.oldPrice > product.price && (
              <div className="flex items-center gap-2 bg-sage-50 border border-sage-200 py-1 px-3 rounded-full">
                <span className="text-sm text-gray-400 line-through">
                  {currencyFormat(product.oldPrice)}
                </span>
                <span className="text-sage-600 text-xs font-bold uppercase tracking-wider">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </span>
              </div>
            )}
          </div>

          <AddToCart product={product} />

          <div className="mt-12 pt-8 border-t border-sage-100">
            <h3 className="font-bold text-sm uppercase tracking-widest text-sage-500 mb-4">
              Sobre este material
            </h3>
            <p className="text-gray-600 leading-relaxed font-light">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <div className="mt-20">
        <RelatedProducts
          categoryId={product.categoryId}
          currentProductId={product.id}
        />
      </div>
    </div>
  );
}