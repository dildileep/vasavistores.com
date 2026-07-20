import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

export default function AdminCustomers() {
  const [rows, setRows] = useState<any[]>([]);
  useEffect(() => {
    supabase.from("profiles").select("*").order("created_at", { ascending: false }).then(({ data }) => setRows(data ?? []));
  }, []);
  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-display font-semibold">Customers</h1>
      <div className="mt-4 glass rounded-2xl divide-y divide-white/5">
        {rows.length === 0 && <div className="p-6 text-sm text-muted-foreground">No customers yet.</div>}
        {rows.map((p) => (
          <div key={p.id} className="p-4 text-sm flex flex-wrap gap-3">
            <div className="flex-1 min-w-0">
              <div className="font-medium">{p.full_name || "—"}</div>
              <div className="text-xs text-muted-foreground">{p.email}</div>
            </div>
            <div className="text-xs text-muted-foreground">{p.phone ?? "—"}</div>
            <div className="text-xs text-muted-foreground">{new Date(p.created_at).toLocaleDateString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
