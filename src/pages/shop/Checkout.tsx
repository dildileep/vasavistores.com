import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { Loader2, Lock, Tag } from "lucide-react";
import ShopLayout from "@/components/shop/ShopLayout";
import Seo from "@/components/shop/Seo";
import { useCart } from "@/context/CartContext";
import { formatINR } from "@/lib/format";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

const IN_STATES = [
  "Andhra Pradesh","Arunachal Pradesh","Assam","Bihar","Chhattisgarh","Goa","Gujarat","Haryana","Himachal Pradesh",
  "Jharkhand","Karnataka","Kerala","Madhya Pradesh","Maharashtra","Manipur","Meghalaya","Mizoram","Nagaland",
  "Odisha","Punjab","Rajasthan","Sikkim","Tamil Nadu","Telangana","Tripura","Uttar Pradesh","Uttarakhand",
  "West Bengal","Delhi","Jammu and Kashmir","Ladakh","Puducherry","Chandigarh","Andaman and Nicobar Islands",
  "Dadra and Nagar Haveli and Daman and Diu","Lakshadweep",
];

const addressSchema = z.object({
  first_name: z.string().trim().min(1, "First name required").max(60),
  last_name: z.string().trim().min(1, "Last name required").max(60),
  phone: z.string().trim().regex(/^[0-9+\-\s]{7,15}$/, "Enter a valid phone"),
  email: z.string().trim().email("Enter a valid email").max(255),
  line1: z.string().trim().min(3, "Address is required").max(200),
  line2: z.string().trim().max(200).optional().or(z.literal("")),
  landmark: z.string().trim().max(120).optional().or(z.literal("")),
  city: z.string().trim().min(1, "City required").max(80),
  state: z.string().trim().min(1, "State required").max(80),
  country: z.string().trim().min(1).max(80),
  pincode: z.string().trim().regex(/^[0-9]{4,10}$/, "Enter a valid pincode"),
  gst_number: z.string().trim().max(20).optional().or(z.literal("")),
});

type Addr = z.infer<typeof addressSchema>;

const emptyAddr: Addr = {
  first_name: "", last_name: "", phone: "", email: "",
  line1: "", line2: "", landmark: "", city: "", state: "", country: "India",
  pincode: "", gst_number: "",
};

const RAZORPAY_KEY_ID = (import.meta.env.VITE_RAZORPAY_KEY_ID as string | undefined) ?? "";

