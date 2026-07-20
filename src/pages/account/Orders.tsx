import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Package, Loader2 } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";
import { formatINR } from "@/lib/format";

const badge: Record<string, string> = {
  pending: "bg-yellow-500/10 text-yellow-300",
  paid: "bg-emerald-500/10 text-emerald-300",
  processing: "bg-blue-500/10 text-blue-300",
  shipped: "bg-purple-500/10 text-purple-300",
  delivered: "bg-emerald-500/10 text-emerald-300",
  cancelled: "bg-red-500/10 text-red-300",
  refunded: "bg-orange-500/10 text-orange-300",
  failed: "bg-red-500/10 text-red-300",
};

export default function Orders() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [orders, setOrders] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/account/orders"); return; }
    supabase.from("orders").select("*").order("created_at", { ascending: false })
      .then(({ data }) => { setOrders(data ?? []); setFetching(false); });
  }, [user, loading, nav]);

  return (
    <ShopLayout>
      <Seo title="My Orders | VasaviStores" canonical="/account/orders" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">My Orders</h1>
        {fetching ? (
          <div className="py-20 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : orders.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center mt-6">
            <Package className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No orders yet.</p>
            <Link to="/shop" className="mt-4 inline-block btn-primary rounded-full px-5 py-2">Start shopping</Link>
          </div>
        ) : (
          <div className="mt-6 space-y-3">
            {orders.map((o) => (
              <Link key={o.id} to={`/order/success/${o.id}`} className="glass rounded-2xl p-5 flex flex-wrap gap-4 items-center hover:bg-white/[0.04]">
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()}</div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full ${badge[o.status] ?? "bg-white/10"}`}>{o.status}</span>
                <div className="font-semibold">{formatINR(o.total_paise)}</div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
