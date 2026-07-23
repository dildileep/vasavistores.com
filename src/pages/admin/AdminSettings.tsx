import { useState } from "react";
import {
  Store, CreditCard, Truck, Search, Mail, MessageSquare, Bot, Key, Users, Save, Eye, EyeOff,
} from "lucide-react";

const settingsTabs = [
  { id: "store", label: "Store", icon: Store },
  { id: "payment", label: "Payment", icon: CreditCard },
  { id: "shipping", label: "Shipping", icon: Truck },
  { id: "seo", label: "SEO", icon: Search },
  { id: "email", label: "Email", icon: Mail },
  { id: "whatsapp", label: "WhatsApp", icon: MessageSquare },
  { id: "ai", label: "AI", icon: Bot },
  { id: "apikeys", label: "API Keys", icon: Key },
  { id: "users", label: "Users", icon: Users },
];

function Field({ label, placeholder, type = "text", secret }: { label: string; placeholder: string; type?: string; secret?: boolean }) {
  const [show, setShow] = useState(false);
  return (
    <div className="space-y-1.5">
      <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">{label}</label>
      <div className="relative">
        <input
          type={secret && !show ? "password" : type}
          placeholder={placeholder}
          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-purple/50 transition-colors placeholder:text-muted-foreground/50"
        />
        {secret && (
          <button
            type="button"
            onClick={() => setShow((v) => !v)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
          >
            {show ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        )}
      </div>
    </div>
  );
}

const tabContent: Record<string, React.ReactNode> = {
  store: (
    <div className="space-y-4">
      <Field label="Store Name" placeholder="VasaviStores" />
      <Field label="Store Email" placeholder="hello@vasavistores.com" />
      <Field label="Store Phone" placeholder="+91 98765 43210" />
      <Field label="Store Address" placeholder="123 Main St, Mumbai, Maharashtra 400001" />
      <Field label="GST Number" placeholder="29AABCT1332L1Z5" />
      <Field label="Currency" placeholder="INR (₹)" />
    </div>
  ),
  payment: (
    <div className="space-y-4">
      <Field label="Razorpay Key ID" placeholder="rzp_live_xxxxxxxxxxxx" secret />
      <Field label="Razorpay Key Secret" placeholder="••••••••••••••••••" secret />
      <div className="flex items-center justify-between p-4 glass rounded-xl">
        <div>
          <div className="text-sm font-medium">Cash on Delivery</div>
          <div className="text-xs text-muted-foreground mt-0.5">Allow COD payments</div>
        </div>
        <div className="h-6 w-11 bg-brand-purple rounded-full relative cursor-pointer">
          <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
        </div>
      </div>
    </div>
  ),
  shipping: (
    <div className="space-y-4">
      <Field label="Shiprocket Email" placeholder="you@vasavistores.com" />
      <Field label="Shiprocket Password" placeholder="••••••••••••••••" secret />
      <Field label="Default Courier" placeholder="Auto-select (cheapest)" />
      <Field label="Warehouse Pincode" placeholder="400001" />
      <Field label="Estimated Delivery" placeholder="3-5 business days" />
    </div>
  ),
  seo: (
    <div className="space-y-4">
      <Field label="Site Title" placeholder="VasaviStores — AI NFC Business Cards India" />
      <Field label="Meta Description" placeholder="Buy smart NFC business cards…" />
      <Field label="Google Analytics ID" placeholder="G-XXXXXXXXXX" />
      <Field label="Google Search Console" placeholder="Verification code" />
      <Field label="Facebook Pixel ID" placeholder="123456789012345" />
    </div>
  ),
  email: (
    <div className="space-y-4">
      <Field label="SMTP Host" placeholder="smtp.gmail.com" />
      <Field label="SMTP Port" placeholder="587" />
      <Field label="SMTP User" placeholder="noreply@vasavistores.com" />
      <Field label="SMTP Password" placeholder="••••••••••" secret />
      <Field label="From Name" placeholder="VasaviStores" />
    </div>
  ),
  whatsapp: (
    <div className="space-y-4">
      <Field label="WhatsApp Business Number" placeholder="+91 98765 43210" />
      <Field label="Meta API Token" placeholder="EAAxxxxxxx…" secret />
      <Field label="Phone Number ID" placeholder="112233445566778" />
      <Field label="WABA ID" placeholder="998877665544332" />
    </div>
  ),
  ai: (
    <div className="space-y-4">
      <Field label="OpenAI API Key" placeholder="sk-xxxxxxxxxxxxxxxxx" secret />
      <Field label="AI Model" placeholder="gpt-4o" />
      <Field label="Monthly AI Budget (₹)" placeholder="2000" />
      <div className="flex items-center justify-between p-4 glass rounded-xl">
        <div>
          <div className="text-sm font-medium">AI Auto-Suggestions</div>
          <div className="text-xs text-muted-foreground mt-0.5">Proactive AI alerts in dashboard</div>
        </div>
        <div className="h-6 w-11 bg-brand-purple rounded-full relative cursor-pointer">
          <div className="h-5 w-5 bg-white rounded-full absolute right-0.5 top-0.5 shadow" />
        </div>
      </div>
    </div>
  ),
  apikeys: (
    <div className="space-y-4">
      <div className="glass rounded-xl p-4 space-y-1">
        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Public API Key</div>
        <div className="font-mono text-sm text-brand-purple">vs_pub_xxxxxxxxxxxxxxxxxxxxxxxx</div>
      </div>
      <div className="glass rounded-xl p-4 space-y-1">
        <div className="text-xs text-muted-foreground font-medium uppercase tracking-wide">Secret API Key</div>
        <div className="font-mono text-sm">vs_sec_••••••••••••••••••••••••</div>
      </div>
      <button className="text-sm text-red-400 hover:underline">Regenerate keys</button>
    </div>
  ),
  users: (
    <div className="space-y-4">
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Admin Users</h3>
          <button className="text-xs text-brand-purple hover:underline">+ Invite user</button>
        </div>
        <div className="p-5">
          <div className="flex items-center gap-3 p-3 rounded-xl bg-white/5">
            <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center text-white text-sm font-bold">D</div>
            <div className="flex-1">
              <div className="text-sm font-medium">dildileep.01@gmail.com</div>
              <div className="text-xs text-muted-foreground">Super Admin</div>
            </div>
            <span className="text-xs bg-green-500/10 text-green-400 px-2.5 py-1 rounded-full">Active</span>
          </div>
        </div>
      </div>
    </div>
  ),
};

export default function AdminSettings() {
  const [tab, setTab] = useState("store");

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Settings</h1>
        <p className="text-muted-foreground text-sm mt-1">Configure your store, integrations, and system preferences.</p>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden md:flex flex-col w-48 shrink-0 gap-1">
          {settingsTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors text-left ${
                tab === t.id
                  ? "bg-brand-purple/20 text-brand-purple font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <t.icon className="h-4 w-4 shrink-0" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Mobile tabs */}
        <div className="md:hidden flex overflow-x-auto gap-2 pb-2 w-full">
          {settingsTabs.map((t) => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs whitespace-nowrap transition-colors ${
                tab === t.id ? "bg-brand-purple text-white" : "glass text-muted-foreground"
              }`}
            >
              <t.icon className="h-3.5 w-3.5" />
              {t.label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div className="flex-1 glass rounded-2xl p-5">
          <h3 className="font-semibold text-sm mb-5 capitalize">
            {settingsTabs.find((t) => t.id === tab)?.label} Settings
          </h3>
          {tabContent[tab]}
          <div className="mt-6 pt-5 border-t border-white/5">
            <button className="btn-primary px-5 py-2.5 rounded-xl text-sm flex items-center gap-2">
              <Save className="h-4 w-4" /> Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
