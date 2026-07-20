import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

export type CartItem = {
  productId: string;
  name: string;
  slug: string;
  image: string;
  pricePaise: number;
  quantity: number;
};

type CartState = {
  items: CartItem[];
  add: (item: Omit<CartItem, "quantity">, qty?: number) => void;
  remove: (productId: string) => void;
  setQty: (productId: string, qty: number) => void;
  clear: () => void;
  subtotalPaise: number;
  count: number;
};

const CartCtx = createContext<CartState | null>(null);
const KEY = "vs_cart_v1";

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      return JSON.parse(localStorage.getItem(KEY) || "[]");
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(KEY, JSON.stringify(items));
  }, [items]);

  const api = useMemo<CartState>(() => {
    const subtotalPaise = items.reduce((s, i) => s + i.pricePaise * i.quantity, 0);
    const count = items.reduce((s, i) => s + i.quantity, 0);
    return {
      items,
      subtotalPaise,
      count,
      add: (item, qty = 1) =>
        setItems((prev) => {
          const idx = prev.findIndex((x) => x.productId === item.productId);
          if (idx >= 0) {
            const copy = [...prev];
            copy[idx] = { ...copy[idx], quantity: copy[idx].quantity + qty };
            return copy;
          }
          return [...prev, { ...item, quantity: qty }];
        }),
      remove: (id) => setItems((prev) => prev.filter((x) => x.productId !== id)),
      setQty: (id, qty) =>
        setItems((prev) =>
          prev
            .map((x) => (x.productId === id ? { ...x, quantity: Math.max(1, qty) } : x))
            .filter((x) => x.quantity > 0),
        ),
      clear: () => setItems([]),
    };
  }, [items]);

  return <CartCtx.Provider value={api}>{children}</CartCtx.Provider>;
}

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}
