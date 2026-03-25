import { getPosts } from "@/actions";
import { PostCard } from "@/components/blog/PostCard";
import { Title } from "@/components";

export const revalidate = 3600; 

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-8 mb-20 max-w-[1200px] mx-auto min-h-screen bg-white">
      
      {/* Header del Blog estilo "Sobre Mí" */}
      <header className="py-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-px bg-[#9ead6b]" />
          <span className="text-[11px] font-bold uppercase tracking-[0.4em] text-[#9ead6b]">
            Recursos didácticos
          </span>
        </div>
        
        <h1 className={` text-4xl md:text-5xl text-[#2d2d2d] leading-tight`}>
          Materiales y <span className="italic font-light text-[#9ead6b]">recursos.</span>
        </h1>
        <p className="mt-4 text-gray-500 font-light text-lg max-w-2xl leading-relaxed">
          Artículos y guías pensadas para acompañar el desarrollo psicopedagógico y los procesos de aprendizaje.
        </p>
      </header>

      { (posts && posts.length > 0) ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-20 p-16 border border-dashed border-sage-200 rounded-[3rem] bg-gray-50/50">
          <span className="text-5xl mb-6 opacity-50">🍃</span>
          <p className="text-gray-400 font-light italic text-lg text-center">
            Estamos redactando nuevos artículos para acompañarte en tu proceso...
          </p>
        </div>
      )}
    </div>
  );
}