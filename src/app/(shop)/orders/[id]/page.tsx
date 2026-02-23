export const revalidate = 0;

import { notFound } from "next/navigation";
import Image from "next/image";
import { getOrderById } from "@/actions";
import { createMercadoPagoPreference } from "@/actions/payments/mercado-pago-preference";
import { Title, OrderStatus } from "@/components";
import { MercadoPagoButton } from "@/components/mercadopago/MercadoPagoButton";
import { currencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Tipo inferido del include de Prisma
type OrderItem = {
  price: number;
  quantity: number;
  product: {
    title: string;
    slug: string;
    downloadUrl: string;
    ProductImage: { url: string }[];
  };
};

export default async function OrderPage({ params, searchParams }: Props) {
  const cleanId = params.id.split("?")[0].replace("/", "");

  const { ok, order } = await getOrderById(cleanId);

  if (!ok || !order) {
    notFound();
  }

  let preferenceId: string | null = null;
  if (!order.isPaid) {
    const response = await createMercadoPagoPreference(cleanId, order.total);
    if (response.ok && response.preferenceId) {
      preferenceId = response.preferenceId;
    }
  }

  const isPaymentRedirect = !!searchParams.status;

  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 mt-10">
      <div className="flex flex-col w-full max-w-[1000px]">
        <Title title={`Orden #${cleanId.split("-").at(-1)?.toUpperCase()}`} />

        {isPaymentRedirect && !order.isPaid && (
          <div className="bg-amber-50 border border-amber-400 text-amber-700 px-4 py-3 rounded-xl mb-6 text-sm">
            Estamos procesando tu pago. Si ya pagaste, puede demorar unos minutos.
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">

          {/* Columna Izquierda: E-books */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order.isPaid} />

            <div className="mt-6 space-y-4">
              {(order.OrderItem as OrderItem[]).map((item) => {
                const imageUrl = item.product.ProductImage[0]?.url ?? "";
                const src = imageUrl.startsWith("http")
                  ? imageUrl
                  : `/products/${imageUrl}`;

                return (
                  <div key={item.product.slug} className="flex gap-4 border-b pb-4">
                    <Image
                      src={src}
                      width={100}
                      height={100}
                      alt={item.product.title}
                      className="rounded object-cover flex-shrink-0"
                    />

                    <div className="flex flex-col justify-between flex-grow">
                      <p className="font-bold text-gray-800">
                        {item.product.title}
                      </p>
                      <p className="text-sm text-gray-500">
                        {currencyFormat(item.price)} x {item.quantity}
                      </p>
                      <p className="font-bold text-blue-700">
                        {currencyFormat(item.price * item.quantity)}
                      </p>

                      {order.isPaid && item.product.downloadUrl && (
                        <Link
                          href={item.product.downloadUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-block mt-3 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-bold transition-all w-fit"
                        >
                          ⬇️ Descargar E-book
                        </Link>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Columna Derecha: Resumen */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-4 font-bold border-b pb-2">Resumen</h2>

            <div className="mb-4">
              <p className="text-sm text-gray-500">Email del comprador:</p>
              <p className="font-bold">{order.buyerEmail ?? "Usuario registrado"}</p>
            </div>

            <div className="grid grid-cols-2 gap-y-2 text-gray-700">
              <span>Productos</span>
              <span className="text-right">{order.itemsInOrder}</span>

              <span>Subtotal</span>
              <span className="text-right">{currencyFormat(order.subTotal)}</span>

              {order.discount > 0 && (
                <>
                  <span className="text-green-600 font-bold italic">Descuento</span>
                  <span className="text-right text-green-600 font-bold italic">
                    -{currencyFormat(order.discount)}
                  </span>
                </>
              )}

              <div className="col-span-2 border-t my-2" />

              <span className="text-xl font-bold">Total</span>
              <span className="text-xl font-bold text-right text-blue-600">
                {currencyFormat(order.total)}
              </span>
            </div>

            <div className="mt-8">
              {order.isPaid ? (
                <div className="bg-green-50 border-l-4 border-green-500 text-green-700 p-4 rounded-lg">
                  <p className="font-bold">¡Pago Completado!</p>
                  <p className="text-sm mt-1">
                    Tus e-books están listos para descargar.
                  </p>
                </div>
              ) : (
                preferenceId && (
                  <MercadoPagoButton preferenceId={preferenceId} />
                )
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}