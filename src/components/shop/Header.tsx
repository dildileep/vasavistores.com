import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, Sparkles, User as UserIcon, Menu, X, Store, Nfc, Phone, ChevronDown } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function ShopHeader() {
  const { count } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const navLinks = [
    { to: "/shop", label: "Shop", icon: Store },
    { to: "/products/tapreview-ai-nfc-card", label: "TapReview", icon: Nfc },
    { to: "/#contact", label: "Contact", icon: Phone },
  ];

  const isActive = (to: string) =>
    to.startsWith("/#") ? false : location.pathname === to || location.pathname.startsWith(to + "/");

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-semibold tracking-tight">VasaviStores</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1 text-sm text-muted-foreground ml-4">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg transition-colors hover:text-foreground hover:bg-white/5 ${
                isActive(to) ? "text-foreground bg-white/10 font-medium" : ""
              }`}
            >
              <Icon className="h-3.5 w-3.5" />
              {label}
            </Link>
          ))}
        </nav>

        <div className="ml-auto flex items-center gap-2">
          {/* Cart */}
          <Link
            to="/cart"
            className="relative rounded-full glass px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/10 transition-colors"
            aria-label="Cart"
          >
            <ShoppingCart className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1.5 -right-1.5 bg-gradient-to-br from-brand-blue to-brand-purple text-white text-[10px] font-bold rounded-full h-5 min-w-5 grid place-items-center px-1 shadow-lg">
                {count}
              </span>
            )}
          </Link>

          {/* Auth */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => setProfileOpen((v) => !v)}
                className="rounded-full glass px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/10 transition-colors"
              >
                <div className="h-5 w-5 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
                  <UserIcon className="h-3 w-3 text-white" />
                </div>
                <span className="hidden sm:inline max-w-[100px] truncate">
                  {user.email?.split("@")[0]}
                </span>
                <ChevronDown className={`h-3 w-3 transition-transform ${profileOpen ? "rotate-180" : ""}`} />
              </button>
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-2xl p-2 text-sm shadow-2xl border border-white/10">
                  <div className="px-3 py-2 text-xs text-muted-foreground border-b border-white/10 mb-1 truncate">{user.email}</div>
                  <Link to="/account" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">Profile</Link>
                  <Link to="/account/orders" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">Orders</Link>
                  <Link to="/account/addresses" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors">Addresses</Link>
                  <div className="border-t border-white/10 mt-1 pt-1">
                    <Link to="/admin" onClick={() => setProfileOpen(false)} className="flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-brand-purple">Admin Panel</Link>
                    <button
                      onClick={async () => { await supabase.auth.signOut(); setProfileOpen(false); nav("/"); }}
                      className="w-full text-left flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-red-500/10 text-red-400 transition-colors"
                    >
                      Sign out
                    </button>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="rounded-full btn-primary px-4 py-2 text-sm">
              Sign in
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            className="md:hidden glass p-2 rounded-lg hover:bg-white/10 transition-colors"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Menu"
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {menuOpen && (
        <div className="md:hidden border-t border-white/5 px-4 py-3 space-y-1 bg-background/90 backdrop-blur-xl">
          {navLinks.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${
                isActive(to) ? "bg-white/10 text-foreground font-medium" : "text-muted-foreground hover:text-foreground hover:bg-white/5"
              }`}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  );
}
