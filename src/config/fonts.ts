import { Inter } from 'next/font/google';
import localFont from 'next/font/local';

export const inter = Inter({ subsets: ['latin'] });

export const titleFont = localFont({
  src: [
    {
      path: '../../public/fonts/montserrat-alternates-500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/montserrat-alternates-700.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  display: 'swap',
  fallback: ['system-ui', 'arial'],
});