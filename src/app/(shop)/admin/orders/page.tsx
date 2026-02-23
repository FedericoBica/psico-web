export const revalidate = 0;

import { getPaginatedOrders } from "@/actions";
import { Title } from "@/components";
import Link from "next/link";
import { redirect } from "next/navigation";
import { IoCardOutline } from "react-icons/io5";
import { currencyFormat } from "@/utils";

export default async function AdminOrdersPage() {
  const { ok, orders = [] } = await getPaginatedOrders();

  if (!ok) {
    redirect("/auth/login");
  }

  type Order = typeof orders[number];

  return (
    <>
      <Title title="Todas las órdenes" />

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">#ID</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Fecha</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Email</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Productos</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Total</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Estado</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Opciones</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order: Order) => (
              <tr
                key={order.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {order.id.split("-").at(-1)}
                </td>
                <td className="text-sm text-gray-900 px-6 py-4 whitespace-nowrap">
                  {new Date(order.createdAt).toLocaleDateString("es-UY", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.buyerEmail ?? "Usuario registrado"}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.itemsInOrder} {order.itemsInOrder === 1 ? "ítem" : "ítems"}
                </td>
                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {currencyFormat(order.total)}
                </td>
                <td className="flex items-center text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {order.isPaid ? (
                    <>
                      <IoCardOutline className="text-green-800" />
                      <span className="mx-2 text-green-800">Pagada</span>
                    </>
                  ) : (
                    <>
                      <IoCardOutline className="text-red-800" />
                      <span className="mx-2 text-red-800">No Pagada</span>
                    </>
                  )}
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4">
                  <Link href={`/orders/${order.id}`} className="hover:underline">
                    Ver orden
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}