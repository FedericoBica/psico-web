"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createUpdatePost } from "@/actions/blog/create-update-post";
import { useRouter } from "next/navigation";
import { IoSaveOutline, IoLinkOutline, IoImageOutline, IoTextOutline, IoCloudUploadOutline } from "react-icons/io5";
import Image from "next/image";

export const PostForm = ({ post }: any) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ...post,
      tags: post.tags?.join(", ") || "",
      image: undefined, // El campo de archivo empieza vacío
    }
  });

  const titleValue = watch("title");

  // Generador automático de Slug (solo para posts nuevos)
  useEffect(() => {
    if ( !post.id && titleValue ) {
      const slug = titleValue
        .toLowerCase()
        .trim()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, "") 
        .replace(/[^a-z0-9 -]/g, "") 
        .replace(/\s+/g, "-") 
        .replace(/-+/g, "-");

      setValue("slug", slug, { shouldValidate: true });
    }
  }, [titleValue, setValue, post.id]);

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    
    const { image, ...postToSave } = data;

    if (post.id) formData.append("id", post.id);
    
    // Agregamos los campos de texto
    Object.keys(postToSave).forEach(key => {
      formData.append(key, postToSave[key]);
    });

    // ✅ Agregamos el archivo de imagen si existe
    if (image && image.length > 0) {
      formData.append("image", image[0]);
    }
    
    const { ok } = await createUpdatePost(formData);
    if (ok) {
      router.replace("/admin/posts");
      router.refresh();
    }
    setLoading(false);
  };

  const inputStyles = "w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:bg-white focus:border-sage-400 focus:ring-1 focus:ring-sage-100 outline-none transition-all placeholder:text-gray-300";
  const labelStyles = "text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 sm:grid-cols-2 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
      
      <div className="flex flex-col gap-6">
        <div>
          <label className={labelStyles}><IoTextOutline /> Título del Artículo</label>
          <input type="text" {...register("title", { required: true })} className={inputStyles} />
        </div>
        
        <div>
          <label className={labelStyles}><IoLinkOutline /> Slug</label>
          <input type="text" {...register("slug", { required: true })} className={`${inputStyles} font-mono text-xs bg-gray-100/50 text-sage-600`} />
        </div>

        <div>
          <label className={labelStyles}>Resumen Corto (Excerpt)</label>
          <textarea rows={4} {...register("excerpt", { required: true })} className={inputStyles} />
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {/* ✅ Cambio: Input de Archivo para Imagen */}
        <div>
          <label className={labelStyles}><IoImageOutline /> Imagen de Portada</label>
          <div className="mt-2 flex flex-col items-center gap-4">
            
            {/* Previsualización de la imagen actual si existe */}
            { post.image && (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-100">
                    <Image 
                        src={post.image} 
                        alt={post.title} 
                        fill 
                        className="object-cover"
                    />
                </div>
            )}

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <IoCloudUploadOutline className="w-8 h-8 text-gray-300 group-hover:text-sage-500 transition-colors" />
                    <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Subir nueva imagen</p>
                </div>
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp"
                    {...register("image")} 
                />
            </label>
          </div>
        </div>

        <div>
          <label className={labelStyles}>Categorías (separadas por coma)</label>
          <input type="text" {...register("tags")} className={inputStyles} />
        </div>

        <div className="flex flex-col gap-3 p-4 bg-sage-50/50 rounded-2xl border border-sage-100">
          <div className="flex items-center gap-3">
            <input type="checkbox" {...register("isPublished")} id="isPublished" className="w-5 h-5 accent-sage-500" />
            <label htmlFor="isPublished" className="text-sm font-bold text-sage-700">Publicar inmediatamente</label>
          </div>
        </div>
      </div>

      <div className="sm:col-span-2 flex flex-col gap-4 mt-4">
        <label className={labelStyles}>Contenido (HTML permitido)</label>
        <textarea rows={15} {...register("content", { required: true })} className={`${inputStyles} font-mono text-sm p-6 bg-gray-50/30`} />
        
        <button 
          disabled={loading}
          className="flex items-center justify-center gap-3 w-full bg-gray-800 hover:bg-black text-white py-4 mt-6 font-bold uppercase tracking-[0.2em] text-xs transition-all rounded-2xl shadow-lg disabled:bg-gray-300"
        >
          <IoSaveOutline size={18} />
          { loading ? 'Guardando...' : 'Guardar Cambios' }
        </button>
      </div>
    </form>
  );
};