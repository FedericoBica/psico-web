// src/store/cart/cart-store.ts
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartProduct {
  id: string;          // productId-format  (ej: "abc-digital" / "abc-physical")
  slug: string;
  title: string;
  price: number;
  quantity: number;
  image: string;
  format: 'digital' | 'physical';
}

interface State {
  cart: CartProduct[];

  getTotalItems: () => number;
  getSummaryInformation: () => {
    subTotal: number;
    total: number;
    itemsInCart: number;
  };
  hasPhysicalItems: () => boolean;

  addProductToCart:    (product: CartProduct) => void;
  updateProductQuantity: (product: CartProduct, quantity: number) => void;
  removeProduct:       (product: CartProduct) => void;
  clearCart:           () => void;
}

export const useCartStore = create<State>()(
  persist(
    (set, get) => ({
      cart: [],

      getTotalItems: () =>
        get().cart.reduce((total, item) => total + item.quantity, 0),

      getSummaryInformation: () => {
        const { cart } = get();
        const subTotal = cart.reduce((s, p) => s + p.quantity * p.price, 0);
        const itemsInCart = cart.reduce((s, p) => s + p.quantity, 0);
        return { subTotal, total: subTotal, itemsInCart };
      },

      // ¿Hay algún libro físico en el carrito?
      hasPhysicalItems: () =>
        get().cart.some((p) => p.format === 'physical'),

      addProductToCart: (product) => {
        const { cart } = get();
        const existing = cart.find((item) => item.id === product.id);
        if (!existing) {
          set({ cart: [...cart, product] });
          return;
        }
        set({
          cart: cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + product.quantity }
              : item
          ),
        });
      },

      updateProductQuantity: (product, quantity) =>
        set({
          cart: get().cart.map((item) =>
            item.id === product.id ? { ...item, quantity } : item
          ),
        }),

      removeProduct: (product) =>
        set({ cart: get().cart.filter((item) => item.id !== product.id) }),

      clearCart: () => set({ cart: [] }),
    }),
    { name: 'shopping-cart' }
  )
);