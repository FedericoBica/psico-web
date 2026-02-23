'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { Product } from '@prisma/client';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

// 1. Esquema Zod Simplificado (Digital Only)
const productSchema = z.object({
  id: z.string().uuid().optional().nullable(),
  title: z.string().min(3).max(255),
  slug: z.string().min(3).max(255),
  description: z.string(),
  price: z.coerce.number().min(0).transform(val => Number(val.toFixed(2))),
  oldPrice: z.coerce.number().min(0).optional().nullable().transform(val => val ? Number(val.toFixed(2)) : 0),
  categoryId: z.string().uuid(),
  tags: z.string(),
  downloadUrl: z.string().url('Debe ser una URL válida para el PDF'), // ✅ Nuevo
  isPublished: z.preprocess((val) => val === 'true', z.boolean()),
});

export const createUpdateProduct = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const productParsed = productSchema.safeParse(data);

  if (!productParsed.success) {
    console.log(productParsed.error);
    return { ok: false };
  }

  const product = productParsed.data;
  
  // Limpieza del slug
  product.slug = product.slug
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9 -]/g, "")
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(async (tx) => {
      let product: Product;
      const tagsArray = rest.tags.split(',').map(tag => tag.trim().toLowerCase());

      const productData = {
        ...rest,
        tags: tagsArray,
        // No más stock, ratings, colors ni premiumData
      };

      if (id) {
        product = await tx.product.update({ where: { id }, data: productData });
      } else {
        product = await tx.product.create({ data: productData });
      }

      // --- GALERÍA DE IMÁGENES (PORTADAS) ---
      const imagesFiles = formData.getAll('images') as File[];
      if (imagesFiles.length > 0 && imagesFiles[0].size > 0) {
        const images = await uploadImages(imagesFiles);
        if (!images) throw new Error('Error subiendo imágenes');

        await tx.productImage.createMany({
          data: images.map(image => ({
            url: image!,
            productId: product.id,
          }))
        });
      }

      return { product };
    });

    // Revalidación de rutas
    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${product.slug}`);
    revalidatePath(`/products/${product.slug}`);
    revalidatePath(`/`);

    return {
      ok: true,
      product: prismaTx.product,
    };

  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Error al procesar el producto' };
  }
};

// ... (El helper uploadImages se mantiene igual pero asegúrate de que el folder sea el correcto)
const uploadImages = async( images: File[] ) => {
  try {
    const uploadPromises = images.map( async( image) => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        return cloudinary.uploader.upload(`data:image/${image.type.split('/')[1]};base64,${ base64Image }`, {
          folder: 'psico-web-ebooks' // ✅ Nombre de carpeta actualizado
        }).then( r => r.secure_url );        
      } catch (error) {
        return null;
      }
    })
    return await Promise.all( uploadPromises );
  } catch (error) {
    return null;
  }
}