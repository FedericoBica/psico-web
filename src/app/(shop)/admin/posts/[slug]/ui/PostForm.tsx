"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { createUpdatePost } from "@/actions/blog/create-update-post";
import { useRouter } from "next/navigation";
import { IoSaveOutline, IoLinkOutline, IoImageOutline, IoTextOutline } from "react-icons/io5";

export const PostForm = ({ post }: any) => {
  const router = useRouter();
  
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    defaultValues: {
      ...post,
      tags: post.tags?.join(", ") || "",
    }
  });

  const titleValue = watch("title");

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
    const formData = new FormData();
    if (post.id) formData.append("id", post.id);
    
    Object.keys(data).forEach(key => formData.append(key, data[key]));
    
    const { ok } = await createUpdatePost(formData);
    if (ok) router.replace("/admin/posts");
  };

  const inputStyles = "w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:bg-white focus:border-sage-400 focus:ring-1 focus:ring-sage-100 outline-none transition-all placeholder:text-gray-300";
  const labelStyles = "text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 sm:grid-cols-2 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
      
      {/* Columna Izquierda: Identidad del Post */}
      <div className="flex flex-col gap-6">
        <div>
          <label className={labelStyles}><IoTextOutline /> Título del Artículo</label>
          <input 
            type="text" 
            {...register("title", { required: true })} 
            placeholder="Ej: Herramientas para la gestión del estrés"
            className={inputStyles} 
          />
        </div>
        
        <div>
          <label className={labelStyles}><IoLinkOutline /> Slug (URL Amigable)</label>
          <input 
            type="text" 
            {...register("slug", { required: true })} 
            placeholder="herramientas-gestion-estres"
            className={`${inputStyles} font-mono text-xs bg-gray-100/50 text-sage-600`} 
          />
        </div>

        <div>
          <label className={labelStyles}>Resumen Corto (Excerpt)</label>
          <textarea 
              rows={4} 
              {...register("excerpt", { required: true })} 
              placeholder="Una breve introducción que aparecerá en el listado..."
              className={inputStyles} 
          />
        </div>
      </div>

      {/* Columna Derecha: Multimedia y Metadatos */}
      <div className="flex flex-col gap-6">
        <div>
          <label className={labelStyles}><IoImageOutline /> URL de la Imagen de Portada</label>
          <input 
            type="text" 
            {...register("image", { required: true })} 
            placeholder="https://tusitio.com/imagen.jpg"
            className={inputStyles} 
          />
        </div>

        <div>
          <label className={labelStyles}>Categorías / Tags (Separados por coma)</label>
          <input 
            type="text" 
            {...register("tags")} 
            placeholder="ej: ansiedad, meditación, guías" 
            className={inputStyles} 
          />
        </div>

        <div className="flex flex-col gap-3 mt-4 p-4 bg-sage-50/50 rounded-2xl border border-sage-100">
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" 
              {...register("isPublished")} 
              id="isPublished" 
              className="w-5 h-5 accent-sage-500 cursor-pointer" 
            />
            <label htmlFor="isPublished" className="text-sm font-bold text-sage-700 cursor-pointer">
              Publicar inmediatamente
            </label>
          </div>
          <p className="text-[10px] text-sage-400 leading-relaxed ml-8">
            Si no se marca, el artículo quedará guardado como borrador visible solo para administradores.
          </p>
        </div>
      </div>

      {/* Contenido Completo (Ancho total) */}
      <div className="sm:col-span-2 flex flex-col gap-4 mt-4">
        <label className={labelStyles}>Contenido del Artículo (Cuerpo del Post)</label>
        <textarea 
          rows={15} 
          {...register("content", { required: true })} 
          placeholder="Escribe aquí el contenido en formato HTML..."
          className={`${inputStyles} font-mono text-sm leading-relaxed p-6 bg-gray-50/30`} 
        />
        
        <button className="flex items-center justify-center gap-3 w-full bg-gray-800 hover:bg-black text-white py-4 mt-6 font-bold uppercase tracking-[0.2em] text-xs transition-all rounded-2xl shadow-lg shadow-gray-200 active:scale-[0.98]">
          <IoSaveOutline size={18} />
          Guardar Cambios
        </button>
      </div>
    </form>
  );
};