export default function Checkout() {
  const { items, subtotalPaise, clear } = useCart();
  const { user } = useAuth();
  const nav = useNavigate();
  const [addr, setAddr] = useState<Addr>(emptyAddr);
  const [errors, setErrors] = useState<Partial<Record<keyof Addr, string>>>({});
  const [couponInput, setCouponInput] = useState("");
  const [coupon, setCoupon] = useState<any>(null);
  const [couponErr, setCouponErr] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (user) {
      setAddr((a) => ({ ...a, email: user.email ?? a.email }));
      supabase.from("addresses").select("*").eq("user_id", user.id).eq("is_default", true).maybeSingle()
        .then(({ data }) => { if (data) setAddr({ ...(data as any), country: (data as any).country || "India" }); });
    }
  }, [user]);

  const shippingPaise = subtotalPaise >= 49900 ? 0 : 4900;

  const discountPaise = useMemo(() => {
    if (!coupon) return 0;
    let d = 0;
    if (coupon.discount_type === "percent") d = Math.round((subtotalPaise * Number(coupon.discount_value)) / 100);
    else d = Math.round(Number(coupon.discount_value) * 100);
    if (coupon.max_discount_paise) d = Math.min(d, coupon.max_discount_paise);
    return Math.min(d, subtotalPaise);
  }, [coupon, subtotalPaise]);

  const taxableBase = Math.max(0, subtotalPaise - discountPaise);
  const taxPaise = Math.round(taxableBase * 0.18);
  const totalPaise = taxableBase + taxPaise + shippingPaise;

  useEffect(() => {
    if (items.length === 0) nav("/cart", { replace: true });
  }, [items.length, nav]);

  async function applyCoupon() {
    setCouponErr("");
    setCoupon(null);
    if (!user) { setCouponErr("Sign in to apply coupons."); return; }
    if (!couponInput.trim()) return;
    const { data, error } = await supabase
      .from("coupons")
      .select("*")
      .eq("code", couponInput.trim().toUpperCase())
      .eq("is_active", true)
      .maybeSingle();
    if (error || !data) { setCouponErr("Invalid coupon"); return; }
    if (data.min_order_paise && subtotalPaise < data.min_order_paise) {
      setCouponErr(`Add ${formatINR(data.min_order_paise - subtotalPaise)} more to use this coupon.`); return;
    }
    if (data.valid_until && new Date(data.valid_until) < new Date()) { setCouponErr("Coupon expired"); return; }
    setCoupon(data);
  }

  function loadRazorpay(): Promise<boolean> {
    return new Promise((resolve) => {
      if ((window as any).Razorpay) return resolve(true);
      const s = document.createElement("script");
      s.src = "https://checkout.razorpay.com/v1/checkout.js";
      s.onload = () => resolve(true);
      s.onerror = () => resolve(false);
      document.body.appendChild(s);
    });
  }

  async function handlePlaceOrder(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    const parsed = addressSchema.safeParse(addr);
    if (!parsed.success) {
      const es: any = {};
      parsed.error.issues.forEach((i) => { es[i.path[0] as string] = i.message; });
      setErrors(es);
      return;
    }
    setErrors({});
    if (!user) { nav("/login?redirect=/checkout"); return; }
    setSubmitting(true);
    try {
      // Save/refresh default address
      await supabase.from("addresses").upsert({
        user_id: user.id, ...parsed.data,
        line2: parsed.data.line2 || null,
        landmark: parsed.data.landmark || null,
        gst_number: parsed.data.gst_number || null,
        is_default: true,
      });

      const orderNumber = `VS${Date.now().toString().slice(-9)}${Math.floor(Math.random() * 1000)}`;

      // Create order (status=pending)
      const { data: order, error: orderErr } = await supabase
        .from("orders")
        .insert({
          order_number: orderNumber,
          user_id: user.id,
          email: parsed.data.email,
          phone: parsed.data.phone,
          status: "pending",
          subtotal_paise: subtotalPaise,
          discount_paise: discountPaise,
          tax_paise: taxPaise,
          shipping_paise: shippingPaise,
          total_paise: totalPaise,
          coupon_code: coupon?.code ?? null,
          shipping_address: parsed.data as any,
          billing_address: parsed.data as any,
        })
        .select()
        .single();
      if (orderErr) throw orderErr;

      // Insert items
      const rows = items.map((it) => ({
        order_id: order.id,
        product_id: it.productId,
        name: it.name,
        slug: it.slug,
        image_url: it.image,
        price_paise: it.pricePaise,
        quantity: it.quantity,
        total_paise: it.pricePaise * it.quantity,
      }));
      await supabase.from("order_items").insert(rows);

      // Payment path
      if (RAZORPAY_KEY_ID) {
        const loaded = await loadRazorpay();
        if (!loaded) throw new Error("Failed to load Razorpay");
        // NOTE: For production, create Razorpay order via edge function using secret key.
        (window as any).Razorpay && new (window as any).Razorpay({
          key: RAZORPAY_KEY_ID,
          amount: totalPaise,
          currency: "INR",
          name: "VasaviStores",
          description: `Order ${orderNumber}`,
          prefill: { name: `${addr.first_name} ${addr.last_name}`, email: addr.email, contact: addr.phone },
          theme: { color: "#6d5df6" },
          handler: async (resp: any) => {
            await supabase.from("payments").insert({
              order_id: order.id,
              provider: "razorpay",
              provider_payment_id: resp.razorpay_payment_id,
              provider_order_id: resp.razorpay_order_id ?? null,
              provider_signature: resp.razorpay_signature ?? null,
              amount_paise: totalPaise,
              status: "captured",
              raw: resp,
            });
            await supabase.from("orders").update({ status: "paid" }).eq("id", order.id);
            clear();
            nav(`/order/success/${order.id}`, { replace: true });
          },
          modal: {
            ondismiss: async () => {
              await supabase.from("orders").update({ status: "failed" }).eq("id", order.id);
              setSubmitting(false);
            },
          },
        }).open();
      } else {
        // Fallback: Cash on Delivery
        await supabase.from("payments").insert({
          order_id: order.id, provider: "cod", amount_paise: totalPaise, status: "created",
        });
        await supabase.from("orders").update({ status: "processing" }).eq("id", order.id);
        clear();
        nav(`/order/success/${order.id}`, { replace: true });
      }
    } catch (err: any) {
      setErrorMsg(err.message || "Something went wrong");
      setSubmitting(false);
    }
  }

  const field = (name: keyof Addr, label: string, opts: React.InputHTMLAttributes<HTMLInputElement> = {}) => (
    <div>
      <label className="text-xs text-muted-foreground">{label}</label>
      <input
        {...opts}
        value={addr[name] ?? ""}
        onChange={(e) => setAddr({ ...addr, [name]: e.target.value })}
        className="mt-1 w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none focus:ring-1 focus:ring-brand-purple"
      />
      {errors[name] && <p className="text-xs text-red-400 mt-1">{errors[name]}</p>}
    </div>
  );

  return (
    <ShopLayout>
      <Seo title="Secure Checkout | VasaviStores" description="Complete your order securely." canonical="/checkout" />
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-10">
        <h1 className="text-3xl font-display font-semibold">Checkout</h1>
        {!user && (
          <p className="text-sm text-muted-foreground mt-2">
            You'll be asked to sign in to complete your order.{" "}
            <a className="underline" href="/login?redirect=/checkout">Sign in now</a>
          </p>
        )}

        <form onSubmit={handlePlaceOrder} className="mt-6 grid lg:grid-cols-[1fr_380px] gap-6">
          <section className="glass rounded-3xl p-5 md:p-6">
            <h2 className="font-semibold">Shipping Address</h2>
            <div className="mt-4 grid sm:grid-cols-2 gap-3">
              {field("first_name", "First Name*")}
              {field("last_name", "Last Name*")}
              {field("phone", "Phone*", { inputMode: "tel" })}
              {field("email", "Email*", { type: "email" })}
              <div className="sm:col-span-2">{field("line1", "Address Line 1*")}</div>
              <div className="sm:col-span-2">{field("line2", "Address Line 2")}</div>
              {field("landmark", "Landmark")}
              {field("city", "City*")}
              <div>
                <label className="text-xs text-muted-foreground">State*</label>
                <select
                  value={addr.state}
                  onChange={(e) => setAddr({ ...addr, state: e.target.value })}
                  className="mt-1 w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none"
                >
                  <option value="">Select state</option>
                  {IN_STATES.map((s) => <option key={s} value={s}>{s}</option>)}
                </select>
                {errors.state && <p className="text-xs text-red-400 mt-1">{errors.state}</p>}
              </div>
              {field("country", "Country*")}
              {field("pincode", "Pincode*", { inputMode: "numeric" })}
              <div className="sm:col-span-2">{field("gst_number", "GST Number (optional)")}</div>
            </div>
          </section>

          <aside className="space-y-4">
            <div className="glass rounded-3xl p-5">
              <h2 className="font-semibold">Order Summary</h2>
              <ul className="mt-3 space-y-2 max-h-56 overflow-auto pr-1">
                {items.map((it) => (
                  <li key={it.productId} className="flex gap-2 text-sm items-center">
                    <div className="h-10 w-10 rounded-lg bg-white/5 overflow-hidden shrink-0">
                      {it.image && <img src={it.image} className="w-full h-full object-cover" alt={it.name} />}
                    </div>
                    <div className="flex-1 line-clamp-1">{it.name} × {it.quantity}</div>
                    <div>{formatINR(it.pricePaise * it.quantity)}</div>
                  </li>
                ))}
              </ul>
              <div className="mt-4 pt-4 border-t border-white/10 space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-muted-foreground">Subtotal</span><span>{formatINR(subtotalPaise)}</span></div>
                {discountPaise > 0 && <div className="flex justify-between text-emerald-400"><span>Discount ({coupon.code})</span><span>−{formatINR(discountPaise)}</span></div>}
                <div className="flex justify-between"><span className="text-muted-foreground">Shipping</span><span>{shippingPaise === 0 ? "FREE" : formatINR(shippingPaise)}</span></div>
                <div className="flex justify-between"><span className="text-muted-foreground">Tax (18%)</span><span>{formatINR(taxPaise)}</span></div>
                <div className="flex justify-between font-semibold text-base pt-2 border-t border-white/10"><span>Total</span><span>{formatINR(totalPaise)}</span></div>
              </div>

              <div className="mt-4">
                <div className="flex gap-2">
                  <div className="glass rounded-full flex-1 flex items-center gap-2 px-3 py-2">
                    <Tag className="h-3.5 w-3.5 text-muted-foreground" />
                    <input value={couponInput} onChange={(e) => setCouponInput(e.target.value)} placeholder="Coupon code" className="bg-transparent outline-none text-sm w-full" />
                  </div>
                  <button type="button" onClick={applyCoupon} className="rounded-full glass px-4 text-sm hover:bg-white/10">Apply</button>
                </div>
                {couponErr && <p className="text-xs text-red-400 mt-1">{couponErr}</p>}
                {coupon && <p className="text-xs text-emerald-400 mt-1">Coupon “{coupon.code}” applied.</p>}
              </div>
            </div>

            {errorMsg && <div className="glass rounded-2xl p-3 text-sm text-red-300">{errorMsg}</div>}

            <button
              type="submit"
              disabled={submitting || items.length === 0}
              className="w-full btn-primary rounded-full py-3.5 font-medium flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : <Lock className="h-4 w-4" />}
              {RAZORPAY_KEY_ID ? `Pay ${formatINR(totalPaise)}` : `Place Order (COD) — ${formatINR(totalPaise)}`}
            </button>
            <p className="text-[11px] text-muted-foreground text-center">Payments secured. Your data is encrypted.</p>
          </aside>
        </form>
      </div>
    </ShopLayout>
  );
}
