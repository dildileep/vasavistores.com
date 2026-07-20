import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { ShoppingBag, Package, MessageSquare, IndianRupee } from "lucide-react";

export default function AdminDashboard() {
  const [stats, setStats] = useState({ orders: 0, revenue: 0, products: 0, messages: 0 });
  const [recent, setRecent] = useState<any[]>([]);

  useEffect(() => {
    (async () => {
      const [ord, prod, msg] = await Promise.all([
        supabase.from("orders").select("total_paise, status", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
      ]);
      const revenue = (ord.data ?? []).filter((o: any) => ["paid","processing","shipped","delivered"].includes(o.status)).reduce((s, o: any) => s + o.total_paise, 0);
      setStats({ orders: ord.count ?? 0, revenue, products: prod.count ?? 0, messages: msg.count ?? 0 });
      const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false }).limit(5);
      setRecent(data ?? []);
    })();
  }, []);

  const cards = [
    { label: "Revenue", value: formatINR(stats.revenue), icon: IndianRupee },
    { label: "Orders", value: stats.orders, icon: ShoppingBag },
    { label: "Products", value: stats.products, icon: Package },
    { label: "Enquiries", value: stats.messages, icon: MessageSquare },
  ];

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-semibold">Dashboard</h1>
      <p className="text-muted-foreground text-sm">Overview of your VasaviStores business.</p>
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-4">
            <c.icon className="h-4 w-4 text-brand-purple" />
            <div className="mt-2 text-xs text-muted-foreground">{c.label}</div>
            <div className="text-xl font-semibold">{c.value}</div>
          </div>
        ))}
      </div>

      <h2 className="mt-8 font-semibold">Recent orders</h2>
      <div className="mt-3 glass rounded-2xl divide-y divide-white/5">
        {recent.length === 0 && <div className="p-6 text-sm text-muted-foreground">No orders yet.</div>}
        {recent.map((o) => (
          <div key={o.id} className="p-4 flex flex-wrap items-center gap-3 text-sm">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{o.order_number}</div>
              <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()} • {o.email}</div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{o.status}</span>
            <div className="font-semibold">{formatINR(o.total_paise)}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
