/** @type {import('next').NextConfig} */
const nextConfig = {
  // Esto hará que Vercel ignore los errores de TypeScript y ESLint al compilar
  typescript: {
    ignoreBuildErrors: true,
  },
  transpilePackages: ['swiper'],
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
              protocol: 'https',
              hostname: 'res.cloudinary.com', // Para cuando subas tus propias fotos
            },
        ],
    },
};

module.exports = nextConfig;