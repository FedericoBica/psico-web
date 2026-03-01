import Image from 'next/image';

export const SobreMi = () => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-white" id="sobre-mi">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

        {/* Foto */}
        <div className="relative">
          <div className="relative w-full aspect-[3/4] max-w-sm mx-auto overflow-hidden rounded-[2rem] bg-[#e3e3e3]">
            <Image src="/imgs/gime.jpg" fill className="object-cover object-top" alt="Lic. Gimena Medrano" />
          </div>
          {/* Badge verde */}
          <div className="absolute -bottom-5 -right-3 bg-[#9ead6b] text-white px-5 py-4 rounded-2xl shadow-lg">
            <p className="font-serif text-sm italic">Lic. Gimena Medrano</p>
            <p className="text-[9px] uppercase tracking-[0.2em] mt-0.5 text-white/80">Psicopedagoga</p>
          </div>
        </div>

        {/* Texto */}
        <div>
          <div className="flex items-center gap-2 mb-6">
            <div className="w-6 h-px bg-[#9ead6b]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">
              Sobre mí
            </span>
          </div>

          <h2 className="font-serif text-3xl md:text-4xl text-[#2d2d2d] mb-6 leading-tight">
            Hola, soy Gimena,{' '}
            <span className="italic font-light text-[#9ead6b]">psicopedagoga.</span>
          </h2>

          <div className="space-y-4 text-[#555555] font-light leading-relaxed">
            <p>Llegué a esta profesión casi sin buscarla. No sabía qué estudiar, pero sí sabía algo: me gustaba trabajar con niños. Empecé ese camino sin imaginar que iba a descubrir una verdadera pasión.</p>
            <p>Con el tiempo entendí que la psicopedagogía no es solo acompañar dificultades, sino potenciar capacidades, respetar los tiempos y ayudar a que cada niño descubra que puede aprender.</p>
            <p>Me apasiona ver los pequeños avances, celebrar los logros y construir, junto a cada familia, un espacio de confianza y crecimiento.</p>
            <p className="text-[#2d2d2d] font-medium italic border-l-4 border-[#c9d894] pl-4">
              Creo profundamente que aprender no debería ser motivo de frustración, sino una experiencia posible y acompañada.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};