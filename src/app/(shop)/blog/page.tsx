import { getPosts } from "@/actions";
import { PostCard } from "@/components/blog/PostCard";
import { Title } from "@/components";

export const revalidate = 3600; 

export default async function BlogPage() {
  const posts = await getPosts();

  return (
    <div className="px-5 mb-20 max-w-[1200px] mx-auto min-h-screen bg-white">
      <Title 
        title="Materiales y recursos" 
        subtitle="Artículos y guías"
        className="mb-10"
      />

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