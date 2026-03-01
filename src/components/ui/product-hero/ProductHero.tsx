import Image from 'next/image';
import { HomeConfig } from '@/actions/config/store-config';

interface Props {
  config: HomeConfig;
}

export const ProductHero = ({ config }: Props) => {
  return (
      <>
          {/* Espacio para la imagen como la del niño leyendo en el PDF */}
      <div className="absolute right-0 top-0 w-1/2 h-full hidden md:block">
        <Image src="/imgs/hero-psico.jpg" fill className="object-cover grayscale-[20%]" alt="Aprendizaje" />
      </div>
      
    <div className="relative h-[600px] w-full bg-brand-sand flex items-center px-10 rounded-[40px] overflow-hidden">
      <div className="max-w-2xl z-10">
        <span className="text-brand-accent uppercase tracking-[0.4em] text-xs mb-6 block font-bold">
          QUE ES LA PSICOPEDAGOGIA? 
        </span>
        <h1 className="text-5xl sm:text-7xl font-serif text-brand-brown leading-tight mb-8">
          Acompañando procesos, <br />
          <span className="italic font-light">potenciando habilidades. [cite: 8]</span>
        </h1>
        <p className="text-brand-brown/70 text-lg mb-10 max-w-md">
          La psicopedagogía es la disciplina que estudia y acompaña los procesos de aprendizaje. [cite: 8]
        </p>
        <div className=''>
          <button className="bg-brand-brown text-brand-cream px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all">
            Solicitar Evaluación Psicopedagogica
          </button>
          <button className="bg-brand-brown text-brand-cream px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all">
            Solicitar Intervencion Psicopedagogica 
          </button>
          <button className="bg-brand-brown text-brand-cream px-10 py-4 rounded-full text-xs uppercase tracking-widest font-bold hover:bg-brand-accent transition-all">
            Ver materiales y recursos 
          </button>

        </div>
      </div>

    </div>
    </>
  );
};