import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CheckCircle2, Package, Truck, Download } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { supabase } from "@/integrations/supabase/client";
import { formatINR } from "@/lib/format";

export default function OrderSuccess() {
  const { id } = useParams<{ id: string }>();
  const [order, setOrder] = useState<any>(null);
  const [items, setItems] = useState<any[]>([]);
  const [shipment, setShipment] = useState<any>(null);

  useEffect(() => {
    if (!id) return;
    (async () => {
      const { data: o } = await supabase.from("orders").select("*").eq("id", id).maybeSingle();
      setOrder(o);
      const { data: it } = await supabase.from("order_items").select("*").eq("order_id", id);
      setItems(it ?? []);
      const { data: sh } = await supabase.from("shipments").select("*").eq("order_id", id).maybeSingle();
      setShipment(sh);
    })();
  }, [id]);

  if (!order) {
    return <ShopLayout><div className="py-24 text-center text-muted-foreground">Loading your order…</div></ShopLayout>;
  }

  const addr = order.shipping_address ?? {};

  return (
    <ShopLayout>
      <Seo title={`Thank you — Order ${order.order_number}`} description="Order placed successfully." canonical={`/order/success/${order.id}`} />
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-12">
        <div className="glass rounded-3xl p-8 text-center">
          <div className="mx-auto h-14 w-14 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
            <CheckCircle2 className="h-7 w-7 text-white" />
          </div>
          <h1 className="mt-4 text-2xl md:text-3xl font-display font-semibold">Thank you for your order!</h1>
          <p className="text-muted-foreground mt-2">
            Order <span className="text-foreground font-medium">{order.order_number}</span> is confirmed.
            A confirmation has been sent to {order.email}.
          </p>
        </div>

        <div className="mt-6 glass rounded-3xl p-6">
          <h2 className="font-semibold flex items-center gap-2"><Package className="h-4 w-4" /> Items</h2>
          <ul className="mt-3 divide-y divide-white/5">
            {items.map((it) => (
              <li key={it.id} className="py-3 flex gap-3 items-center">
                <div className="h-12 w-12 rounded-lg bg-white/5 overflow-hidden">
                  {it.image_url && <img src={it.image_url} alt={it.name} className="w-full h-full object-cover" />}
                </div>
                <div className="flex-1 text-sm">{it.name} × {it.quantity}</div>
                <div className="font-medium">{formatINR(it.total_paise)}</div>
              </li>
            ))}
          </ul>
          <div className="mt-4 border-t border-white/10 pt-4 space-y-1 text-sm">
            <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(order.subtotal_paise)}</span></div>
            {order.discount_paise > 0 && <div className="flex justify-between text-emerald-400"><span>Discount</span><span>−{formatINR(order.discount_paise)}</span></div>}
            <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{order.shipping_paise === 0 ? "FREE" : formatINR(order.shipping_paise)}</span></div>
            <div className="flex justify-between"><span className="text-muted-foreground">Tax</span><span>{formatINR(order.tax_paise)}</span></div>
            <div className="flex justify-between font-semibold text-base pt-2 border-t border-white/10"><span>Total paid</span><span>{formatINR(order.total_paise)}</span></div>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 gap-4">
          <div className="glass rounded-3xl p-5">
            <h3 className="font-semibold">Shipping to</h3>
            <p className="text-sm text-muted-foreground mt-2">
              {addr.first_name} {addr.last_name}<br />
              {addr.line1}{addr.line2 ? `, ${addr.line2}` : ""}<br />
              {addr.city}, {addr.state} {addr.pincode}<br />
              {addr.country}<br />
              {addr.phone}
            </p>
          </div>
          <div className="glass rounded-3xl p-5">
            <h3 className="font-semibold flex items-center gap-2"><Truck className="h-4 w-4" /> Tracking</h3>
            {shipment?.tracking_url ? (
              <>
                <p className="text-sm text-muted-foreground mt-2">Courier: {shipment.courier_name}</p>
                <p className="text-sm">AWB: {shipment.awb_code}</p>
                <a href={shipment.tracking_url} className="mt-2 inline-block btn-primary rounded-full px-4 py-2 text-sm" target="_blank" rel="noreferrer">Track shipment</a>
              </>
            ) : (
              <p className="text-sm text-muted-foreground mt-2">Your shipment will be booked soon. You'll receive tracking details by email.</p>
            )}
          </div>
        </div>

        <div className="mt-8 flex gap-3 justify-center">
          <Link to="/account/orders" className="rounded-full glass px-5 py-2.5 text-sm">My Orders</Link>
          <Link to="/shop" className="rounded-full btn-primary px-5 py-2.5 text-sm">Continue Shopping</Link>
        </div>
      </div>
    </ShopLayout>
  );
}
