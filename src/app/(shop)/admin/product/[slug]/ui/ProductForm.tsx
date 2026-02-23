'use client';

import { useForm } from 'react-hook-form';
import { Product, Category } from '@/interfaces';
import { createUpdateProduct } from '@/actions'; // Tu action simplificada
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
  oldPrice: number;
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
      ...product,
      tags: product.tags?.join(', '),
      downloadUrl: (product as any).downloadUrl ?? '', // Cast temporal por TS
    },
  });

  const onSubmit = async (data: FormInputs) => {
    const formData = new FormData();
    
    // Convertimos el objeto data a FormData para enviar a la Server Action
    const { ...productToSave } = data;
    if (product.id) formData.append('id', product.id);
    formData.append('title', productToSave.title);
    formData.append('slug', productToSave.slug);
    formData.append('description', productToSave.description);
    formData.append('price', productToSave.price.toString());
    formData.append('oldPrice', productToSave.oldPrice.toString());
    formData.append('tags', productToSave.tags);
    formData.append('categoryId', productToSave.categoryId);
    formData.append('downloadUrl', productToSave.downloadUrl);

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);

    if (ok) {
      router.replace(`/admin/product/${updatedProduct?.slug}`);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid px-5 mb-16 grid-cols-1 sm:px-0 sm:grid-cols-2 gap-3">
      {/* Columna Izquierda: Info Principal */}
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

      {/* Columna Derecha: Configuración Digital */}
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

        {/* ✅ CAMPO ESTRATÉGICO */}
        <div className="flex flex-col mb-2">
          <span className="font-bold text-blue-700 text-lg">URL de Descarga (PDF/E-book)</span>
          <input 
            type="text" 
            placeholder="https://tu-almacenamiento.com/ebook.pdf"
            className="p-2 border-2 border-blue-300 rounded-md bg-white" 
            {...register('downloadUrl', { required: true })} 
          />
          <p className="text-xs text-gray-500 mt-1 italic">Este link solo se mostrará al cliente una vez pagada la orden.</p>
        </div>

        <button className="btn-primary w-full mt-5">Guardar E-book</button>
      </div>
    </form>
  );
};