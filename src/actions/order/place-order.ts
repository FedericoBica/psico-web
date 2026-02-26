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
      where: { id: { in: productIds.map((p) => p.productId) } },
    });

    type DbProduct = typeof products[number];

    const itemsInOrder = productIds.reduce(
      (count, p) => count + p.quantity,
      0
    );

    const subTotal = productIds.reduce((prev, p) => {
      const product = products.find((x: DbProduct) => x.id === p.productId);
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
        userId,
        buyerEmail,
        itemsInOrder,
        subTotal,
        total,
        isPaid: false,

        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              productId: p.productId,
              quantity: p.quantity,
              price: products.find((x: DbProduct) => x.id === p.productId)?.price ?? 0,
            })),
          },
        },
      },
    });

    return {
      ok: true,
      order,
      discountAmount,
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