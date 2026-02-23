import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/admin/',
        '/auth/',
        '/profile/',
        '/checkout/',
      ],
    },
    sitemap: `${process.env.NEXT_PUBLIC_URL ?? 'https://tu-dominio.com'}/sitemap.xml`,
  };
}