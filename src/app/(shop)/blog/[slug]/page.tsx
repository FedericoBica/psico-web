import { getPostBySlug } from "@/actions/blog/get-post-by-slug";
import Image from "next/image";
import { notFound } from "next/navigation";
import { titleFont } from "@/config/fonts";
import { Metadata } from "next";
import { formatPostContent } from "@/utils";

interface Props {
  params: { slug: string; };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);
  if (!post || !post.title || !post.isPublished) return {};

  const description = (post.excerpt ?? post.title).slice(0, 160);

  return {
    title: post.title,
    description,
    openGraph: {
      title: post.title,
      description,
      type: "article",
      publishedTime: post.createdAt?.toISOString(),
      modifiedTime: post.updatedAt?.toISOString(),
      authors: ["Gimena Medrano"],
      images: post.image ? [{ url: post.image, alt: post.title }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: post.image ? [post.image] : [],
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
  };
}

export default async function PostBySlugPage({ params }: Props) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  // Los borradores no se muestran al público (ni los indexa Google)
  if (!post || !post.isPublished) notFound();

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt ?? post.title,
    image: post.image ?? undefined,
    datePublished: post.createdAt?.toISOString(),
    dateModified: post.updatedAt?.toISOString(),
    author: {
      "@type": "Person",
      name: "Gimena Medrano",
      jobTitle: "Licenciada en Psicopedagogía",
    },
    publisher: {
      "@type": "Person",
      name: "Gimena Medrano",
    },
    keywords: post.tags?.join(", "),
    inLanguage: "es-UY",
  };

  return (
    <>
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
    />
    <article className="min-h-screen pb-20 bg-white">
      {/* Header Editorial */}
      {/* En pantallas chicas la imagen se ve completa (tiene texto) y el título va debajo */}
      <header className="relative w-full bg-[#FDFBF7] md:h-[70vh] md:flex md:items-end md:pb-20 md:overflow-hidden">
        <Image
          src={post.image || '/imgs/placeholder.jpg'}
          alt={post.title || 'Psicopedagogia'}
          width={1200}
          height={630}
          sizes="100vw"
          className="w-full h-auto md:absolute md:inset-0 md:h-full md:object-cover md:opacity-90 transition-transform duration-700 md:hover:scale-105"
          priority
        />
        <div className="hidden md:block absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

        <div className="relative z-10 px-5 sm:px-8 pt-8 pb-4 md:pt-0 md:pb-0 max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-[#9ead6b]" />
            <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9ead6b]">
              {post.tags?.[0] || 'Artículo'}
            </span>
          </div>
          
          <h1 className={`${titleFont.className} text-[1.6rem] sm:text-4xl md:text-5xl lg:text-6xl text-[#2d2d2d] leading-[1.2] md:leading-[1.15] [text-wrap:balance] break-words`}>
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
          prose-headings:[font-family:var(--title-font)] prose-headings:text-[#2d2d2d] prose-headings:font-normal
          prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6
          prose-p:my-6 prose-li:my-2 prose-li:marker:text-[#9ead6b]
          prose-h3:text-2xl
          
          /* Acentos en Sage */
          prose-strong:text-[#2d2d2d] prose-strong:font-medium
          prose-blockquote:border-[#9ead6b] prose-blockquote:bg-[#f7f7f5] 
          prose-blockquote:rounded-r-2xl prose-blockquote:py-2 prose-blockquote:px-8
          prose-blockquote:font-light prose-blockquote:italic prose-blockquote:text-gray-600
          
          /* Enlaces */
          prose-a:text-[#9ead6b] prose-a:underline-offset-4 hover:prose-a:text-[#8da05b]`
          }
          style={{ '--title-font': titleFont.style.fontFamily } as React.CSSProperties}
          dangerouslySetInnerHTML={{ __html: formatPostContent(post.content || '', post.title || '') }}
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
              <a
                href={`https://wa.me/59897454505?text=${encodeURIComponent(`Hola Gimena, leí tu artículo "${post.title}" y me gustaría hacerte una consulta.`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-[#9ead6b] text-white px-12 py-5 rounded-full text-[11px] font-bold uppercase tracking-[0.2em] hover:bg-[#8da05b] transition-all shadow-lg shadow-sage-200">
                  Consultar por WhatsApp
              </a>
            </div>
        </div>
      </div>
    </article>
    </>
  );
}