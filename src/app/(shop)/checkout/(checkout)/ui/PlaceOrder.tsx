'use client';

// src/app/(shop)/checkout/(checkout)/ui/PlaceOrder.tsx

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store';
import { placeOrder } from '@/actions';
import { currencyFormat } from '@/utils';
import { IoHomeOutline } from 'react-icons/io5';

export const PlaceOrder = () => {
  const router = useRouter();
  const [loaded, setLoaded]               = useState(false);
  const [isPlacingOrder, setIsPlacingOrder] = useState(false);
  const [errorMessage, setErrorMessage]   = useState('');
  const [buyerEmail, setBuyerEmail]       = useState('');

  // Datos de envío para libros físicos
  const [shippingName,    setShippingName]    = useState('');
  const [shippingPhone,   setShippingPhone]   = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [shippingCity,    setShippingCity]    = useState('');
  const [shippingDept,    setShippingDept]    = useState('');

  const cart            = useCartStore((s) => s.cart);
  const clearCart       = useCartStore((s) => s.clearCart);
  const hasPhysical     = useCartStore((s) => s.hasPhysicalItems());
  const { itemsInCart, subTotal, total } = useCartStore((s) => s.getSummaryInformation());

  useEffect(() => { setLoaded(true); }, []);

  const isFormValid = () => {
    if (buyerEmail.length < 5) return false;
    if (hasPhysical) {
      return shippingName && shippingPhone && shippingAddress && shippingCity && shippingDept;
    }
    return true;
  };

  const onPlaceOrder = async () => {
    setIsPlacingOrder(true);

    const productsToOrder = cart.map((p) => ({
      productId: p.id.replace(/-digital$|-physical$/, ''), // saca el sufijo de formato
      quantity:  p.quantity,
      price:     p.price,
      format:    p.format,
    }));

    const resp = await placeOrder(
      productsToOrder,
      buyerEmail,
      undefined,
      hasPhysical ? { shippingName, shippingPhone, shippingAddress, shippingCity, shippingDept } : undefined
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

      {/* Totales */}
      <div className="grid grid-cols-2 gap-y-2 text-sm text-[#555555]">
        <span>Productos</span>
        <span className="text-right">{itemsInCart === 1 ? '1 ítem' : `${itemsInCart} ítems`}</span>
        <span>Subtotal</span>
        <span className="text-right">{currencyFormat(subTotal)}</span>
        <div className="col-span-2 border-t border-[#e3e3e3] my-1" />
        <span className="text-lg font-bold text-[#2d2d2d]">Total</span>
        <span className="text-lg font-bold text-right text-[#2d2d2d]">{currencyFormat(total)}</span>
      </div>

      {/* Email */}
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

      {/* Datos de envío — solo si hay físicos */}
      {hasPhysical && (
        <div className="bg-[#f7f7f5] border border-[#e3e3e3] rounded-2xl p-5 space-y-3">
          <div className="flex items-center gap-2 mb-2">
            <IoHomeOutline size={16} className="text-[#9ead6b]" />
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">
              Datos de envío (libro físico)
            </span>
          </div>
          <p className="text-xs text-[#777777] font-light -mt-1 mb-3">
            Te contactaremos por WhatsApp para coordinar la entrega.
          </p>

          <input
            type="text"
            placeholder="Nombre completo"
            className="input-base"
            value={shippingName}
            onChange={(e) => setShippingName(e.target.value)}
          />
          <input
            type="tel"
            placeholder="Teléfono / WhatsApp"
            className="input-base"
            value={shippingPhone}
            onChange={(e) => setShippingPhone(e.target.value)}
          />
          <input
            type="text"
            placeholder="Dirección (calle y número)"
            className="input-base"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />
          <div className="grid grid-cols-2 gap-3">
            <input
              type="text"
              placeholder="Ciudad"
              className="input-base"
              value={shippingCity}
              onChange={(e) => setShippingCity(e.target.value)}
            />
            <select
              className="input-base"
              value={shippingDept}
              onChange={(e) => setShippingDept(e.target.value)}
            >
              <option value="">Departamento</option>
              {[
                'Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores',
                'Florida','Lavalleja','Maldonado','Montevideo','Paysandú',
                'Río Negro','Rivera','Rocha','Salto','San José','Soriano',
                'Tacuarembó','Treinta y Tres',
              ].map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>
        </div>
      )}

      {errorMessage && (
        <p className="text-red-500 text-sm">{errorMessage}</p>
      )}

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