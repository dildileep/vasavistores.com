import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

export default function ResetPassword() {
  const nav = useNavigate();
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => sub.subscription.unsubscribe();
  }, []);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    const { error } = await supabase.auth.updateUser({ password });
    setBusy(false);
    if (error) { setMsg({ type: "error", text: error.message }); return; }
    setMsg({ type: "info", text: "Password updated. Redirecting…" });
    setTimeout(() => nav("/account", { replace: true }), 1200);
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 py-16">
      <div className="w-full max-w-md glass rounded-3xl p-8">
        <h1 className="text-2xl font-display font-semibold text-center">Set a new password</h1>
        {!ready ? (
          <p className="mt-4 text-sm text-muted-foreground text-center">
            Open this page from the password reset link in your email.
          </p>
        ) : (
          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              type="password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="New password"
              className="w-full glass rounded-xl px-3 py-2.5 text-sm bg-background/40 outline-none"
            />
            <button disabled={busy} className="btn-primary w-full rounded-full py-2.5 text-sm inline-flex items-center justify-center gap-2">
              {busy && <Loader2 className="h-4 w-4 animate-spin" />} Update password
            </button>
          </form>
        )}
        {msg && (
          <p className={`mt-3 text-sm text-center ${msg.type === "error" ? "text-red-300" : "text-emerald-300"}`}>{msg.text}</p>
        )}
      </div>
    </div>
  );
}
