
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore, useAddressStore } from '@/store';
import { IoArrowBack } from 'react-icons/io5';

const DEPARTAMENTOS = [
  'Artigas','Canelones','Cerro Largo','Colonia','Durazno','Flores',
  'Florida','Lavalleja','Maldonado','Montevideo','Paysandú',
  'Río Negro','Rivera','Rocha','Salto','San José','Soriano',
  'Tacuarembó','Treinta y Tres',
];

export default function AddressPage() {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  const cart         = useCartStore((s) => s.cart);
  const hasPhysical  = cart.some((p) => p.format === 'physical');
  const savedAddress = useAddressStore((s) => s.address);
  const setAddress   = useAddressStore((s) => s.setAddress);

  const [form, setForm] = useState({
    firstName:      '',
    lastName:       '',
    email:          '',
    address:        '',
    address2:       '',
    postalCode:     '',
    city:           '',
    departamento:   'Montevideo',
    phone:          '',
    deliveryMethod: 'STANDARD' as 'STANDARD' | 'PICKUP',
    lockerLocation: '',
    dni:            '',
  });

  useEffect(() => {
    const dm = savedAddress.deliveryMethod;
    setForm({
      ...savedAddress,
      address2:       savedAddress.address2       ?? '',
      lockerLocation: savedAddress.lockerLocation ?? '',
      deliveryMethod: (dm === 'STANDARD' || dm === 'PICKUP') ? dm : 'STANDARD',
    });
    setLoaded(true);
  }, []);

  useEffect(() => {
    if (loaded && !hasPhysical) router.replace('/checkout');
  }, [loaded, hasPhysical]);

  const set = (field: string, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const isValid =
    form.firstName.trim() &&
    form.lastName.trim() &&
    form.phone.trim() &&
    form.address.trim() &&
    form.city.trim() &&
    form.departamento;

  const onSubmit = () => {
    setAddress(form);
    router.push('/checkout');
  };

  if (!loaded) return null;

  return (
    <div className="flex justify-center items-start min-h-screen px-4 py-12">
      <div className="w-full max-w-lg">

        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-sm text-[#9ead6b] mb-6 hover:underline"
        >
          <IoArrowBack size={16} /> Volver
        </button>

        <h1 className="text-2xl font-bold text-[#2d2d2d] mb-1">Datos de envío</h1>
        <p className="text-sm text-[#777] mb-8">
          Tu pedido incluye un libro físico. Necesitamos tu dirección para coordinar la entrega.
        </p>

        <div className="bg-white rounded-2xl border border-[#e3e3e3] shadow-sm p-7 space-y-4">

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Nombre</label>
              <input className="input-base" placeholder="María"
                value={form.firstName} onChange={(e) => set('firstName', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Apellido</label>
              <input className="input-base" placeholder="González"
                value={form.lastName} onChange={(e) => set('lastName', e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Teléfono / WhatsApp</label>
            <input className="input-base" type="tel" placeholder="+598 99 000 000"
              value={form.phone} onChange={(e) => set('phone', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Dirección (calle y número)</label>
            <input className="input-base" placeholder="Av. 18 de Julio 1234"
              value={form.address} onChange={(e) => set('address', e.target.value)} />
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Dirección 2 (apto, piso — opcional)</label>
            <input className="input-base" placeholder="Apto 301"
              value={form.address2} onChange={(e) => set('address2', e.target.value)} />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Ciudad</label>
              <input className="input-base" placeholder="Montevideo"
                value={form.city} onChange={(e) => set('city', e.target.value)} />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Código postal</label>
              <input className="input-base" placeholder="11300"
                value={form.postalCode} onChange={(e) => set('postalCode', e.target.value)} />
            </div>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Departamento</label>
            <select className="input-base" value={form.departamento}
              onChange={(e) => set('departamento', e.target.value)}>
              {DEPARTAMENTOS.map((d) => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">Método de entrega</label>
            <select className="input-base" value={form.deliveryMethod}
              onChange={(e) => set('deliveryMethod', e.target.value)}>
              <option value="STANDARD">Envío DAC</option>
              <option value="PICKUP">Retiro en Carrasco</option>
            </select>
          </div>

          <button
            onClick={onSubmit}
            disabled={!isValid}
            className={`w-full py-4 rounded-full font-bold text-[11px] uppercase tracking-widest transition-all mt-2 ${
              isValid
                ? 'bg-[#9ead6b] hover:bg-[#7a9347] text-white shadow-lg active:scale-[0.98]'
                : 'bg-[#e3e3e3] text-[#aaaaaa] cursor-not-allowed'
            }`}
          >
            Continuar al pago
          </button>
        </div>
      </div>
    </div>
  );
}
