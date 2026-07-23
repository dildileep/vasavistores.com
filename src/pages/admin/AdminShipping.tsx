import { Truck, Package, MapPin, AlertCircle, CheckCircle2, Clock, ExternalLink } from "lucide-react";

const shipments = [
  { order: "VS-1001", tracking: "SR123456789IN", courier: "Bluedart", status: "delivered", city: "Mumbai", updated: "2026-07-22" },
  { order: "VS-1002", tracking: "SR987654321IN", courier: "Delhivery", status: "in_transit", city: "Bangalore", updated: "2026-07-23" },
  { order: "VS-1003", tracking: "—", courier: "—", status: "pending", city: "Delhi", updated: "2026-07-23" },
  { order: "VS-1004", tracking: "SR555666777IN", courier: "DTDC", status: "out_for_delivery", city: "Chennai", updated: "2026-07-23" },
];

const statusStyle: Record<string, string> = {
  delivered: "bg-green-500/10 text-green-400",
  in_transit: "bg-blue-500/10 text-blue-400",
  pending: "bg-amber-500/10 text-amber-400",
  out_for_delivery: "bg-cyan-500/10 text-cyan-400",
};

const statusLabel: Record<string, string> = {
  delivered: "Delivered",
  in_transit: "In Transit",
  pending: "Not Shipped",
  out_for_delivery: "Out for Delivery",
};

export default function AdminShipping() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Shipping</h1>
        <p className="text-muted-foreground text-sm mt-1">Shiprocket integration, courier selection, and delivery tracking.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Shipments", value: "4", icon: Package },
          { label: "In Transit", value: "1", icon: Truck },
          { label: "Delivered", value: "1", icon: CheckCircle2 },
          { label: "Pending", value: "1", icon: Clock },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <k.icon className="h-4 w-4 text-brand-purple mb-2" />
            <div className="text-xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Shiprocket Notice */}
      <div className="glass rounded-2xl p-4 flex items-start gap-3 border border-amber-500/20">
        <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
        <div className="text-sm">
          <span className="font-medium text-amber-400">Shiprocket Integration Pending</span>
          <p className="text-muted-foreground mt-1 text-xs">
            Connect your Shiprocket account to auto-create shipments when orders are paid. Add API credentials in Settings → Shipping.
          </p>
        </div>
        <button className="ml-auto text-xs text-brand-purple hover:underline whitespace-nowrap flex items-center gap-1 shrink-0">
          Configure <ExternalLink className="h-3 w-3" />
        </button>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5 flex items-center justify-between">
          <h3 className="font-semibold text-sm">Shipments</h3>
          <button className="text-xs text-brand-purple hover:underline">Sync with Shiprocket</button>
        </div>
        <div className="divide-y divide-white/5">
          {shipments.map((s) => (
            <div key={s.order} className="px-5 py-4 flex flex-wrap items-center gap-4 hover:bg-white/2 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{s.order}</div>
                <div className="text-xs text-muted-foreground mt-0.5 flex items-center gap-2">
                  <MapPin className="h-3 w-3" /> {s.city}
                  {s.tracking !== "—" && (
                    <span className="font-mono">{s.tracking}</span>
                  )}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{s.courier}</div>
              <div className="text-xs text-muted-foreground">{s.updated}</div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${statusStyle[s.status]}`}>
                {statusLabel[s.status]}
              </span>
              {s.status === "pending" && (
                <button className="text-xs btn-primary px-3 py-1.5 rounded-lg">Ship Now</button>
              )}
              {s.tracking !== "—" && (
                <a
                  href={`https://shiprocket.co/tracking/${s.tracking}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs text-brand-purple hover:underline flex items-center gap-1"
                >
                  Track <ExternalLink className="h-3 w-3" />
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
