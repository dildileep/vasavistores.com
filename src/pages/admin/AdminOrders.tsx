import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";

const STATUSES = ["pending","paid","processing","shipped","delivered","cancelled","refunded","failed"];

export default function AdminOrders() {
  const [rows, setRows] = useState<any[]>([]);
  const [selected, setSelected] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase.from("orders").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function openOrder(o: any) {
    setSelected(o);
    const { data } = await supabase.from("order_items").select("*").eq("order_id", o.id);
    setItems(data ?? []);
  }

  async function updateStatus(id: string, status: string) {
    await supabase.from("orders").update({ status: status as any }).eq("id", id);
    load();
    if (selected?.id === id) setSelected({ ...selected, status });
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-semibold">Orders</h1>
      <div className="mt-4 glass rounded-2xl divide-y divide-white/5">
        {rows.length === 0 && <div className="p-6 text-sm text-muted-foreground">No orders yet.</div>}
        {rows.map((o) => (
          <button key={o.id} onClick={() => openOrder(o)} className="w-full p-4 flex items-center gap-3 hover:bg-white/[0.03] text-left">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{o.order_number}</div>
              <div className="text-xs text-muted-foreground">{new Date(o.created_at).toLocaleString()} • {o.email}</div>
            </div>
            <span className="text-xs px-2 py-0.5 rounded-full bg-white/10">{o.status}</span>
            <div className="font-semibold">{formatINR(o.total_paise)}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="fixed inset-0 z-50 grid place-items-center bg-black/60 backdrop-blur-sm p-4" onClick={() => setSelected(null)}>
          <div className="glass rounded-3xl p-6 w-full max-w-2xl max-h-[90vh] overflow-auto" onClick={(e) => e.stopPropagation()}>
            <h2 className="text-lg font-semibold">{selected.order_number}</h2>
            <p className="text-xs text-muted-foreground">{new Date(selected.created_at).toLocaleString()}</p>

            <div className="mt-4">
              <label className="text-xs text-muted-foreground">Status</label>
              <select value={selected.status} onChange={(e) => updateStatus(selected.id, e.target.value)} className="mt-1 glass rounded-xl px-3 py-2 bg-background/40 text-sm w-full">
                {STATUSES.map((s) => <option key={s}>{s}</option>)}
              </select>
            </div>

            <h3 className="mt-5 font-semibold text-sm">Items</h3>
            <ul className="mt-2 divide-y divide-white/5 glass rounded-xl">
              {items.map((it) => (
                <li key={it.id} className="p-3 flex gap-2 text-sm">
                  <span className="flex-1">{it.name} × {it.quantity}</span>
                  <span className="font-medium">{formatINR(it.total_paise)}</span>
                </li>
              ))}
            </ul>

            <h3 className="mt-5 font-semibold text-sm">Shipping address</h3>
            <pre className="mt-2 glass rounded-xl p-3 text-xs whitespace-pre-wrap">{JSON.stringify(selected.shipping_address, null, 2)}</pre>

            <div className="mt-5 grid grid-cols-2 gap-2 text-sm">
              <div>Subtotal <div className="font-semibold">{formatINR(selected.subtotal_paise)}</div></div>
              <div>Discount <div className="font-semibold">{formatINR(selected.discount_paise)}</div></div>
              <div>Tax <div className="font-semibold">{formatINR(selected.tax_paise)}</div></div>
              <div>Shipping <div className="font-semibold">{formatINR(selected.shipping_paise)}</div></div>
              <div className="col-span-2 pt-2 border-t border-white/10">Total <div className="text-lg font-semibold">{formatINR(selected.total_paise)}</div></div>
            </div>

            <div className="mt-5 flex justify-end"><button onClick={() => setSelected(null)} className="px-4 py-2 rounded-full glass text-sm">Close</button></div>
          </div>
        </div>
      )}
    </div>
  );
}
