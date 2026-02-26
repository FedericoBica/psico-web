"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrdersByUser = async () => {
  const session = await auth();

  if (!session?.user) {
    return { ok: true, orders: [] };
  }

  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    select: {
      id: true,
      total: true,
      isPaid: true,
      createdAt: true,
      itemsInOrder: true,
      buyerEmail: true,
    },
  });

  return {
    ok: true,
    orders,
  };
};