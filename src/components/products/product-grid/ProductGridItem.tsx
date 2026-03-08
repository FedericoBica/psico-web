'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';
import { useState } from 'react';
import { currencyFormat } from '@/utils';

interface Props { product: Product; }

const getImageSrc = (src: string): string => {
  if (!src) return '/imgs/placeholder.jpg';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return src;
  return `/products/${src}`;
};

export const ProductGridItem = ({ product }: Props) => {
  const [displayImage] = useState(product.images[0]);
  const imageSrc = getImageSrc(displayImage);
  const oldPrice = product.oldPrice ?? 0;
  const hasDiscount = oldPrice > 0 && oldPrice > product.price;
  
  const discountPct = hasDiscount
    ? Math.round(((oldPrice - product.price) / oldPrice) * 100)
    : 0;
    
  return (
    <div className="group rounded-none overflow-hidden bg-white border border-[#e3e3e3] hover:border-[#c9d894] hover:shadow-lg transition-all duration-300 flex flex-col">

      {/* Imagen */}
      <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[#e3e3e3]">
        {hasDiscount && (
          <span className="absolute top-3 left-3 z-10 bg-[#9ead6b] text-white text-[9px] font-bold px-2.5 py-1 rounded-full uppercase tracking-wider">
            -{discountPct}%
          </span>
        )}
        <Image
          src={imageSrc}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow">
        <Link
          href={`/product/${product.slug}`}
          className="font-serif text-lg text-[#2d2d2d] leading-snug line-clamp-2 hover:text-[#9ead6b] transition-colors mb-2"
        >
          {product.title}
        </Link>

        <div className="mt-auto flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#2d2d2d]">
              {currencyFormat(product.price)}
            </span>
            {hasDiscount && (
              <span className="text-sm text-[#aaaaaa] line-through">
                {currencyFormat(product.oldPrice!)}
              </span>
            )}
          </div>
          <Link
            href={`/product/${product.slug}`}
            className="text-[10px] font-bold uppercase tracking-[0.15em] text-[#9ead6b] hover:text-[#7a9347] transition-colors border-b border-[#c9d894] pb-0.5"
          >
            Ver más →
          </Link>
        </div>
      </div>
    </div>
  );
};