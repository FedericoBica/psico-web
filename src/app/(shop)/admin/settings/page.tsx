export const revalidate = 0;

import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { CouponSettings } from './ui/CouponSettings';
// Eliminamos las importaciones de TopBar y Home ya que no se usarán

export default async function SettingsPage() {
  const session = await auth();
  
  // Protección de ruta para administradores
  if (session?.user.role !== 'admin') redirect('/');

  // Solo traemos los cupones de la base de datos
  const coupons = await prisma.coupon.findMany({ 
    orderBy: { code: 'asc' } 
  });

  return (
    <div className="px-4 sm:px-8 pb-24 max-w-5xl mx-auto mt-10">
      
      {/* Encabezado con el estilo editorial (Gris oscuro y Sage) */}
      <div className="mb-12">
        <Title 
          title="Gestión de Beneficios" 
          subtitle="Administra los códigos de descuento y promociones de la tienda." 
        />
      </div>

      {/* Contenedor principal estilo "Plata" (Fondo blanco, borde suave) */}
      <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-sm overflow-hidden">
        
        <div className="p-8 border-b border-gray-50 bg-gray-50/30">
          <div className="flex items-center gap-3">
            <span className="text-2xl">🎫</span>
            <div>
              <h2 className="font-serif text-xl text-[#2d2d2d]">Cupones de Descuento</h2>
              <p className="text-xs text-gray-400 uppercase tracking-widest font-bold mt-1">
                Configuración de Ofertas
              </p>
            </div>
          </div>
        </div>

        <div className="p-8">
          {/* Renderizamos directamente el componente de cupones */}
          <CouponSettings initialCoupons={coupons} />
        </div>

      </div>

      {/* Footer de ayuda del panel */}
      <p className="mt-8 text-center text-gray-400 text-sm font-light italic">
        Cualquier cambio realizado se reflejará instantáneamente en el proceso de checkout.
      </p>

    </div>
  );
}