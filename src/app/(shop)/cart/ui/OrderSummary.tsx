'use client';

import { useCartStore } from '@/store';
import { currencyFormat } from '@/utils';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export const OrderSummary = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const { itemsInCart, subTotal, total } = useCartStore(
    (state) => state.getSummaryInformation()
  );

  useEffect(() => {
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (itemsInCart === 0 && loaded) {
      router.replace('/');
    }
  }, [itemsInCart, loaded, router]);

  if (!loaded) return <p className="animate-pulse text-pink-500">Cargando resumen...</p>;

  return (
    <div className="grid grid-cols-2 gap-y-3">
      <span className="text-gray-400">No. Productos</span>
      <span className="text-right text-gray-700">{itemsInCart} unidades</span>

      <span className="text-gray-400">Total</span>
      <span className="text-right text-gray-700">{currencyFormat(subTotal)}</span>

      <div className="col-span-2 h-px bg-zinc-800 my-2" />

      <span className="text-xl font-bold text-gray-100">Total:</span>
      <span className="text-xl text-right font-bold text-gray-800">
        {currencyFormat(total)}
      </span>
    </div>
  );
};