// src/app/(shop)/admin/product/[slug]/page.tsx
export const revalidate = 0;

import { notFound, redirect } from 'next/navigation';
import { getProductBySlug, getCategories } from '@/actions';
import { ProductForm } from './ui/ProductForm';

interface Props {
  params: { slug: string };
}

export default async function AdminProductPage({ params }: Props) {
  const { slug } = params;

  const [categories] = await Promise.all([
    getCategories(),
  ]);

  // Nuevo producto
  if (slug === 'new') {
    return (
      <div className="px-5 mb-20 max-w-4xl mx-auto mt-10">
        <h1 className="font-serif text-3xl text-[#2d2d2d] mb-2">Nuevo E-book</h1>
        <p className="text-[#777777] text-sm mb-8">Completá los datos para agregar un nuevo material a la tienda.</p>
        <ProductForm product={{}} categories={categories} />
      </div>
    );
  }

  // Editar producto existente
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="px-5 mb-20 max-w-4xl mx-auto mt-10">
      <h1 className="font-serif text-3xl text-[#2d2d2d] mb-2">Editar E-book</h1>
      <p className="text-[#777777] text-sm mb-8 font-mono">{product.slug}</p>
      <ProductForm product={product} categories={categories} />
    </div>
  );
}