'use server';

// src/actions/order/place-order.ts

import { auth } from '@/auth.config';
import prisma from '@/lib/prisma';

interface ProductToOrder {
  productId: string;
  quantity:  number;
  price:     number;
  format:    'digital' | 'physical';
}

interface ShippingData {
  shippingName:    string;
  shippingPhone:   string;
  shippingAddress: string;
  shippingCity:    string;
  shippingDept:    string;
}

export const placeOrder = async (
  productIds:   ProductToOrder[],
  buyerEmail:   string,
  couponCode?:  string,
  shipping?:    ShippingData
) => {
  const session = await auth();
  const userId  = session?.user.id;

  try {
    const products = await prisma.product.findMany({
      where: { id: { in: productIds.map((p) => p.productId) } },
    });

    type DbProduct = typeof products[number];

    const itemsInOrder = productIds.reduce((c, p) => c + p.quantity, 0);

    const subTotal = productIds.reduce((prev, p) => {
      const product = products.find((x: DbProduct) => x.id === p.productId);
      // Usar el precio pasado desde el carrito (ya refleja digital vs físico)
      return prev + p.price * p.quantity;
    }, 0);

    let total = subTotal;

    if (couponCode) {
      const coupon = await prisma.coupon.findUnique({
        where: { code: couponCode, isActive: true },
      });
      if (coupon) {
        total = subTotal - (subTotal * coupon.discount) / 100;
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

        // Datos de envío (solo si hay físicos)
        shippingName:    shipping?.shippingName    ?? null,
        shippingPhone:   shipping?.shippingPhone   ?? null,
        shippingAddress: shipping?.shippingAddress ?? null,
        shippingCity:    shipping?.shippingCity    ?? null,
        shippingDept:    shipping?.shippingDept    ?? null,

        OrderItem: {
          createMany: {
            data: productIds.map((p) => ({
              productId: p.productId,
              quantity:  p.quantity,
              price:     p.price,
              format:    p.format,
            })),
          },
        },
      },
    });

    return { ok: true, order, message: 'Orden creada exitosamente' };

  } catch (error) {
    console.log(error instanceof Error ? error.message : String(error));
    return { ok: false, message: 'No se pudo realizar la orden', order: null };
  }
};