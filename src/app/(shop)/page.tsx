export const revalidate = 60;

import { getAllStoreConfig, getPaginatedProductsWithImages } from '@/actions';
import { Pagination, ProductGrid, Title } from '@/components';
import { SobreMi } from '@/components/ui/about/AboutMe';
import { Contacto } from '@/components/ui/contacto/Contacto';
import { ProductHero } from '@/components/ui/product-hero/ProductHero';
import { Servicios } from '@/components/ui/servicios/Servicio';

// These new sections you'll create in src/components/ui/sections/
// import { SobreMi } from '@/components/ui/sections/SobreMi';
// import { Servicios } from '@/components/ui/sections/Servicios';
// import { Contacto } from '@/components/ui/sections/Contacto';

interface Props {
  searchParams: {
    page?: string;
  }
}

export default async function Home({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;
  const { products, currentPage, totalPages } = await getPaginatedProductsWithImages({ page });
  const { home } = await getAllStoreConfig();

  return (
    <>
      <ProductHero config={home} />

      <SobreMi />

      <Servicios /> 

      {/* TIENDA / RECURSOS */}
      <section className="py-16 px-8 md:px-16 lg:px-24 bg-[#F5F0E8]" id="tienda">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-px bg-[#7A9E7E]" />
                <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#7A9E7E]">
                  Recursos
                </span>
              </div>
              <h2 className="font-serif text-4xl md:text-5xl text-[#3D2B1F]">
                Tienda
              </h2>
            </div>
          </div>
          <p className="text-[#6B5744] font-light text-lg mb-10 max-w-xl">
            Materiales y cuadernos de actividades diseñados especialmente para el aprendizaje.
          </p>

          <ProductGrid products={products} />
          {/* <Pagination totalPages={totalPages} /> */}
        </div>
      </section>

      <Contacto /> 
    </>
  );
}