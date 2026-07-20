import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";
import { Plus, Pencil, Trash2, X } from "lucide-react";
import { slugify } from "@/lib/format";

type Product = any;

export default function AdminProducts() {
  const [rows, setRows] = useState<Product[]>([]);
  const [editing, setEditing] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  async function load() {
    setLoading(true);
    const { data } = await supabase.from("products").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
    setLoading(false);
  }
  useEffect(() => { load(); }, []);

  async function save() {
    if (!editing) return;
    const payload = { ...editing };
    if (!payload.slug) payload.slug = slugify(payload.name || "");
    if (payload.id) {
      const { id, ...rest } = payload;
      await supabase.from("products").update(rest).eq("id", id);
    } else {
      await supabase.from("products").insert(payload);
    }
    setEditing(null);
    load();
  }

  async function del(id: string) {
    if (!confirm("Delete this product?")) return;
    await supabase.from("products").delete().eq("id", id);
    load();
  }

  return (
    <div>
      <div className="flex items-center gap-3 flex-wrap">
        <h1 className="text-2xl md:text-3xl font-display font-semibold flex-1">Products</h1>
        <button
          onClick={() => setEditing({ name: "", slug: "", price_paise: 49900, mrp_paise: 99900, stock: 100, is_active: true, images: [], features: [], benefits: [], specifications: {}, faqs: [], tax_rate: 18 })}
          className="btn-primary rounded-full px-4 py-2 text-sm flex items-center gap-1"
        >
          <Plus className="h-4 w-4" /> New product
        </button>
      </div>

      <div className="mt-4 glass rounded-2xl divide-y divide-white/5">
        {loading && <div className="p-6 text-sm text-muted-foreground">Loading…</div>}
        {rows.map((p) => (
          <div key={p.id} className="p-4 flex items-center gap-3">
            <div className="h-12 w-12 rounded-lg bg-white/5 overflow-hidden shrink-0">
              {p.images?.[0] && <img src={p.images[0]} className="w-full h-full object-cover" alt="" />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="font-medium truncate">{p.name}</div>
              <div className="text-xs text-muted-foreground">/{p.slug} • Stock {p.stock}</div>
            </div>
            <div className="text-sm font-semibold">{formatINR(p.price_paise)}</div>
            <span className={`text-xs px-2 py-0.5 rounded-full ${p.is_active ? "bg-emerald-500/10 text-emerald-300" : "bg-white/10"}`}>{p.is_active ? "Active" : "Draft"}</span>
            <button onClick={() => setEditing(p)} className="p-2 rounded-full hover:bg-white/10"><Pencil className="h-4 w-4" /></button>
            <button onClick={() => del(p.id)} className="p-2 rounded-full hover:bg-red-500/10 text-red-300"><Trash2 className="h-4 w-4" /></button>
          </div>
        ))}
      </div>

      {editing && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setEditing(null)}>
          <div className="glass rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center gap-2 mb-4">
              <h2 className="text-lg font-semibold flex-1">{editing.id ? "Edit product" : "New product"}</h2>
              <button onClick={() => setEditing(null)}><X className="h-5 w-5" /></button>
            </div>
            <div className="grid sm:grid-cols-2 gap-3 text-sm">
              <label>Name<input className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.name ?? ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} /></label>
              <label>Slug<input className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.slug ?? ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} placeholder="auto if empty" /></label>
              <label>Tagline<input className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.tagline ?? ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} /></label>
              <label>SKU<input className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.sku ?? ""} onChange={(e) => setEditing({ ...editing, sku: e.target.value })} /></label>
              <label>Price (₹)<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.price_paise / 100} onChange={(e) => setEditing({ ...editing, price_paise: Math.round(Number(e.target.value) * 100) })} /></label>
              <label>MRP (₹)<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.mrp_paise / 100} onChange={(e) => setEditing({ ...editing, mrp_paise: Math.round(Number(e.target.value) * 100) })} /></label>
              <label>Stock<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.stock ?? 0} onChange={(e) => setEditing({ ...editing, stock: Number(e.target.value) })} /></label>
              <label>Weight (g)<input type="number" className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.weight_grams ?? 50} onChange={(e) => setEditing({ ...editing, weight_grams: Number(e.target.value) })} /></label>
              <label className="sm:col-span-2">Short description<textarea rows={2} className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.short_description ?? ""} onChange={(e) => setEditing({ ...editing, short_description: e.target.value })} /></label>
              <label className="sm:col-span-2">Long description<textarea rows={5} className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={editing.long_description ?? ""} onChange={(e) => setEditing({ ...editing, long_description: e.target.value })} /></label>
              <label className="sm:col-span-2">Image URLs (one per line)
                <textarea rows={3} className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={(editing.images ?? []).join("\n")} onChange={(e) => setEditing({ ...editing, images: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
              </label>
              <label className="sm:col-span-2">Features (one per line)
                <textarea rows={3} className="mt-1 w-full glass rounded-xl px-3 py-2 bg-background/40" value={(editing.features ?? []).join("\n")} onChange={(e) => setEditing({ ...editing, features: e.target.value.split("\n").map((s) => s.trim()).filter(Boolean) })} />
              </label>
              <label className="sm:col-span-2 flex items-center gap-2"><input type="checkbox" checked={!!editing.is_active} onChange={(e) => setEditing({ ...editing, is_active: e.target.checked })} /> Active (visible in shop)</label>
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
