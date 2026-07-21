import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "motion/react";
import { useRef, useState } from "react";
import {
  Upload,
  PenLine,
  Search,
  MessageCircle,
  BarChart3,
  Headphones,
  TrendingUp,
  Sparkles,
  Bot,
  Zap,
  ShoppingCart,
  Bell,
  CheckCircle2,
  Eye,
  ArrowRight,
  Play,
  Check,
  X,
  Star,
  Twitter,
  Github,
  Linkedin,
  Youtube,
  Boxes,
  Megaphone,
  Brain,
  Wand2,
  Send,
  Mail,
  Phone,
} from "lucide-react";
import aiEmployee from "@/assets/ai-employee.png";
import { FloatingCard } from "@/components/landing/FloatingCard";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { formatINR, discountPercent } from "@/lib/format";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VasaviStores — First AI Employee for Commerce" },
      {
        name: "description",
        content:
          "Build and run an AI-powered VasaviStores storefront with automated listings, SEO, support, WhatsApp follow-ups and growth insights.",
      },
      { property: "og:title", content: "VasaviStores — First AI Employee for Commerce" },
      {
        property: "og:description",
        content:
          "Build and run an AI-powered VasaviStores storefront with automated listings, SEO, support, WhatsApp follow-ups and growth insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Landing,
});

/* ---------- Small primitives ---------- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-pulse-glow" />
      {children}
    </div>
  );
}

function GradientOrb({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={`pointer-events-none absolute rounded-full blur-3xl opacity-40 ${className ?? ""}`}
    />
  );
}

/* ---------- Nav ---------- */

function Nav() {
  return (
    <header className="fixed top-0 inset-x-0 z-50 flex justify-center pt-4 px-4">
      <nav className="glass rounded-full px-2 py-2 flex items-center gap-1 max-w-4xl w-full">
        <a href="#top" className="flex items-center gap-2 pl-3 pr-4 py-1.5">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
            <Sparkles className="h-4 w-4 text-white" />
          </div>
          <span className="font-display font-semibold tracking-tight">VasaviStores</span>
        </a>
        <div className="hidden md:flex items-center gap-1 text-sm text-muted-foreground ml-2">
          <a href="/shop" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5 transition">Shop</a>
          <a href="#products" className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5 transition">Products</a>
          {["Features", "Pricing", "Contact"].map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="px-3 py-1.5 rounded-full hover:text-foreground hover:bg-white/5 transition"
            >
              {l}
            </a>
          ))}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <a
            href="/shop"
            className="md:hidden text-sm font-medium px-3 py-1.5 rounded-full hover:bg-white/5 transition inline-flex items-center gap-1"
          >
            <ShoppingCart className="h-4 w-4" /> Shop
          </a>
          <a href="/login" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3">
            Sign in
          </a>
          <a href="/shop" className="btn-primary text-sm font-medium rounded-full px-4 py-2 inline-flex items-center gap-1.5">
            <ShoppingCart className="h-4 w-4" /> Shop Now
          </a>
        </div>

      </nav>
    </header>
  );
}

/* ---------- Hero ---------- */

