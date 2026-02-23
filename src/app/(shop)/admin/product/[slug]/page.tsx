import { notFound } from 'next/navigation';
import { titleFont } from '@/config/fonts';
import { ProductSlideshow, QuantitySelector, StockLabel } from '@/components';
import { getProductBySlug } from '@/actions';
import { AddToCart } from './ui/AddToCart';

interface Props {
  params: {
    slug: string;
  };
}

export default async function ProductBySlugPage({ params }: Props) {
  const { slug } = params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  return (
    <div className="mt-5 mb-20 grid grid-cols-1 md:grid-cols-3 gap-3">
      
      {/* Slideshow (Portadas del Libro) */}
      <div className="col-span-1 md:col-span-2">
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="block md:hidden"
        />
        <ProductSlideshow 
          title={product.title}
          images={product.images}
          className="hidden md:block"
        />
      </div>

      {/* Detalles del E-book */}
      <div className="col-span-1 px-5">
        <h1 className={`${titleFont.className} antialiased font-bold text-xl`}>
          {product.title}
        </h1>
        
        <div className="flex items-center gap-3 mb-5">
          <p className="text-2xl font-bold">${product.price}</p>
          {(product.oldPrice ?? 0) > product.price && (
            <p className="text-lg line-through text-gray-400">${product.oldPrice}</p>
          )}
        </div>

        {/* ✅ Botón de Agregar al Carrito (Versión Simplificada) */}
        <AddToCart product={product} />

        {/* Descripción */}
        <h3 className="font-bold text-sm mt-5">Descripción</h3>
        <p className="font-light text-gray-700 text-justify">
          {product.description}
        </p>
      </div>
    </div>
  );
}