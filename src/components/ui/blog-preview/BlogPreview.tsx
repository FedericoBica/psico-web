// src/components/ui/blog-preview/BlogPreview.tsx
import Link from 'next/link';
import { Post } from '@/interfaces';
import { PostCard } from '@/components/blog/PostCard';
import { IoArrowForwardOutline } from 'react-icons/io5';

interface Props {
  posts: Post[];
}

export const BlogPreview = ({ posts }: Props) => {
  if (posts.length === 0) return null;

  return (
    <section className="py-20 px-8 md:px-16 lg:px-24 bg-[#f7f7f5]" id="blog">
      <div className="max-w-5xl mx-auto">

        {/* Encabezado de sección */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-6 h-px bg-[#9ead6b]" />
              <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#9ead6b]">
                Blog
              </span>
            </div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#2d2d2d] leading-tight">
              Últimos<br />
              <span className="italic font-light text-[#9ead6b]">artículos</span>
            </h2>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-[11px] font-bold uppercase tracking-[0.2em] text-[#9ead6b] hover:text-[#7a9347] transition-colors border-b border-[#c9d894] pb-0.5 whitespace-nowrap"
          >
            Ver todos los artículos
            <IoArrowForwardOutline size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </section>
  );
};