function Hero() {
  return (
    <section id="top" className="relative pt-36 pb-24 md:pt-44 md:pb-32 overflow-hidden">
      <GradientOrb className="h-[500px] w-[500px] -top-40 -left-20 bg-brand-blue/40" />
      <GradientOrb className="h-[500px] w-[500px] top-20 right-0 bg-brand-purple/40" />

      <div className="mx-auto max-w-7xl px-6 grid lg:grid-cols-[1.05fr_1fr] gap-12 items-center">
        <div>
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <SectionLabel>VasaviStores AI Commerce</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-6 text-5xl md:text-7xl font-semibold text-gradient leading-[1.02]"
          >
            VasaviStores
            <br />
            <span className="text-gradient-brand">Your First AI Employee.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            Launch your own AI-powered eCommerce website where one intelligent employee creates
            listings, handles SEO, follows up on WhatsApp, supports customers and turns store data
            into growth actions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="mt-8 flex flex-wrap gap-3"
          >
            <a href="#cta" className="btn-primary rounded-full px-6 py-3 font-medium inline-flex items-center gap-2">
              Start Free <ArrowRight className="h-4 w-4" />
            </a>
            <a href="#cta" className="btn-ghost rounded-full px-6 py-3 font-medium">
              Book Demo
            </a>
            <a
              href="#workflow"
              className="btn-ghost rounded-full px-6 py-3 font-medium inline-flex items-center gap-2"
            >
              <Play className="h-4 w-4" /> Watch AI in Action
            </a>
          </motion.div>

          <div className="mt-10 flex items-center gap-6 text-xs text-muted-foreground">
            <div className="flex -space-x-2">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-7 w-7 rounded-full border-2 border-background bg-gradient-to-br from-brand-blue to-brand-purple"
                />
              ))}
            </div>
            <span>Built for independent brands that want their own AI-first commerce engine</span>
          </div>
        </div>

        {/* Right: AI + floating cards */}
        <div className="relative h-[560px] md:h-[640px]">
          <div className="absolute inset-0 grid place-items-center">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-b from-brand-purple/40 via-brand-blue/20 to-transparent blur-3xl animate-pulse-glow" />
              <motion.img
                src={aiEmployee}
                alt="Vasavi AI Employee"
                width={1024}
                height={1280}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.2 }}
                className="relative h-[520px] md:h-[600px] w-auto object-contain drop-shadow-[0_30px_60px_rgba(120,90,255,0.35)]"
              />
            </div>
          </div>

          {/* Floating workflow cards */}
          <FloatingCard icon={Upload} label="Upload Product" sublabel="in 1 click" className="absolute top-4 left-0" delay={0.4} accent="blue" />
          <FloatingCard icon={PenLine} label="AI Writing" sublabel="Descriptions ready" className="absolute top-24 right-0" delay={0.6} accent="purple" />
          <FloatingCard icon={Search} label="SEO Boost" sublabel="+128% traffic" className="absolute top-1/2 -left-6 -translate-y-1/2" delay={0.8} accent="cyan" />
          <FloatingCard icon={MessageCircle} label="WhatsApp" sublabel="Auto reply" className="absolute bottom-40 right-2" delay={1.0} accent="blue" />
          <FloatingCard icon={BarChart3} label="Analytics" sublabel="Real-time" className="absolute bottom-20 left-2" delay={1.2} accent="purple" />
          <FloatingCard icon={Headphones} label="Customer Support" className="absolute top-40 left-1/2 -translate-x-1/2" delay={1.4} accent="cyan" />
          <FloatingCard icon={TrendingUp} label="Sales Growth" sublabel="+42% MoM" className="absolute bottom-4 right-1/2" delay={1.6} accent="purple" />
        </div>
      </div>

      {/* Logo strip */}
      <div className="mt-20 mx-auto max-w-5xl px-6">
        <p className="text-center text-xs uppercase tracking-widest text-muted-foreground/70">
          Powering AI-first commerce teams built on
        </p>
        <div className="mt-6 grid grid-cols-2 md:grid-cols-6 gap-6 items-center opacity-60">
          {["Nova", "Kairo", "Lumen", "Arcadia", "Vertex", "Halo"].map((n) => (
            <div key={n} className="text-center font-display text-lg tracking-tight text-muted-foreground">
              {n}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Problem ---------- */

const problems = [
  { icon: Upload, label: "Creating catalogues" },
  { icon: PenLine, label: "Writing product pages" },
  { icon: Search, label: "Ranking on search" },
  { icon: Headphones, label: "Serving customers" },
  { icon: Megaphone, label: "Running campaigns" },
  { icon: Boxes, label: "Managing inventory" },
  { icon: BarChart3, label: "Reading analytics" },
  { icon: ShoppingCart, label: "Converting orders" },
];

function Problem() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            Owning an eCommerce brand shouldn't mean stitching together ten different tools.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            VasaviStores brings catalogue, storefront, automation and intelligence into one AI-first
            commerce system built around your brand.
          </p>
        </div>

        <div className="mt-14 grid grid-cols-2 md:grid-cols-4 gap-4">
          {problems.map((p, i) => (
            <motion.div
              key={p.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="glass rounded-2xl p-5 flex flex-col gap-3 hover:-translate-y-1 transition"
            >
              <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center text-muted-foreground">
                <p.icon className="h-4 w-4" />
              </div>
              <div className="text-sm font-medium">{p.label}</div>
              <div className="text-[11px] text-muted-foreground">Manual · Repetitive · Slow</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Solution / AI flow ---------- */

const flow = [
  { icon: Upload, label: "Add product image" },
  { icon: Wand2, label: "Clean visual" },
  { icon: PenLine, label: "Create product page" },
  { icon: Brain, label: "Write brand copy" },
  { icon: Search, label: "Optimize for Google" },
  { icon: TrendingUp, label: "Recommend offer" },
  { icon: CheckCircle2, label: "Publish to your site" },
];

function Solution() {
  return (
    <section className="relative py-32 px-6">
      <GradientOrb className="h-[400px] w-[400px] top-40 left-1/2 -translate-x-1/2 bg-brand-purple/30" />
      <div className="mx-auto max-w-6xl relative">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>The Solution</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold">
            <span className="text-gradient">One AI Employee.</span>{" "}
            <span className="text-gradient-brand">Unlimited possibilities.</span>
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Add one product photo. VasaviStores turns it into a ready-to-sell page on your own site.
          </p>
        </div>

        <div className="mt-16 glass-strong glow-ring rounded-3xl p-8 md:p-10">
          <div className="flex flex-col md:flex-row md:items-stretch md:flex-wrap gap-3">
            {flow.map((f, i) => (
              <div key={f.label} className="flex md:contents items-center gap-3">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="glass rounded-2xl px-4 py-3 flex items-center gap-3 flex-1 min-w-[180px]"
                >
                  <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
                    <f.icon className="h-4 w-4 text-white" />
                  </div>
                  <span className="text-sm font-medium">{f.label}</span>
                </motion.div>
                {i < flow.length - 1 && (
                  <ArrowRight className="hidden md:block h-4 w-4 text-muted-foreground shrink-0 self-center" />
                )}
              </div>
            ))}
          </div>
          <div className="mt-6 flex items-center gap-2 text-xs text-muted-foreground">
            <Zap className="h-3.5 w-3.5 text-brand-cyan" /> Complete in under 8 seconds
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Features ---------- */

const features = [
  { icon: Upload, title: "AI Catalogue Builder", desc: "Drop a photo and generate a complete product page with category, tags and offer." },
  { icon: PenLine, title: "AI Brand Writer", desc: "Product copy, FAQs and landing content that sound like your business." },
  { icon: Search, title: "AI SEO Engine", desc: "Metadata, schema and keyword structure prepared for Google discovery." },
  { icon: Eye, title: "Visitor Intelligence", desc: "See who's browsing, where they came from, and what they want." },
  { icon: ShoppingCart, title: "Abandoned Cart Recovery", desc: "Automatic nudges that bring shoppers back to checkout." },
  { icon: MessageCircle, title: "WhatsApp Automation", desc: "Order updates and support flows on the app your customers use." },
  { icon: Headphones, title: "AI Customer Support", desc: "24×7 replies trained on your catalogue, delivery rules and policies." },
  { icon: BarChart3, title: "Smart Store Analytics", desc: "Plain-English reports that explain what is working and what to change." },
  { icon: Megaphone, title: "Marketing Automation", desc: "Offers, campaigns and follow-ups that adapt to visitor behaviour." },
  { icon: Brain, title: "AI Business Insights", desc: "Weekly strategy for products, pricing and conversion — built into your store." },
];

function Features() {
  return (
    <section id="features" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel>Features</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            Every job in your store, handled by one AI.
          </h2>
        </div>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: (i % 3) * 0.08 }}
              className="group glass glow-ring rounded-3xl p-6 hover:-translate-y-1 transition duration-300"
            >
              <div className="h-11 w-11 rounded-2xl bg-gradient-to-br from-brand-blue/30 to-brand-purple/30 border border-white/10 grid place-items-center group-hover:from-brand-blue/60 group-hover:to-brand-purple/60 transition">
                <f.icon className="h-5 w-5 text-white" />
              </div>
              <h3 className="mt-5 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Workflow Timeline ---------- */

const timeline = [
  { icon: Eye, title: "Customer Visits Website", side: "left" },
  { icon: ShoppingCart, title: "Views Product", side: "right" },
  { icon: ShoppingCart, title: "Adds to Cart", side: "left" },
  { icon: X, title: "Leaves", side: "right" },
  { icon: Brain, title: "AI Detects", side: "left" },
  { icon: MessageCircle, title: "WhatsApp Reminder", side: "right" },
  { icon: ArrowRight, title: "Customer Returns", side: "left" },
  { icon: CheckCircle2, title: "Order Completed", side: "right" },
];

function Workflow() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const lineHeight = useTransform(scrollYProgress, [0.1, 0.9], ["0%", "100%"]);

  return (
    <section id="workflow" ref={ref} className="relative py-32 px-6">
      <div className="mx-auto max-w-5xl">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Interactive AI Workflow</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            The AI never misses a customer.
          </h2>
        </div>

        <div className="relative mt-20">
          {/* Center line */}
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-px bg-white/10" />
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-1/2 -translate-x-1/2 top-0 w-px bg-gradient-to-b from-brand-blue via-brand-purple to-transparent"
          />

          <div className="space-y-10">
            {timeline.map((t, i) => (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: t.side === "left" ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.6 }}
                className={`relative grid grid-cols-[1fr_auto_1fr] items-center gap-6`}
              >
                <div className={t.side === "left" ? "" : "invisible"}>
                  {t.side === "left" && (
                    <div className="glass rounded-2xl p-5 ml-auto max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
                          <t.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-medium">{t.title}</div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="relative h-4 w-4 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple ring-4 ring-background z-10 shadow-[0_0_20px_rgba(140,100,255,0.6)]" />
                <div className={t.side === "right" ? "" : "invisible"}>
                  {t.side === "right" && (
                    <div className="glass rounded-2xl p-5 max-w-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
                          <t.icon className="h-4 w-4 text-white" />
                        </div>
                        <div className="font-medium">{t.title}</div>
                      </div>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Comparison ---------- */

function Comparison() {
  const traditional = [
    "Rent a generic template",
    "Install separate apps for every task",
    "Manually build every product page",
    "Follow up with customers one by one",
    "Guess which products will grow",
  ];
  const vasavi = [
    "Own an AI-first storefront",
    "Catalogue, SEO, support and growth in one system",
    "AI creates complete pages in seconds",
    "WhatsApp follow-ups run automatically",
    "AI recommends the next growth move",
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Old vs New</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            Not a template marketplace. A commerce operator.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Old eCommerce Stack</div>
            <div className="mt-2 text-2xl font-semibold">Tools everywhere. Work still on you.</div>
            <ul className="mt-8 space-y-4">
              {traditional.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm text-muted-foreground">
                  <X className="h-4 w-4 text-destructive shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-strong glow-ring rounded-3xl p-8 relative overflow-hidden">
            <div className="absolute -top-20 -right-20 h-64 w-64 rounded-full bg-brand-purple/30 blur-3xl" />
            <div className="text-xs uppercase tracking-widest text-brand-cyan relative">VasaviStores</div>
            <div className="mt-2 text-2xl font-semibold relative">Your AI employee runs the engine.</div>
            <ul className="mt-8 space-y-4 relative">
              {vasavi.map((t) => (
                <li key={t} className="flex items-start gap-3 text-sm">
                  <Check className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- How It Works ---------- */

const steps = [
  { n: "01", title: "Create your Vasavi storefront", desc: "Start with your brand, catalogue and selling style." },
  { n: "02", title: "Upload one product image", desc: "The AI reads the product and prepares the page." },
  { n: "03", title: "AI builds the sell-ready page", desc: "Copy, SEO, tags, offer and product story — instantly." },
  { n: "04", title: "Publish to your own site", desc: "A polished product page goes live without manual setup." },
  { n: "05", title: "AI keeps improving sales", desc: "Support, follow-ups, campaigns and insights stay always on." },
];

function HowItWorks() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel>How It Works</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">Launch in 5 steps.</h2>
        </div>

        <div className="mt-14 grid md:grid-cols-5 gap-4">
          {steps.map((s, i) => (
            <motion.div
              key={s.n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6 relative"
            >
              <div className="text-xs font-mono text-brand-cyan">{s.n}</div>
              <h3 className="mt-3 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Testimonials ---------- */

const testimonials = [
  {
    quote:
      "VasaviStores gave us an eCommerce engine that thinks, writes and follows up. It feels like our first AI hire.",
    name: "Aarav Mehta",
    role: "Founder, Nova Apparel",
  },
  {
    quote:
      "Our catalogue now goes live the same day products arrive. The AI handles the work we used to delay.",
    name: "Priya Rangan",
    role: "CEO, Kairo Home",
  },
  {
    quote:
      "The WhatsApp follow-ups and AI product pages changed how we launch. This is not a store template — it is an operator.",
    name: "Daniel Cho",
    role: "Growth Lead, Lumen Skin",
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel>Founders love it</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            Built by operators, loved by founders.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-3xl p-6"
            >
              <div className="flex gap-1 text-brand-cyan">
                {Array.from({ length: 5 }).map((_, k) => (
                  <Star key={k} className="h-3.5 w-3.5 fill-current" />
                ))}
              </div>
              <p className="mt-4 text-base leading-relaxed">"{t.quote}"</p>
              <div className="mt-6 flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-gradient-to-br from-brand-blue to-brand-purple" />
                <div>
                  <div className="text-sm font-medium">{t.name}</div>
                  <div className="text-xs text-muted-foreground">{t.role}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- Pricing ---------- */

const plans = [
  {
    name: "Starter",
    price: "$29",
    tag: "For new brands launching their own store",
    features: ["100 AI product pages", "AI writer & SEO", "WhatsApp basics", "Email support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$99",
    tag: "For brands ready to grow faster",
    features: [
      "1,000 AI product pages",
      "Cart recovery & automation",
      "Visitor intelligence",
      "AI customer support",
      "Priority support",
    ],
    cta: "Start Growth",
    highlight: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    tag: "For serious operators",
    features: ["Unlimited AI actions", "Custom integrations", "Dedicated AI training", "SLA & CSM"],
    cta: "Contact Sales",
    highlight: false,
  },
];

function Pricing() {
  return (
    <section id="pricing" className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Pricing</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            One employee. One flat price.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-3 gap-5">
          {plans.map((p) => (
            <div
              key={p.name}
              className={`rounded-3xl p-8 relative ${
                p.highlight ? "glass-strong glow-ring" : "glass"
              }`}
            >
              {p.highlight && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-widest px-3 py-1 rounded-full bg-gradient-to-r from-brand-blue to-brand-purple text-white font-medium">
                  Most popular
                </div>
              )}
              <div className="text-sm text-muted-foreground">{p.name}</div>
              <div className="mt-3 flex items-baseline gap-1">
                <span className="text-4xl font-semibold">{p.price}</span>
                {p.price !== "Custom" && <span className="text-sm text-muted-foreground">/mo</span>}
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{p.tag}</p>
              <a
                href="#cta"
                className={`mt-6 inline-flex w-full items-center justify-center rounded-full px-5 py-3 text-sm font-medium ${
                  p.highlight ? "btn-primary" : "btn-ghost"
                }`}
              >
                {p.cta}
              </a>
              <ul className="mt-8 space-y-3">
                {p.features.map((f) => (
                  <li key={f} className="flex items-start gap-2 text-sm text-muted-foreground">
                    <Check className="h-4 w-4 text-brand-cyan shrink-0 mt-0.5" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------- CTA ---------- */

function CTA() {
  return (
    <section id="cta" className="relative py-32 px-6">
      <div className="mx-auto max-w-4xl">
        <div className="relative glass-strong glow-ring rounded-[2.5rem] p-12 md:p-16 text-center overflow-hidden">
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-purple/40 blur-3xl" />
          <div className="absolute -bottom-32 left-1/2 -translate-x-1/2 h-72 w-72 rounded-full bg-brand-blue/40 blur-3xl" />
          <div className="relative">
            <div className="mx-auto h-14 w-14 rounded-2xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Bot className="h-6 w-6 text-white" />
            </div>
            <h2 className="mt-6 text-4xl md:text-5xl font-semibold text-gradient">
              Ready to hire your first AI employee?
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Free to start. No credit card. Live in minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3 justify-center">
              <a href="#" className="btn-primary rounded-full px-6 py-3 font-medium inline-flex items-center gap-2">
                Start Free <ArrowRight className="h-4 w-4" />
              </a>
              <a href="#" className="btn-ghost rounded-full px-6 py-3 font-medium">
                Book Demo
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- Footer ---------- */

function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-16 px-6 mt-10">
      <div className="mx-auto max-w-6xl grid md:grid-cols-4 gap-10">
        <div className="md:col-span-2">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-display font-semibold tracking-tight text-lg">VasaviStores</span>
          </div>
          <p className="mt-4 max-w-sm text-sm text-muted-foreground">
            Your first AI employee for your own eCommerce website. Built for founders who want a
            store that works while they sleep.
          </p>
          <div className="mt-6 flex items-center gap-3">
            {[Twitter, Github, Linkedin, Youtube].map((I, i) => (
              <a
                key={i}
                href="#"
                className="h-9 w-9 rounded-full glass grid place-items-center text-muted-foreground hover:text-foreground transition"
              >
                <I className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <div className="text-sm font-medium">Product</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["Features", "Pricing", "Changelog", "Roadmap"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <div className="text-sm font-medium">Company</div>
          <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
            {["About", "Blog", "Careers", "Contact"].map((l) => (
              <li key={l}>
                <a href="#" className="hover:text-foreground transition">
                  {l}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="mx-auto max-w-6xl mt-12 pt-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
        <span>© {new Date().getFullYear()} VasaviStores. All rights reserved.</span>
        <div className="flex items-center gap-4">
          <a href="#" className="hover:text-foreground transition">Privacy</a>
          <a href="#" className="hover:text-foreground transition">Terms</a>
            <a href="mailto:dildileep.01@gmail.com" className="hover:text-foreground transition">
              dildileep.01@gmail.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Contact ---------- */

function Contact() {
  const [form, setForm] = useState({ name: "", email: "", store: "", message: "" });
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string>("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus("sending");
    setErrorMsg("");
    try {
      const { supabase } = await import("@/integrations/supabase/client");
      const { error } = await supabase.from("contact_submissions").insert({
        name: form.name.trim(),
        email: form.email.trim(),
        phone: form.store.trim() || null,
        message: form.message.trim(),
      });
      if (error) throw error;
      setStatus("sent");
      setForm({ name: "", email: "", store: "", message: "" });
    } catch (err: any) {
      setStatus("error");
      setErrorMsg(err?.message || "Something went wrong. Please try again.");
    }
  }


  return (
    <section id="contact" className="relative py-32 px-6">
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-14">
          <SectionLabel>Contact</SectionLabel>
          <h2 className="text-4xl md:text-5xl font-bold font-display mt-4 text-gradient">
            Talk to a human (and our AI)
          </h2>
          <p className="text-muted-foreground mt-4 max-w-2xl mx-auto">
            Send us a message — it lands instantly on WhatsApp and email. We usually reply within a few hours.
          </p>
        </div>

        <div className="grid md:grid-cols-5 gap-8">
          {/* Info panel */}
          <div className="md:col-span-2 space-y-4">
            <a
              href="https://wa.me/917204343440"
              target="_blank"
              rel="noopener noreferrer"
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.06] transition"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-green-400/20 to-emerald-500/20 flex items-center justify-center">
                <MessageCircle className="h-5 w-5 text-green-400" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">WhatsApp</div>
                <div className="font-medium">+91 72043 43440</div>
              </div>
            </a>

            <a
              href="mailto:dildileep.01@gmail.com"
              className="glass rounded-2xl p-5 flex items-center gap-4 hover:bg-white/[0.06] transition"
            >
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-primary/30 to-purple-500/30 flex items-center justify-center">
                <Mail className="h-5 w-5 text-primary" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Email</div>
                <div className="font-medium">dildileep.01@gmail.com</div>
              </div>
            </a>

            <div className="glass rounded-2xl p-5 flex items-center gap-4">
              <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-purple-500/30 to-primary/30 flex items-center justify-center">
                <Phone className="h-5 w-5 text-purple-300" />
              </div>
              <div>
                <div className="text-sm text-muted-foreground">Response time</div>
                <div className="font-medium">Under 4 hours, 7 days a week</div>
              </div>
            </div>
          </div>

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="md:col-span-3 glass-strong rounded-3xl p-6 md:p-8 space-y-4"
          >
            <div className="grid sm:grid-cols-2 gap-4">
              <label className="block">
                <span className="text-sm text-muted-foreground">Your name</span>
                <input
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60 focus:bg-white/[0.07] transition"
                  placeholder="Priya Sharma"
                />
              </label>
              <label className="block">
                <span className="text-sm text-muted-foreground">Email</span>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60 focus:bg-white/[0.07] transition"
                  placeholder="you@store.com"
                />
              </label>
            </div>

            <label className="block">
              <span className="text-sm text-muted-foreground">Store / website (optional)</span>
              <input
                value={form.store}
                onChange={(e) => setForm({ ...form, store: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60 focus:bg-white/[0.07] transition"
                placeholder="mystore.com"
              />
            </label>

            <label className="block">
              <span className="text-sm text-muted-foreground">How can our AI employee help?</span>
              <textarea
                required
                rows={5}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="mt-1 w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 outline-none focus:border-primary/60 focus:bg-white/[0.07] transition resize-none"
                placeholder="I run a fashion store with 500 SKUs and want to automate listings, SEO and WhatsApp support…"
              />
            </label>

            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
              <p className="text-xs text-muted-foreground">
                {status === "error"
                  ? errorMsg
                  : status === "sent"
                  ? "Thanks! Your message was delivered to our inbox."
                  : "Your message is emailed directly to our team — we reply within a few hours."}
              </p>
              <button
                type="submit"
                disabled={status === "sending"}
                className="btn-primary inline-flex items-center gap-2 px-6 py-3 disabled:opacity-60"
              >
                <Send className="h-4 w-4" />
                {status === "sending"
                  ? "Sending…"
                  : status === "sent"
                  ? "Sent — thank you!"
                  : "Send message"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ---------- Featured Products (from Supabase) ---------- */

type FeaturedProduct = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  images: string[];
  price_paise: number;
  mrp_paise: number;
  rating_avg: number;
  rating_count: number;
};

function FeaturedProducts() {
  const [items, setItems] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    (async () => {
      const { data } = await supabase
        .from("products")
        .select("id,name,slug,tagline,images,price_paise,mrp_paise,rating_avg,rating_count")
        .eq("is_active", true)
        .order("rating_count", { ascending: false })
        .limit(6);
      setItems((data ?? []) as FeaturedProduct[]);
      setLoading(false);
    })();
  }, []);

  return (
    <section id="products" className="relative py-32 px-6">
      <GradientOrb className="h-[420px] w-[420px] top-20 -right-20 bg-brand-blue/30" />
      <div className="mx-auto max-w-6xl relative">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionLabel>Shop</SectionLabel>
            <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
              Smart products from VasaviStores.
            </h2>
            <p className="mt-4 text-muted-foreground text-lg">
              Premium, AI-powered tools for modern Indian businesses. Free shipping across India.
            </p>
          </div>
          <Link to="/shop" className="btn-ghost rounded-full px-5 py-2.5 text-sm inline-flex items-center gap-2">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {loading
            ? Array.from({ length: 3 }).map((_, i) => (
                <div key={i} className="glass rounded-3xl aspect-[4/5] animate-pulse" />
              ))
            : items.map((p) => {
                const off = discountPercent(p.mrp_paise, p.price_paise);
                return (
                  <Link
                    key={p.id}
                    to={`/products/${p.slug}`}
                    className="group glass glow-ring rounded-3xl overflow-hidden hover:-translate-y-1 transition"
                  >
                    <div className="relative aspect-square bg-white/5 overflow-hidden">
                      {p.images?.[0] && (
                        <img
                          src={p.images[0]}
                          alt={p.name}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      )}
                      {off > 0 && (
                        <div className="absolute top-3 left-3 text-[11px] font-semibold px-2 py-1 rounded-full bg-brand-purple/90 text-white">
                          {off}% OFF
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <div className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="text-foreground font-medium">{p.rating_avg.toFixed(1)}</span>
                        <span>({p.rating_count} reviews)</span>
                      </div>
                      <h3 className="mt-1 font-display font-semibold text-lg">{p.name}</h3>
                      {p.tagline && <p className="text-xs text-muted-foreground">{p.tagline}</p>}
                      <div className="mt-3 flex items-baseline gap-2">
                        <span className="font-semibold text-lg">{formatINR(p.price_paise)}</span>
                        {p.mrp_paise > p.price_paise && (
                          <span className="text-xs text-muted-foreground line-through">
                            {formatINR(p.mrp_paise)}
                          </span>
                        )}
                      </div>
                    </div>
                  </Link>
                );
              })}
        </div>
      </div>
    </section>
  );
}

/* ---------- Page ---------- */

function Landing() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <FeaturedProducts />
        <Problem />
        <Solution />
        <Features />
        <Workflow />
        <Comparison />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <Contact />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default Landing;
