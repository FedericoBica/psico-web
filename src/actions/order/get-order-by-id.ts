"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

export const getOrderById = async (id: string) => {
  const session = await auth();

  try {
    const order = await prisma.order.findUnique({
      where: { id },
      include: {
        OrderItem: {
          select: {
            price:    true,
            quantity: true,
            format:   true, // ✅ FIX: incluir format para saber si es digital o físico
            product: {
              select: {
                title:       true,
                slug:        true,
                downloadUrl: true,
                ProductImage: {
                  select: { url: true },
                  take: 1,
                },
              },
            },
          },
        },
      },
    });

    if (!order) return { ok: false, message: `${id} no existe` };

    if (order.userId) {
      if (!session?.user) {
        return { ok: false, message: "Debe estar autenticado" };
      }
      if (session.user.role === "user" && session.user.id !== order.userId) {
        return { ok: false, message: "Esta orden no pertenece a su usuario" };
      }
    }

    return { ok: true, order };

  } catch (error) {
    console.log(error);
    return { ok: false, message: "Error al obtener la orden" };
  }
};