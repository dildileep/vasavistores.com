import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import { Sparkles, Mail, Lock, ArrowRight, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { lovable } from "@/integrations/lovable";
import { useAuth } from "@/hooks/useAuth";

type Mode = "signin" | "signup";

export default function Login() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState<{ type: "error" | "info"; text: string } | null>(null);

  useEffect(() => {
    if (!loading && user) navigate("/admin", { replace: true });
  }, [user, loading, navigate]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMsg(null);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        setMsg({ type: "info", text: "Account created. You're being signed in…" });
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      }
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message || "Authentication failed" });
    } finally {
      setBusy(false);
    }
  }

  async function handleGoogle() {
    setBusy(true);
    setMsg(null);
    try {
      const result = await lovable.auth.signInWithOAuth("google", {
        redirect_uri: window.location.origin + "/admin",
      });
      if (result.error) throw result.error;
    } catch (err: any) {
      setMsg({ type: "error", text: err?.message || "Google sign-in failed" });
      setBusy(false);
    }
  }

  return (
    <div className="min-h-screen grid place-items-center px-4 py-16 relative">
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-brand-purple/20 blur-3xl -z-10" />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md glass rounded-3xl p-8"
      >
        <Link to="/" className="flex items-center gap-2 justify-center mb-6">
          <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <span className="font-display font-semibold text-lg">VasaviStores</span>
        </Link>

        <h1 className="text-2xl font-display font-semibold text-center">
          {mode === "signin" ? "Welcome back" : "Create your account"}
        </h1>
        <p className="text-sm text-muted-foreground text-center mt-1">
          {mode === "signin"
            ? "Sign in to access your dashboard."
            : "Start running your AI-powered storefront."}
        </p>

        <button
          onClick={handleGoogle}
          disabled={busy}
          className="mt-6 w-full flex items-center justify-center gap-2 rounded-full glass hover:bg-white/10 transition px-4 py-2.5 text-sm font-medium disabled:opacity-60"
        >
          <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden>
            <path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.4 29.3 35.5 24 35.5c-6.3 0-11.5-5.1-11.5-11.5S17.7 12.5 24 12.5c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.6 6.5 29 4.5 24 4.5 13.2 4.5 4.5 13.2 4.5 24S13.2 43.5 24 43.5 43.5 34.8 43.5 24c0-1.2-.1-2.3-.4-3.5z" />
            <path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.9 19 12.5 24 12.5c2.9 0 5.5 1.1 7.5 2.9l5.7-5.7C33.6 6.5 29 4.5 24 4.5 16.3 4.5 9.6 8.9 6.3 14.7z" />
            <path fill="#4CAF50" d="M24 43.5c5.2 0 9.9-2 13.4-5.2l-6.2-5.2c-2 1.4-4.5 2.3-7.2 2.3-5.3 0-9.7-3.1-11.3-7.5l-6.5 5C9.5 39.1 16.2 43.5 24 43.5z" />
            <path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.1-4.1 5.5l6.2 5.2c-.4.4 6.6-4.8 6.6-14.7 0-1.2-.1-2.3-.4-3.5z" />
          </svg>
          Continue with Google
        </button>

        <div className="my-5 flex items-center gap-3 text-xs text-muted-foreground">
          <div className="h-px flex-1 bg-white/10" /> or <div className="h-px flex-1 bg-white/10" />
        </div>

        <form onSubmit={handleSubmit} className="space-y-3">
          <label className="block">
            <span className="text-xs text-muted-foreground">Email</span>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full glass rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-purple/50"
                placeholder="you@company.com"
              />
            </div>
          </label>
          <label className="block">
            <span className="text-xs text-muted-foreground">Password</span>
            <div className="mt-1 relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="password"
                required
                minLength={6}
                autoComplete={mode === "signin" ? "current-password" : "new-password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full glass rounded-xl pl-9 pr-3 py-2.5 text-sm outline-none focus:ring-2 focus:ring-brand-purple/50"
                placeholder="••••••••"
              />
            </div>
          </label>

          {msg && (
            <div
              className={`text-xs rounded-lg px-3 py-2 ${
                msg.type === "error"
                  ? "bg-red-500/10 text-red-300 border border-red-500/20"
                  : "bg-emerald-500/10 text-emerald-300 border border-emerald-500/20"
              }`}
            >
              {msg.text}
            </div>
          )}

          <button
            type="submit"
            disabled={busy}
            className="w-full btn-primary rounded-full py-2.5 text-sm font-medium flex items-center justify-center gap-2 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <ArrowRight className="h-4 w-4" />}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <p className="mt-5 text-center text-xs text-muted-foreground">
          {mode === "signin" ? "New to VasaviStores?" : "Already have an account?"}{" "}
          <button
            onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
            className="text-foreground underline underline-offset-4"
          >
            {mode === "signin" ? "Create an account" : "Sign in"}
          </button>
        </p>
      </motion.div>
    </div>
  );
}
