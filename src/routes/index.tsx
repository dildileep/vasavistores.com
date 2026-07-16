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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "VasaviStores — Your First AI Employee for Your Online Store" },
      {
        name: "description",
        content:
          "VasaviStores is an AI-first eCommerce platform. Your first AI employee uploads products, writes descriptions, optimizes SEO, recovers carts and grows your store 24×7.",
      },
      { property: "og:title", content: "VasaviStores — Your First AI Employee" },
      {
        property: "og:description",
        content:
          "An AI worker that runs your online store — from product uploads to SEO, WhatsApp, analytics and customer support.",
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
          {["Features", "Workflow", "Pricing", "Testimonials"].map((l) => (
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
          <a href="#pricing" className="hidden sm:inline text-sm text-muted-foreground hover:text-foreground px-3">
            Sign in
          </a>
          <a href="#cta" className="btn-primary text-sm font-medium rounded-full px-4 py-2">
            Start Free
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
            <SectionLabel>Introducing VasaviStores AI</SectionLabel>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="mt-6 text-5xl md:text-7xl font-semibold text-gradient leading-[1.02]"
          >
            Meet Your First
            <br />
            <span className="text-gradient-brand">AI Employee.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="mt-6 max-w-xl text-lg text-muted-foreground leading-relaxed"
          >
            An AI worker that uploads products, writes descriptions, optimizes SEO, tracks visitors,
            recovers abandoned carts, answers customers and helps grow your online store —
            automatically.
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
            <span>Trusted by 3,400+ merchants worldwide</span>
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
          Powering stores that ship with
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
  { icon: Upload, label: "Uploading products" },
  { icon: PenLine, label: "Writing descriptions" },
  { icon: Search, label: "SEO" },
  { icon: Headphones, label: "Customer support" },
  { icon: Megaphone, label: "Marketing" },
  { icon: Boxes, label: "Inventory" },
  { icon: BarChart3, label: "Analytics" },
  { icon: ShoppingCart, label: "Order management" },
];

function Problem() {
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="max-w-3xl">
          <SectionLabel>The Problem</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            Running an online store shouldn't feel like five full-time jobs.
          </h2>
          <p className="mt-4 text-muted-foreground text-lg">
            Every day, merchants juggle a dozen tools — and burn out before they scale.
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
  { icon: Upload, label: "Upload one image" },
  { icon: Wand2, label: "Remove background" },
  { icon: PenLine, label: "Write title" },
  { icon: Brain, label: "Generate description" },
  { icon: Search, label: "Suggest SEO" },
  { icon: TrendingUp, label: "Suggest pricing" },
  { icon: CheckCircle2, label: "Publish" },
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
            Upload one photo. Watch a full product listing come to life — in seconds.
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
  { icon: Upload, title: "AI Product Upload", desc: "Drop a photo, get a full product — categorized, tagged and priced." },
  { icon: PenLine, title: "AI Content Writer", desc: "Compelling titles and descriptions that sound like your brand." },
  { icon: Search, title: "AI SEO Generator", desc: "Meta, schema and keywords that actually rank on Google." },
  { icon: Eye, title: "Visitor Intelligence", desc: "See who's browsing, where they came from, and what they want." },
  { icon: ShoppingCart, title: "Abandoned Cart Recovery", desc: "Automatic nudges that bring shoppers back to checkout." },
  { icon: MessageCircle, title: "WhatsApp Automation", desc: "Order updates and support flows on the app your customers use." },
  { icon: Headphones, title: "AI Customer Support", desc: "24×7 human-like replies trained on your products and policies." },
  { icon: BarChart3, title: "Smart Analytics", desc: "Plain-English reports that tell you what to do next." },
  { icon: Megaphone, title: "Marketing Automation", desc: "Emails, campaigns and offers that adapt in real time." },
  { icon: Brain, title: "AI Business Insights", desc: "Weekly strategy — like a CMO who never sleeps." },
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
    "Manually list every product",
    "Write descriptions by hand",
    "Chase abandoned carts alone",
    "Answer every customer message",
    "Guess what's working",
  ];
  const vasavi = [
    "AI lists in seconds",
    "AI writes on-brand copy",
    "AI recovers carts on WhatsApp",
    "AI replies 24×7",
    "AI tells you what to do next",
  ];
  return (
    <section className="relative py-32 px-6">
      <div className="mx-auto max-w-6xl">
        <div className="text-center max-w-3xl mx-auto">
          <SectionLabel>Old vs New</SectionLabel>
          <h2 className="mt-5 text-4xl md:text-5xl font-semibold text-gradient">
            The difference is night and day.
          </h2>
        </div>

        <div className="mt-14 grid md:grid-cols-2 gap-5">
          <div className="glass rounded-3xl p-8">
            <div className="text-xs uppercase tracking-widest text-muted-foreground">Traditional Store</div>
            <div className="mt-2 text-2xl font-semibold">You do everything.</div>
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
            <div className="mt-2 text-2xl font-semibold relative">AI does everything.</div>
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
  { n: "01", title: "Connect your store", desc: "Shopify, WooCommerce or start fresh — one click." },
  { n: "02", title: "Upload one product image", desc: "That's it. No forms, no fields." },
  { n: "03", title: "AI creates complete listing", desc: "Title, description, SEO, price — instantly." },
  { n: "04", title: "Publish instantly", desc: "Live on your store in seconds." },
  { n: "05", title: "AI keeps working 24×7", desc: "Support, marketing, insights — always on." },
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
      "Vasavi replaced three tools and half our ops team. Our first AI hire — and the best one.",
    name: "Aarav Mehta",
    role: "Founder, Nova Apparel",
  },
  {
    quote:
      "We list 200 products a week now. It used to take a month. This is the future of commerce.",
    name: "Priya Rangan",
    role: "CEO, Kairo Home",
  },
  {
    quote:
      "The WhatsApp cart recovery alone pays for itself 40×. Every DTC brand needs this.",
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
    tag: "For new stores finding their feet",
    features: ["100 AI product uploads", "AI writer & SEO", "WhatsApp basics", "Email support"],
    cta: "Start Free",
    highlight: false,
  },
  {
    name: "Growth",
    price: "$99",
    tag: "For scaling brands",
    features: [
      "1,000 AI uploads",
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
            Your first AI employee for your online store. Built for founders who want to move faster
            than yesterday.
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
          <a href="mailto:hello@vasavistores.com" className="hover:text-foreground transition">
            hello@vasavistores.com
          </a>
        </div>
      </div>
    </footer>
  );
}

/* ---------- Page ---------- */

function Landing() {
  return (
    <div className="min-h-screen text-foreground overflow-x-hidden">
      <Nav />
      <main>
        <Hero />
        <Problem />
        <Solution />
        <Features />
        <Workflow />
        <Comparison />
        <HowItWorks />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}
