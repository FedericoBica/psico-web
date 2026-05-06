'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useCartStore, useAddressStore } from '@/store';
import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';
import { IoHomeOutline, IoPencilOutline } from 'react-icons/io5';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded]                 = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage]     = useState('');
  const [buyerEmail, setBuyerEmail]         = useState('');

  const cart        = useCartStore((s) => s.cart);
  const clearCart   = useCartStore((s) => s.clearCart);
  const hasPhysical = useCartStore((s) => s.hasPhysicalItems());
  const address     = useAddressStore((s) => s.address);
  const { itemsInCart, subTotal, total } = useCartStore((s) => s.getSummaryInformation());

  useEffect(() => { setLoaded(true); }, []);

  const addressComplete = !!(
    address.firstName && address.lastName && address.phone &&
    address.address && address.city && address.departamento
  );

  const isFormValid = () => {
    if (buyerEmail.length < 5) return false;
    if (hasPhysical) return addressComplete;
    return true;
  };

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);
    setErrorMessage('');

    const productsToOrder = cart.map((p) => {
      const uuidMatch = p.id.match(/^([0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12})/i);
      const productId = uuidMatch ? uuidMatch[1] : p.id;
      return {
        productId,
        quantity: p.quantity,
        price:    p.price,
        format:   p.format ?? 'digital',
      };
    });

    const resp = await placeOrder(
      productsToOrder,
      buyerEmail,
      undefined,
      hasPhysical ? {
        shippingName:    `${address.firstName} ${address.lastName}`,
        shippingPhone:   address.phone,
        shippingAddress: address.address,
        shippingCity:    address.city,
        shippingDept:    address.departamento,
      } : undefined
    );

    if (!resp.ok) {
      setIsPlacingOrder(false);
      setErrorMessage(resp.message ?? 'Error al crear la orden');
      return;
    }

    clearCart();
    router.replace('/orders/' + resp.order!.id);
  };

  if (!loaded) return <p>Cargando...</p>;

  return (
    <div className="bg-white rounded-2xl border border-[#e3e3e3] shadow-sm p-7 h-fit space-y-6">
      <h2 className="text-xl font-bold text-[#2d2d2d]">Resumen de compra</h2>

      <div className="grid grid-cols-2 gap-y-2 text-sm text-[#555555]">
        <span>Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 ítem' : `${itemsInCart} ítems`}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <div className="col-span-2 border-t border-[#e3e3e3] my-1" />
        <span className="text-lg font-bold text-[#2d2d2d]">Total</span>
        <span className="text-lg font-bold text-right text-[#2d2d2d]">{currencyFormat(total)}</span>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">
          Email para recibir los materiales
        </label>
        <input
          type="email"
          placeholder="tu@email.com"
          className="input-base"
          value={buyerEmail}
          onChange={(e) => setBuyerEmail(e.target.value)}
        />
      </div>

      {hasPhysical && (
        <div className="bg-[#f7f7f5] border border-[#e3e3e3] rounded-2xl p-5 space-y-2">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2">
              <IoHomeOutline size={16} className="text-[#9ead6b]" />
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">
                Envío (libro físico)
              </span>
            </div>
            <Link
              href="/checkout/address"
              className="flex items-center gap-1 text-[11px] text-[#9ead6b] hover:underline"
            >
              <IoPencilOutline size={13} />
              {addressComplete ? 'Editar' : 'Completar'}
            </Link>
          </div>

          {addressComplete ? (
            <div className="text-sm text-[#555] space-y-0.5">
              <p className="font-medium">{address.firstName} {address.lastName}</p>
              <p>{address.address}{address.address2 ? `, ${address.address2}` : ''}</p>
              <p>{address.city}, {address.departamento}</p>
              <p>{address.phone}</p>
            </div>
          ) : (
            <p className="text-xs text-[#e07b7b]">
              Debés completar los datos de envío antes de continuar.
            </p>
          )}
        </div>
      )}

      {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

      <p className="text-[10px] text-[#aaaaaa] italic">
        Al confirmar aceptás que los productos digitales no tienen devolución una vez enviado el link de descarga.
      </p>

      <button
        onClick={onPlaceOrder}
        disabled={isPlacingOrder || !isFormValid()}
        className={`w-full py-4 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all ${
          isPlacingOrder || !isFormValid()
            ? 'bg-[#e3e3e3] text-[#aaaaaa] cursor-not-allowed'
            : 'bg-[#9ead6b] hover:bg-[#7a9347] text-white shadow-lg active:scale-[0.98]'
        }`}
      >
        {isPlacingOrder ? 'Procesando...' : 'Confirmar y Pagar'}
      </button>
    </div>
  );
};