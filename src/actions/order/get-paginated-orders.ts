'use server';

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

export const getPaginatedOrders = async () => {
  const session = await auth();

  if (session?.user.role !== 'admin') {
    return {
      ok: false,
      message: 'Debe estar autenticado como admin',
    };
  }

  const orders = await prisma.order.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      subTotal: true,
      total: true,
      itemsInOrder: true,
      isPaid: true,
      paidAt: true,
      createdAt: true,
      buyerEmail: true,
      transactionId: true,
      userId: true,
    },
  });

  return {
    ok: true,
    orders,
  };
};