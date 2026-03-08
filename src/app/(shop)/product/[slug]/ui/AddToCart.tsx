'use client';

// src/app/(shop)/product/[slug]/ui/AddToCart.tsx

import { useState } from 'react';
import { CartProduct, Product } from '@/interfaces';
import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { IoBookOutline, IoCartOutline, IoDocumentOutline } from 'react-icons/io5';

interface Props {
  product: Product;
}

export const AddToCart = ({ product }: Props) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);

  // Si tiene físico, el usuario elige; si no, solo digital
  const [format, setFormat] = useState<'digital' | 'physical'>('digital');

  const selectedPrice = format === 'physical'
    ? (product.physicalPrice ?? product.price)
    : product.price;

  const addToCart = () => {
    const cartProduct: CartProduct = {
      id:       `${product.id}-${format}`, // ID único por formato
      slug:     product.slug,
      title:    product.title,
      price:    selectedPrice,
      quantity: 1,
      image:    product.images[0] ?? '',
      format,
    };
    addProductToCart(cartProduct);
  };

  return (
    <div className="flex flex-col gap-5">

      {/* Selector Digital / Físico — solo si tiene físico */}
      {product.hasPhysical && (
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#777777]">
            Formato
          </span>
          <div className="grid grid-cols-2 gap-3">

            {/* Digital */}
            <button
              type="button"
              onClick={() => setFormat('digital')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                format === 'digital'
                  ? 'border-[#9ead6b] bg-[#eef3da]'
                  : 'border-[#e3e3e3] bg-white hover:border-[#c9d894]'
              }`}
            >
              <IoDocumentOutline
                size={24}
                className={format === 'digital' ? 'text-[#9ead6b]' : 'text-[#aaaaaa]'}
              />
              <div className="text-center">
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  format === 'digital' ? 'text-[#9ead6b]' : 'text-[#777777]'
                }`}>
                  Digital
                </p>
                <p className="text-sm font-bold text-[#2d2d2d] mt-0.5">
                  {currencyFormat(product.price)}
                </p>
              </div>
            </button>

            {/* Físico */}
            <button
              type="button"
              onClick={() => setFormat('physical')}
              className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all ${
                format === 'physical'
                  ? 'border-[#9ead6b] bg-[#eef3da]'
                  : 'border-[#e3e3e3] bg-white hover:border-[#c9d894]'
              }`}
            >
              <IoBookOutline
                size={24}
                className={format === 'physical' ? 'text-[#9ead6b]' : 'text-[#aaaaaa]'}
              />
              <div className="text-center">
                <p className={`text-xs font-bold uppercase tracking-wider ${
                  format === 'physical' ? 'text-[#9ead6b]' : 'text-[#777777]'
                }`}>
                  Físico
                </p>
                <p className="text-sm font-bold text-[#2d2d2d] mt-0.5">
                  {currencyFormat(product.physicalPrice ?? product.price)}
                </p>
              </div>
            </button>

          </div>

          {/* Info según formato */}
          <p className="text-xs text-[#777777] font-light mt-1">
            {format === 'digital'
              ? '📥 Descarga inmediata en PDF tras el pago.'
              : '📦 Envío a todo Uruguay. Te contactamos por WhatsApp para coordinar.'}
          </p>
        </div>
      )}

      {/* Badge si solo es digital */}
      {!product.hasPhysical && (
        <div className="flex items-center gap-2 text-[#9ead6b] bg-[#eef3da] w-fit px-3 py-1 rounded-full border border-[#c9d894]">
          <IoDocumentOutline size={16} />
          <span className="text-xs font-bold uppercase tracking-wider">Acceso Digital Vitalicio</span>
        </div>
      )}

      {/* Botón agregar al carrito */}
      <button
        onClick={addToCart}
        className="w-full bg-[#9ead6b] hover:bg-[#7a9347] text-white font-bold py-4 px-6 rounded-2xl transition-all shadow-lg shadow-[#9ead6b]/20 flex justify-center items-center gap-2 active:scale-[0.98]"
      >
        <IoCartOutline size={20} />
        <span>
          {product.hasPhysical
            ? `Agregar ${format === 'digital' ? 'libro digital' : 'libro físico'}}`
            : 'Agregar al Carrito'}
        </span>
      </button>

    </div>
  );
};