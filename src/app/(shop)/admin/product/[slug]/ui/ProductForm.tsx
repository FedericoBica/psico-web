'use client';

// src/app/(shop)/admin/product/[slug]/ui/ProductForm.tsx

import { useForm, SubmitHandler } from 'react-hook-form';
import { Product, Category } from '@/interfaces';
import { createUpdateProduct, deleteProductImage } from '@/actions';
import { useRouter } from 'next/navigation';
import { IoCloudUploadOutline, IoTrashOutline } from 'react-icons/io5';
import Image from 'next/image';
import { useState } from 'react';

interface Props {
  product: Partial<Product> & { ProductImage?: any[] };
  categories: Category[];
}

interface FormInputs {
  title:         string;
  slug:          string;
  description:   string;
  price:         number;
  oldPrice?:     number;
  tags:          string;
  categoryId:    string;
  downloadUrl:   string;
  images?:       FileList;
  hasPhysical:   boolean;
  physicalPrice?: number;
}

export const ProductForm = ({ product, categories }: Props) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const { register, handleSubmit, watch } = useForm<FormInputs>({
    defaultValues: {
      title:         product.title         ?? '',
      slug:          product.slug          ?? '',
      description:   product.description   ?? '',
      price:         product.price         ?? 0,
      oldPrice:      product.oldPrice      ?? undefined,
      tags:          product.tags?.join(', ') ?? '',
      categoryId:    product.categoryId    ?? '',
      downloadUrl:   (product as any).downloadUrl  ?? '',
      hasPhysical:   (product as any).hasPhysical  ?? false,
      physicalPrice: (product as any).physicalPrice ?? undefined,
    },
  });

  const hasPhysical = watch('hasPhysical');

  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
    const formData = new FormData();

    if (product.id)   formData.append('id',           product.id);
    formData.append('title',         data.title);
    formData.append('slug',          data.slug);
    formData.append('description',   data.description);
    formData.append('price',         data.price.toString());
    formData.append('oldPrice',      (data.oldPrice ?? 0).toString());
    formData.append('tags',          data.tags);
    formData.append('categoryId',    data.categoryId);
    formData.append('downloadUrl',   data.downloadUrl);
    formData.append('isPublished',   'true');
    formData.append('hasPhysical',   data.hasPhysical ? 'true' : 'false');
    if (data.hasPhysical && data.physicalPrice) {
      formData.append('physicalPrice', data.physicalPrice.toString());
    }

    if (data.images) {
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images', data.images[i]);
      }
    }

    const { ok, product: updatedProduct } = await createUpdateProduct(formData);
    if (ok) router.replace(`/admin/product/${updatedProduct?.slug}`);
  };

  const onDeleteImage = async (imageId: number, url: string) => {
    setIsDeleting(true);
    const { ok } = await deleteProductImage(imageId, url);
    if (ok) router.refresh();
    setIsDeleting(false);
  };

  const inputClass = "p-3 border border-gray-200 rounded-xl bg-[#f7f7f5] focus:outline-none focus:ring-1 focus:ring-[#9ead6b] text-sm";
  const labelClass = "text-[10px] uppercase tracking-widest font-bold text-[#9ead6b] mb-1";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 md:grid-cols-2 gap-8">

      {/* ── Columna Izquierda ── */}
      <div className="space-y-4">

        <div className="flex flex-col">
          <span className={labelClass}>Título del E-book</span>
          <input type="text" className={inputClass} {...register('title', { required: true })} />
        </div>

        <div className="flex flex-col">
          <span className={labelClass}>Slug (URL única)</span>
          <input type="text" className={inputClass} {...register('slug', { required: true })} />
        </div>

        <div className="flex flex-col">
          <span className={labelClass}>Descripción</span>
          <textarea rows={5} className={inputClass} {...register('description', { required: true })} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col">
            <span className={labelClass}>Precio digital ($)</span>
            <input type="number" step="0.01" className={inputClass} {...register('price', { required: true, min: 0 })} />
          </div>
          <div className="flex flex-col">
            <span className={labelClass}>Precio anterior</span>
            <input type="number" step="0.01" className={inputClass} {...register('oldPrice')} />
          </div>
        </div>

        {/* ── Libro Físico ── */}
        <div className="flex flex-col gap-3 p-4 bg-[#f7f7f5] rounded-2xl border border-[#e3e3e3]">
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="hasPhysical"
              className="w-5 h-5 accent-[#9ead6b] cursor-pointer"
              {...register('hasPhysical')}
            />
            <label htmlFor="hasPhysical" className="text-sm font-bold text-[#2d2d2d] cursor-pointer">
              Disponible en versión física
            </label>
          </div>

          {hasPhysical && (
            <div className="flex flex-col mt-1">
              <span className={labelClass}>Precio versión física ($)</span>
              <input
                type="number"
                step="0.01"
                placeholder="Ej: 890"
                className={inputClass}
                {...register('physicalPrice', { min: 0 })}
              />
              <p className="text-[10px] text-[#777777] mt-1 font-light">
                Envío a todo Uruguay. Se coordina por WhatsApp al finalizar la compra.
              </p>
            </div>
          )}
        </div>

      </div>

      {/* ── Columna Derecha ── */}
      <div className="space-y-4">

        <div className="flex flex-col">
          <span className={labelClass}>Categoría</span>
          <select className={`${inputClass} appearance-none`} {...register('categoryId', { required: true })}>
            <option value="">[Seleccione]</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <span className={labelClass}>Tags (separados por coma)</span>
          <input type="text" className={inputClass} {...register('tags')} />
        </div>

        {/* Imágenes */}
        <div className="flex flex-col">
          <span className={`${labelClass} mb-2`}>Imágenes del Producto</span>
          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-[#9ead6b]/30 rounded-2xl cursor-pointer hover:bg-[#f7f7f5] transition-all">
            <IoCloudUploadOutline className="w-8 h-8 text-[#9ead6b] mb-1" />
            <p className="text-xs text-gray-500">Hacé clic para subir imágenes</p>
            <input
              type="file" multiple className="hidden"
              accept="image/png, image/jpeg, image/jpg, image/webp"
              {...register('images')}
            />
          </label>

          <div className="grid grid-cols-3 gap-2 mt-3">
            {product.ProductImage?.map((img) => (
              <div key={img.id} className="relative aspect-square rounded-lg overflow-hidden group">
                <Image
                  src={img.url.startsWith('http') ? img.url : `/products/${img.url}`}
                  alt={product.title ?? ''}
                  fill className="object-cover"
                />
                <button
                  type="button" disabled={isDeleting}
                  className="absolute inset-0 bg-red-500/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => onDeleteImage(img.id, img.url)}
                >
                  <IoTrashOutline className="text-white text-xl" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Download URL */}
        <div className="flex flex-col p-4 bg-[#eef3da] rounded-2xl border border-[#9ead6b]/20">
          <span className="text-[10px] uppercase tracking-widest font-bold text-[#5C4B3D] mb-1">
            Link de Entrega Digital (PDF)
          </span>
          <input
            type="text" placeholder="https://..."
            className="p-2 border border-[#9ead6b]/30 rounded-lg bg-white text-sm"
            {...register('downloadUrl', { required: true })}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#9ead6b] text-white py-4 rounded-full font-bold uppercase text-[11px] tracking-widest shadow-lg hover:bg-[#7a9347] transition-all active:scale-[0.98]"
        >
          Guardar E-book
        </button>

      </div>
    </form>
  );
};