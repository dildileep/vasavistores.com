import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, FunnelChart, Funnel, LabelList,
} from "recharts";
import { TrendingUp, Users, Eye, MousePointerClick, ShoppingCart, AlertCircle } from "lucide-react";

const revenueData = [
  { month: "Jan", revenue: 84000, orders: 18 }, { month: "Feb", revenue: 112000, orders: 24 },
  { month: "Mar", revenue: 98000, orders: 21 }, { month: "Apr", revenue: 143000, orders: 31 },
  { month: "May", revenue: 189000, orders: 41 }, { month: "Jun", revenue: 221000, orders: 48 },
  { month: "Jul", revenue: 198000, orders: 43 },
];
const trafficData = [
  { name: "Google Search", value: 42, color: "#4285f4" },
  { name: "Direct", value: 26, color: "#8b5cf6" },
  { name: "Social Media", value: 18, color: "#ec4899" },
  { name: "WhatsApp", value: 9, color: "#25d366" },
  { name: "Referral", value: 5, color: "#f59e0b" },
];
const topProducts = [
  { name: "TapReview AI NFC Card", revenue: 312000, orders: 624 },
  { name: "Business Card Bundle", revenue: 89000, orders: 89 },
  { name: "NFC Sticker Pack", revenue: 54000, orders: 180 },
];
const funnelData = [
  { name: "Visitors", value: 10000, fill: "#6366f1" },
  { name: "Product Views", value: 4200, fill: "#8b5cf6" },
  { name: "Add to Cart", value: 1100, fill: "#a855f7" },
  { name: "Checkout", value: 480, fill: "#c084fc" },
  { name: "Orders", value: 320, fill: "#e879f9" },
];
const aiAlerts = [
  { type: "warning", msg: "Stock for TapReview NFC Card below 15 units — reorder soon." },
  { type: "info", msg: "Friday 6–9 PM is your highest-traffic window. Schedule campaigns then." },
  { type: "success", msg: "Conversion rate up 0.4% this week — keep the current checkout flow." },
  { type: "warning", msg: "3 cart abandonments in the last hour — trigger WhatsApp recovery." },
];

export default function AdminAnalytics() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Advanced Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Full-funnel insights powered by real store data.</p>
      </div>

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Monthly Visitors", value: "14,820", icon: Eye, trend: "+18%" },
          { label: "Sessions", value: "21,340", icon: Users, trend: "+12%" },
          { label: "Bounce Rate", value: "41.2%", icon: MousePointerClick, trend: "-3.1%" },
          { label: "Avg Session", value: "3m 42s", icon: TrendingUp, trend: "+0:22" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4 space-y-2">
            <k.icon className="h-4 w-4 text-brand-purple" />
            <div className="text-xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground">{k.label}</div>
            <div className="text-xs text-green-400">{k.trend}</div>
          </div>
        ))}
      </div>

      {/* Revenue trend */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold mb-4">Revenue & Orders Trend</h3>
        <ResponsiveContainer width="100%" height={220}>
          <AreaChart data={revenueData}>
            <defs>
              <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
            <XAxis dataKey="month" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <YAxis yAxisId="left" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 100).toFixed(0)}`} />
            <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 11, fill: "#888" }} axisLine={false} tickLine={false} />
            <Tooltip contentStyle={{ background: "rgba(10,10,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} />
            <Area yAxisId="left" type="monotone" dataKey="revenue" stroke="#6366f1" strokeWidth={2} fill="url(#rev)" />
            <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#ec4899" strokeWidth={2} dot={false} />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {/* Traffic Sources */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Traffic Sources</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={trafficData} cx="50%" cy="50%" innerRadius={55} outerRadius={85} paddingAngle={3} dataKey="value">
                {trafficData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: "rgba(10,10,20,0.9)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 12, fontSize: 12 }} formatter={(v) => [`${v}%`]} />
              <Legend iconSize={8} wrapperStyle={{ fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Conversion Funnel */}
        <div className="glass rounded-2xl p-5">
          <h3 className="font-semibold mb-4">Conversion Funnel</h3>
          <div className="space-y-2 mt-2">
            {funnelData.map((f, i) => {
              const pct = Math.round((f.value / funnelData[0].value) * 100);
              return (
                <div key={f.name} className="space-y-1">
                  <div className="flex justify-between text-xs">
                    <span className="text-muted-foreground">{f.name}</span>
                    <span className="font-medium">{f.value.toLocaleString()} <span className="text-muted-foreground">({pct}%)</span></span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full rounded-full" style={{ width: `${pct}%`, background: f.fill }} />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Top Products */}
      <div className="glass rounded-2xl p-5">
        <h3 className="font-semibold mb-4">Top Products</h3>
        <div className="space-y-3">
          {topProducts.map((p, i) => (
            <div key={p.name} className="flex items-center gap-4 text-sm">
              <span className="text-muted-foreground w-4 text-xs">#{i + 1}</span>
              <div className="flex-1 min-w-0">
                <div className="font-medium truncate">{p.name}</div>
                <div className="text-xs text-muted-foreground">{p.orders} orders</div>
              </div>
              <div className="font-semibold tabular-nums">₹{(p.revenue / 100).toFixed(0)}</div>
            </div>
          ))}
        </div>
      </div>

      {/* AI Alerts */}
      <div className="glass rounded-2xl p-5">
        <div className="flex items-center gap-2 mb-4">
          <AlertCircle className="h-4 w-4 text-brand-purple" />
          <h3 className="font-semibold">AI Alerts</h3>
        </div>
        <div className="space-y-2">
          {aiAlerts.map((a, i) => (
            <div key={i} className={`flex items-start gap-3 p-3 rounded-xl text-sm ${
              a.type === "warning" ? "bg-amber-500/10 text-amber-300" :
              a.type === "success" ? "bg-green-500/10 text-green-300" :
              "bg-blue-500/10 text-blue-300"
            }`}>
              <AlertCircle className="h-4 w-4 mt-0.5 shrink-0" />
              {a.msg}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
