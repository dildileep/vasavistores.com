import { useEffect, useMemo, useState } from "react";
import { Search, SlidersHorizontal } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import ProductCard, { type ProductCardData } from "@/components/shop/ProductCard";
import Seo from "@/components/shop/Seo";
import { supabase } from "@/integrations/supabase/client";

type Category = { id: string; name: string; slug: string };

export default function Shop() {
  const [products, setProducts] = useState<ProductCardData[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState<string | "all">("all");
  const [sort, setSort] = useState<"pop" | "low" | "high" | "new">("pop");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [{ data: prods }, { data: cats }] = await Promise.all([
        supabase
          .from("products")
          .select("id,name,slug,tagline,images,price_paise,mrp_paise,rating_avg,rating_count,category_id,created_at")
          .eq("is_active", true),
        supabase.from("categories").select("id,name,slug").order("sort_order"),
      ]);
      setProducts((prods ?? []) as any);
      setCategories((cats ?? []) as any);
      setLoading(false);
    })();
  }, []);

  const filtered = useMemo(() => {
    let list = products;
    if (cat !== "all") list = list.filter((p: any) => p.category_id === cat);
    if (q.trim()) {
      const s = q.toLowerCase();
      list = list.filter((p) => p.name.toLowerCase().includes(s) || (p.tagline ?? "").toLowerCase().includes(s));
    }
    list = [...list];
    if (sort === "low") list.sort((a, b) => a.price_paise - b.price_paise);
    else if (sort === "high") list.sort((a, b) => b.price_paise - a.price_paise);
    else if (sort === "new") list.sort((a: any, b: any) => (a.created_at < b.created_at ? 1 : -1));
    else list.sort((a, b) => b.rating_count - a.rating_count);
    return list;
  }, [products, q, cat, sort]);

  return (
    <ShopLayout>
      <Seo
        title="Shop — Smart products for modern businesses | VasaviStores"
        description="Browse smart, AI-powered products from VasaviStores. NFC review cards, and more coming soon."
        canonical="/shop"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "VasaviStores — Shop",
          url: "https://vasavistores.lovable.app/shop",
        }}
      />
      <section className="max-w-6xl mx-auto px-4 md:px-6 pt-10 pb-6">
        <h1 className="text-3xl md:text-4xl font-display font-semibold">Shop</h1>
        <p className="text-muted-foreground mt-1">Premium products for growing businesses.</p>

        <div className="mt-6 flex flex-wrap gap-3 items-center">
          <div className="glass rounded-full flex items-center gap-2 px-4 py-2 flex-1 min-w-[220px]">
            <Search className="h-4 w-4 text-muted-foreground" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products…"
              className="bg-transparent outline-none text-sm w-full"
            />
          </div>
          <select
            value={cat}
            onChange={(e) => setCat(e.target.value as any)}
            className="glass rounded-full px-4 py-2 text-sm bg-background/40"
          >
            <option value="all">All categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as any)}
            className="glass rounded-full px-4 py-2 text-sm bg-background/40"
          >
            <option value="pop">Popular</option>
            <option value="new">Newest</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16">
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="glass rounded-3xl aspect-[3/4] animate-pulse" />
            ))}
          </div>
        ) : filtered.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center text-muted-foreground">
            <SlidersHorizontal className="h-6 w-6 mx-auto mb-2" />
            No products match your filters.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filtered.map((p) => (
              <ProductCard key={p.id} p={p} />
            ))}
          </div>
        )}
      </section>
    </ShopLayout>
  );
}
