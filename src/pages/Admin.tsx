import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "motion/react";
import {
  Sparkles,
  LogOut,
  Mail,
  Phone,
  User as UserIcon,
  Loader2,
  Trash2,
  ShieldCheck,
  Inbox,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth, checkIsAdmin } from "@/hooks/useAuth";

type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  message: string;
  created_at: string;
};

export default function Admin() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const [rows, setRows] = useState<Submission[]>([]);
  const [fetching, setFetching] = useState(false);
  const [err, setErr] = useState<string>("");

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login", { replace: true });
      return;
    }
    (async () => {
      const admin = await checkIsAdmin(user.id);
      setIsAdmin(admin);
      if (admin) load();
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, loading]);

  async function load() {
    setFetching(true);
    setErr("");
    const { data, error } = await supabase
      .from("contact_submissions")
      .select("*")
      .order("created_at", { ascending: false });
    if (error) setErr(error.message);
    else setRows((data ?? []) as Submission[]);
    setFetching(false);
  }

  async function del(id: string) {
    if (!confirm("Delete this submission?")) return;
    const { error } = await supabase.from("contact_submissions").delete().eq("id", id);
    if (error) alert(error.message);
    else setRows((r) => r.filter((x) => x.id !== id));
  }

  async function signOut() {
    await supabase.auth.signOut();
    navigate("/login", { replace: true });
  }

  if (loading || isAdmin === null) {
    return (
      <div className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen grid place-items-center px-4">
        <div className="max-w-md glass rounded-3xl p-8 text-center">
          <ShieldCheck className="h-10 w-10 mx-auto text-brand-purple mb-3" />
          <h1 className="text-xl font-display font-semibold">Access restricted</h1>
          <p className="text-sm text-muted-foreground mt-2">
            You're signed in as <span className="text-foreground">{user?.email}</span>, but this
            account does not have admin access.
          </p>
          <div className="mt-5 flex gap-2 justify-center">
            <Link to="/" className="text-sm px-4 py-2 rounded-full glass">
              Go home
            </Link>
            <button onClick={signOut} className="text-sm px-4 py-2 rounded-full btn-primary">
              Sign out
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-background/60 border-b border-white/5">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center gap-3">
          <Link to="/" className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold">VasaviStores Admin</span>
          </Link>
          <span className="ml-auto text-xs text-muted-foreground hidden sm:inline">
            {user?.email}
          </span>
          <button
            onClick={signOut}
            className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-white/10"
          >
            <LogOut className="h-3.5 w-3.5" /> Sign out
          </button>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-end justify-between gap-4 flex-wrap mb-6"
        >
          <div>
            <h1 className="text-3xl md:text-4xl font-display font-semibold">Contact submissions</h1>
            <p className="text-sm text-muted-foreground mt-1">
              All enquiries submitted through the VasaviStores website.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="glass rounded-2xl px-4 py-2.5 text-sm">
              <span className="text-muted-foreground">Total</span>{" "}
              <span className="font-semibold">{rows.length}</span>
            </div>
            <button
              onClick={load}
              className="text-sm px-4 py-2.5 rounded-full glass hover:bg-white/10"
            >
              Refresh
            </button>
          </div>
        </motion.div>

        {err && (
          <div className="mb-4 text-sm rounded-xl px-4 py-3 bg-red-500/10 text-red-300 border border-red-500/20">
            {err}
          </div>
        )}

        {fetching ? (
          <div className="py-20 grid place-items-center">
            <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
          </div>
        ) : rows.length === 0 ? (
          <div className="glass rounded-3xl p-12 text-center">
            <Inbox className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <p className="text-muted-foreground">No submissions yet.</p>
          </div>
        ) : (
          <div className="grid gap-3">
            {rows.map((r) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass rounded-2xl p-5"
              >
                <div className="flex flex-wrap items-start gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-3">
                      <div className="flex items-center gap-2 font-medium">
                        <UserIcon className="h-4 w-4 text-brand-purple" /> {r.name}
                      </div>
                      <a
                        href={`mailto:${r.email}`}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                      >
                        <Mail className="h-3.5 w-3.5" /> {r.email}
                      </a>
                      {r.phone && (
                        <a
                          href={`tel:${r.phone}`}
                          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
                        >
                          <Phone className="h-3.5 w-3.5" /> {r.phone}
                        </a>
                      )}
                    </div>
                    <p className="mt-3 text-sm whitespace-pre-wrap text-foreground/90">
                      {r.message}
                    </p>
                    <p className="mt-3 text-xs text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => del(r.id)}
                    className="text-xs flex items-center gap-1.5 px-3 py-1.5 rounded-full glass hover:bg-red-500/10 hover:text-red-300"
                  >
                    <Trash2 className="h-3.5 w-3.5" /> Delete
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
