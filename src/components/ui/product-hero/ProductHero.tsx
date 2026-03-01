import Image from 'next/image';
import Link from 'next/link';
import { HomeConfig } from '@/actions/config/store-config';

interface Props {
  config: HomeConfig;
}

export const ProductHero = ({ config }: Props) => {
  return (
    <section className="relative w-full min-h-[90vh] bg-white overflow-hidden flex flex-col">

      {/* Imagen de fondo */}
      <div className="relative w-full h-[60vh] md:h-[75vh]">
        <Image
          src="/imgs/princ.jpg"
          fill
          className="object-cover object-center "
          alt="Niño aprendiendo"
          priority
        />
      </div>

      {/* Contenido hero */}
      {/* <div className="relative z-10 flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 pb-28 max-w-3xl"> */}
        {/* <div className="inline-flex items-center gap-2 mb-8">
          <div className="w-6 h-px bg-[#9ead6b]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">
            {config.heroTagline}
          </span>
        </div>

        <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl text-[#2d2d2d] leading-[1.1] mb-6">
          {config.heroTitle}
          <br />
          <span className="italic font-light text-[#9ead6b]">
            {config.heroTitleAccent}
          </span>
        </h1>

        <p className="text-[#555555] text-lg md:text-xl font-light leading-relaxed max-w-lg">
          {config.heroSubtitle}
        </p>
      </div> */}

      {/* Franja verde */}
      <div className="relative z-10 bg-[#9ead6b] py-14 px-8 md:px-16 lg:px-24">
        <div className="max-w-4xl mx-auto">

          {/* Texto centrado */}
          <div className="text-center mb-10">
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6 leading-tight">
              ¿Qué es la Psicopedagogía?
            </h2>
            <p className="text-white/90 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto mb-3">
              La psicopedagogía es la disciplina que estudia y acompaña los procesos de aprendizaje, ayudando a identificar dificultades y potenciar las habilidades de cada niño.
            </p>
            <p className="text-white/80 text-base md:text-lg font-light leading-relaxed max-w-2xl mx-auto">
              Es el acompañamiento profesional que ayuda a comprender cómo aprende cada niño y a encontrar estrategias para que pueda avanzar con confianza y seguridad.
            </p>
          </div>

          {/* CTAs en fila, centrados debajo del texto */}
          <div className="flex flex-row flex-wrap justify-center gap-3">
            <Link
              href="/#servicios"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#2d2d2d] text-[10px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-[#eef3da] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-sm"
            >
              Solicitar evaluación psicopedagógica
            </Link>
            <Link
              href="/#servicios"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#2d2d2d] text-[10px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-[#eef3da] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-sm"
            >
              Solicitar intervención psicopedagógica
            </Link>
            <Link
              href="/#tienda"
              className="inline-flex items-center justify-center px-6 py-3 bg-white text-[#2d2d2d] text-[10px] font-bold uppercase tracking-[0.18em] rounded-full hover:bg-[#eef3da] transition-all hover:scale-[1.02] active:scale-[0.98] whitespace-nowrap shadow-sm"
            >
              Ver materiales y recursos
            </Link>
          </div>

        </div>
      </div>
    </section>
  );
};