import { Shield, Eye, AlertTriangle, CheckCircle2, XCircle, Clock, User, LogIn } from "lucide-react";

const auditLogs = [
  { action: "Order status updated", user: "dildileep.01@gmail.com", role: "Super Admin", ip: "49.36.xx.xx", time: "2026-07-23T10:45:00", status: "success" },
  { action: "Product price edited", user: "dildileep.01@gmail.com", role: "Super Admin", ip: "49.36.xx.xx", time: "2026-07-23T10:12:00", status: "success" },
  { action: "Failed login attempt", user: "unknown@test.com", role: "—", ip: "192.168.1.x", time: "2026-07-23T09:55:00", status: "failed" },
  { action: "Coupon created", user: "dildileep.01@gmail.com", role: "Super Admin", ip: "49.36.xx.xx", time: "2026-07-22T16:30:00", status: "success" },
  { action: "Admin signed in", user: "dildileep.01@gmail.com", role: "Super Admin", ip: "49.36.xx.xx", time: "2026-07-22T09:00:00", status: "success" },
];

const roles = [
  { role: "Super Admin", perms: ["All access"], count: 1 },
  { role: "Store Owner", perms: ["Products", "Orders", "Customers", "Reports"], count: 0 },
  { role: "Store Manager", perms: ["Products", "Orders", "Inventory"], count: 0 },
  { role: "Marketing Manager", perms: ["Marketing", "Coupons", "Content"], count: 0 },
  { role: "Support Agent", perms: ["Orders", "Customers", "Messages"], count: 0 },
];

export default function AdminSecurity() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Security</h1>
        <p className="text-muted-foreground text-sm mt-1">Audit logs, login history, failed attempts, and role-based access.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Admin Logins", value: "12", icon: LogIn, color: "text-green-400" },
          { label: "Failed Attempts", value: "3", icon: XCircle, color: "text-red-400" },
          { label: "Active Sessions", value: "1", icon: Eye, color: "text-blue-400" },
          { label: "Audit Events", value: "47", icon: Shield, color: "text-brand-purple" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <k.icon className={`h-4 w-4 mb-2 ${k.color}`} />
            <div className="text-xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Roles */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="font-semibold text-sm">Role Definitions</h3>
        </div>
        <div className="divide-y divide-white/5">
          {roles.map((r) => (
            <div key={r.role} className="px-5 py-4 flex flex-wrap items-center gap-4 hover:bg-white/2 transition-colors">
              <div className="flex-1 min-w-0">
                <div className="font-medium text-sm">{r.role}</div>
                <div className="flex flex-wrap gap-1 mt-1.5">
                  {r.perms.map((p) => (
                    <span key={p} className="text-[11px] px-2 py-0.5 rounded-full bg-white/5 text-muted-foreground">{p}</span>
                  ))}
                </div>
              </div>
              <div className="text-xs text-muted-foreground">{r.count} user{r.count !== 1 ? "s" : ""}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Audit Log */}
      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="font-semibold text-sm">Audit Log</h3>
        </div>
        <div className="divide-y divide-white/5">
          {auditLogs.map((log, i) => (
            <div key={i} className="px-5 py-3.5 flex flex-wrap items-center gap-3 hover:bg-white/2 transition-colors">
              <div className={`h-7 w-7 rounded-lg grid place-items-center shrink-0 ${
                log.status === "success" ? "bg-green-500/10" : "bg-red-500/10"
              }`}>
                {log.status === "success"
                  ? <CheckCircle2 className="h-3.5 w-3.5 text-green-400" />
                  : <XCircle className="h-3.5 w-3.5 text-red-400" />
                }
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium">{log.action}</div>
                <div className="text-xs text-muted-foreground mt-0.5 flex flex-wrap gap-x-3">
                  <span className="flex items-center gap-1"><User className="h-3 w-3" />{log.user}</span>
                  <span>{log.ip}</span>
                  <span className="text-muted-foreground/60">{log.role}</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                {new Date(log.time).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
