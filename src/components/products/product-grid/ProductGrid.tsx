import { Product } from '@/interfaces';
import { ProductGridItem } from './ProductGridItem';

interface Props {
  products: Product[];
}

export const ProductGrid = ({ products = [] }: Props) => {
  if (!products || products.length === 0) return <p className="text-center py-10">No hay productos disponibles.</p>;
  
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-10 mb-10 px-0">      {
        products.map( product => (
          <ProductGridItem
            key={ product.slug }
            product={ product }
          />
        ) )
      }
    </div>
  );
};