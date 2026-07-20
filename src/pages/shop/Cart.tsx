import { Link, useNavigate } from "react-router-dom";
import { Trash2, ShoppingBag, ArrowRight } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";

export default function Cart() {
  const { items, setQty, remove, subtotalPaise, clear } = useCart();
  const nav = useNavigate();

  return (
    <ShopLayout>
      <Seo title="Your Cart | VasaviStores" description="Review items in your cart and proceed to checkout." canonical="/cart" />
      <div className="max-w-5xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">Your Cart</h1>

        {items.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center mt-8">
            <ShoppingBag className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/shop" className="mt-4 inline-block btn-primary rounded-full px-5 py-2">Continue shopping</Link>
          </div>
        ) : (
          <div className="mt-6 grid lg:grid-cols-[1fr_360px] gap-6">
            <div className="space-y-3">
              {items.map((it) => (
                <div key={it.productId} className="glass rounded-2xl p-3 flex gap-3 items-center">
                  <Link to={`/products/${it.slug}`} className="h-20 w-20 rounded-xl overflow-hidden bg-white/5 shrink-0">
                    {it.image && <img src={it.image} alt={it.name} className="w-full h-full object-cover" />}
                  </Link>
                  <div className="flex-1 min-w-0">
                    <Link to={`/products/${it.slug}`} className="font-medium line-clamp-1 hover:underline">{it.name}</Link>
                    <div className="text-sm text-muted-foreground">{formatINR(it.pricePaise)}</div>
                    <div className="mt-2 flex items-center gap-2">
                      <div className="glass rounded-full flex items-center text-sm">
                        <button className="px-2 py-1" onClick={() => setQty(it.productId, it.quantity - 1)}>−</button>
                        <span className="px-3">{it.quantity}</span>
                        <button className="px-2 py-1" onClick={() => setQty(it.productId, it.quantity + 1)}>+</button>
                      </div>
                      <button onClick={() => remove(it.productId)} className="text-xs text-red-300 hover:text-red-400 flex items-center gap-1">
                        <Trash2 className="h-3.5 w-3.5" /> Remove
                      </button>
                    </div>
                  </div>
                  <div className="text-right font-semibold">{formatINR(it.pricePaise * it.quantity)}</div>
                </div>
              ))}
              <button onClick={clear} className="text-xs text-muted-foreground hover:text-foreground">Clear cart</button>
            </div>

            <aside className="glass rounded-3xl p-5 h-fit sticky top-24">
              <h3 className="font-semibold">Order Summary</h3>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><dt className="text-muted-foreground">Subtotal</dt><dd>{formatINR(subtotalPaise)}</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Shipping</dt><dd className="text-emerald-400">FREE</dd></div>
                <div className="flex justify-between"><dt className="text-muted-foreground">Estimated tax</dt><dd className="text-muted-foreground">Calculated at checkout</dd></div>
              </dl>
              <div className="mt-4 pt-4 border-t border-white/10 flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatINR(subtotalPaise)}</span>
              </div>
              <button
                onClick={() => nav("/checkout")}
                className="mt-5 w-full btn-primary rounded-full py-3 flex items-center justify-center gap-2 font-medium"
              >
                Proceed to Checkout <ArrowRight className="h-4 w-4" />
              </button>
              <Link to="/shop" className="mt-2 block text-center text-xs text-muted-foreground hover:text-foreground">Continue shopping</Link>
            </aside>
          </div>
        )}
      </div>
    </ShopLayout>
  );
}
