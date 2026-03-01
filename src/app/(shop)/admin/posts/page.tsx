// src/app/admin/posts/page.tsx
import Link from 'next/link';
import { Title } from '@/components';
import { getAllPosts } from '@/actions';
import { IoCardOutline, IoAddOutline, IoCheckmarkCircleOutline, IoEllipseOutline } from 'react-icons/io5';
import clsx from 'clsx';

export default async function AdminPostsPage() {
  const posts = await getAllPosts();

  return (
    <div className="px-5 mb-20 max-w-[1200px] mx-auto bg-white">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-12">
        <Title title="Gestión del Blog" />
        
        <Link 
          href="/admin/posts/new" 
          className="flex items-center gap-2 bg-gray-800 hover:bg-black text-white px-6 py-3 rounded-2xl transition-all font-bold uppercase text-[10px] tracking-widest shadow-lg shadow-gray-200"
        >
          <IoAddOutline size={18} />
          Nuevo Artículo
        </Link>
      </div>

      <div className="bg-white rounded-[2rem] border border-gray-100 shadow-sm overflow-hidden">
        <table className="min-w-full text-left">
          <thead className="bg-gray-50/50 border-b border-gray-100">
            <tr>
              <th className="px-6 py-5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Estado</th>
              <th className="px-6 py-5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Título</th>
              <th className="px-6 py-5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Categorías</th>
              <th className="px-6 py-5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em]">Publicación</th>
              <th className="px-6 py-5 text-gray-400 font-bold uppercase text-[10px] tracking-[0.2em] text-right">Acción</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50">
            {posts.map((post) => (
              <tr key={post.id} className="hover:bg-sage-50/30 transition-colors group">
                <td className="px-6 py-4">
                  {post.isPublished ? (
                    <span className="flex items-center gap-2 text-sage-600 text-[10px] font-bold uppercase tracking-wider">
                      <IoCheckmarkCircleOutline size={14} /> Publicado
                    </span>
                  ) : (
                    <span className="flex items-center gap-2 text-gray-300 text-[10px] font-bold uppercase tracking-wider italic">
                      <IoEllipseOutline size={14} /> Borrador
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className="text-gray-700 font-medium group-hover:text-sage-600 transition-colors">
                    {post.title}
                  </span>
                </td>
                <td className="px-6 py-4">
                  <div className="flex gap-1">
                    {post.tags.slice(0, 1).map(tag => (
                      <span key={tag} className="text-[10px] bg-gray-100 text-gray-500 px-3 py-1 rounded-full border border-gray-200">
                        {tag}
                      </span>
                    ))}
                    {post.tags.length > 1 && <span className="text-[10px] text-gray-300 ml-1">+{post.tags.length - 1}</span>}
                  </div>
                </td>
                <td className="px-6 py-4 text-gray-400 text-xs tabular-nums">
                  {post.createdAt.toLocaleDateString('es-UY')}
                </td>
                <td className="px-6 py-4 text-right">
                  <Link 
                    href={`/admin/posts/${post.slug}`}
                    className="text-sage-500 hover:text-sage-700 font-bold text-[10px] uppercase tracking-widest transition-colors underline underline-offset-8 decoration-sage-100"
                  >
                    Editar
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {posts.length === 0 && (
          <div className="text-center py-24 text-gray-400 italic font-light">
            Tu archivo de artículos está vacío.
          </div>
        )}
      </div>
    </div>
  );
}