import Link from 'next/link';
import { IoLocationOutline, IoLogoInstagram, IoLogoWhatsapp, IoMailOutline } from 'react-icons/io5';

export const Footer = () => {
  return (
    <footer className="bg-[#2d2d2d] text-white pt-14 pb-8 px-8 md:px-16 lg:px-24">
      <div className="max-w-5xl mx-auto grid grid-cols-1 sm:grid-cols-3 gap-10 mb-10">

        {/* Marca */}
        <div>
          <p className="font-serif text-xl leading-none mb-1">Lic. Gimena Medrano</p>
          <p className="text-[10px] text-[#9ead6b] uppercase tracking-[0.25em] font-bold mb-4">Psicopedagoga</p>
          <p className="text-white/50 text-sm font-light leading-relaxed">
            Acompañando procesos de aprendizaje con confianza, estrategia y dedicación.
          </p>
        </div>

        {/* Links */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9ead6b] font-bold mb-4">Navegación</p>
          <div className="flex flex-col gap-2">
            {['Inicio','Sobre Mí','Servicios','Tienda','Blog','Contacto'].map(item => (
              <Link key={item} href="/"
                className="text-sm text-white/50 hover:text-white transition-colors font-light">
                {item}
              </Link>
            ))}
          </div>
        </div>

        {/* Contacto */}
        <div>
          <p className="text-[9px] uppercase tracking-[0.25em] text-[#9ead6b] font-bold mb-4">Contacto</p>
          <div className="flex flex-col gap-3">
            <Link href="https://wa.me/59897454505" target="_blank"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <IoLogoWhatsapp size={16} className="text-[#9ead6b]" /> 097 454 505
            </Link>
            <Link href="mailto:gimenamedrano03@gmail.com"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <IoMailOutline size={16} className="text-[#9ead6b]" /> gimenamedrano03@gmail.com
            </Link>
            <Link href="https://instagram.com/Lic.GimenaMedrano" target="_blank"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <IoLogoInstagram size={16} className="text-[#9ead6b]" /> @Lic.GimenaMedrano
            </Link>
            <Link href="/" target="_blank"
              className="flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors">
              <IoLocationOutline size={16} className="text-[#9ead6b]" /> Carrasco, Montevideo
            </Link>
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto pt-6 border-t border-white/10 text-center">
        <p className="text-white/30 text-[11px] font-light">
          © {new Date().getFullYear()} Lic. Gimena Medrano. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};