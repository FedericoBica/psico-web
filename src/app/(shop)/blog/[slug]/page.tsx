import { getPostBySlug } from "@/actions/blog/get-post-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";

interface Props {
  params: {
    slug: string;
  };
}

export default async function PostBySlugPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pb-20 bg-white">
      {/* Header del Post: Estilo Limpio */}
      <header className="relative w-full h-[60vh] flex items-end pb-16 overflow-hidden bg-gray-100">
        <Image
          src={post.image || '/imgs/placeholder.jpg'}
          alt={post.title}
          fill
          className="object-cover opacity-90"
          priority
        />
        {/* Overlay degradado suave (Plata) en lugar de negro */}
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/40 to-transparent" />
        
        <div className="relative z-10 px-5 max-w-4xl mx-auto w-full">
          <div className="flex gap-2 mb-6">
            {post.tags.map(tag => (
              <span key={tag} className="bg-sage-100 border border-sage-200 text-sage-600 px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
          <h1 className={`${titleFont.className} text-4xl md:text-6xl font-bold text-gray-800 leading-tight mb-4`}>
            {post.title}
          </h1>
        </div>
      </header>

      {/* Contenido del Artículo */}
      <div className="max-w-3xl mx-auto px-5 mt-10">
        <div className="flex items-center gap-4 mb-12 pb-6 border-b border-gray-100">
            <div className="text-sm text-gray-400 font-light italic">
                Escrito el {post.createdAt.toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' })}
            </div>
        </div>

        {/* Estilos del texto (Typography) */}
        <div 
          className="prose prose-sage max-w-none 
          text-gray-600 leading-relaxed text-lg
          prose-headings:text-gray-800 prose-headings:font-bold
          prose-strong:text-sage-600 prose-strong:font-bold
          prose-a:text-sage-500 hover:prose-a:text-sage-700
          prose-blockquote:border-sage-200 prose-blockquote:bg-sage-50/30 prose-blockquote:p-4 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
        
        {/* Footer del artículo: Estilo Caja Plata */}
        <div className="mt-20 p-10 rounded-[2.5rem] bg-gray-50 border border-gray-100 text-center shadow-sm">
            <h4 className="text-gray-800 font-bold text-xl mb-3">¿Este contenido te resultó útil?</h4>
            <p className="text-gray-500 font-light mb-6">Compartilo con alguien a quien pueda ayudarle o seguí explorando nuestras guías.</p>
            <button className="bg-sage-500 text-white px-8 py-3 rounded-full font-bold hover:bg-sage-600 transition-all">
                Ver más recursos
            </button>
        </div>
      </div>
    </article>
  );
}