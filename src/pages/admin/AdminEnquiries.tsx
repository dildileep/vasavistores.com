import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { MessageCircle, Mail, Phone } from "lucide-react";

const STATUSES = ["new", "contacted", "converted", "closed"] as const;
const labels: Record<string, string> = { new: "New", contacted: "Contacted", converted: "Converted", closed: "Closed" };

export default function AdminEnquiries() {
  const [rows, setRows] = useState<any[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("enquiries").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function setStatus(id: string, status: string) {
    await supabase.from("enquiries").update({ status: status as any }).eq("id", id);
    setRows((r) => r.map((x) => (x.id === id ? { ...x, status } : x)));
  }

  const list = filter === "all" ? rows : rows.filter((r) => r.status === filter);

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-display font-semibold flex-1">Enquiries</h1>
        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="glass rounded-full px-4 py-2 text-sm bg-background/40">
          <option value="all">All</option>
          {STATUSES.map((s) => <option key={s} value={s}>{labels[s]}</option>)}
        </select>
      </div>

      <div className="mt-4 glass rounded-2xl divide-y divide-white/5">
        {loading && <div className="p-6 text-sm text-muted-foreground">Loading…</div>}
        {!loading && list.length === 0 && <div className="p-6 text-sm text-muted-foreground">No enquiries yet.</div>}
        {list.map((e) => (
          <div key={e.id} className="p-4 flex flex-wrap items-start gap-3 text-sm">
            <div className="flex-1 min-w-[200px]">
              <div className="font-medium">{e.name}</div>
              <div className="text-xs text-muted-foreground flex flex-wrap gap-3 mt-0.5">
                {e.phone && <span className="inline-flex items-center gap-1"><Phone className="h-3 w-3" />{e.phone}</span>}
                {e.email && <span className="inline-flex items-center gap-1"><Mail className="h-3 w-3" />{e.email}</span>}
              </div>
              {e.message && <p className="text-xs text-muted-foreground mt-1 max-w-xl">{e.message}</p>}
            </div>
            <div className="text-xs text-muted-foreground min-w-[120px]">{e.product_name ?? "—"}</div>
            <div className="text-xs text-muted-foreground">{new Date(e.created_at).toLocaleDateString()}</div>
            <select value={e.status} onChange={(ev) => setStatus(e.id, ev.target.value)} className="glass rounded-full px-3 py-1.5 text-xs bg-background/40">
              {STATUSES.map((s) => <option key={s} value={s}>{labels[s]}</option>)}
            </select>
            {e.phone && (
              <a href={`https://wa.me/${e.phone.replace(/\D/g, "")}`} target="_blank" rel="noopener noreferrer" className="p-2 rounded-full hover:bg-white/10 text-[#4ade80]">
                <MessageCircle className="h-4 w-4" />
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
