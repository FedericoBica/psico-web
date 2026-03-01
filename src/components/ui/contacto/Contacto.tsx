import Link from 'next/link';
import { IoLogoWhatsapp, IoMailOutline, IoLogoInstagram } from 'react-icons/io5';

export const Contacto = () => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#9ead6b]" id="contacto">
      <div className="max-w-5xl mx-auto">

        <div className="mb-10">
          <h2 className="font-serif text-4xl md:text-5xl text-white mb-3">Contacto</h2>
          <p className="text-white/80 font-light text-lg max-w-xl">
            Si tenés dudas o querés consultar por una evaluación, intervención o los materiales disponibles, podés comunicarte conmigo.
          </p>
        </div>

        {/* Canales */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {[
            { icon: IoLogoWhatsapp, label: 'WhatsApp', value: '097 454 505', href: 'https://wa.me/59897454505' },
            { icon: IoMailOutline,  label: 'Mail', value: 'gimenamedrano03@gmail.com', href: 'mailto:gimenamedrano03@gmail.com' },
            { icon: IoLogoInstagram, label: 'Instagram', value: '@Lic.GimenaMedrano', href: 'https://instagram.com/Lic.GimenaMedrano' },
          ].map(({ icon: Icon, label, value, href }) => (
            <Link key={label} href={href} target="_blank"
              className="flex items-center gap-4 bg-white/15 hover:bg-white/25 border border-white/20 rounded-2xl p-5 transition-all">
              <div className="bg-white/20 p-3 rounded-xl">
                <Icon size={22} className="text-white" />
              </div>
              <div>
                <p className="text-white/60 text-[10px] uppercase tracking-[0.2em] mb-0.5">{label}</p>
                <p className="text-white font-medium text-sm break-all">{value}</p>
              </div>
            </Link>
          ))}
        </div>

        {/* Formulario */}
        <div className="bg-white/15 border border-white/20 rounded-3xl p-8">
          <p className="text-white/80 text-sm mb-5 font-light">
            También podés completar el formulario y me pondré en contacto a la brevedad.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input type="text" placeholder="Tu nombre"
              className="bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-all" />
            <input type="email" placeholder="Tu email"
              className="bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-all" />
            <textarea rows={4} placeholder="Tu mensaje..."
              className="sm:col-span-2 bg-white/15 border border-white/20 rounded-xl px-4 py-3 text-white placeholder:text-white/40 text-sm focus:outline-none focus:border-white/50 transition-all resize-none" />
            <button className="sm:col-span-2 bg-[#2d2d2d] hover:bg-[#444444] text-white font-bold text-[11px] uppercase tracking-[0.2em] py-4 rounded-xl transition-all active:scale-[0.98]">
              Enviar mensaje
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};