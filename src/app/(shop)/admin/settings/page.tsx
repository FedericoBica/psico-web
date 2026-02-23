export const revalidate = 0;

import { getAllStoreConfig } from '@/actions/config/store-config';
import { SettingsTabs } from './ui/SettingsTabs';
import { Title } from '@/components';
import { redirect } from 'next/navigation';
import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';
import { CouponSettings } from './ui/CouponSettings';
import { TopBarSettingsForm } from './ui/TopBarSettings';
import { HomeSettingsForm } from './ui/HomeSettings';

export default async function SettingsPage() {
  const session = await auth();
  if (session?.user.role !== 'admin') redirect('/');

  const [config, coupons] = await Promise.all([
    getAllStoreConfig(),
    prisma.coupon.findMany({ orderBy: { code: 'asc' } }),
  ]);

  const topbarConfig = {
    message1: config.topbar.messages?.[0] ?? '📚 Descargá tus e-books al instante',
    message2: config.topbar.messages?.[1] ?? '🔒 Compra 100% segura con Mercado Pago',
  };

  const sections = [
    {
      id:      'coupons',
      label:   'Cupones',
      icon:    '🎫',
      desc:    'Administra códigos de descuento',
      content: <CouponSettings initialCoupons={coupons} />,
    },
    {
      id:      'topbar',
      label:   'Anuncios',
      icon:    '📣',
      desc:    'Barra superior y mensajes',
      content: <TopBarSettingsForm initialConfig={topbarConfig} />,
    },
    {
      id:      'home',
      label:   'Home',
      icon:    '🏠',
      desc:    'Textos del hero principal',
      content: <HomeSettingsForm initialConfig={config.home} />,
    },
  ];

  return (
    <div className="px-4 sm:px-8 pb-24 max-w-6xl mx-auto mt-10">
      <div className="mb-10">
        <Title title="Panel de Control" subtitle="Configuración general de la tienda." />
      </div>
      <SettingsTabs sections={sections} />
    </div>
  );
}