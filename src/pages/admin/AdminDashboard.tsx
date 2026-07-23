import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import {
  IndianRupee, ShoppingBag, Clock, CheckCircle2, Users, Repeat2,
  TrendingUp, BarChart2, XCircle, Package, AlertTriangle, Bot,
  ArrowUpRight, ArrowDownRight,
} from "lucide-react";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar,
} from "recharts";

const revenueData = [
  { day: "Mon", revenue: 12400 }, { day: "Tue", revenue: 8900 }, { day: "Wed", revenue: 22100 },
  { day: "Thu", revenue: 15600 }, { day: "Fri", revenue: 31200 }, { day: "Sat", revenue: 28900 },
  { day: "Sun", revenue: 19800 },
];
const ordersData = [
  { day: "Mon", orders: 4 }, { day: "Tue", orders: 3 }, { day: "Wed", orders: 8 },
  { day: "Thu", orders: 5 }, { day: "Fri", orders: 12 }, { day: "Sat", orders: 10 },
  { day: "Sun", orders: 7 },
];

type StatCard = {
  label: string;
  value: string | number;
  icon: React.ElementType;
  trend?: number;
  color: string;
  sub?: string;
};

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    orders: 0, revenue: 0, products: 0, messages: 0,
    pending: 0, delivered: 0, customers: 0,
  });
  const [recent, setRecent] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const [ord, prod, msg, cust] = await Promise.all([
        supabase.from("orders").select("total_paise, status", { count: "exact" }),
        supabase.from("products").select("id", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("id", { count: "exact", head: true }),
        supabase.from("profiles").select("id", { count: "exact", head: true }),
      ]);
      const orders = ord.data ?? [];
      const revenue = orders
        .filter((o: any) => ["paid", "processing", "shipped", "delivered"].includes(o.status))
        .reduce((s: number, o: any) => s + o.total_paise, 0);
      const pending = orders.filter((o: any) => o.status === "pending").length;
      const delivered = orders.filter((o: any) => o.status === "delivered").length;
      setStats({
        orders: ord.count ?? 0, revenue, products: prod.count ?? 0,
        messages: msg.count ?? 0, pending, delivered, customers: cust.count ?? 0,
      });
      const { data } = await supabase
        .from("orders").select("*").order("created_at", { ascending: false }).limit(6);
      setRecent(data ?? []);
      setLoading(false);
    })();
  }, []);

  const cards: StatCard[] = [
    { label: "Today's Revenue", value: formatINR(stats.revenue), icon: IndianRupee, trend: 12.4, color: "from-brand-blue to-brand-purple", sub: "vs yesterday" },
    { label: "Total Orders", value: stats.orders, icon: ShoppingBag, trend: 8.1, color: "from-blue-500 to-cyan-500", sub: "all time" },
    { label: "Pending Orders", value: stats.pending, icon: Clock, trend: -3.2, color: "from-amber-500 to-orange-500", sub: "need action" },
    { label: "Delivered", value: stats.delivered, icon: CheckCircle2, trend: 5.7, color: "from-green-500 to-emerald-500", sub: "fulfilled" },
    { label: "Active Customers", value: stats.customers, icon: Users, trend: 14.2, color: "from-violet-500 to-purple-500", sub: "registered" },
    { label: "Returning", value: Math.round((stats.customers || 0) * 0.34), icon: Repeat2, trend: 6.8, color: "from-pink-500 to-rose-500", sub: "~34% rate" },
    { label: "Conversion Rate", value: "3.2%", icon: TrendingUp, trend: 0.4, color: "from-teal-500 to-green-500", sub: "visitors → orders" },
    { label: "Avg Order Value", value: stats.orders > 0 ? formatINR(Math.round(stats.revenue / stats.orders)) : "₹0", icon: BarChart2, trend: 2.1, color: "from-indigo-500 to-blue-500", sub: "per order" },
    { label: "Cart Abandonment", value: "68%", icon: XCircle, trend: -1.5, color: "from-red-500 to-pink-500", sub: "industry avg 70%" },
    { label: "Total Products", value: stats.products, icon: Package, trend: 0, color: "from-slate-500 to-zinc-500", sub: "in catalog" },
    { label: "Low Inventory", value: 2, icon: AlertTriangle, trend: 0, color: "from-yellow-500 to-amber-500", sub: "< 10 units" },
    { label: "AI Tasks Done", value: 47, icon: Bot, trend: 31, color: "from-brand-purple to-violet-600", sub: "this week" },
  ];

  const statusColor: Record<string, string> = {
    pending: "text-amber-400 bg-amber-400/10",
    paid: "text-green-400 bg-green-400/10",
    processing: "text-blue-400 bg-blue-400/10",
    shipped: "text-cyan-400 bg-cyan-400/10",
    delivered: "text-emerald-400 bg-emerald-400/10",
    cancelled: "text-red-400 bg-red-400/10",
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Dashboard</h1>
        <p className="text-muted-foreground text-sm mt-1">AI-powered overview of your VasaviStores business.</p>
      </div>

      {/* Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3">
        {cards.map((c) => (
          <div key={c.label} className="glass rounded-2xl p-4 space-y-3 hover:bg-white/5 transition-colors">
            <div className="flex items-start justify-between">
              <div className={`h-9 w-9 rounded-xl bg-gradient-to-br ${c.color} grid place-items-center`}>
                <c.icon className="h-4 w-4 text-white" />
              </div>
              {c.trend !== undefined && c.trend !== 0 && (
                <span className={`text-xs flex items-center gap-0.5 font-medium ${c.trend > 0 ? "text-green-400" : "text-red-400"}`}>
                  {c.trend > 0 ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
                  {Math.abs(c.trend)}%
                </span>
              )}
            </div>
            <div>
              <div className="text-xl font-bold leading-none">{c.value}</div>
              <div className="text-xs text-muted-foreground mt-1">{c.label}</div>
              {c.sub && <div className="text-[11px] text-muted-foreground/60 mt-0.5">{c.sub}</div>}
            </div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid md:grid-cols-2 gap-4">
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Revenue (7 days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={revenueData}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100).toFixed(0)}`} />
              <Tooltip
                contentStyle={{ background: "rgba(10,10,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
                formatter={(v: number) => [`₹${(v / 100).toFixed(0)}`, "Revenue"]}
              />
              <Area type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-4">Orders (7 days)</h3>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={ordersData}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="day" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: "rgba(10,10,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }}
              />
              <Bar dataKey="orders" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Recent Orders */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h2 className="font-semibold text-sm">Recent Orders</h2>
          <a href="/admin/orders" className="text-xs text-brand-purple hover:underline">View all →</a>
        </div>
        {loading ? (
          <div className="p-8 text-center text-sm text-muted-foreground">Loading…</div>
        ) : recent.length === 0 ? (
          <div className="p-8 text-center text-sm text-muted-foreground">No orders yet.</div>
        ) : (
          <div className="divide-y divide-white/5">
            {recent.map((o) => (
              <div key={o.id} className="px-5 py-3.5 flex flex-wrap items-center gap-3 text-sm hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-xs">{o.order_number}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {new Date(o.created_at).toLocaleDateString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                    {o.email && ` • ${o.email}`}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusColor[o.status] ?? "text-muted-foreground bg-white/5"}`}>
                  {o.status}
                </span>
                <div className="font-semibold text-sm tabular-nums">{formatINR(o.total_paise)}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
