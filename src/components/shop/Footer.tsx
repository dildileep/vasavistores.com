import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";

export default function ShopFooter() {
  return (
    <footer className="mt-20 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-6 py-10 grid gap-8 md:grid-cols-4 text-sm">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-7 w-7 rounded-md bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Sparkles className="h-3.5 w-3.5 text-white" />
            </div>
            <span className="font-display font-semibold">VasaviStores</span>
          </div>
          <p className="mt-3 text-muted-foreground">
            Smart products for modern businesses. Made in India.
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Shop</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/shop" className="hover:text-foreground">All Products</Link></li>
            <li><Link to="/products/tapreview-ai-nfc-card" className="hover:text-foreground">TapReview AI</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Account</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><Link to="/account" className="hover:text-foreground">Profile</Link></li>
            <li><Link to="/account/orders" className="hover:text-foreground">Orders</Link></li>
            <li><Link to="/cart" className="hover:text-foreground">Cart</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-3">Support</h4>
          <ul className="space-y-2 text-muted-foreground">
            <li><a href="mailto:dildileep.01@gmail.com" className="hover:text-foreground">Email us</a></li>
            <li><a href="tel:+917204343440" className="hover:text-foreground">+91 72043 43440</a></li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/5 py-5 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} VasaviStores. All rights reserved.
      </div>
    </footer>
  );
}
