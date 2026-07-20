import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Mail, Phone, Trash2 } from "lucide-react";

export default function AdminMessages() {
  const [rows, setRows] = useState<any[]>([]);

  async function load() {
    const { data } = await supabase.from("contact_submissions").select("*").order("created_at", { ascending: false });
    setRows(data ?? []);
  }
  useEffect(() => { load(); }, []);

  async function del(id: string) {
    if (!confirm("Delete?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-semibold">Contact enquiries</h1>
      <div className="mt-4 space-y-3">
        {rows.length === 0 && <div className="glass rounded-2xl p-6 text-sm text-muted-foreground">No enquiries yet.</div>}
        {rows.map((r) => (
          <div key={r.id} className="glass rounded-2xl p-4">
            <div className="flex flex-wrap gap-3 items-center text-sm">
              <div className="font-medium">{r.name}</div>
              <a href={`mailto:${r.email}`} className="text-muted-foreground hover:text-foreground flex items-center gap-1"><Mail className="h-3.5 w-3.5" /> {r.email}</a>
              {r.phone && <a href={`tel:${r.phone}`} className="text-muted-foreground hover:text-foreground flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> {r.phone}</a>}
              <span className="text-xs text-muted-foreground ml-auto">{new Date(r.created_at).toLocaleString()}</span>
              <button onClick={() => del(r.id)} className="p-1.5 text-red-300 hover:bg-red-500/10 rounded-full"><Trash2 className="h-4 w-4" /></button>
            </div>
            <p className="mt-3 text-sm whitespace-pre-wrap">{r.message}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
