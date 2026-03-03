// src/components/ui/tienda-preview/TiendaPreview.tsx
import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/interfaces';
import { currencyFormat } from '@/utils';
import { IoArrowForwardOutline, IoBookOutline } from 'react-icons/io5';

interface Props {
  product: Product | null;
}

const getImageSrc = (src?: string | null): string => {
  if (!src) return '/imgs/placeholder.jpg';
  if (src.startsWith('http')) return src;
  if (src.startsWith('/')) return src;      
  return `/products/${src}`;
};

export const TiendaPreview = ({ product }: Props) => {
  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-white" id="tienda">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado de sección */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#9ead6b]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">
                Recursos digitales
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d2d2d] leading-tight">
              Materiales para<br />
              <span className="italic font-light text-[#9ead6b]">el aprendizaje</span>
            </h2>
          </div>
          <Link
            href="/tienda"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9ead6b] hover:text-[#7a9347] transition-colors border-b border-[#c9d894] pb-0.5 whitespace-nowrap"
          >
            Ver toda la tienda
            <IoArrowForwardOutline size={14} />
          </Link>
        </div>

        {/* Contenido principal: producto destacado + descripción lateral */}
        {product ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">

            {/* Producto destacado */}
            <Link
              href={`/product/${product.slug}`}
              className="group relative bg-[#f7f7f5] rounded-3xl overflow-hidden border border-[#e3e3e3] hover:border-[#c9d894] hover:shadow-xl transition-all duration-300"
            >
              {/* Badge descuento */}
              {product.oldPrice && product.oldPrice > product.price && (
                <div className="absolute top-4 left-4 z-10 bg-[#9ead6b] text-white text-[9px] font-bold px-3 py-1.5 rounded-full uppercase tracking-wider">
                  -{Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100)}%
                </div>
              )}

              {/* Imagen */}
              <div className="relative aspect-[4/3] overflow-hidden bg-[#e3e3e3]">
                <Image
                  src={getImageSrc(product.images[0])}
                  alt={product.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Info del producto */}
              <div className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  <IoBookOutline size={14} className="text-[#9ead6b]" />
                  <span className="text-[10px] uppercase tracking-[0.2em] text-[#9ead6b] font-bold">
                    Material destacado
                  </span>
                </div>
                <h3 className="font-serif text-xl text-[#2d2d2d] leading-snug mb-3 group-hover:text-[#9ead6b] transition-colors">
                  {product.title}
                </h3>
                <p className="text-[#777777] text-sm font-light line-clamp-2 leading-relaxed mb-4">
                  {product.description}
                </p>
                <div className="flex items-baseline gap-3">
                  <span className="text-2xl font-bold text-[#2d2d2d]">
                    {currencyFormat(product.price)}
                  </span>
                  {product.oldPrice && product.oldPrice > product.price && (
                    <span className="text-sm text-[#aaaaaa] line-through">
                      {currencyFormat(product.oldPrice)}
                    </span>
                  )}
                </div>
              </div>
            </Link>

            {/* Descripción y CTA */}
            <div className="flex flex-col justify-center">
              <p className="text-[#555555] text-lg font-light leading-relaxed mb-6">
                Encontrá guías, cuadernos de actividades y recursos prácticos pensados para acompañar el proceso de aprendizaje de cada niño.
              </p>
              <p className="text-[#555555] text-lg font-light leading-relaxed mb-10">
                Todos los materiales son de descarga inmediata, diseñados desde la práctica clínica psicopedagógica.
              </p>

              {/* Características clave */}
              <div className="space-y-3 mb-10">
                {[
                  'Descarga inmediata tras el pago',
                  'Diseñados desde la práctica clínica',
                  'Adaptados a distintas edades y necesidades',
                ].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#9ead6b] flex-shrink-0" />
                    <span className="text-sm text-[#555555] font-light">{item}</span>
                  </div>
                ))}
              </div>

              {/* CTA principal */}
              <Link
                href="/tienda"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#9ead6b] text-white text-[11px] font-bold uppercase tracking-[0.2em] rounded-full hover:bg-[#7a9347] transition-all hover:scale-[1.02] active:scale-[0.98] shadow-lg shadow-[#9ead6b]/20 w-fit"
              >
                Ver todos los materiales
                <IoArrowForwardOutline size={14} />
              </Link>
            </div>

          </div>
        ) : (
          /* Estado vacío */
          <div className="text-center py-20 border border-dashed border-[#e3e3e3] rounded-3xl">
            <p className="text-[#aaaaaa] font-light italic">Próximamente nuevos materiales...</p>
          </div>
        )}

      </div>
    </section>
  );
};