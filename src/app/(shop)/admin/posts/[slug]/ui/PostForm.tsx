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
  const [selectedFile, setSelectedFile] = useState<File | null>(null); // Estado para el archivo nuevo
  
  const { register, handleSubmit, watch, setValue } = useForm({
    defaultValues: {
      ...post,
      tags: post.tags?.join(", ") || "",
      isPublished: post.isPublished ?? false, // Aseguramos que sea booleano
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

  // Manejar el cambio del archivo visualmente
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const onSubmit = async (data: any) => {
    setLoading(true);
    const formData = new FormData();
    
    // Eliminamos 'image' de data por si react-hook-form lo coló, lo manejamos manual
    const { image, ...postToSave } = data;

    if (post.id) formData.append("id", post.id);
    
    // Agregamos los campos de texto
    Object.keys(postToSave).forEach(key => {
       // Convertimos el booleano a string explícito para el backend
      if (key === 'isPublished') {
        formData.append(key, postToSave[key] ? "true" : "false");
      } else {
        formData.append(key, postToSave[key]);
      }
    });

    // ✅ Agregamos el archivo de imagen si el usuario seleccionó uno nuevo
    if (selectedFile) {
      formData.append("image", selectedFile);
    }
    
    const { ok } = await createUpdatePost(formData);
    
    if (ok) {
      router.replace("/admin/posts");
      router.refresh(); // Forzamos la recarga para ver los cambios en la tabla
    } else {
       // Aquí podrías agregar un toast o alerta si falla
       alert("Error al guardar el artículo");
    }
    setLoading(false);
  };

  const inputStyles = "w-full p-3 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 focus:bg-white focus:border-[#9ead6b] focus:ring-1 focus:ring-[#9ead6b] outline-none transition-all placeholder:text-gray-300";
  const labelStyles = "text-[10px] uppercase tracking-[0.2em] text-gray-400 font-bold ml-1 mb-1 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 gap-8 sm:grid-cols-2 bg-white p-6 sm:p-10 rounded-[2.5rem] border border-gray-100 shadow-sm">
      
      {/* Columna 1: Textos */}
      <div className="flex flex-col gap-6">
        <div>
          <label className={labelStyles}><IoTextOutline /> Título del Artículo</label>
          <input type="text" {...register("title", { required: true })} className={inputStyles} placeholder="Ej: La importancia del juego libre" />
        </div>
        
        <div>
          <label className={labelStyles}><IoLinkOutline /> Slug</label>
          <input type="text" {...register("slug", { required: true })} className={`${inputStyles} font-mono text-xs bg-gray-100/50 text-[#9ead6b]`} />
        </div>

        <div>
          <label className={labelStyles}>Resumen Corto (Excerpt)</label>
          <textarea rows={4} {...register("excerpt", { required: true })} className={inputStyles} placeholder="Una breve descripción para la tarjeta del blog..." />
        </div>
      </div>

      {/* Columna 2: Imagen y Metadatos */}
      <div className="flex flex-col gap-6">
        <div>
          <label className={labelStyles}><IoImageOutline /> Imagen de Portada</label>
          <div className="mt-2 flex flex-col gap-4">
            
            {/* Previsualización de la imagen actual (si existe y no hay una nueva seleccionada) */}
            { post.image && !selectedFile && (
                <div className="relative w-full h-40 rounded-2xl overflow-hidden border border-gray-100">
                    <Image src={post.image} alt="Portada actual" fill className="object-cover" />
                </div>
            )}

            <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-200 rounded-2xl cursor-pointer hover:bg-gray-50 transition-all group overflow-hidden">
                {selectedFile ? (
                    // Mostrar nombre del archivo nuevo
                    <div className="text-center p-4">
                        <IoImageOutline className="w-8 h-8 text-[#9ead6b] mx-auto mb-2" />
                        <p className="text-xs text-gray-600 font-medium truncate max-w-[200px]">{selectedFile.name}</p>
                        <p className="text-[9px] text-gray-400 uppercase tracking-widest mt-1">Clic para cambiar</p>
                    </div>
                ) : (
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <IoCloudUploadOutline className="w-8 h-8 text-gray-300 group-hover:text-[#9ead6b] transition-colors" />
                        <p className="text-[10px] text-gray-400 mt-2 uppercase tracking-widest">Subir nueva imagen</p>
                    </div>
                )}
                <input 
                    type="file" 
                    className="hidden" 
                    accept="image/png, image/jpeg, image/webp"
                    onChange={handleFileChange} 
                />
            </label>
          </div>
        </div>

        <div>
          <label className={labelStyles}>Categorías (separadas por coma)</label>
          <input type="text" {...register("tags")} className={inputStyles} placeholder="aprendizaje, crianza, tdah..." />
        </div>

        <div className="flex flex-col gap-3 p-4 bg-[#f7f7f5] rounded-2xl border border-[#9ead6b]/30">
          <div className="flex items-center gap-3">
            <input type="checkbox" {...register("isPublished")} id="isPublished" className="w-5 h-5 accent-[#9ead6b]" />
            <label htmlFor="isPublished" className="text-sm font-bold text-gray-700">Publicar inmediatamente</label>
          </div>
        </div>
      </div>

      {/* Fila inferior: Contenido */}
      <div className="sm:col-span-2 flex flex-col gap-4 mt-4">
        <label className={labelStyles}>Contenido (HTML permitido)</label>
        <textarea rows={15} {...register("content", { required: true })} className={`${inputStyles} font-mono text-sm p-6 bg-gray-50/30`} placeholder="<h2>Título interno</h2><p>Escribe aquí el contenido...</p>" />
        
        <button 
          disabled={loading}
          type="submit"
          className="flex items-center justify-center gap-3 w-full bg-[#2d2d2d] hover:bg-black text-white py-4 mt-6 font-bold uppercase tracking-[0.2em] text-xs transition-all rounded-2xl shadow-lg disabled:bg-gray-300 disabled:cursor-not-allowed"
        >
          <IoSaveOutline size={18} />
          { loading ? 'Guardando...' : 'Guardar Artículo' }
        </button>
      </div>
    </form>
  );
};