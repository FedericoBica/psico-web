'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';
import { useState } from 'react';

interface Props {
  product: Product;
}

export const ProductGridItem = ({ product }: Props) => {
  // Simplificado: solo una imagen, sin hover de segunda imagen
  const [displayImage, setDisplayImage] = useState(product.images[0]);

  return (
    <div className="rounded-md overflow-hidden fade-in flex flex-col h-full border border-gray-100 shadow-sm hover:shadow-md transition-all">
      <Link href={`/product/${product.slug}`} className="relative block">
        {/* Badge de Oferta (Digital) */}
        {(product.oldPrice ?? 0) > product.price && (
          <span className="absolute top-2 left-2 bg-blue-600 text-white text-xs font-bold px-2 py-1 rounded-sm z-10">
            OFERTA
          </span>
        )}
        
        <Image
          src={`/products/${displayImage}`}
          alt={product.title}
          className="w-full object-cover rounded"
          width={500}
          height={500}
        />
      </Link>

      <div className="p-4 flex flex-col flex-grow">
        <Link
          className="hover:text-blue-600 transition-all font-semibold text-lg line-clamp-2"
          href={`/product/${product.slug}`}
        >
          {product.title}
        </Link>
        
        <div className="mt-auto pt-2 flex items-center gap-2">
          <span className="text-xl font-bold">${product.price}</span>
          {(product.oldPrice ?? 0) > product.price && (
            <span className="text-sm line-through text-gray-400">
              ${product.oldPrice}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};