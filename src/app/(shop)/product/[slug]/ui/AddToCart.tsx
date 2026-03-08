'use client';

import { useState } from 'react';
import { QuantitySelector } from '@/components';
import { CartProduct, Product } from '@/interfaces';
import { useCartStore } from '@/store';
import { IoBookOutline, IoCartOutline } from 'react-icons/io5';

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
     <div className="flex flex-col gap-4 mt-8">
      <div className="flex items-center gap-2 text-sage-600 bg-sage-50 w-fit px-3 py-1 rounded-full border border-sage-100">
        <IoBookOutline size={16} />
        <span className="text-xs font-bold uppercase tracking-wider">Acceso Digital Vitalicio</span>
      </div>
      
      {/* Botón de compra directo, sin selector de cantidad */}
      <button 
        onClick={ addToCart }
        className="w-full bg-sage-500 hover:bg-sage-600 text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-sage-200/50 flex justify-center items-center gap-2 active:scale-[0.98]"
      >
        <IoCartOutline size={20} />
        <span>Agregar al Carrito </span>
      </button>
    </div>
  );
};