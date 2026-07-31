import { useEffect, useState } from "react";
import {
  Heart,
  Menu,
  Moon,
  Phone,
  Search,
  ShoppingCart,
  Sun,
  User,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { BUSINESS } from "@/data/blend";
import { useStore } from "./store";
import { CartSheet } from "./CartSheet";
import { AccountDialog } from "./AccountDialog";
import { WishlistSheet } from "./WishlistSheet";
import logo from "@/assets/blend-logo.png";

const NAV = [
  { label: "Home", href: "#home" },
  { label: "Categories", href: "#categories" },
  { label: "Shop", href: "#shop" },
  { label: "Deals", href: "#deals" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Header({
  query,
  onQuery,
}: {
  query: string;
  onQuery: (value: string) => void;
}) {
  const { count, wishlist } = useStore();
  const [dark, setDark] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur-xl">
      <div className="hidden bg-hero-gradient text-primary-foreground md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-2 text-xs">
          <p className="truncate">
            Free delivery on orders above ₦50,000 within Ojo & Okokomaiko
          </p>
          <a href={`tel:${BUSINESS.phone}`} className="flex shrink-0 items-center gap-2">
            <Phone className="h-3.5 w-3.5" />
            {BUSINESS.phone}
          </a>
        </div>
      </div>

      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-3 px-4 py-3 lg:gap-6">
        <a href="#home" className="flex min-w-0 items-center gap-2">
          <img
            src={logo}
            alt="Blend Supermarket logo"
            width={44}
            height={44}
            className="h-10 w-10 shrink-0 object-contain"
          />
          <span className="min-w-0">
            <span className="block truncate font-display text-lg leading-tight font-extrabold text-primary">
              Blend
            </span>
            <span className="block truncate text-[0.65rem] tracking-[0.22em] text-muted-foreground uppercase">
              Supermarket
            </span>
          </span>
        </a>

        <div className="col-span-2 order-3 lg:order-none lg:col-span-1 lg:col-start-2">
          <div className="relative">
            <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={query}
              onChange={(e) => onQuery(e.target.value)}
              placeholder="Search rice, milk, detergent…"
              aria-label="Search products"
              className="h-11 rounded-full pr-10 pl-10 lg:w-[26rem]"
            />
            {query && (
              <button
                onClick={() => onQuery("")}
                aria-label="Clear search"
                className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-1 lg:col-start-3">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle dark mode"
            onClick={() => setDark((d) => !d)}
          >
            {dark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </Button>

          <WishlistSheet>
            <Button variant="ghost" size="icon" aria-label="Wishlist" className="relative">
              <Heart className="h-5 w-5" />
              {wishlist.length > 0 && <Badge value={wishlist.length} />}
            </Button>
          </WishlistSheet>

          <AccountDialog>
            <Button variant="ghost" size="icon" aria-label="Account">
              <User className="h-5 w-5" />
            </Button>
          </AccountDialog>

          <CartSheet>
            <Button variant="ghost" size="icon" aria-label="Shopping cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {count > 0 && <Badge value={count} />}
            </Button>
          </CartSheet>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Menu" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <nav className="mt-10 flex flex-col gap-1 p-4">
                {NAV.map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-lg px-3 py-3 text-base font-medium hover:bg-secondary"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>

      <nav className="mx-auto hidden max-w-7xl items-center gap-8 px-4 pb-3 text-sm font-medium lg:flex">
        {NAV.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            {item.label}
          </a>
        ))}
      </nav>
    </header>
  );
}

function Badge({ value }: { value: number }) {
  return (
    <span className="bg-gold-gradient text-gold-foreground absolute -top-0.5 -right-0.5 grid h-5 min-w-5 place-items-center rounded-full px-1 text-[0.65rem] font-bold">
      {value}
    </span>
  );
}