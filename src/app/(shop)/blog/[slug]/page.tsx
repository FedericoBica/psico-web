import { getPostBySlug } from "@/actions/blog/get-post-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";

interface Props {
  params: { slug: string; };
}

export default async function PostBySlugPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  if (!post) notFound();

  return (
    <article className="min-h-screen pb-20 bg-white">
      {/* Header Editorial */}
      <header className="relative w-full h-[70vh] flex items-end pb-20 overflow-hidden bg-[#FDFBF7]">
        <Image
          src={post.image || '/imgs/placeholder.jpg'}
          alt={post.title || 'Psicopedagogia'}
          fill
          className="object-cover opacity-90 transition-transform duration-700 hover:scale-105"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />
        
        <div className="relative z-10 px-8 max-w-5xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#9ead6b]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9ead6b]">
              {post.tags?.[0] || 'Artículo'}
            </span>
          </div>
          
          <h1 className={`${titleFont.className} text-4xl md:text-6xl text-[#2d2d2d] leading-[1.15] max-w-3xl`}>
            {post.title}
          </h1>
        </div>
      </header>

      {/* Cuerpo del Artículo */}
      <div className="max-w-3xl mx-auto px-8 mt-16">
        {/* Info de publicación estilo 'Sobre Mí' */}
        <div className="flex items-center gap-4 mb-12 pb-8 border-b border-gray-100">
          <p className="text-sm text-gray-400 font-light italic">
            Por Lic. Gimena Medrano — {post.createdAt?.toLocaleDateString('es-UY', { day: 'numeric', month: 'long', year: 'numeric' })}
          </p>
        </div>

        {/* Contenido con la tipografía que pediste */}
        <div 
          className={`prose max-w-none 
          /* Texto Base: Gris suave, liviano y con mucho aire */
          text-gray-600 font-light leading-[1.9] text-lg
          
          /* Títulos internos: Usamos la titleFont (Serif) igual que en el Sobre Mí */
          prose-headings:${titleFont.className} prose-headings:text-[#2d2d2d] prose-headings:font-normal
          prose-h2:text-4xl prose-h2:mt-12 prose-h2:mb-6
          prose-h3:text-2xl
          
          /* Acentos en Sage */
          prose-strong:text-[#2d2d2d] prose-strong:font-medium
          prose-blockquote:border-[#9ead6b] prose-blockquote:bg-[#f7f7f5] 
          prose-blockquote:rounded-r-2xl prose-blockquote:py-2 prose-blockquote:px-8
          prose-blockquote:font-light prose-blockquote:italic prose-blockquote:text-gray-600
          
          /* Enlaces */
          prose-a:text-[#9ead6b] prose-a:underline-offset-4 hover:prose-a:text-[#8da05b]`
          }
          dangerouslySetInnerHTML={{ __html: post.content || ''}}
        />
        
        {/* Footer del Post (Cierre igual al Sobre Mí) */}
        <div className="mt-24 p-12 rounded-[3rem] bg-[#f7f7f5] border border-gray-100 text-center">
            <div className="w-12 h-px bg-[#9ead6b] mx-auto mb-8" />
            <h4 className={`${titleFont.className} text-[#2d2d2d] text-3xl mb-4`}>
                ¿Hablamos?
            </h4>
            <p className="text-gray-500 font-light mb-10 max-w-md mx-auto text-lg">
                Si sentís que este tema resuena con lo que estás viviendo, podemos buscar un espacio para charlarlo.
            </p>
            <div className="flex justify-center">
              <button className="bg-[#9ead6b] text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8da05b] transition-all shadow-lg shadow-sage-200">
                  Consultar por WhatsApp
              </button>
            </div>
        </div>
      </div>
    </article>
  );
}