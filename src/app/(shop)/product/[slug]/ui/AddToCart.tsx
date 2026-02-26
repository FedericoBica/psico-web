'use client';

import { useState } from 'react';
import { QuantitySelector } from '@/components';
import { CartProduct, Product } from '@/interfaces';
import { useCartStore } from '@/store';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const [quantity, setQuantity] = useState<number>(1);

  const addToCart = () => {
    const cartProduct: CartProduct = {
      id:       product.id,
      slug:     product.slug,
      title:    product.title,
      price:    product.price,
      quantity: quantity,
      image:    product.images[0] ?? '',
    };

    addProductToCart(cartProduct);
    setQuantity(1);
  };

  return (
    <>
      <span className="mt-2 block text-sm text-zinc-400">Cantidad</span>
      <QuantitySelector
        quantity={quantity}
        onQuantityChanged={setQuantity}
      />
      <button
        onClick={addToCart}
        className="btn-primary w-full mt-5"
      >
        Agregar al carrito
      </button>
    </>
  );
};