'use client';

import { useForm, SubmitHandler } from 'react-hook-form';
import { Product, Category } from '@/interfaces';
import { createUpdateProduct } from '@/actions';
import { useRouter } from 'next/navigation';

interface Props {
  product: Partial<Product> & { ProductImage?: any[] };
  categories: Category[];
}

interface FormInputs {
  title: string;
  slug: string;
  description: string;
  price: number;
  oldPrice?: number;  // ✅ sin null
  tags: string;
  categoryId: string;
  downloadUrl: string;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid },
  } = useForm<FormInputs>({
    defaultValues: {
      title:       product.title ?? '',
      slug:        product.slug ?? '',
      description: product.description ?? '',
      price:       product.price ?? 0,
      oldPrice:    product.oldPrice ?? undefined,  // ✅ null → undefined
      tags:        product.tags?.join(', ') ?? '',
      categoryId:  product.categoryId ?? '',
      downloadUrl: (product as any).downloadUrl ?? '',
    },
  });

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();

    if (product.id) formData.append('id', product.id);
    formData.append('title',       data.title);
    formData.append('slug',        data.slug);
    formData.append('description', data.description);
    formData.append('price',       data.price.toString());
    formData.append('oldPrice',    (data.oldPrice ?? 0).toString());
    formData.append('tags',        data.tags);
    formData.append('categoryId',  data.categoryId);
    formData.append('downloadUrl', data.downloadUrl);

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (ok) {
      router.replace(`/admin/product/${updatedProduct?.slug}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Título del E-book</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Slug (URL única)</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Descripción</span>
          <textarea rows={5} className="p-2 border rounded-md bg-gray-200" {...register('description', { required: true })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio Actual ($)</span>
          <input type="number" step="0.01" className="p-2 border rounded-md bg-gray-200" {...register('price', { required: true, min: 0 })} />
        </div>

        <div className="flex flex-col mb-2">
          <span>Precio Anterior ($) - Opcional</span>
          <input type="number" step="0.01" className="p-2 border rounded-md bg-gray-200" {...register('oldPrice')} />
        </div>
      </div>

      <div className="w-full">
        <div className="flex flex-col mb-2">
          <span>Categoría</span>
          <select className="p-2 border rounded-md bg-gray-200" {...register('categoryId', { required: true })}>
            <option value="">[Seleccione]</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col mb-2">
          <span>Tags (separados por coma)</span>
          <input type="text" className="p-2 border rounded-md bg-gray-200" {...register('tags')} />
        </div>

        <div className="flex flex-col mb-2">
          <span className="font-bold text-blue-700 text-lg">URL de Descarga (PDF/E-book)</span>
          <input
            type="text"
            placeholder="https://tu-almacenamiento.com/ebook.pdf"
            className="p-2 border-2 border-blue-300 rounded-md bg-white"
            {...register('downloadUrl', { required: true })}
          />
          <p className="text-xs text-gray-500 mt-1 italic">
            Este link solo se mostrará al cliente una vez pagada la orden.
          </p>
        </div>

        <button className="btn-primary w-full mt-5">Guardar E-book</button>
      </div>
    </form>
  );
};