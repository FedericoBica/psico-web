'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth.config';

export type ConfigKey = 'topbar' | 'home' | 'store';

export interface TopbarConfig {
  messages: string[];
  backgroundColor: string;
  isActive: boolean;
}

export interface HomeConfig {
  heroTitle: string;
  heroTitleAccent: string;
  heroSubtitle: string;
  heroTagline: string;
}

export interface StoreInfo {
  storeName: string;
  metaDescription: string;
}

export type AllConfig = {
  topbar: TopbarConfig;
  home:   HomeConfig;
  store:  StoreInfo;
};

const CONFIG_DEFAULTS: AllConfig = {
  topbar: {
    messages: [
      '📚 Descargá tus e-books al instante después del pago',
      '🔒 Compra 100% segura con Mercado Pago',
    ],
    backgroundColor: '#db2777',
    isActive: true,
  },
  home: {
    heroTitle:       'Potencia tus sesiones,',
    heroTitleAccent: '',
    heroSubtitle:    'Recursos psicopedagogicos para la practica profesional',
    heroTagline:     '',
  },
  store: {
    storeName:       'Lic. Gimena Medrano',
    metaDescription: 'Plataforma de recursos digitales y herramientas clínicas de psicopedagogia',
  },
};

export const getStoreConfig = async <K extends ConfigKey>(
  key: K
): Promise<AllConfig[K]> => {
  try {
    const row = await prisma.storeConfig.findUnique({ where: { key } });
    if (!row) return CONFIG_DEFAULTS[key];
    return { ...CONFIG_DEFAULTS[key], ...(row.value as object) } as AllConfig[K];
  } catch (error) {
    console.error(`Error al obtener config ${key}:`, error);
    return CONFIG_DEFAULTS[key];
  }
};

export const getAllStoreConfig = async (): Promise<AllConfig> => {
  try {
    const rows = await prisma.storeConfig.findMany();
    const map = rows.reduce((acc: Record<string, object>, r: typeof rows[number]) => {
      acc[r.key] = r.value as object;
      return acc;
    }, {});

    return {
      topbar: { ...CONFIG_DEFAULTS.topbar, ...(map.topbar ?? {}) },
      home:   { ...CONFIG_DEFAULTS.home,   ...(map.home   ?? {}) },
      store:  { ...CONFIG_DEFAULTS.store,  ...(map.store  ?? {}) },
    };
  } catch {
    return CONFIG_DEFAULTS;
  }
};

export const updateStoreConfig = async (
  key: ConfigKey,
  value: Record<string, unknown>,
): Promise<{ ok: boolean; message?: string }> => {
  const session = await auth();
  if (session?.user.role !== 'admin') {
    return { ok: false, message: 'No tienes permisos' };
  }

  try {
    await prisma.storeConfig.upsert({
      where:  { key },
      update: { value },
      create: { key, value },
    });

    revalidatePath('/');
    revalidatePath('/admin/settings');

    return { ok: true };
  } catch (error) {
    console.error(`Error guardando config "${key}":`, error);
    return { ok: false, message: 'Error al guardar en la base de datos.' };
  }
};