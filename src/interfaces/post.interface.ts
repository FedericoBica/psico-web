export interface Post {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  image: string | null;
  tags: string[];
  isPublished: boolean;
  createdAt: Date;
  updatedAt: Date;
  userId?: string | null;
}