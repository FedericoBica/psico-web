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
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map((p: ProductToOrder) => p.productId) } },
    });

    const itemsInOrder = productIds.reduce(
      (count: number, p: ProductToOrder) => count + p.quantity, 
      0
    );

    const subTotal = productIds.reduce((prev: number, p: ProductToOrder) => {
      const product = products.find((x: typeof products[number]) => x.id === p.productId);
      return prev + (product?.price ?? 0) * p.quantity;
    }, 0);

    let discountAmount = 0;
    let total = subTotal;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      });

      if (coupon) {
        discountAmount = (subTotal * coupon.discount) / 100;
        total = subTotal - discountAmount;
      }
    }

    const order = await prisma.order.create({
      data: {
        userId:       userId,
        buyerEmail:   buyerEmail,
        itemsInOrder: itemsInOrder,
        subTotal:     subTotal,
        discount:     discountAmount,
        total:        total,
        isPaid:       false,

        OrderItem: {
          createMany: {
            data: productIds.map((p: ProductToOrder) => ({
              productId: p.productId,
              quantity:  p.quantity,
              price:     products.find((x: typeof products[number]) => x.id === p.productId)?.price ?? 0,
            })),
          },
        },
      },
    });

    return {
      ok: true,
      order,
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