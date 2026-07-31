import { Heart, Plus, Star } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { naira, type Product } from "@/data/blend";
import { useStore } from "./store";
import { categoryIcon } from "./icons";

export function ProductCard({ product }: { product: Product }) {
  const { add, toggleWish, wishlist } = useStore();
  const wished = wishlist.includes(product.id);
  const Icon = categoryIcon(product.category);

  return (
    <article className="card-lift group relative flex flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-card">
      <div className="relative grid aspect-4/3 place-items-center bg-secondary/60">
        <Icon className="h-14 w-14 text-primary/70" strokeWidth={1.2} aria-hidden="true" />
        {product.tag === "deal" && (
          <span className="bg-gold-gradient text-gold-foreground absolute top-3 left-3 rounded-full px-2.5 py-1 text-[0.7rem] font-bold">
            Deal
          </span>
        )}
        {product.tag === "new" && (
          <span className="absolute top-3 left-3 rounded-full bg-primary px-2.5 py-1 text-[0.7rem] font-bold text-primary-foreground">
            New
          </span>
        )}
        <button
          onClick={() => toggleWish(product.id)}
          aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full bg-background/90 text-muted-foreground transition-colors hover:text-primary"
        >
          <Heart className={`h-4 w-4 ${wished ? "fill-current text-primary" : ""}`} />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2 p-4">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">
          {product.category}
        </p>
        <h3 className="line-clamp-2 text-sm leading-snug font-semibold">{product.name}</h3>
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="text-gold h-3.5 w-3.5 fill-current" />
          {product.rating.toFixed(1)}
        </div>
        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <div className="min-w-0">
            <p className="truncate text-lg font-bold text-primary">{naira(product.price)}</p>
            {product.oldPrice && (
              <p className="text-xs text-muted-foreground line-through">
                {naira(product.oldPrice)}
              </p>
            )}
          </div>
          <Button
            size="icon"
            className="shrink-0 rounded-full"
            aria-label={`Add ${product.name} to cart`}
            onClick={() => {
              add(product);
              toast.success(`${product.name} added to basket`);
            }}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </article>
  );
}