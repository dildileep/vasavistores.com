import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Plus, Trash2 } from "lucide-react";

export default function AdminCoupons() {
  const [rows, setRows] = useState<any[]>([]);
  const [editing, setEditing] = useState<any | null>(null);

  async function load() {
    const { data } = await supabase.from("coupons").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    const payload = { ...editing, code: (editing.code || "").toUpperCase() };
    if (editing.id) await supabase.from("coupons").update(payload).eq("id", editing.id);
    else await supabase.from("coupons").insert(payload);
    setEditing(null);
    load();
  }

  async function del(id: string) {
    if (!confirm("Delete this coupon?")) return;
    await supabase.from("coupons").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center gap-3">
        <h1 className="text-2xl md:text-3xl font-display font-semibold flex-1">Coupons</h1>
        <button onClick={() => setEditing({ code: "", discount_type: "percent", discount_value: 10, is_active: true, min_order_paise: 0 })} className="btn-primary rounded-full px-4 py-2 text-sm flex items-center gap-1"><Plus className="h-4 w-4" /> New</button>
      </div>
      <div className="mt-4 glass rounded-2xl divide-y divide-white/5">
        {rows.length === 0 && <div className="p-6 text-sm text-muted-foreground">No coupons yet.</div>}
        {rows.map((c) => (
          <div key={c.id} className="p-4 flex flex-wrap items-center gap-3 text-sm">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{c.code}</div>
              <div className="text-xs text-muted-foreground">{c.discount_type === "percent" ? `${c.discount_value}% off` : `₹${c.discount_value} off`} • Used {c.usage_count}</div>
            </div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${c.is_active ? "bg-emerald-500/10 text-emerald-300" : "bg-white/10"}`}>{c.is_active ? "Active" : "Inactive"}</span>
            <button onClick={() => setEditing(c)} className="text-xs px-3 py-1 rounded-full glass">Edit</button>
            <button onClick={() => del(c.id)} className="p-1.5 text-red-300 hover:bg-red-500/10 rounded-full"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="glass rounded-3xl p-6 w-full max-w-md" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold mb-4">{editing.id ? "Edit coupon" : "New coupon"}</h2>
            <div className="space-y-3 text-sm">
              <label className="block">Code<input className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.code} onChange={(e) => setEditing({ ...editing, code: e.target.value })} /></label>
              <label className="block">Type
                <select className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.discount_type} onChange={(e) => setEditing({ ...editing, discount_type: e.target.value })}>
                  <option value="percent">Percent (%)</option>
                  <option value="flat">Flat (₹)</option>
                </select>
              </label>
              <label className="block">Value<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.discount_value} onChange={(e) => setEditing({ ...editing, discount_value: Number(e.target.value) })} /></label>
              <label className="block">Min order (₹)<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={(editing.min_order_paise ?? 0) / 100} onChange={(e) => setEditing({ ...editing, min_order_paise: Math.round(Number(e.target.value) * 100) })} /></label>
              <label className="flex items-center gap-2"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active</label>
            </div>
            <div className="mt-5 flex justify-end gap-2">
              <button onClick={() => setEditing(null)} className="px-4 py-2 rounded-full glass text-sm">Cancel</button>
              <button onClick={save} className="btn-primary px-5 py-2 rounded-full text-sm">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
