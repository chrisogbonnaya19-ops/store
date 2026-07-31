import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import type { Product } from "@/data/blend";

type CartLine = { product: Product; qty: number };

type StoreValue = {
  cart: CartLine[];
  wishlist: string[];
  count: number;
  total: number;
  add: (product: Product) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
  toggleWish: (id: string) => void;
};

const StoreContext = createContext<StoreValue | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartLine[]>([]);
  const [wishlist, setWishlist] = useState<string[]>([]);

  const add = useCallback((product: Product) => {
    setCart((prev) => {
      const found = prev.find((l) => l.product.id === product.id);
      if (found) {
        return prev.map((l) =>
          l.product.id === product.id ? { ...l, qty: l.qty + 1 } : l,
        );
      }
      return [...prev, { product, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id: string, qty: number) => {
    setCart((prev) =>
      qty <= 0
        ? prev.filter((l) => l.product.id !== id)
        : prev.map((l) => (l.product.id === id ? { ...l, qty } : l)),
    );
  }, []);

  const remove = useCallback(
    (id: string) => setCart((prev) => prev.filter((l) => l.product.id !== id)),
    [],
  );

  const clear = useCallback(() => setCart([]), []);

  const toggleWish = useCallback(
    (id: string) =>
      setWishlist((prev) =>
        prev.includes(id) ? prev.filter((w) => w !== id) : [...prev, id],
      ),
    [],
  );

  const value = useMemo<StoreValue>(() => {
    const count = cart.reduce((n, l) => n + l.qty, 0);
    const total = cart.reduce((n, l) => n + l.qty * l.product.price, 0);
    return { cart, wishlist, count, total, add, setQty, remove, clear, toggleWish };
  }, [cart, wishlist, add, setQty, remove, clear, toggleWish]);

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore() {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used inside StoreProvider");
  return ctx;
}