export const revalidate = 0;

import { getPaginatedProductsWithImages } from "@/actions";
import { Pagination, ProductImage, Title } from "@/components";
import { currencyFormat } from "@/utils";
import Link from "next/link";

interface Props {
  searchParams: {
    page?: string;
  };
}

export default async function AdminProductsPage({ searchParams }: Props) {
  const page = searchParams.page ? parseInt(searchParams.page) : 1;

  const { products, totalPages } = await getPaginatedProductsWithImages({ page });

  type Product = typeof products[number];

  return (
    <>
      <Title title="Productos" />

      <div className="flex justify-end mb-5">
        <Link href="/admin/product/new" className="btn-primary">
          Nuevo E-book
        </Link>
      </div>

      <div className="mb-10 overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-200 border-b">
            <tr>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Imagen</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Título</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Categoría</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Precio</th>
              <th className="text-sm font-medium text-gray-900 px-6 py-4 text-left">Estado</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product: Product) => (
              <tr
                key={product.id}
                className="bg-white border-b transition duration-300 ease-in-out hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <Link href={`/product/${product.slug}`}>
                    <ProductImage
                      src={product.ProductImage[0]?.url}
                      width={80}
                      height={80}
                      alt={product.title}
                      className="w-20 h-20 object-cover rounded"
                    />
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  <Link
                    href={`/admin/product/${product.slug}`}
                    className="hover:underline"
                  >
                    {product.title}
                  </Link>
                </td>
                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                  {product.category}
                </td>
                <td className="text-sm font-bold text-gray-900 px-6 py-4 whitespace-nowrap">
                  {currencyFormat(product.price)}
                </td>
                <td className="text-sm px-6 py-4">
                  {product.isPublished ? (
                    <span className="text-green-600 font-bold">Visible</span>
                  ) : (
                    <span className="text-red-400 italic">Oculto</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}