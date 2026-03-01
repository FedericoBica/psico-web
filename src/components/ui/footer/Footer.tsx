import { titleFont } from '@/config/fonts';
import Link from 'next/link';
import { IoLogoInstagram } from 'react-icons/io5';

export const Footer = () => {
  return (
    <footer className="flex w-full flex-col items-center justify-center border-t border-gray-200 bg-gray-50 py-10 px-5 mt-20">
      <div className="flex w-full max-w-[1200px] flex-col items-center justify-between gap-8 md:flex-row">
        
        <div className="flex flex-col items-center md:items-start">
          <Link href="/">
            <span className="text-2xl font-bold text-gray-800">
              Psico<span className="text-sage-500">Web</span>
            </span>
          </Link>
          <p className="mt-2 text-[10px] text-gray-400 uppercase tracking-[0.2em]">
            Recursos profesionales de psicología
          </p>
        </div>

        <div className="flex gap-6 text-sm font-medium text-gray-500">
           <Link href="/nosotros" className="hover:text-sage-600 transition-colors">Nosotros</Link>
           <Link href="/contacto" className="hover:text-sage-600 transition-colors">Contacto</Link>
           <Link href="/terminos" className="hover:text-sage-600 transition-colors">Términos</Link>
        </div>
      </div>
    </footer>
  );
};