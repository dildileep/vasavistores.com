import { useState } from "react";
import { Megaphone, Tag, Users, Mail, MessageSquare, Bell, TrendingUp, Plus, ChevronRight } from "lucide-react";

const coupons = [
  { code: "WELCOME10", type: "10% off", used: 34, limit: 100, status: "active" },
  { code: "DIWALI25", type: "25% off", used: 0, limit: 500, status: "scheduled" },
  { code: "FLAT50", type: "₹50 off", used: 89, limit: 100, status: "expired" },
];
const campaigns = [
  { name: "Welcome Series", channel: "Email", sent: 124, opened: 68, clicks: 22, status: "active" },
  { name: "Cart Recovery", channel: "WhatsApp", sent: 47, opened: 43, clicks: 31, status: "active" },
  { name: "Product Launch", channel: "Push", sent: 340, opened: 89, clicks: 34, status: "completed" },
];

export default function AdminMarketing() {
  const [tab, setTab] = useState<"campaigns" | "coupons" | "referral">("campaigns");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Marketing</h1>
          <p className="text-muted-foreground text-sm mt-1">Campaigns, coupons, referrals, and customer engagement.</p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Campaign
        </button>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Email Opens", value: "42%", icon: Mail, trend: "+3%" },
          { label: "WhatsApp CTR", value: "67%", icon: MessageSquare, trend: "+11%" },
          { label: "Referrals", value: "28", icon: Users, trend: "+5" },
          { label: "Coupon Uses", value: "123", icon: Tag, trend: "+17" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <k.icon className="h-4 w-4 text-brand-purple mb-2" />
            <div className="text-xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
            <div className="text-xs text-green-400 mt-1">{k.trend}</div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex glass rounded-xl p-1 gap-1 w-fit">
        {(["campaigns", "coupons", "referral"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-brand-purple text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {tab === "campaigns" && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-semibold text-sm">Active Campaigns</h3>
          </div>
          <div className="divide-y divide-white/5">
            {campaigns.map((c) => (
              <div key={c.name} className="px-5 py-4 flex flex-wrap items-center gap-4 hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm">{c.name}</div>
                  <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                    {c.channel === "Email" && <Mail className="h-3 w-3" />}
                    {c.channel === "WhatsApp" && <MessageSquare className="h-3 w-3" />}
                    {c.channel === "Push" && <Bell className="h-3 w-3" />}
                    {c.channel}
                  </div>
                </div>
                <div className="flex gap-6 text-xs text-center">
                  <div><div className="font-semibold">{c.sent}</div><div className="text-muted-foreground">Sent</div></div>
                  <div><div className="font-semibold">{c.opened}</div><div className="text-muted-foreground">Opened</div></div>
                  <div><div className="font-semibold">{c.clicks}</div><div className="text-muted-foreground">Clicks</div></div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                  c.status === "active" ? "bg-green-500/10 text-green-400" :
                  c.status === "completed" ? "bg-blue-500/10 text-blue-400" :
                  "bg-white/5 text-muted-foreground"
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "coupons" && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
            <h3 className="font-semibold text-sm">Coupons</h3>
            <button className="text-xs text-brand-purple flex items-center gap-1 hover:underline">
              <Plus className="h-3 w-3" /> Add coupon
            </button>
          </div>
          <div className="divide-y divide-white/5">
            {coupons.map((c) => (
              <div key={c.code} className="px-5 py-4 flex flex-wrap items-center gap-4 hover:bg-white/2 transition-colors">
                <div className="font-mono text-sm font-bold tracking-wider bg-white/5 px-3 py-1 rounded-lg">{c.code}</div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{c.type}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">Used {c.used} / {c.limit}</div>
                </div>
                <div className="w-32 hidden md:block">
                  <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-brand-purple rounded-full" style={{ width: `${(c.used / c.limit) * 100}%` }} />
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                  c.status === "active" ? "bg-green-500/10 text-green-400" :
                  c.status === "scheduled" ? "bg-blue-500/10 text-blue-400" :
                  "bg-white/5 text-muted-foreground"
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "referral" && (
        <div className="glass rounded-2xl p-8 text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-brand-purple/10 grid place-items-center mx-auto">
            <Users className="h-8 w-8 text-brand-purple" />
          </div>
          <h3 className="font-semibold text-lg">Referral Program</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Set up a referral program to reward customers who bring new buyers. Coming soon.
          </p>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm mx-auto flex items-center gap-2">
            <Plus className="h-4 w-4" /> Configure Referral Program
          </button>
        </div>
      )}
    </div>
  );
}
