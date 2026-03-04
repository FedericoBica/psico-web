'use server';

import prisma from '@/lib/prisma';
import { v2 as cloudinary } from 'cloudinary';
import { revalidatePath } from 'next/cache';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

// Cambié imageId a 'string | number' para que sea flexible según tu Schema
export const deleteProductImage = async (imageId: string | number, imageUrl: string) => {

  if (!imageUrl.startsWith('http')) {
    return {
      ok: false,
      error: 'No se pueden borrar imagenes de FS'
    };
  }

  // Lógica robusta para Cloudinary: toma carpeta + archivo
  // Esto es vital si guardas en subcarpetas como 'psico-web-ebooks/imagen1'
  const imageName = imageUrl
    .split('/')
    .slice(-2)
    .join('/')
    .split('.')[0] ?? '';

  try {
    // 1. Borrar en la nube
    await cloudinary.uploader.destroy(imageName);

    // 2. Borrar en la DB y obtener el slug para revalidar
    const deletedImage = await prisma.productImage.delete({
      where: {
        id: imageId as any // 'as any' evita peleas con TS si es string o number
      },
      select: {
        product: {
          select: {
            slug: true
          }
        }
      }
    });

    // 3. Limpiar caché de Next.js
    revalidatePath(`/admin/products`);
    revalidatePath(`/admin/product/${deletedImage.product.slug}`);
    revalidatePath(`/product/${deletedImage.product.slug}`);

    return { ok: true };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: 'No se pudo eliminar la imagen'
    };
  }
};