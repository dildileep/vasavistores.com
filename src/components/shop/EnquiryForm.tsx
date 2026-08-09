import { useState } from "react";
import { Loader2, Send, Check } from "lucide-react";
import { z } from "zod";
import { supabase } from "@/integrations/supabase/client";

const schema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100),
  phone: z.string().trim().min(6, "Enter a valid phone").max(20),
  email: z.string().trim().email("Enter a valid email").max(255).or(z.literal("")),
  message: z.string().trim().max(2000),
});

export default function EnquiryForm({
  productId,
  productName,
}: {
  productId?: string;
  productName?: string;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    const parsed = schema.safeParse(form);
    if (!parsed.success) {
      setError(parsed.error.issues[0].message);
      return;
    }
    setBusy(true);
    const { error: err } = await supabase.from("enquiries").insert({
      name: parsed.data.name,
      phone: parsed.data.phone,
      email: parsed.data.email || null,
      message: parsed.data.message || null,
      product_id: productId ?? null,
      product_name: productName ?? null,
    });
    setBusy(false);
    if (err) { setError("Could not send your enquiry. Please try WhatsApp."); return; }
    setDone(true);
    setForm({ name: "", phone: "", email: "", message: "" });
  }

  if (done) {
    return (
      <div className="glass rounded-3xl p-6 text-center">
        <Check className="h-6 w-6 mx-auto text-emerald-400" />
        <p className="mt-2 font-medium">Thanks! We've received your enquiry.</p>
        <p className="text-sm text-muted-foreground">Our team will reach out shortly.</p>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="glass rounded-3xl p-6 space-y-3">
      <h3 className="font-display font-semibold text-lg">Enquire about {productName ?? "this product"}</h3>
      <div className="grid sm:grid-cols-2 gap-3">
        <input required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Your name" maxLength={100} className="glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
        <input required value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="Phone" maxLength={20} className="glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
      </div>
      <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email (optional)" maxLength={255} className="w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
      <textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} placeholder="Message (optional)" maxLength={2000} className="w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none" />
      {error && <p className="text-xs text-red-300">{error}</p>}
      <button disabled={busy} className="btn-primary rounded-full px-6 py-2.5 text-sm inline-flex items-center gap-2">
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />} Send enquiry
      </button>
    </form>
  );
}
