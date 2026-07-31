import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/blend/Header";
import { StoreProvider } from "@/components/blend/store";
import {
  About,
  Categories,
  Contact,
  Deals,
  Faq,
  Footer,
  Hero,
  Newsletter,
  NewArrivals,
  Reviews,
  Shop,
  WhatsAppButton,
} from "@/components/blend/Sections";

const TITLE = "Blend Supermarket | Online Grocery Shopping in Lagos";
const DESCRIPTION =
  "Shop groceries, beverages, frozen foods, toiletries and more at Blend Supermarket, Okokomaiko Lagos. Naira prices, secure checkout and same-day delivery.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");

  const pickCategory = (value: string) => {
    setCategory(value);
    document.getElementById("shop")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <StoreProvider>
      <div className="min-h-screen bg-background">
        <Header query={query} onQuery={setQuery} />
        <main>
          <Hero />
          <Categories onPick={pickCategory} />
          <Shop query={query} category={category} onCategory={setCategory} />
          <Deals />
          <NewArrivals />
          <Reviews />
          <About />
          <Contact />
          <Faq />
          <Newsletter />
        </main>
        <Footer />
        <WhatsAppButton />
      </div>
    </StoreProvider>
  );
}
