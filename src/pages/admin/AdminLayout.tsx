import { useEffect, useState } from "react";
import { Link, NavLink, Outlet, useNavigate } from "react-router-dom";
import {
  Loader2, LayoutDashboard, ShoppingBag, Package, Users, MessageSquare, Tag,
  LogOut, Sparkles, BarChart3, Bot, Flame, Shield, Settings, CreditCard,
  Truck, Megaphone, FileText, ChevronDown, ChevronRight, Menu, X,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, checkIsAdmin } from "@/hooks/useAuth";

type NavGroup = {
  label: string;
  items: { to: string; label: string; icon: React.ElementType; end?: boolean }[];
};

const navGroups: NavGroup[] = [
  {
    label: "Overview",
    items: [
      { to: "/admin", label: "Dashboard", icon: LayoutDashboard, end: true },
      { to: "/admin/analytics", label: "Analytics", icon: BarChart3 },
      { to: "/admin/heatmap", label: "Heatmap", icon: Flame },
    ],
  },
  {
    label: "Store",
    items: [
      { to: "/admin/products", label: "Products", icon: Package },
      { to: "/admin/orders", label: "Orders", icon: ShoppingBag },
      { to: "/admin/customers", label: "Customers", icon: Users },
      { to: "/admin/payments", label: "Payments", icon: CreditCard },
      { to: "/admin/shipping", label: "Shipping", icon: Truck },
      { to: "/admin/coupons", label: "Coupons", icon: Tag },
    ],
  },
  {
    label: "Grow",
    items: [
      { to: "/admin/marketing", label: "Marketing", icon: Megaphone },
      { to: "/admin/content", label: "Content", icon: FileText },
      { to: "/admin/messages", label: "Messages", icon: MessageSquare },
    ],
  },
  {
    label: "AI",
    items: [
      { to: "/admin/ai", label: "AI Command Center", icon: Bot },
    ],
  },
  {
    label: "System",
    items: [
      { to: "/admin/security", label: "Security", icon: Shield },
      { to: "/admin/settings", label: "Settings", icon: Settings },
    ],
  },
];

function SidebarNav({ onClose }: { onClose?: () => void }) {
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const nav = useNavigate();

  const link = "flex items-center gap-2.5 px-3 py-2 rounded-xl text-sm transition-colors hover:bg-white/5 hover:text-foreground";
  const activeLink = "bg-white/10 text-foreground font-medium";

  const toggleGroup = (label: string) =>
    setCollapsed((prev) => ({ ...prev, [label]: !prev[label] }));

  return (
    <>
      <Link to="/" className="flex items-center gap-2.5 px-3 py-2 mb-2">
        <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center shrink-0">
          <Sparkles className="h-4 w-4 text-white" />
        </div>
        <div>
          <div className="font-display font-semibold text-sm leading-none">VasaviStores</div>
          <div className="text-[10px] text-muted-foreground mt-0.5">Admin Console</div>
        </div>
      </Link>

      <nav className="mt-2 space-y-4 overflow-y-auto flex-1">
        {navGroups.map((group) => {
          const isCollapsed = collapsed[group.label];
          return (
            <div key={group.label}>
              <button
                onClick={() => toggleGroup(group.label)}
                className="flex items-center justify-between w-full px-3 py-1 text-[11px] font-semibold uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors"
              >
                {group.label}
                {isCollapsed ? <ChevronRight className="h-3 w-3" /> : <ChevronDown className="h-3 w-3" />}
              </button>
              {!isCollapsed && (
                <div className="mt-1 space-y-0.5">
                  {group.items.map(({ to, label, icon: Icon, end }) => (
                    <NavLink
                      key={to}
                      to={to}
                      end={end}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `${link} ${isActive ? activeLink : "text-muted-foreground"}`
                      }
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </nav>

      <div className="mt-4 pt-4 border-t border-white/5">
        <button
          onClick={async () => { await supabase.auth.signOut(); nav("/"); }}
          className={`${link} w-full text-red-400 hover:text-red-300 hover:bg-red-500/5`}
        >
          <LogOut className="h-4 w-4 shrink-0" /> Sign out
        </button>
      </div>
    </>
  );
}

export default function AdminLayout() {
  const nav = useNavigate();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) { nav("/login?redirect=/admin", { replace: true }); return; }
    checkIsAdmin(user.id).then(setIsAdmin);
  }, [user, loading, nav]);

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen grid place-items-center">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-brand-purple" />
          <p className="text-sm text-muted-foreground">Loading admin…</p>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md glass rounded-3xl p-8 text-center space-y-4">
          <div className="h-16 w-16 rounded-2xl bg-red-500/10 grid place-items-center mx-auto">
            <Shield className="h-8 w-8 text-red-400" />
          </div>
          <h1 className="text-xl font-display font-semibold">Access Restricted</h1>
          <p className="text-sm text-muted-foreground">
            You're signed in as <strong>{user?.email}</strong>, but this account does not have admin privileges.
          </p>
          <div className="flex gap-2 justify-center pt-2">
            <Link to="/" className="text-sm px-4 py-2 rounded-full glass hover:bg-white/10 transition-colors">Home</Link>
            <button
              onClick={async () => { await supabase.auth.signOut(); nav("/login"); }}
              className="text-sm px-4 py-2 rounded-full btn-primary"
            >
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex flex-col w-60 border-r border-white/5 p-4 sticky top-0 h-screen shrink-0">
        <SidebarNav />
      </aside>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="relative flex flex-col w-72 bg-background border-r border-white/5 p-4 h-full z-10">
            <SidebarNav onClose={() => setSidebarOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Mobile topbar */}
        <div className="md:hidden flex items-center gap-3 px-4 py-3 border-b border-white/5 sticky top-0 z-30 bg-background/80 backdrop-blur-xl">
          <button
            onClick={() => setSidebarOpen(true)}
            className="glass p-2 rounded-lg hover:bg-white/10 transition-colors"
            aria-label="Open menu"
          >
            <Menu className="h-4 w-4" />
          </button>
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Sparkles className="h-3 w-3 text-white" />
            </div>
            <span className="font-display font-semibold text-sm">Admin</span>
          </div>
        </div>

        <main className="p-4 md:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
