import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Star, ShieldCheck, Truck, Undo2, Zap, ShoppingCart, Check } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import ProductCard, { type ProductCardData } from "@/components/shop/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { formatINR, discountPercent } from "@/lib/format";
import { useCart } from "@/context/CartContext";

type Faq = { q: string; a: string };
type Product = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  short_description: string | null;
  long_description: string | null;
  price_paise: number;
  mrp_paise: number;
  stock: number;
  images: string[];
  features: string[];
  benefits: string[];
  specifications: Record<string, string>;
  faqs: Faq[];
  rating_avg: number;
  rating_count: number;
  meta_title: string | null;
  meta_description: string | null;
  meta_keywords: string | null;
  category_id: string | null;
};

export default function ProductDetails() {
  const { slug } = useParams<{ slug: string }>();
  const nav = useNavigate();
  const { add } = useCart();
  const [p, setP] = useState<Product | null>(null);
  const [related, setRelated] = useState<ProductCardData[]>([]);
  const [imgIdx, setImgIdx] = useState(0);
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [reviews, setReviews] = useState<any[]>([]);

  useEffect(() => {
    if (!slug) return;
    setLoading(true);
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("*")
        .eq("slug", slug)
        .maybeSingle();
      setP(data as any);
      setLoading(false);
      if (data) {
        const { data: rel } = await supabase
          .from("products")
          .select("id,name,slug,tagline,images,price_paise,mrp_paise,rating_avg,rating_count")
          .eq("is_active", true)
          .neq("id", (data as any).id)
          .limit(4);
        setRelated((rel ?? []) as any);
        const { data: rv } = await supabase
          .from("reviews")
          .select("*")
          .eq("product_id", (data as any).id)
          .eq("is_published", true)
          .order("created_at", { ascending: false })
          .limit(6);
        setReviews(rv ?? []);
      }
    })();
  }, [slug]);

  if (loading) {
    return (
      <ShopLayout>
        <div className="max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-8">
          <div className="glass rounded-3xl aspect-square animate-pulse" />
          <div className="space-y-3">
            <div className="h-8 glass rounded-lg w-3/4 animate-pulse" />
            <div className="h-4 glass rounded-lg w-1/2 animate-pulse" />
            <div className="h-24 glass rounded-lg animate-pulse" />
          </div>
        </div>
      </ShopLayout>
    );
  }

  if (!p) {
    return (
      <ShopLayout>
        <div className="max-w-3xl mx-auto px-6 py-24 text-center">
          <h1 className="text-2xl font-display">Product not found</h1>
          <Link to="/shop" className="mt-4 inline-block btn-primary rounded-full px-5 py-2">Back to shop</Link>
        </div>
      </ShopLayout>
    );
  }

  const off = discountPercent(p.mrp_paise, p.price_paise);
  const url = `https://vasavistores.lovable.app/products/${p.slug}`;
  const image = p.images?.[0];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    description: p.short_description ?? p.long_description,
    image: p.images,
    sku: p.slug,
    brand: { "@type": "Brand", name: "VasaviStores" },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: p.rating_avg,
      reviewCount: p.rating_count,
    },
    offers: {
      "@type": "Offer",
      url,
      priceCurrency: "INR",
      price: (p.price_paise / 100).toFixed(2),
      availability: p.stock > 0 ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
      itemCondition: "https://schema.org/NewCondition",
    },
  };

  const faqSchema = p.faqs?.length
    ? {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: p.faqs.map((f) => ({
          "@type": "Question",
          name: f.q,
          acceptedAnswer: { "@type": "Answer", text: f.a },
        })),
      }
    : null;

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://vasavistores.lovable.app/" },
      { "@type": "ListItem", position: 2, name: "Shop", item: "https://vasavistores.lovable.app/shop" },
      { "@type": "ListItem", position: 3, name: p.name, item: url },
    ],
  };

  function addToCart() {
    if (!p) return;
    add(
      {
        productId: p.id,
        name: p.name,
        slug: p.slug,
        image: p.images?.[0] ?? "",
        pricePaise: p.price_paise,
      },
      qty,
    );
    setAdded(true);
    setTimeout(() => setAdded(false), 1600);
  }

  function buyNow() {
    addToCart();
    nav("/checkout");
  }

  return (
    <ShopLayout>
      <Seo
        title={p.meta_title ?? `${p.name} — ${p.tagline ?? ""} | VasaviStores`}
        description={p.meta_description ?? p.short_description ?? undefined}
        keywords={p.meta_keywords ?? undefined}
        canonical={`/products/${p.slug}`}
        image={image}
        jsonLd={[productSchema, breadcrumbSchema, ...(faqSchema ? [faqSchema] : [])]}
      />

      <div className="max-w-6xl mx-auto px-4 md:px-6 pt-8 pb-24">
        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" className="text-xs text-muted-foreground mb-4">
          <Link to="/" className="hover:text-foreground">Home</Link>
          {" / "}
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          {" / "}
          <span className="text-foreground">{p.name}</span>
        </nav>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Gallery */}
          <div>
            <div className="glass rounded-3xl overflow-hidden aspect-square">
              {p.images?.[imgIdx] && (
                <img
                  src={p.images[imgIdx]}
                  alt={`${p.name} — image ${imgIdx + 1}`}
                  className="w-full h-full object-cover"
                />
              )}
            </div>
            {p.images.length > 1 && (
              <div className="mt-3 flex gap-2 overflow-x-auto">
                {p.images.map((im, i) => (
                  <button
                    key={i}
                    onClick={() => setImgIdx(i)}
                    className={`h-16 w-16 shrink-0 rounded-xl overflow-hidden border ${
                      imgIdx === i ? "border-brand-purple" : "border-white/10"
                    }`}
                  >
                    <img src={im} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div>
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <Star className="h-3.5 w-3.5 fill-yellow-400 text-yellow-400" />
              <span className="text-foreground font-medium">{p.rating_avg.toFixed(1)}</span>
              <span>({p.rating_count} reviews)</span>
              {p.stock > 0 ? (
                <span className="ml-2 text-emerald-400">In stock</span>
              ) : (
                <span className="ml-2 text-red-400">Out of stock</span>
              )}
            </div>
            <h1 className="mt-2 text-3xl md:text-4xl font-display font-semibold">{p.name}</h1>
            {p.tagline && (
              <p className="mt-1 text-lg text-muted-foreground">{p.tagline}</p>
            )}

            <div className="mt-5 flex items-baseline gap-3">
              <span className="text-3xl font-semibold">{formatINR(p.price_paise)}</span>
              {p.mrp_paise > p.price_paise && (
                <>
                  <span className="text-muted-foreground line-through">{formatINR(p.mrp_paise)}</span>
                  <span className="text-sm text-emerald-400 font-semibold">{off}% off</span>
                </>
              )}
            </div>
            <p className="text-xs text-muted-foreground mt-1">Inclusive of all taxes • Free shipping across India</p>

            {p.short_description && (
              <p className="mt-5 text-foreground/90 leading-relaxed">{p.short_description}</p>
            )}

            {/* Qty + CTA */}
            <div className="mt-6 flex flex-wrap items-center gap-3">
              <div className="glass rounded-full flex items-center">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-2 hover:bg-white/10 rounded-l-full"
                  aria-label="Decrease"
                >
                  −
                </button>
                <span className="px-4 min-w-[3ch] text-center">{qty}</span>
                <button
                  onClick={() => setQty(qty + 1)}
                  className="px-3 py-2 hover:bg-white/10 rounded-r-full"
                  aria-label="Increase"
                >
                  +
                </button>
              </div>
              <button
                onClick={addToCart}
                className="rounded-full glass hover:bg-white/10 px-5 py-3 flex items-center gap-2 text-sm font-medium"
              >
                {added ? <Check className="h-4 w-4 text-emerald-400" /> : <ShoppingCart className="h-4 w-4" />}
                {added ? "Added" : "Add to cart"}
              </button>
              <button
                onClick={buyNow}
                className="rounded-full btn-primary px-6 py-3 flex items-center gap-2 text-sm font-medium"
              >
                <Zap className="h-4 w-4" /> Buy Now
              </button>
            </div>

            {/* Trust */}
            <div className="mt-6 grid grid-cols-3 gap-2 text-xs">
              <div className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <Truck className="h-4 w-4 text-brand-cyan" /> Free Shipping
              </div>
              <div className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <ShieldCheck className="h-4 w-4 text-brand-purple" /> 1 Year Warranty
              </div>
              <div className="glass rounded-2xl p-3 flex flex-col items-center text-center gap-1">
                <Undo2 className="h-4 w-4 text-brand-blue" /> 7-Day Returns
              </div>
            </div>

            {/* Features */}
            {p.features?.length > 0 && (
              <div className="mt-6">
                <h3 className="font-semibold mb-2">Highlights</h3>
                <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm">
                  {p.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" /> {f}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Description */}
        {p.long_description && (
          <section className="mt-16 max-w-3xl">
            <h2 className="text-2xl font-display font-semibold mb-3">About this product</h2>
            <div className="text-foreground/90 whitespace-pre-line leading-relaxed">
              {p.long_description}
            </div>
          </section>
        )}

        {/* Specs */}
        {p.specifications && Object.keys(p.specifications).length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-display font-semibold mb-4">Specifications</h2>
            <div className="glass rounded-2xl divide-y divide-white/5">
              {Object.entries(p.specifications).map(([k, v]) => (
                <div key={k} className="grid grid-cols-2 px-4 py-3 text-sm">
                  <span className="text-muted-foreground">{k}</span>
                  <span className="font-medium">{String(v)}</span>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Benefits */}
        {p.benefits?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-display font-semibold mb-4">Benefits</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
              {p.benefits.map((b, i) => (
                <div key={i} className="glass rounded-2xl p-4 text-sm">
                  {b}
                </div>
              ))}
            </div>
          </section>
        )}

        {/* FAQs */}
        {p.faqs?.length > 0 && (
          <section className="mt-12">
            <h2 className="text-2xl font-display font-semibold mb-4">Frequently asked</h2>
            <div className="space-y-2">
              {p.faqs.map((f, i) => (
                <details key={i} className="glass rounded-2xl px-4 py-3 group">
                  <summary className="cursor-pointer list-none font-medium flex justify-between items-center">
                    {f.q}
                    <span className="text-muted-foreground group-open:rotate-45 transition">+</span>
                  </summary>
                  <p className="mt-2 text-sm text-muted-foreground">{f.a}</p>
                </details>
              ))}
            </div>
          </section>
        )}

        {/* Reviews */}
        <section className="mt-12">
          <h2 className="text-2xl font-display font-semibold mb-4">Customer reviews</h2>
          {reviews.length === 0 ? (
            <p className="text-muted-foreground text-sm">Be the first to review this product.</p>
          ) : (
            <div className="grid md:grid-cols-2 gap-3">
              {reviews.map((r) => (
                <div key={r.id} className="glass rounded-2xl p-4">
                  <div className="flex items-center gap-2 text-sm">
                    <div className="flex">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3.5 w-3.5 ${i < r.rating ? "fill-yellow-400 text-yellow-400" : "text-white/20"}`}
                        />
                      ))}
                    </div>
                    <span className="font-medium">{r.author_name}</span>
                    {r.verified && <span className="text-xs text-emerald-400">Verified</span>}
                  </div>
                  {r.title && <p className="mt-2 font-medium text-sm">{r.title}</p>}
                  <p className="mt-1 text-sm text-muted-foreground">{r.body}</p>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-display font-semibold mb-4">You may also like</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {related.map((r) => (
                <ProductCard key={r.id} p={r} />
              ))}
            </div>
          </section>
        )}
      </div>

      {/* Sticky mobile buy */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 backdrop-blur-xl bg-background/80 border-t border-white/10 p-3 flex gap-2">
        <div className="flex-1">
          <div className="text-xs text-muted-foreground">Price</div>
          <div className="font-semibold">{formatINR(p.price_paise)}</div>
        </div>
        <button onClick={addToCart} className="rounded-full glass px-4 py-2 text-sm">Add</button>
        <button onClick={buyNow} className="rounded-full btn-primary px-4 py-2 text-sm">Buy Now</button>
      </div>
    </ShopLayout>
  );
}
