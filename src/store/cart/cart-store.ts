import { create } from 'zustand'
import { persist } from 'zustand/middleware';

// 1. Interfaz simplificada para productos digitales
export interface CartProduct {
  id: string;
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface State {
  cart: CartProduct[];

  // Métodos
  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    itemsInCart: number;
  };

  addProductToCart: (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct: (product: CartProduct) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      // Retorna la cantidad total de archivos/items
      getTotalItems: () => {
        const { cart } = get();
        return cart.reduce((total, item) => total + item.quantity, 0);
      },

      // Resumen simplificado: Solo lo económico
      getSummaryInformation: () => {
        const { cart } = get();

        const subTotal = cart.reduce(
          (subTotal, product) => product.quantity * product.price + subTotal,
          0
        );
        
        const itemsInCart = cart.reduce(
          (total, item) => total + item.quantity, 0
        );

        return {
          subTotal,
          total: subTotal, // En digitales, total suele ser igual al subtotal (sin tax/envío)
          itemsInCart,
        };
      },

      addProductToCart: (product: CartProduct) => {
        const { cart } = get();

        // 2. Revisar si el producto ya existe en el carrito
        const productInCart = cart.some((item) => item.id === product.id);

        if (!productInCart) {
          set({ cart: [...cart, product] });
          return;
        }

        // 3. Si ya existe, solo aumentamos la cantidad
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: item.quantity + product.quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      updateProductQuantity: (product: CartProduct, quantity: number) => {
        const { cart } = get();
        const updatedCartProducts = cart.map((item) => {
          if (item.id === product.id) {
            return { ...item, quantity: quantity };
          }
          return item;
        });

        set({ cart: updatedCartProducts });
      },

      removeProduct: (product: CartProduct) => {
        const { cart } = get();
        const updatedCartProducts = cart.filter(
          (item) => item.id !== product.id
        );
        set({ cart: updatedCartProducts });
      },

      clearCart: () => {
        set({ cart: [] });
      },
    }),
    {
      name: 'shopping-cart',
    }
  )
);