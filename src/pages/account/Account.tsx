import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Loader2, User as UserIcon, Package, MapPin, LogOut, Heart } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export default function Account() {
  const { user, loading } = useAuth();
  const nav = useNavigate();
  const [profile, setProfile] = useState<any>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/account", { replace: true }); return; }
    supabase.from("profiles").select("*").eq("id", user.id).maybeSingle().then(({ data }) => setProfile(data ?? { id: user.id, email: user.email }));
  }, [user, loading, nav]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    await supabase.from("profiles").upsert({
      id: user.id, email: profile.email, full_name: profile.full_name, phone: profile.phone,
    });
    setSaving(false);
  }

  if (loading || !profile) return <ShopLayout><div className="py-24 grid place-items-center"><Loader2 className="animate-spin h-6 w-6 text-muted-foreground" /></div></ShopLayout>;

  return (
    <ShopLayout>
      <Seo title="My Account | VasaviStores" canonical="/account" />
      <div className="max-w-4xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">My Account</h1>

        <div className="mt-6 grid md:grid-cols-[220px_1fr] gap-6">
          <nav className="space-y-1 text-sm">
            <div className="text-muted-foreground text-xs uppercase px-3 mb-1">Menu</div>
            <Link to="/account" className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/5"><UserIcon className="h-4 w-4" /> Profile</Link>
            <Link to="/account/orders" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5"><Package className="h-4 w-4" /> Orders</Link>
            <Link to="/account/addresses" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5"><MapPin className="h-4 w-4" /> Addresses</Link>
            <Link to="/account/wishlist" className="flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5"><Heart className="h-4 w-4" /> Wishlist</Link>
            <button onClick={async () => { await supabase.auth.signOut(); nav("/"); }} className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-xl hover:bg-white/5 text-red-300"><LogOut className="h-4 w-4" /> Sign out</button>
          </nav>

          <form onSubmit={save} className="glass rounded-3xl p-6 space-y-4">
            <h2 className="font-semibold">Profile Details</h2>
            <div className="grid sm:grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground">Full name</label>
                <input value={profile.full_name ?? ""} onChange={(e) => setProfile({ ...profile, full_name: e.target.value })} className="mt-1 w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
              </div>
              <div>
                <label className="text-xs text-muted-foreground">Phone</label>
                <input value={profile.phone ?? ""} onChange={(e) => setProfile({ ...profile, phone: e.target.value })} className="mt-1 w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
              </div>
              <div className="sm:col-span-2">
                <label className="text-xs text-muted-foreground">Email</label>
                <input value={profile.email ?? ""} disabled className="mt-1 w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none opacity-70" />
              </div>
            </div>
            <button disabled={saving} className="btn-primary rounded-full px-6 py-2.5 text-sm">{saving ? "Saving…" : "Save changes"}</button>
          </form>
        </div>
      </div>
    </ShopLayout>
  );
}
