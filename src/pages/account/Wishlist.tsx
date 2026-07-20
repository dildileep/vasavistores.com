import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Heart, Loader2 } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import ProductCard from "@/components/shop/ProductCard";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Wishlist() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [items, setItems] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/account/wishlist"); return; }
    (async () => {
      const { data } = await supabase.from("wishlists").select("product_id, products(*)").eq("user_id", user.id);
      setItems((data ?? []).map((w: any) => w.products).filter(Boolean));
      setFetching(false);
    })();
  }, [user, loading, nav]);

  return (
    <ShopLayout>
      <Seo title="My Wishlist | VasaviStores" canonical="/account/wishlist" />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">Wishlist</h1>
        {fetching ? (
          <div className="py-20 grid place-items-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div>
        ) : items.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center mt-6">
            <Heart className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Your wishlist is empty.</p>
            <Link to="/shop" className="mt-4 inline-block btn-primary rounded-full px-5 py-2">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {items.map((p: any) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
