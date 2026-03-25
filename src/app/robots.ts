import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_URL ?? 'https://psicopedagogagimenamedrano.com';

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',    // Gestión interna
        '/auth/',     // Login/Registro
        '/profile/',  // Datos de usuario
        '/checkout/', // Proceso de pago
        '/api/',      // Endpoints internos
        '/cart',      // Carrito de compras
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}