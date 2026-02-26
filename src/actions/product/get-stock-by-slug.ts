'use server';

import prisma from '@/lib/prisma';
// import { sleep } from '@/utils';


export const getStockBySlug = async( slug: string ): Promise<number> => {

  try {
   try {
    const product = await prisma.product.findFirst({
      where: { slug },
      select: { isPublished: true }
    });

    return product?.isPublished ? 1 : 0;
 
  } catch (error) {
    return 0;
 }


