'use client';

// src/components/mercadopago/MercadoPagoButton.tsx

import { initMercadoPago, Wallet } from '@mercadopago/sdk-react';

interface Props {
  preferenceId: string;
}

export const MercadoPagoButton = ({ preferenceId }: Props) => {
  initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
    locale: 'es-UY',
  });

  return (
    <div className="relative z-0">
      <Wallet
        initialization={{
          preferenceId,
          redirectMode: 'blank',  // abre MP en pestaña nueva, evita errores de iframe
        }}
      />
    </div>
  );
};