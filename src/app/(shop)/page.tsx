export const revalidate = 60;

import type { Metadata } from 'next';
import { getPaginatedProductsWithImages } from '@/actions';

export const metadata: Metadata = {
  title: 'Inicio',
  description: 'Gimena Medrano, Licenciada en Psicopedagogía en Uruguay. Recursos educativos, materiales psicopedagógicos y orientación para potenciar el aprendizaje de niños, adolescentes y adultos.',
  alternates: { canonical: '/' },
};
import { Pagination, ProductGrid, Title } from '@/components';
import { SobreMi } from '@/components/ui/about/AboutMe';
import { Contacto } from '@/components/ui/contacto/Contacto';
import { ProductHero } from '@/components/ui/product-hero/ProductHero';
import { Servicios } from '@/components/ui/servicios/Servicio';
import { TiendaPreview } from '@/components/ui/tienda-preview/TIendaPreview';

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
  const featuredProduct = products[0] ?? null;

  return (
    <>
      <ProductHero />
      <SobreMi />
      <Servicios /> 
      <TiendaPreview product={featuredProduct} />
      <Contacto /> 
    </>
  );
}