'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useCartStore } from '@/store';
import { ProductImage, QuantitySelector } from '@/components';
import { CartProduct } from '@/interfaces';
import { currencyFormat } from '@/utils';

export const ProductsInCart = () => {
  const updateProductQuantity = useCartStore((state) => state.updateProductQuantity);
  const removeProduct = useCartStore((state) => state.removeProduct);
  const productsInCart = useCartStore((state) => state.cart);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  if (!loaded) return <p>Cargando...</p>;

  return (
    <>
      {productsInCart.map((product: CartProduct) => (
        <div key={product.slug} className="flex mb-5">
          <ProductImage
            src={product.image}
            width={100}
            height={100}
            style={{ width: '100px', height: '100px' }}
            alt={product.title}
            className="mr-5 rounded object-cover"
          />
          <div>
            <Link
              className="hover:underline cursor-pointer font-medium text-gray-800"
              href={`/product/${product.slug}`}
            >
              {product.title}
            </Link>
            <p className="text-gray-700">{currencyFormat(product.price)}</p>
            {/* <QuantitySelector
              quantity={product.quantity}
              onQuantityChanged={(quantity) => updateProductQuantity(product, quantity)}
            /> */}
            <button
              onClick={() => removeProduct(product)}
              className="underline mt-3 text-sm text-gray-400 hover:text-gray-300"
            >
              Remover
            </button>
          </div>
        </div>
      ))}
    </>
  );
};