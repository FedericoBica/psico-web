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
      {/* Header del Post */}
      <header className="relative w-full h-[60vh] flex items-end pb-16 overflow-hidden bg-[#FDFBF7]">
        <Image
          src={post.image || '/imgs/placeholder.jpg'}
          alt={post.title || 'Artículo de Psicopedagogía'}
          fill
          className="object-cover opacity-80" // Bajamos opacidad para que se vea más "pastel"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#FDFBF7] via-[#FDFBF7]/20 to-transparent" />
        
        <div className="relative z-10 px-5 max-w-4xl mx-auto w-full">
          <div className="flex gap-2 mb-6">
            {(post.tags || []).map((tag: string) => (
              <span key={tag} className="bg-white/80 border border-[#9ead6b]/30 text-[#9ead6b] px-4 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.2em]">
                {tag}
              </span>
            ))}
          </div>
          {/* TÍTULO EDITORIAL: Usamos font-serif y tracking-tight */}
          <h1 className="font-serif text-4xl md:text-6xl text-[#2d2d2d] leading-[1.1] mb-4">
            {post.title}
          </h1>
        </div>
      </header>

      {/* Contenido del Artículo */}
      <div className="max-w-3xl mx-auto px-5 mt-10">
        <div className="flex items-center gap-4 mb-12 pb-6 border-b border-gray-100">
            <div className="text-[11px] uppercase tracking-widest text-gray-400 font-medium italic">
              {post.createdAt 
                ? `Publicado el ${post.createdAt.toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' })}`
                : 'Fecha no disponible'
            }
        </div>
        </div>

        {/* AJUSTE DE TIPOGRAFÍA EN EL CUERPO */}
        <div 
          className="prose max-w-none 
          /* Cuerpo de texto: Sans, más gris y con interlineado generoso */
          text-[#555555] font-light leading-[1.8] text-lg
          
          /* Títulos internos: Serif y color oscuro café */
          prose-headings:font-serif prose-headings:text-[#2d2d2d] prose-headings:font-normal
          prose-h2:text-3xl prose-h3:text-2xl
          
          /* Detalles Sage */
          prose-strong:text-[#9ead6b] prose-strong:font-bold
          prose-a:text-[#9ead6b] prose-a:no-underline hover:prose-a:underline
          
          /* Citas: Estilo elegante */
          prose-blockquote:border-[#9ead6b] prose-blockquote:bg-[#f7f7f5] prose-blockquote:font-serif prose-blockquote:italic prose-blockquote:text-[#555555]"
          
          dangerouslySetInnerHTML={{ __html: post.content || ''}}
        />
        
        {/* Footer del artículo */}
        <div className="mt-20 p-12 rounded-[3rem] bg-[#f7f7f5] border border-gray-100 text-center">
            <h4 className="font-serif text-[#2d2d2d] text-2xl mb-4 italic">¿Te gustaría profundizar en este tema?</h4>
            <p className="text-[#555555] font-light mb-8 max-w-md mx-auto leading-relaxed">Podes contactarme para una consulta personalizada o seguir explorando mis recursos digitales.</p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="bg-[#9ead6b] text-white px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-[#8da05b] transition-all">
                  Consultar por WhatsApp
              </button>
              <button className="bg-white border border-[#e3e3e3] text-[#555555] px-10 py-4 rounded-full text-[10px] font-bold uppercase tracking-widest hover:bg-gray-50 transition-all">
                  Ver Recursos
              </button>
            </div>
        </div>
      </div>
    </article>
  );
}