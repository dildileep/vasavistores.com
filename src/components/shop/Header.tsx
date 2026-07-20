import { Link, useNavigate } from "react-router-dom";
import { ShoppingBag, Sparkles, User as UserIcon, Menu, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";

export default function ShopHeader() {
  const { count } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/70 border-b border-white/5">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-3 flex items-center gap-4">
        <Link to="/" className="flex items-center gap-2 shrink-0">
          <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-semibold tracking-tight">VasaviStores</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm text-muted-foreground ml-4">
          <Link to="/shop" className="hover:text-foreground">Shop</Link>
          <Link to="/products/tapreview-ai-nfc-card" className="hover:text-foreground">TapReview</Link>
          <Link to="/#contact" className="hover:text-foreground">Contact</Link>
        </nav>

        <div className="ml-auto flex items-center gap-2">
          <Link
            to="/cart"
            className="relative rounded-full glass px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/10"
            aria-label="Cart"
          >
            <ShoppingBag className="h-4 w-4" />
            <span className="hidden sm:inline">Cart</span>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-brand-purple text-white text-[10px] font-semibold rounded-full h-5 min-w-5 grid place-items-center px-1">
                {count}
              </span>
            )}
          </Link>
          {user ? (
            <div className="relative">
              <button
                onClick={() => setOpen((v) => !v)}
                className="rounded-full glass px-3 py-2 flex items-center gap-2 text-sm hover:bg-white/10"
              >
                <UserIcon className="h-4 w-4" />
                <span className="hidden sm:inline max-w-[120px] truncate">
                  {user.email?.split("@")[0]}
                </span>
              </button>
              {open && (
                <div className="absolute right-0 mt-2 w-48 glass rounded-2xl p-2 text-sm">
                  <Link to="/account" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">Profile</Link>
                  <Link to="/account/orders" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">Orders</Link>
                  <Link to="/account/addresses" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">Addresses</Link>
                  <Link to="/admin" onClick={() => setOpen(false)} className="block px-3 py-2 rounded-lg hover:bg-white/10">Admin</Link>
                  <button
                    onClick={async () => { await supabase.auth.signOut(); setOpen(false); nav("/"); }}
                    className="w-full text-left px-3 py-2 rounded-lg hover:bg-white/10"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <Link to="/login" className="rounded-full btn-primary px-4 py-2 text-sm">
              Sign in
            </Link>
          )}
          <button className="md:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </header>
  );
}
