"use server";
import prisma from "@/lib/prisma";

export const getAllPosts = async () => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' }
    });

    // ✅ Mapeamos para que TS sepa que tags siempre es un array (evita ts(2339))
    return posts.map(post => ({
      ...post,
      tags: (post as any).tags || [] 
    }));
  } catch (error) {
    console.log(error);
    return [];
  }
};