// src/app/(shop)/tienda/page.tsx
export const revalidate = 60;

import { getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid } from '@/components';

interface Props {
  searchParams: { page?: string };
}

export default async function TiendaPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  return (
    <div className="min-h-screen bg-white">

      {/* Header de página */}
      <div className="bg-[#f7f7f5] border-b border-[#e3e3e3] px-8 md:px-16 lg:px-24 py-14">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center gap-2 mb-4">
            <div className="w-6 h-px bg-[#9ead6b]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">
              Recursos digitales
            </span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-[#2d2d2d] mb-4">Tienda</h1>
          <p className="text-[#777777] font-light text-lg max-w-xl leading-relaxed">
            Materiales y cuadernos de actividades diseñados especialmente para acompañar el aprendizaje.
          </p>
        </div>
      </div>

      {/* Grid de productos */}
      <div className="px-8 md:px-16 lg:px-24 py-16">
        <div className="max-w-5xl mx-auto">
          {products.length === 0 ? (
            <div className="text-center py-24 border border-dashed border-[#e3e3e3] rounded-3xl">
              <p className="text-[#aaaaaa] font-light italic text-lg">
                Próximamente nuevos materiales...
              </p>
            </div>
          ) : (
            <>
              <ProductGrid products={products} />
              {totalPages > 1 && <Pagination totalPages={totalPages} />}
            </>
          )}
        </div>
      </div>
    </div>
  );
}