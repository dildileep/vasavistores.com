import { CreditCard, IndianRupee, CheckCircle2, XCircle, RefreshCw, AlertCircle } from "lucide-react";
import { formatINR } from "@/lib/format";

const transactions = [
  { id: "pay_001", order: "VS-1001", amount: 49900, method: "Razorpay", status: "captured", date: "2026-07-23T10:12:00" },
  { id: "pay_002", order: "VS-1002", amount: 49900, method: "COD", status: "pending", date: "2026-07-23T09:45:00" },
  { id: "pay_003", order: "VS-1003", amount: 99800, method: "Razorpay", status: "captured", date: "2026-07-22T16:20:00" },
  { id: "pay_004", order: "VS-1004", amount: 49900, method: "Razorpay", status: "refunded", date: "2026-07-22T11:05:00" },
  { id: "pay_005", order: "VS-1005", amount: 49900, method: "Razorpay", status: "failed", date: "2026-07-21T14:33:00" },
];

const statusStyle: Record<string, string> = {
  captured: "bg-green-500/10 text-green-400",
  pending: "bg-amber-500/10 text-amber-400",
  refunded: "bg-blue-500/10 text-blue-400",
  failed: "bg-red-500/10 text-red-400",
};

const statusIcon: Record<string, React.ElementType> = {
  captured: CheckCircle2,
  pending: AlertCircle,
  refunded: RefreshCw,
  failed: XCircle,
};

export default function AdminPayments() {
  const totalRevenue = transactions.filter(t => t.status === "captured").reduce((s, t) => s + t.amount, 0);
  const totalRefunded = transactions.filter(t => t.status === "refunded").reduce((s, t) => s + t.amount, 0);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Payments</h1>
        <p className="text-muted-foreground text-sm mt-1">Razorpay transactions, refunds, and payment status.</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: "Total Collected", value: formatINR(totalRevenue), icon: IndianRupee, color: "text-green-400" },
          { label: "Refunded", value: formatINR(totalRefunded), icon: RefreshCw, color: "text-blue-400" },
          { label: "Pending COD", value: "₹499", icon: AlertCircle, color: "text-amber-400" },
          { label: "Failed", value: "1", icon: XCircle, color: "text-red-400" },
        ].map((k) => (
          <div key={k.label} className="glass rounded-2xl p-4">
            <k.icon className={`h-4 w-4 mb-2 ${k.color}`} />
            <div className="text-xl font-bold">{k.value}</div>
            <div className="text-xs text-muted-foreground mt-0.5">{k.label}</div>
          </div>
        ))}
      </div>

      {/* Razorpay Notice */}
      <div className="glass rounded-2xl p-4 flex items-start gap-3 border border-amber-500/20">
        <AlertCircle className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
        <div className="text-sm">
          <span className="font-medium text-amber-400">Razorpay Live Keys Required</span>
          <p className="text-muted-foreground mt-1 text-xs">
            Add <code className="font-mono bg-white/5 px-1 rounded">VITE_RAZORPAY_KEY_ID</code> to your environment secrets to enable live payment processing. Currently running in test mode.
          </p>
        </div>
      </div>

      <div className="glass rounded-2xl overflow-hidden">
        <div className="px-5 py-4 border-b border-white/5">
          <h3 className="font-semibold text-sm">Transactions</h3>
        </div>
        <div className="divide-y divide-white/5">
          {transactions.map((t) => {
            const Icon = statusIcon[t.status] ?? AlertCircle;
            return (
              <div key={t.id} className="px-5 py-3.5 flex flex-wrap items-center gap-3 hover:bg-white/2 transition-colors">
                <div className={`h-8 w-8 rounded-lg grid place-items-center shrink-0 ${statusStyle[t.status]}`}>
                  <Icon className="h-4 w-4" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{t.order}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">
                    {t.method} • {new Date(t.date).toLocaleString("en-IN", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}
                  </div>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${statusStyle[t.status]}`}>
                  {t.status}
                </span>
                <div className="font-semibold tabular-nums text-sm">{formatINR(t.amount)}</div>
                {t.status === "captured" && (
                  <button className="text-xs text-red-400 hover:underline ml-1">Refund</button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
