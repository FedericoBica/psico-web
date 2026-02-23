'use server';


import prisma from '@/lib/prisma';
type TransactionClient = Parameters<typeof prisma.$transaction>[0] extends (tx: infer T) => unknown ? T : never;
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config(process.env.CLOUDINARY_URL ?? '');

const productSchema = z.object({
  id:          z.string().uuid().optional().nullable(),
  title:       z.string().min(3).max(255),
  slug:        z.string().min(3).max(255),
  description: z.string(),
  price:       z.coerce.number().min(0).transform((val) => Number(val.toFixed(2))),
  oldPrice:    z.coerce.number().min(0).optional().nullable().transform((val) => val ? Number(val.toFixed(2)) : 0),
  categoryId:  z.string().uuid(),
  tags:        z.string(),
  downloadUrl: z.string().url('Debe ser una URL válida para el PDF'),
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

  product.slug = product.slug
    .toLowerCase()
    .trim()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-');

  const { id, ...rest } = product;

  try {
    const prismaTx = await prisma.$transaction(
      async (tx: TransactionClient) => {
        const tagsArray = rest.tags
          .split(',')
          .map((tag: string) => tag.trim().toLowerCase());

        const productData = {
          ...rest,
          tags: tagsArray,
        };

        const savedProduct = id
          ? await tx.product.update({ where: { id }, data: productData })
          : await tx.product.create({ data: productData });

        const imagesFiles = formData.getAll('images') as File[];
        if (imagesFiles.length > 0 && imagesFiles[0].size > 0) {
          const images = await uploadImages(imagesFiles);
          if (!images) throw new Error('Error subiendo imágenes');

          await tx.productImage.createMany({
            data: images
              .filter((url): url is string => url !== null)
              .map((url: string) => ({
                url,
                productId: savedProduct.id,
              })),
          });
        }

        return { product: savedProduct };
      }
    );

    revalidatePath('/admin/products');
    revalidatePath(`/admin/product/${prismaTx.product.slug}`);
    revalidatePath(`/products/${prismaTx.product.slug}`);
    revalidatePath('/');

    return {
      ok: true,
      product: prismaTx.product,
    };

  } catch (error) {
    console.log(error);
    return { ok: false, message: 'Error al procesar el producto' };
  }
};

const uploadImages = async (images: File[]): Promise<(string | null)[]> => {
  try {
    const uploadPromises = images.map(async (image: File): Promise<string | null> => {
      try {
        const buffer = await image.arrayBuffer();
        const base64Image = Buffer.from(buffer).toString('base64');
        const ext = image.type.split('/')[1];
        return cloudinary.uploader
          .upload(`data:image/${ext};base64,${base64Image}`, {
            folder: 'psico-web-ebooks',
          })
          .then((r) => r.secure_url);
      } catch {
        return null;
      }
    });
    return await Promise.all(uploadPromises);
  } catch {
    return [];
  }
};