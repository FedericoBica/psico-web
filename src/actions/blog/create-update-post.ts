"use server";

import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";
import { v2 as cloudinary } from 'cloudinary';

// Configuración de Cloudinary (Asegurate de tener estas variables en tu .env)
cloudinary.config(process.env.CLOUDINARY_URL || '');

export const createUpdatePost = async (formData: FormData) => {
  const data = Object.fromEntries(formData);
  const postId = data.id as string;

  // 1. Preparar los datos básicos
  const postData: any = {
    title: data.title as string,
    slug: data.slug as string,
    excerpt: data.excerpt as string,
    content: data.content as string,
    isPublished: data.isPublished === "true", // Ajustado para el FormData del checkbox
    tags: (data.tags as string).split(',').map(tag => tag.trim().toLowerCase()).filter(tag => tag !== ""),
  };

  // 2. Procesar la imagen si viene un archivo
  const imageFile = formData.get('image') as File;
  
  if (imageFile && imageFile.size > 0) {
    try {
      // Convertir el archivo a base64 para subirlo a Cloudinary
      const buffer = await imageFile.arrayBuffer();
      const base64Image = Buffer.from(buffer).toString('base64');
      const imageName = imageFile.name.split('.')[0];

      const response = await cloudinary.uploader.upload(`data:image/png;base64,${base64Image}`, {
        folder: 'blog-posts', // Organiza tus fotos en una carpeta
        public_id: `${data.slug}-${Date.now()}`, // Nombre único basado en el slug
        overwrite: true,
      });

      // Guardamos la URL de Cloudinary en el campo image
      postData.image = response.secure_url;
    } catch (error) {
      console.error("Error subiendo a Cloudinary:", error);
      return { ok: false, message: "Error al subir la imagen" };
    }
  }

  try {
    if (postId) {
      // Actualizar
      // Si no se subió una imagen nueva, eliminamos el campo 'image' para no sobreescribir con vacío
      if (!postData.image) delete postData.image;

      await prisma.post.update({
        where: { id: postId },
        data: postData,
      });
    } else {
      // Crear (Aquí la imagen es obligatoria o podés poner una por defecto)
      if (!postData.image) {
        postData.image = 'https://placehold.co/600x400?text=No+Image'; // Opcional
      }

      await prisma.post.create({
        data: postData,
      });
    }

    // Revalidar las rutas para que el cambio sea instantáneo
    revalidatePath("/blog");
    revalidatePath(`/blog/${postData.slug}`);
    revalidatePath("/admin/posts");

    return { ok: true };
  } catch (error) {
    console.error("Error en base de datos:", error);
    return { ok: false, message: "No se pudo guardar el post en la base de datos" };
  }
};