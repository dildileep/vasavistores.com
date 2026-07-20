import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import { Loader2, LayoutDashboard, ShoppingBag, Package, Users, MessageSquare, Tag, LogOut, Sparkles } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, checkIsAdmin } from "@/hooks/useAuth";

export default function AdminLayout() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/admin", { replace: true }); return; }
    checkIsAdmin(user.id).then(setIsAdmin);
  }, [user, loading, nav]);

  if (loading || isAdmin === null) {
    return <div className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin text-muted-foreground" /></div>;
  }
  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md glass rounded-3xl p-8 text-center">
          <h1 className="text-xl font-display font-semibold">Access restricted</h1>
          <p className="text-sm text-muted-foreground mt-2">You're signed in as {user?.email}, but this account is not an admin.</p>
          <div className="mt-5 flex gap-2 justify-center">
            <Link to="/" className="text-sm px-4 py-2 rounded-full glass">Home</Link>
            <button onClick={async () => { await supabase.auth.signOut(); nav("/login"); }} className="text-sm px-4 py-2 rounded-full btn-primary">Sign out</button>
          </div>
        </div>
      </div>
    );
  }

  const link = "flex items-center gap-2 px-3 py-2 rounded-xl text-sm hover:bg-white/5";
  const active = "bg-white/10 text-foreground";

  return (
    <div className="min-h-screen grid md:grid-cols-[240px_1fr]">
      <aside className="border-r border-white/5 p-4 md:sticky md:top-0 md:h-screen">
        <Link to="/" className="flex items-center gap-2 px-3 py-2">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center"><Sparkles className="h-4 w-4 text-white" /></div>
          <div>
            <div className="font-display font-semibold text-sm">VasaviStores</div>
            <div className="text-[10px] text-muted-foreground -mt-0.5">Admin</div>
          </div>
        </Link>
        <nav className="mt-4 space-y-1">
          <NavLink to="/admin" end className={({ isActive }) => `${link} ${isActive ? active : ""}`}><LayoutDashboard className="h-4 w-4" /> Dashboard</NavLink>
          <NavLink to="/admin/products" className={({ isActive }) => `${link} ${isActive ? active : ""}`}><Package className="h-4 w-4" /> Products</NavLink>
          <NavLink to="/admin/orders" className={({ isActive }) => `${link} ${isActive ? active : ""}`}><ShoppingBag className="h-4 w-4" /> Orders</NavLink>
          <NavLink to="/admin/customers" className={({ isActive }) => `${link} ${isActive ? active : ""}`}><Users className="h-4 w-4" /> Customers</NavLink>
          <NavLink to="/admin/coupons" className={({ isActive }) => `${link} ${isActive ? active : ""}`}><Tag className="h-4 w-4" /> Coupons</NavLink>
          <NavLink to="/admin/messages" className={({ isActive }) => `${link} ${isActive ? active : ""}`}><MessageSquare className="h-4 w-4" /> Messages</NavLink>
        </nav>
        <button onClick={async () => { await supabase.auth.signOut(); nav("/"); }} className={`${link} w-full mt-6 text-red-300`}><LogOut className="h-4 w-4" /> Sign out</button>
      </aside>
      <main className="p-4 md:p-8 max-w-6xl w-full">
        <Outlet />
      </main>
    </div>
  );
}
