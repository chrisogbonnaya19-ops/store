import type { ReactNode } from "react";
import { Heart } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { PRODUCTS, naira } from "@/data/blend";
import { useStore } from "./store";
import { categoryIcon } from "./icons";

export function WishlistSheet({ children }: { children: ReactNode }) {
  const { wishlist, toggleWish, add } = useStore();
  const items = PRODUCTS.filter((p) => wishlist.includes(p.id));

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="w-full sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Wishlist</SheetTitle>
          <SheetDescription>
            {items.length === 0
              ? "Tap the heart on any product to save it for later."
              : `${items.length} saved item(s).`}
          </SheetDescription>
        </SheetHeader>
        <div className="space-y-3 overflow-y-auto px-4">
          {items.map((p) => (
            <div
              key={p.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                {(() => { const I = categoryIcon(p.category); return <I className="h-5 w-5" />; })()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{p.name}</p>
                <p className="text-sm text-primary">{naira(p.price)}</p>
              </div>
              <Button size="sm" onClick={() => add(p)}>
                Add
              </Button>
              <Button
                size="icon"
                variant="ghost"
                aria-label="Remove from wishlist"
                onClick={() => toggleWish(p.id)}
              >
                <Heart className="h-4 w-4 fill-current text-primary" />
              </Button>
            </div>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
}