import { useState, type ReactNode } from "react";
import { Minus, Plus, ShieldCheck, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { naira } from "@/data/blend";
import { useStore } from "./store";
import { categoryIcon } from "./icons";

export function CartSheet({ children }: { children: ReactNode }) {
  const { cart, total, setQty, remove, clear } = useStore();
  const [open, setOpen] = useState(false);
  const delivery = total > 50000 || total === 0 ? 0 : 2500;

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent side="right" className="flex w-full flex-col sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Your basket</SheetTitle>
          <SheetDescription>
            {cart.length === 0
              ? "Your basket is empty — start with today's deals."
              : `${cart.length} item type(s) ready for checkout.`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex-1 space-y-3 overflow-y-auto px-4">
          {cart.map((line) => (
            <div
              key={line.product.id}
              className="flex items-center gap-3 rounded-xl border border-border bg-card p-3"
            >
              <span className="grid h-12 w-12 shrink-0 place-items-center rounded-lg bg-secondary text-primary">
                {(() => { const I = categoryIcon(line.product.category); return <I className="h-5 w-5" />; })()}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-semibold">{line.product.name}</p>
                <p className="text-sm text-primary">{naira(line.product.price)}</p>
              </div>
              <div className="flex shrink-0 items-center gap-1">
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  aria-label="Decrease quantity"
                  onClick={() => setQty(line.product.id, line.qty - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="w-6 text-center text-sm font-semibold">{line.qty}</span>
                <Button
                  size="icon"
                  variant="outline"
                  className="h-7 w-7"
                  aria-label="Increase quantity"
                  onClick={() => setQty(line.product.id, line.qty + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-7 w-7"
                  aria-label="Remove item"
                  onClick={() => remove(line.product.id)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="space-y-3 border-t border-border p-4">
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Subtotal</span>
            <span>{naira(total)}</span>
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>Delivery</span>
            <span>{delivery === 0 ? "Free" : naira(delivery)}</span>
          </div>
          <div className="flex justify-between text-base font-bold">
            <span>Total</span>
            <span className="text-primary">{naira(total + delivery)}</span>
          </div>
          <Button
            className="w-full"
            size="lg"
            disabled={cart.length === 0}
            onClick={() => {
              toast.success("Order placed securely", {
                description: "Tracking ID BLND-2481 sent to your phone and email.",
              });
              clear();
              setOpen(false);
            }}
          >
            <ShieldCheck className="mr-2 h-4 w-4" /> Secure checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}