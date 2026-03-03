import Image from 'next/image';
import Link from 'next/link';
import { IoLogoWhatsapp } from 'react-icons/io5';

export const Servicios = () => {

  const whatsappNumber = "59897454505";  
  
  const getWhatsappLink = (servicio: string) => {
    const message = encodeURIComponent(`Hola Gimena, me gustaría realizar una consulta sobre: ${servicio}.`);
    return `https://wa.me/${whatsappNumber}?text=${message}`;
  };

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#f7f7f5]" id="servicios">
      <div className="max-w-5xl mx-auto">

        <div className="mb-16">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-[#9ead6b]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">Servicios</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl text-[#2d2d2d]">Servicios</h2>
        </div>

        <div className="space-y-16">

          {/* Evaluación */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e3e3e3]">
              <Image src="/imgs/eval.jpg" fill className="object-cover" alt="Evaluación" />
            </div>
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl md:text-3xl text-[#2d2d2d] mb-4">
                Evaluación Psicopedagógica
              </h3>
              <div className="space-y-3 text-[#555555] font-light leading-relaxed mb-6">
                <p>La evaluación psicopedagógica es un proceso integral que permite comprender cómo aprende el niño, identificar sus fortalezas y detectar posibles dificultades en áreas como la lectura, la escritura, el cálculo, la atención y la memoria.</p>
                <p>A través de entrevistas, observaciones y la aplicación de pruebas específicas, se obtiene un perfil completo del aprendizaje.</p>
              </div>
              <div className="flex items-start gap-3 bg-[#eef3da] rounded-xl p-4 border-l-4 border-[#9ead6b]">
                <p className="text-sm text-[#2d2d2d]">
                  <span className="font-bold">Objetivo:</span> Entender qué está pasando y cómo acompañar de la mejor manera.
                </p>
              </div>
              <Link 
                  href={getWhatsappLink("Intervención Psicopedagógica")}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 mt-7 px-6 py-3 bg-[#9ead6b] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#4a3c31] transition-all shadow-md active:scale-95"
                >
                  <IoLogoWhatsapp size={16} />
                  Consultar 
                </Link>

            </div>
          </div>

          <div className="border-t border-[#e3e3e3]" />

          {/* Intervención */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden bg-[#e3e3e3]">
              <Image src="/imgs/inter.png" fill className="object-cover" alt="Intervención" />
            </div>
            <div className="md:col-span-2">
              <h3 className="font-serif text-2xl md:text-3xl text-[#2d2d2d] mb-4">
                Intervención Psicopedagógica
              </h3>
              <div className="space-y-3 text-[#555555] font-light leading-relaxed mb-6">
                <p>La intervención psicopedagógica es un acompañamiento personalizado orientado a fortalecer las habilidades de aprendizaje y superar las dificultades detectadas.</p>
                <p>Se diseñan estrategias adaptadas a cada niño, respetando sus tiempos y potenciando sus capacidades. El trabajo puede enfocarse en lectura, escritura, matemática, funciones ejecutivas y hábitos de estudio.</p>
                <p>Se busca no solo mejorar el rendimiento académico, sino también fortalecer la confianza y la seguridad en el propio aprendizaje.</p>
              </div>
              <div className="flex items-start gap-3 bg-[#eef3da] rounded-xl p-4 border-l-4 border-[#9ead6b]">
                <p className="text-sm text-[#2d2d2d]">
                  <span className="font-bold">Objetivo:</span> Transformar las dificultades en avances reales y sostenidos.
                </p>
              </div>
              <Link 
                  href={getWhatsappLink("Intervención Psicopedagógica")}
                  target="_blank"
                  className="inline-flex items-center justify-center gap-2 mt-7 px-6 py-3 bg-[#9ead6b] text-white text-[11px] font-bold uppercase tracking-widest rounded-full hover:bg-[#4a3c31] transition-all shadow-md active:scale-95"
                >
                  <IoLogoWhatsapp size={16} />
                  Consultar 
                </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};