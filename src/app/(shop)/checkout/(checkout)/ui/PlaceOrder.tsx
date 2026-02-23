'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { placeOrder } from '@/actions'; // La action que ya simplificamos
import { currencyFormat } from '@/utils';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [buyerEmail, setBuyerEmail] = useState(''); // Estado para el email del invitado

  const cart = useCartStore((state) => state.cart);
  const clearCart = useCartStore((state) => state.clearCart);
  const { itemsInCart, subTotal, total } = useCartStore((state) => state.getSummaryInformation());

  useEffect(() => {
    setLoaded(true);
  }, []);

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    // Mapeamos los productos para la Action
    const productsToOrder = cart.map(p => ({
      productId: p.id,
      quantity: p.quantity,
      price: p.price
    }));

    // Llamamos a la Action simplificada que hicimos antes
    const resp = await placeOrder(productsToOrder, buyerEmail);
    
    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message);
      return;
    }

    // Si todo sale bien
    clearCart();
    router.replace('/orders/' + resp.order!.id);
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
      <h2 className="text-2xl mb-2 font-bold">Resumen de compra</h2>

      <div className="grid grid-cols-2">
        <span>No. Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 artículo' : `${itemsInCart} artículos`}</span>

        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>

        <span className="mt-5 text-2xl font-bold">Total:</span>
        <span className="mt-5 text-2xl font-bold text-right">{currencyFormat(total)}</span>
      </div>

      <div className="mt-5 mb-2 w-full">
        <p className="mb-2 font-semibold">Email para envío de E-books:</p>
        <input 
          type="email"
          placeholder="tu@email.com"
          className="p-2 border rounded-md w-full bg-gray-100"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
        />
        
        <p className="text-red-500 mt-2">{errorMessage}</p>

        {/* Disclaimer legal rápido */}
        <p className="text-[10px] mt-4 text-gray-500 italic">
          Al confirmar, aceptas que los productos digitales no tienen devolución una vez enviado el link de descarga.
        </p>

        <button
          onClick={onPlaceOrder}
          disabled={isPlacingOrder || buyerEmail.length < 5}
          className={`${
            isPlacingOrder || buyerEmail.length < 5 ? 'btn-disabled' : 'btn-primary'
          } w-full mt-5`}
        >
          Confirmar y Pagar
        </button>
      </div>
    </div>
  );
};