import { notFound } from 'next/navigation';
import { getOrderById } from '@/actions'; 
import { Title, OrderStatus, MercadoPagoButton } from '@/components';
import Image from 'next/image';
import { currencyFormat } from '@/utils';

interface Props {
  params: {
    id: string; // El ID viene de la URL (la carpeta se llama [id])
  };
}

export default async function OrderPage({ params }: Props) {
  const { id } = params; // Extraemos el ID de la URL

  // 1. Obtener la información de la orden desde el servidor
  const { ok, order } = await getOrderById(id);

  if (!ok || !order) {
    notFound();
  }

  return (
    <div className="flex justify-center items-center mb-72 px-10 sm:px-0">
      <div className="flex flex-col w-[1000px]">
        {/* Usamos el ID de la URL para el título */}
        <Title title={`Orden #${id.split('-')[0]}`} />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10">
          
          {/* Columna Izquierda: Listado de E-books */}
          <div className="flex flex-col mt-5">
            <OrderStatus isPaid={order.isPaid} />

            {order.OrderItem.map((item: any) => (
              <div key={item.product.slug} className="flex mb-5 border-b pb-4 mt-2">
                {/* Usamos un fallback por si no hay imagen para que no rompa */}
                <Image
                  src={ item.product.ProductImage[0]?.url.startsWith('http') 
                        ? item.product.ProductImage[0]?.url 
                        : `/products/${item.product.ProductImage[0]?.url}` 
                  }
                  width={100}
                  height={100}
                  alt={item.product.title}
                  className="mr-5 rounded object-cover"
                />

                <div className="flex-grow">
                  <p className="font-bold">{item.product.title}</p>
                  <p>${item.price} x {item.quantity}</p>
                  <p className="font-bold text-blue-700">Subtotal: ${item.price * item.quantity}</p>
                  
                  {/* ✅ BOTÓN DE DESCARGA (Solo si pagó) */}
                  {order.isPaid && item.product.downloadUrl && (
                    <a 
                      href={item.product.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block mt-3 bg-green-600 text-white px-4 py-2 rounded text-sm hover:bg-green-700 transition-all font-bold shadow-sm"
                    >
                      ⬇️ Descargar E-book
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Columna Derecha: Resumen y Pago */}
          <div className="bg-white rounded-xl shadow-xl p-7 h-fit">
            <h2 className="text-2xl mb-2 font-bold border-b pb-2">Resumen</h2>
            
            <div className="my-5">
               <p className="text-sm text-gray-500 italic">Enviado a:</p>
               <p className="font-bold text-lg">{order.buyerEmail}</p>
            </div>

            <div className="grid grid-cols-2 mt-4">
              <span>No. Productos</span>
              <span className="text-right">{order.itemsInOrder} {order.itemsInOrder === 1 ? 'ítem' : 'ítems'}</span>

              <span className="mt-5 text-2xl font-bold">Total:</span>
              <span className="mt-5 text-2xl font-bold text-right text-blue-600">
                {currencyFormat(order.total)}
              </span>
            </div>

            <div className="mt-8">
              {order.isPaid ? (
                <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow-sm">
                   <p className="font-bold">¡Pago Completado!</p>
                   <p className="text-sm">Tus libros digitales ya están listos para descargar.</p>
                </div>
              ) : (
                /* ✅ BOTÓN DE MERCADO PAGO */
                <div className="flex flex-col gap-2">
                  <p className="text-xs text-gray-500 text-center mb-2 italic">Selecciona tu método de pago:</p>
                  <MercadoPagoButton 
                    preferenceId={ order.transactionId ?? '' }
                    
                    amount={order.total} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}