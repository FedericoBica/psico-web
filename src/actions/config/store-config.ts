'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

// Definimos solo la clave de cupones
export type ConfigKey = 'coupons';

export interface CouponConfig {
  active: boolean;
  discountPercentage: number;
  globalCode: string;
}

export type AllConfig = {
  coupons: CouponConfig;
};

const CONFIG_DEFAULTS: AllConfig = {
  coupons: {
    active: false,
    discountPercentage: 0,
    globalCode: 'BIENVENIDA',
  },
};

// Obtener la configuración de cupones
export const getCouponConfig = async (): Promise<CouponConfig> => {
  try {
    const row = await prisma.storeConfig.findUnique({ where: { key: 'coupons' } });
    if (!row) return CONFIG_DEFAULTS.coupons;
    
    return { 
      ...CONFIG_DEFAULTS.coupons, 
      ...(row.value as object) 
    } as CouponConfig;
  } catch (error) {
    console.error(`Error al obtener config de cupones:`, error);
    return CONFIG_DEFAULTS.coupons;
  }
};

// Actualizar la configuración de cupones (Solo Admin)
export const updateCouponConfig = async (
  value: CouponConfig,
): Promise<{ ok: boolean; message?: string }> => {
  const session = await auth();
  
  if (session?.user.role !== 'admin') {
    return { ok: false, message: 'No tienes permisos' };
  }

  try {
    await prisma.storeConfig.upsert({
      where:  { key: 'coupons' },
      update: { value: value as any },
      create: { key: 'coupons', value: value as any },
    });

    revalidatePath('/');
    revalidatePath('/admin/settings');

    return { ok: true };
  } catch (error) {
    console.error(`Error guardando cupones:`, error);
    return { ok: false, message: 'Error al guardar en la base de datos.' };
  }
};