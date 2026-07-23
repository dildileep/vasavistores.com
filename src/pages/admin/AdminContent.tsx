import { useState } from "react";
import { FileText, Globe, HelpCircle, Plus, Edit3, Trash2, Eye } from "lucide-react";

const blogPosts = [
  { title: "Why Every Business Needs an NFC Card in 2026", status: "published", views: 1240, date: "2026-07-15" },
  { title: "How TapReview Helped Grow Our Google Reviews by 10x", status: "published", views: 892, date: "2026-07-08" },
  { title: "NFC vs QR Codes: Which Is Better for Your Business?", status: "draft", views: 0, date: "2026-07-20" },
];
const faqs = [
  { q: "Does TapReview work on all phones?", a: "Yes — it works on any NFC-enabled smartphone (iPhone 7+ and most Android phones)." },
  { q: "Do I need an app to use TapReview?", a: "No app required. Just tap the card on any NFC-enabled phone." },
  { q: "How do I set up my NFC card?", a: "After purchase, log in to your dashboard and follow the 3-step setup guide." },
];

export default function AdminContent() {
  const [tab, setTab] = useState<"blog" | "pages" | "faqs">("blog");

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-semibold">Content</h1>
          <p className="text-muted-foreground text-sm mt-1">Blog posts, landing pages, SEO pages, and FAQs.</p>
        </div>
        <button className="btn-primary px-4 py-2 rounded-xl text-sm flex items-center gap-2">
          <Plus className="h-4 w-4" /> New Post
        </button>
      </div>

      <div className="flex glass rounded-xl p-1 gap-1 w-fit">
        {(["blog", "pages", "faqs"] as const).map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-colors ${
              tab === t ? "bg-brand-purple text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t === "blog" ? "Blog" : t === "pages" ? "Pages" : "FAQs"}
          </button>
        ))}
      </div>

      {tab === "blog" && (
        <div className="glass rounded-2xl overflow-hidden">
          <div className="px-5 py-4 border-b border-white/5">
            <h3 className="font-semibold text-sm">Blog Posts</h3>
          </div>
          <div className="divide-y divide-white/5">
            {blogPosts.map((p) => (
              <div key={p.title} className="px-5 py-4 flex flex-wrap items-center gap-4 hover:bg-white/2 transition-colors">
                <div className="flex-1 min-w-0">
                  <div className="font-medium text-sm line-clamp-1">{p.title}</div>
                  <div className="text-xs text-muted-foreground mt-0.5">{p.date}</div>
                </div>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Eye className="h-3.5 w-3.5" /> {p.views.toLocaleString()}
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium capitalize ${
                  p.status === "published" ? "bg-green-500/10 text-green-400" : "bg-white/5 text-muted-foreground"
                }`}>
                  {p.status}
                </span>
                <div className="flex gap-1">
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {tab === "pages" && (
        <div className="glass rounded-2xl p-8 text-center space-y-4">
          <Globe className="h-10 w-10 text-brand-purple mx-auto opacity-50" />
          <h3 className="font-semibold">Landing Page Builder</h3>
          <p className="text-sm text-muted-foreground max-w-sm mx-auto">
            Create custom landing pages and SEO pages for your store. Drag-and-drop editor coming soon.
          </p>
          <button className="btn-primary px-6 py-2.5 rounded-xl text-sm mx-auto flex items-center gap-2">
            <Plus className="h-4 w-4" /> Create Page
          </button>
        </div>
      )}

      {tab === "faqs" && (
        <div className="space-y-3">
          {faqs.map((f, i) => (
            <div key={i} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="font-medium text-sm flex items-center gap-2">
                    <HelpCircle className="h-4 w-4 text-brand-purple shrink-0" />
                    {f.q}
                  </div>
                  <div className="text-sm text-muted-foreground mt-2 ml-6">{f.a}</div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <button className="p-1.5 rounded-lg hover:bg-white/5 text-muted-foreground hover:text-foreground transition-colors">
                    <Edit3 className="h-3.5 w-3.5" />
                  </button>
                  <button className="p-1.5 rounded-lg hover:bg-red-500/10 text-muted-foreground hover:text-red-400 transition-colors">
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
          <button className="w-full glass rounded-2xl p-4 text-sm text-muted-foreground hover:text-foreground hover:bg-white/5 transition-colors flex items-center justify-center gap-2">
            <Plus className="h-4 w-4" /> Add FAQ
          </button>
        </div>
      )}
    </div>
  );
}
