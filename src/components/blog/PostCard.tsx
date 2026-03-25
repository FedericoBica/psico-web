// src/components/blog/PostCard.tsx
import { Post } from '@/interfaces';
import Image from 'next/image';
import Link from 'next/link';


interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <Link 
      href={`/blog/${post.slug}`}
      // ESTÉTICA: Fondo blanco, flexbox para altura completa, transición suave
      className="group flex flex-col h-full bg-white transition-all duration-300 rounded-[2rem] overflow-hidden hover:shadow-lg hover:shadow-sage-100/50 border border-gray-100/50"
    >
      {/* Contenedor de Imagen */}
      {/* ESTÉTICA: Bordes redondeados grandes arriba, aspecto 4:3, fondo neutro sutil */}
      <div className="relative w-full aspect-[4/3] overflow-hidden bg-gray-50">
        <Image
          src={post.image || '/imgs/placeholder.jpg'}
          alt={post.title}
          fill
          // ESTÉTICA: Zoom suave al pasar el mouse
          className="object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {/* Badge de categoría */}
        {/* ESTÉTICA: Badge minimalista en blanco semi-transparente */}
        {post.tags?.[0] && (
          <div className="absolute top-4 left-4 bg-white/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-100/50">
            <span className="text-[9px] font-bold uppercase tracking-[0.2em] text-[#9ead6b]">
              {post.tags[0]}
            </span>
          </div>
        )}
      </div>

      {/* Contenido de la Card */}
      {/* ESTÉTICA: Relleno generoso y flex-grow para empujar el botón al final */}
      <div className="flex flex-col flex-grow p-7">
        {/* Fecha */}
        {/* ESTÉTICA: Color gris suave, espaciado inferior */}
        <span className="text-[10px] text-gray-400 uppercase tracking-widest mb-3 tabular-nums">
          { post.createdAt?.toLocaleDateString('es-UY', { year: 'numeric', month: 'long' }) }
        </span>

        {/* Título */}
        {/* ESTÉTICA: Color oscuro café, interlineado ajustado, cambio de color en hover */}
        {/* Mantenemos titleFont.className exacto como estaba en tu código original */}
        <h3 className={`text-2xl text-[#2d2d2d] leading-snug group-hover:text-[#9ead6b] transition-colors duration-300`}>
          {post.title}
        </h3>

        {/* Resumen */}
        {/* ESTÉTICA: Texto gris, fuente liviana, limitado a 2 líneas */}
        <p className="mt-4 text-gray-500 font-light text-sm line-clamp-2 leading-relaxed">
          {post.excerpt}
        </p>

        {/* Botón "Leer más" */}
        {/* ESTÉTICA: Margen superior automático, espaciado, estilo editorial minimalista */}
        <div className="mt-auto pt-7 flex items-center gap-3">
          <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#2d2d2d] group-hover:text-[#9ead6b] transition-colors">
            Leer artículo
          </span>
          {/* ESTÉTICA: Línea decorativa que se expande en hover */}
          <div className="w-0 group-hover:w-10 h-px bg-[#9ead6b] transition-all duration-500 ease-in-out" />
        </div>
      </div>
    </Link>
  );
};