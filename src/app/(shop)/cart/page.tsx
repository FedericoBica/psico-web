import Link from 'next/link';
import { Title } from '@/components';
import { ProductsInCart } from './ui/ProductsInCart';
import { OrderSummary } from './ui/OrderSummary';

export default function CartPage() {
  return (
    <div className="flex justify-center items-center mb-72 px-4 sm:px-0 mt-10">
      <div className="flex flex-col w-full max-w-[1000px]">
        
        {/* Título con estilo limpio */}
        <Title title="Tu Carrito" subtitle="Material digital listo para descarga" />

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 mt-5">
          
          {/* Columna Izquierda: Lista de Materiales */}
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-4 font-bold ml-1">
              Items en tu selección
            </span>
            <div className="border border-gray-100 rounded-3xl p-6 bg-white shadow-sm">
              <ProductsInCart />
            </div>
            
            <Link 
              href="/" 
              className="group flex items-center gap-2 mt-6 text-sm font-medium text-sage-600 hover:text-sage-700 transition-all ml-1"
            >
              <span className="group-hover:-translate-x-1 transition-transform">←</span>
              Continuar explorando la biblioteca
            </Link>
          </div>

          {/* Columna Derecha: Resumen de Pago (Estilo Plata Premium) */}
          <div className="bg-gray-50/80 backdrop-blur-sm border border-gray-200 rounded-[2.5rem] p-8 h-fit shadow-sm relative overflow-hidden">
            {/* Sutil detalle decorativo plata */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/40 rounded-full -mr-16 -mt-16 blur-2xl"></div>
            
            <h2 className="text-xl font-bold mb-6 text-gray-800 relative">Resumen de compra</h2>
            
            <div className="relative">
              <OrderSummary />
            </div>
            
            <div className="mt-10 mb-2 w-full relative">
              <Link
                className="flex bg-sage-500 hover:bg-sage-600 text-white justify-center items-center py-4 rounded-2xl text-sm uppercase tracking-widest font-bold shadow-lg shadow-sage-200/50 transition-all hover:scale-[1.02] active:scale-95"
                href="/checkout"
              >
                Ir a pagar
              </Link>
              
              <p className="text-[10px] text-center text-gray-400 mt-4 uppercase tracking-tighter">
                Acceso inmediato post-pago vía Mercado Pago
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>  
  );
}