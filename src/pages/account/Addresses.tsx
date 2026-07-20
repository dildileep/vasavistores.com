import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, MapPin, Trash2 } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Addresses() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [rows, setRows] = useState<any[]>([]);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/account/addresses"); return; }
    supabase.from("addresses").select("*").eq("user_id", user.id).order("created_at", { ascending: false })
      .then(({ data }) => { setRows(data ?? []); setFetching(false); });
  }, [user, loading, nav]);

  async function del(id: string) {
    if (!confirm("Delete this address?")) return;
    await supabase.from("addresses").delete().eq("id", id);
    setRows((r) => r.filter((x) => x.id !== id));
  }

  return (
    <ShopLayout>
      <Seo title="My Addresses | VasaviStores" canonical="/account/addresses" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">Addresses</h1>
        {fetching ? (
          <div className="py-20 grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>
        ) : rows.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center mt-6">
            <MapPin className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No saved addresses. They will appear here after your first order.</p>
          </div>
        ) : (
          <div className="mt-6 grid sm:grid-cols-2 gap-3">
            {rows.map((a) => (
              <div key={a.id} className="glass rounded-2xl p-4 relative">
                {a.is_default && <span className="absolute top-3 right-3 text-[10px] px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple">Default</span>}
                <div className="font-medium">{a.first_name} {a.last_name}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  {a.line1}{a.line2 ? `, ${a.line2}` : ""}<br />
                  {a.city}, {a.state} {a.pincode}<br />
                  {a.country} • {a.phone}
                </div>
                <button onClick={() => del(a.id)} className="mt-3 text-xs text-red-300 flex items-center gap-1"><Trash2 className="h-3.5 w-3.5" /> Remove</button>
              </div>
            ))}
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
