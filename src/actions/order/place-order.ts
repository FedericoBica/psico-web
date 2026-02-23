"use server";

import { auth } from "@/auth.config";
import prisma from "@/lib/prisma";

interface ProductToOrder {
  productId: string;
  quantity: number;
  price: number;
}

export const placeOrder = async (
  productIds: ProductToOrder[],
  buyerEmail: string,
  couponCode?: string
) => {
  const session = await auth();
  const userId = session?.user.id;

  try {
    // 1. Obtener los productos de la DB para validar precios actuales
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map((p) => p.productId) } },
    });

    // 2. Cálculos de montos
    const itemsInOrder = productIds.reduce((count, p) => count + p.quantity, 0);
    
    // Calculamos el subtotal basado en los precios de la DB (no del cliente)
    const subTotal = productIds.reduce((prev, p) => {
      const product = products.find((x) => x.id === p.productId);
      return prev + (product?.price ?? 0) * p.quantity;
    }, 0);

    let total = subTotal;

    // 3. Lógica de Cupón (si aplica)
    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      });

      if (coupon) {
        const discount = (subTotal * coupon.discountPercentage) / 100;
        total = subTotal - discount;
      }
    }

    // 4. Crear la Orden en la DB
    // Nota: No usamos transacción de stock porque son productos digitales ilimitados
    const order = await prisma.order.create({
      data: {
        userId: userId,
        buyerEmail: buyerEmail,
        itemsInOrder: itemsInOrder,
        subTotal: subTotal,
        total: total,
        isPaid: false,
        
        // Crear los items de la orden
        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              productId: p.productId,
              quantity: p.quantity,
              price: products.find((x) => x.id === p.productId)?.price ?? 0,
            })),
          },
        },
      },
    });

    return {
      ok: true,
      order: order,
      message: "Orden creada exitosamente",
    };

  } catch (error) {
    console.log(error);
    return {
      ok: false,
      message: "No se pudo realizar la orden",
    };
  }
};