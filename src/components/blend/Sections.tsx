import { useMemo, useState } from "react";
import {
  Clock,
  Mail,
  MapPin,
  Phone,
  Quote,
  ShieldCheck,
  Star,
  Truck,
  Wallet,
} from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BUSINESS, CATEGORIES, FAQS, PRODUCTS, REVIEWS } from "@/data/blend";
import { ProductCard } from "./ProductCard";
import hero from "@/assets/hero-shopper.jpg";
import logo from "@/assets/blend-logo.png";

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-14 lg:grid-cols-2 lg:py-20">
        <div className="reveal space-y-6">
          <span className="inline-flex items-center gap-2 rounded-full bg-secondary px-4 py-1.5 text-xs font-semibold text-primary">
            <Truck className="h-3.5 w-3.5" /> Same-day delivery across Ojo & Okokomaiko
          </span>
          <h1 className="text-4xl leading-[1.05] font-extrabold sm:text-5xl lg:text-6xl">
            Fresh groceries, <span className="text-primary">honest prices</span> — blended
            for your family.
          </h1>
          <p className="max-w-lg text-base text-muted-foreground sm:text-lg">
            Shop everything from rice and frozen foods to toiletries and electronics, all
            priced in Naira and delivered to your door in Lagos.
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg" className="rounded-full px-8">
              <a href="#shop">Shop Now</a>
            </Button>
            <Button asChild size="lg" variant="outline" className="rounded-full px-8">
              <a href="#deals">Today's Deals</a>
            </Button>
          </div>
          <dl className="grid max-w-md grid-cols-3 gap-4 pt-4">
            {[
              ["12k+", "Happy shoppers"],
              ["1,200+", "Products in stock"],
              ["2 hrs", "Average delivery"],
            ].map(([value, label]) => (
              <div key={label}>
                <dt className="text-2xl font-extrabold text-primary">{value}</dt>
                <dd className="text-xs text-muted-foreground">{label}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative">
          <div className="bg-gold-gradient absolute -top-6 -right-4 h-40 w-40 rounded-full opacity-25 blur-3xl" />
          <img
            src={hero}
            alt="Shopper with a full cart of fresh produce at Blend Supermarket"
            width={1408}
            height={1104}
            className="relative w-full rounded-3xl object-cover shadow-card"
          />
          <div className="absolute bottom-4 left-4 flex items-center gap-3 rounded-2xl border border-border bg-background/95 p-3 shadow-card backdrop-blur">
            <img src={logo} alt="" width={40} height={40} className="h-10 w-10" loading="lazy" />
            <div>
              <p className="text-sm font-bold">₦ Everyday low prices</p>
              <p className="text-xs text-muted-foreground">Verified naira pricing, no surprises</p>
            </div>
          </div>
        </div>
      </div>

      <div className="border-y border-border bg-secondary/40">
        <div className="mx-auto grid max-w-7xl gap-4 px-4 py-6 sm:grid-cols-2 lg:grid-cols-4">
          {[
            [Truck, "Fast Lagos delivery", "Same-day within Ojo axis"],
            [ShieldCheck, "Secure checkout", "Encrypted card & transfer"],
            [Wallet, "Naira pricing", "Bulk and wholesale rates"],
            [Clock, "Open 7 days", "7:00am - 9:00pm daily"],
          ].map(([Icon, title, sub]) => {
            const I = Icon as typeof Truck;
            return (
              <div key={title as string} className="flex items-center gap-3">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
                  <I className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">{title as string}</p>
                  <p className="truncate text-xs text-muted-foreground">{sub as string}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function SectionHead({
  eyebrow,
  title,
  sub,
}: {
  eyebrow: string;
  title: string;
  sub?: string;
}) {
  return (
    <div className="mb-8 max-w-2xl">
      <p className="text-xs font-bold tracking-[0.2em] text-primary uppercase">{eyebrow}</p>
      <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">{title}</h2>
      {sub && <p className="mt-3 text-muted-foreground">{sub}</p>}
    </div>
  );
}

export function Categories({ onPick }: { onPick: (category: string) => void }) {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-4 py-16">
      <SectionHead
        eyebrow="Featured categories"
        title="Everything your home needs"
        sub="Eight carefully stocked aisles, from fresh groceries to home electronics."
      />
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
        {CATEGORIES.map((c) => (
          <button
            key={c.name}
            onClick={() => onPick(c.name)}
            className="card-lift flex flex-col items-start gap-2 rounded-2xl border border-border bg-card p-5 text-left shadow-card"
          >
            <span className="grid h-12 w-12 place-items-center rounded-xl bg-secondary text-2xl">
              {c.emoji}
            </span>
            <span className="font-semibold">{c.name}</span>
            <span className="text-xs text-muted-foreground">{c.items} products</span>
          </button>
        ))}
      </div>
    </section>
  );
}

export function Shop({
  query,
  category,
  onCategory,
}: {
  query: string;
  category: string;
  onCategory: (value: string) => void;
}) {
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        (category === "All" || p.category === category) &&
        (q === "" || p.name.toLowerCase().includes(q) || p.category.toLowerCase().includes(q)),
    );
  }, [query, category]);

  const tabs = ["All", ...CATEGORIES.map((c) => c.name)];

  return (
    <section id="shop" className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="Featured products"
          title="Popular this week in Lagos"
          sub="Prices shown in Nigerian Naira, updated daily."
        />
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {tabs.map((t) => (
            <button
              key={t}
              onClick={() => onCategory(t)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                category === t
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:text-primary"
              }`}
            >
              {t}
            </button>
          ))}
        </div>
        {filtered.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-border p-10 text-center text-muted-foreground">
            No products match your search. Try "rice", "milk" or "detergent".
          </p>
        ) : (
          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export function Deals() {
  const deals = PRODUCTS.filter((p) => p.tag === "deal");
  return (
    <section id="deals" className="mx-auto max-w-7xl px-4 py-16">
      <div className="bg-hero-gradient mb-8 flex flex-wrap items-center justify-between gap-4 rounded-3xl p-8 text-primary-foreground">
        <div>
          <p className="text-xs font-bold tracking-[0.2em] uppercase opacity-80">
            Today's deals
          </p>
          <h2 className="mt-2 text-3xl font-extrabold">Save up to 15% before 9pm</h2>
        </div>
        <span className="bg-gold-gradient text-gold-foreground rounded-full px-5 py-2 text-sm font-bold">
          Ends midnight
        </span>
      </div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {deals.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}

export function NewArrivals() {
  const items = PRODUCTS.filter((p) => p.tag === "new");
  return (
    <section className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-7xl px-4">
        <SectionHead
          eyebrow="New arrivals"
          title="Just landed on our shelves"
          sub="Freshly restocked essentials and new brands we think you'll love."
        />
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {items.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function Reviews() {
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <SectionHead
        eyebrow="Customer reviews"
        title="Trusted by families across Lagos"
      />
      <div className="grid gap-5 md:grid-cols-3">
        {REVIEWS.map((r) => (
          <figure
            key={r.name}
            className="card-lift rounded-2xl border border-border bg-card p-6 shadow-card"
          >
            <Quote className="h-6 w-6 text-primary/40" />
            <blockquote className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {r.text}
            </blockquote>
            <div className="mt-4 flex items-center gap-1">
              {Array.from({ length: r.rating }).map((_, i) => (
                <Star key={i} className="text-gold h-4 w-4 fill-current" />
              ))}
            </div>
            <figcaption className="mt-3">
              <p className="text-sm font-semibold">{r.name}</p>
              <p className="text-xs text-muted-foreground">{r.location}</p>
            </figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="bg-secondary/30 py-16">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 lg:grid-cols-2">
        <div>
          <SectionHead
            eyebrow="About us"
            title="A neighbourhood supermarket, built for modern Nigeria"
          />
          <div className="space-y-4 text-muted-foreground">
            <p>
              Blend Supermarket started on Victor Anoje Street in Igboelerin with one
              promise: quality groceries at prices families can plan around. Today we
              serve thousands of homes across Ojo, Okokomaiko, Alaba and greater Lagos,
              both in-store and online.
            </p>
            <p>
              Every item on our shelves is sourced from trusted distributors, checked for
              freshness daily, and priced transparently in Naira. Our team packs each
              order by hand and delivers it with the same care we'd give our own families.
            </p>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
            {[
              ["2018", "Founded in Lagos"],
              ["8", "Product categories"],
              ["98%", "On-time delivery"],
            ].map(([v, l]) => (
              <div key={l} className="rounded-2xl border border-border bg-card p-4">
                <p className="text-2xl font-extrabold text-primary">{v}</p>
                <p className="text-xs text-muted-foreground">{l}</p>
              </div>
            ))}
          </div>
        </div>
        <img
          src={hero}
          alt="Inside Blend Supermarket's fresh produce aisle"
          width={1408}
          height={1104}
          loading="lazy"
          className="w-full rounded-3xl object-cover shadow-card"
        />
      </div>
    </section>
  );
}

export function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-7xl px-4 py-16">
      <SectionHead
        eyebrow="Contact"
        title="Visit us or send a message"
        sub="We reply to every enquiry within one business day."
      />
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <ContactRow icon={Phone} label="Phone" value={BUSINESS.phone} href={`tel:${BUSINESS.phone}`} />
          <ContactRow icon={Mail} label="Email" value={BUSINESS.email} href={`mailto:${BUSINESS.email}`} />
          <ContactRow icon={MapPin} label="Address" value={BUSINESS.address} />
          <ContactRow icon={Clock} label="Opening hours" value={BUSINESS.hours} />
          <div className="overflow-hidden rounded-2xl border border-border shadow-card">
            <iframe
              title="Blend Supermarket location on Google Maps"
              src="https://www.google.com/maps?q=Igboelerin%20Okokomaiko%20Ojo%20Lagos&output=embed"
              width="100%"
              height="300"
              loading="lazy"
              className="block border-0"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
        <ContactForm />
      </div>
    </section>
  );
}

function ContactRow({
  icon: Icon,
  label,
  value,
  href,
}: {
  icon: typeof Phone;
  label: string;
  value: string;
  href?: string;
}) {
  const content = (
    <div className="flex items-start gap-3 rounded-2xl border border-border bg-card p-4 shadow-card">
      <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div className="min-w-0">
        <p className="text-xs tracking-wide text-muted-foreground uppercase">{label}</p>
        <p className="text-sm font-medium">{value}</p>
      </div>
    </div>
  );
  return href ? <a href={href}>{content}</a> : content;
}

function ContactForm() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      toast.error("Please fill in your name, email and message.");
      return;
    }
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      toast.error("Please enter a valid email address.");
      return;
    }
    toast.success("Message sent", { description: "Our team will reply shortly." });
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <form
      onSubmit={submit}
      className="space-y-4 rounded-2xl border border-border bg-card p-6 shadow-card"
    >
      <div className="space-y-1.5">
        <Label htmlFor="c-name">Full name</Label>
        <Input
          id="c-name"
          maxLength={100}
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          placeholder="Your name"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-email">Email</Label>
        <Input
          id="c-email"
          type="email"
          maxLength={255}
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
          placeholder="you@example.com"
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="c-message">Message</Label>
        <Textarea
          id="c-message"
          rows={6}
          maxLength={1000}
          value={form.message}
          onChange={(e) => setForm({ ...form, message: e.target.value })}
          placeholder="How can we help?"
        />
      </div>
      <Button type="submit" size="lg" className="w-full">
        Send message
      </Button>
    </form>
  );
}

export function Faq() {
  return (
    <section id="faq" className="bg-secondary/30 py-16">
      <div className="mx-auto max-w-3xl px-4">
        <SectionHead eyebrow="FAQ" title="Questions, answered" />
        <Accordion type="single" collapsible className="w-full">
          {FAQS.map((f, i) => (
            <AccordionItem key={f.q} value={`item-${i}`}>
              <AccordionTrigger className="text-left">{f.q}</AccordionTrigger>
              <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

export function Newsletter() {
  const [email, setEmail] = useState("");
  return (
    <section className="mx-auto max-w-7xl px-4 py-16">
      <div className="bg-hero-gradient rounded-3xl px-6 py-12 text-center text-primary-foreground">
        <h2 className="text-3xl font-extrabold">Get weekly deals in your inbox</h2>
        <p className="mx-auto mt-3 max-w-xl text-sm opacity-90">
          Join our list for price drops, restock alerts and members-only naira discounts.
        </p>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email.trim())) {
              toast.error("Enter a valid email address.");
              return;
            }
            toast.success("You're subscribed!");
            setEmail("");
          }}
          className="mx-auto mt-6 flex max-w-md flex-col gap-3 sm:flex-row"
        >
          <Input
            type="email"
            maxLength={255}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            aria-label="Email address"
            className="h-12 rounded-full border-0 bg-background text-foreground"
          />
          <Button
            type="submit"
            size="lg"
            variant="secondary"
            className="h-12 rounded-full px-8"
          >
            Subscribe
          </Button>
        </form>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto grid max-w-7xl gap-8 px-4 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2">
            <img src={logo} alt="" width={40} height={40} loading="lazy" className="h-10 w-10" />
            <span className="font-display text-lg font-extrabold text-primary">
              Blend Supermarket
            </span>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Fresh groceries and household essentials delivered across Lagos, priced in
            Naira.
          </p>
        </div>
        <div>
          <h3 className="text-sm font-bold">Shop</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            {CATEGORIES.slice(0, 5).map((c) => (
              <li key={c.name}>
                <a href="#shop" className="hover:text-primary">
                  {c.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold">Company</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>
              <a href="#about" className="hover:text-primary">
                About us
              </a>
            </li>
            <li>
              <a href="#faq" className="hover:text-primary">
                FAQ
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-primary">
                Contact
              </a>
            </li>
            <li>
              <a href="#deals" className="hover:text-primary">
                Today's deals
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-sm font-bold">Get in touch</h3>
          <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
            <li>{BUSINESS.address}</li>
            <li>
              <a href={`tel:${BUSINESS.phone}`} className="hover:text-primary">
                {BUSINESS.phone}
              </a>
            </li>
            <li>
              <a href={`mailto:${BUSINESS.email}`} className="hover:text-primary">
                {BUSINESS.email}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Blend Supermarket. All rights reserved.
      </div>
    </footer>
  );
}

export function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${BUSINESS.phoneIntl}?text=${encodeURIComponent(
        "Hello Blend Supermarket, I'd like to place an order.",
      )}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed right-5 bottom-5 z-50 grid h-14 w-14 place-items-center rounded-full bg-primary text-primary-foreground shadow-lift transition-transform hover:scale-110"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.22 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.28.17-1.41-.07-.13-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.79-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.38 9.38 0 0 1-1.44-5.01c0-5.18 4.22-9.4 9.42-9.4a9.34 9.34 0 0 1 6.65 2.76 9.32 9.32 0 0 1 2.75 6.65c0 5.18-4.22 9.41-9.41 9.41M20.52 3.48A11.77 11.77 0 0 0 12.05 0C5.5 0 .18 5.32.17 11.86c0 2.09.55 4.13 1.59 5.93L.07 24l6.35-1.66a11.85 11.85 0 0 0 5.67 1.44h.01c6.54 0 11.86-5.32 11.87-11.86 0-3.17-1.24-6.15-3.48-8.39" />
      </svg>
    </a>
  );
}