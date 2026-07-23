import { useState, useRef, useEffect } from "react";
import {
  Bot, Send, Sparkles, Package, Megaphone, TrendingUp, Search, Image as ImageIcon,
  MessageSquare, BarChart2, Zap, ChevronRight,
} from "lucide-react";

type Message = { role: "user" | "ai"; text: string; time: string };

const quickCommands = [
  { icon: Package, label: "Generate product description", cmd: "Generate SEO description for TapReview AI NFC Card" },
  { icon: Megaphone, label: "Create Diwali campaign", cmd: "Create a Diwali marketing campaign with discount ideas" },
  { icon: TrendingUp, label: "Today's sales summary", cmd: "Show today's sales performance and insights" },
  { icon: Search, label: "Find low-performing products", cmd: "Find products with low conversion and suggest improvements" },
  { icon: ImageIcon, label: "Instagram content", cmd: "Generate 5 Instagram post ideas for TapReview NFC Card" },
  { icon: BarChart2, label: "Revenue forecast", cmd: "Forecast revenue for next 30 days based on current trends" },
  { icon: MessageSquare, label: "WhatsApp follow-up", cmd: "Write WhatsApp follow-up message for abandoned carts" },
  { icon: Zap, label: "Discount recommendations", cmd: "Recommend optimal discounts to boost this week's sales" },
];

const aiResponses: Record<string, string> = {
  default: "I'm analyzing your store data… Here's what I found:\n\n• Your best-selling day is Friday with avg 12 orders\n• TapReview NFC Card has a 4.2% conversion rate (above industry avg of 2.8%)\n• Cart abandonment spiked Tuesday — consider a WhatsApp recovery flow\n\nWould you like me to take any action?",
  seo: "Here's an SEO-optimized description for **TapReview AI NFC Card**:\n\n*Tap. Connect. Review.*\n\nThe TapReview AI NFC Card is India's smartest digital business card, engineered for modern D2C brands and professionals. One tap on any smartphone instantly opens your Google Review page, product showcase, or contact card — no app required.\n\n✅ Works on all NFC-enabled phones\n✅ Lifetime free setup\n✅ AI-powered review collection\n\nTarget keywords: NFC business card India, smart review card, digital business card ₹499",
  diwali: "🎆 **Diwali Campaign Plan**\n\n**Offer:** Buy 2 TapReview Cards, Get 1 Free (₹998 → ₹499 each)\n\n**Channels:**\n• WhatsApp blast to existing customers\n• Instagram Story countdown (3 days)\n• Email campaign with festive GIF\n\n**Timing:** Oct 28 – Nov 3\n\n**Expected uplift:** +35% orders based on last Diwali trend\n\nShall I generate the WhatsApp message and Instagram caption now?",
  sales: "📊 **Today's Sales Summary** (Live)\n\n• Revenue: ₹4,299\n• Orders: 9\n• Avg Order Value: ₹477\n• Top product: TapReview AI NFC Card (7 units)\n• New customers: 6\n• Returning: 3\n\n⚡ You're on track for ₹30,000+ this week if this pace continues.\n\nBest performing traffic source today: **Google Search** (62%)",
};

function getAIResponse(input: string): string {
  const lower = input.toLowerCase();
  if (lower.includes("seo") || lower.includes("description")) return aiResponses.seo;
  if (lower.includes("diwali") || lower.includes("campaign")) return aiResponses.diwali;
  if (lower.includes("sales") || lower.includes("today")) return aiResponses.sales;
  return aiResponses.default;
}

export default function AdminAICenter() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      text: "👋 Hi! I'm your VasaviStores AI assistant. I can help you manage products, run campaigns, analyze sales, generate content, and much more.\n\nTry a quick command below or just type what you need.",
      time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim() || loading) return;
    const userMsg: Message = { role: "user", text, time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    const aiMsg: Message = { role: "ai", text: getAIResponse(text), time: new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }) };
    setMessages((prev) => [...prev, aiMsg]);
    setLoading(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">AI Command Center</h1>
        <p className="text-muted-foreground text-sm mt-1">Command your AI employees — products, marketing, support, analytics.</p>
      </div>

      <div className="grid md:grid-cols-[1fr_280px] gap-4 items-start">
        {/* Chat */}
        <div className="glass rounded-2xl flex flex-col" style={{ height: "calc(100vh - 280px)", minHeight: 480 }}>
          {/* Header */}
          <div className="px-5 py-3.5 border-b border-white/5 flex items-center gap-3">
            <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center">
              <Bot className="h-4 w-4 text-white" />
            </div>
            <div>
              <div className="font-semibold text-sm">VasaviStores AI</div>
              <div className="flex items-center gap-1.5 text-xs text-green-400">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-pulse" />
                Online
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((m, i) => (
              <div key={i} className={`flex gap-3 ${m.role === "user" ? "flex-row-reverse" : ""}`}>
                {m.role === "ai" && (
                  <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center shrink-0 mt-0.5">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                )}
                <div className={`max-w-[80%] ${m.role === "user" ? "items-end" : "items-start"} flex flex-col gap-1`}>
                  <div className={`rounded-2xl px-4 py-3 text-sm whitespace-pre-wrap leading-relaxed ${
                    m.role === "user"
                      ? "bg-gradient-to-br from-brand-blue to-brand-purple text-white rounded-br-sm"
                      : "glass rounded-bl-sm"
                  }`}>
                    {m.text}
                  </div>
                  <span className="text-[10px] text-muted-foreground px-1">{m.time}</span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex gap-3">
                <div className="h-8 w-8 rounded-xl bg-gradient-to-br from-brand-blue to-brand-purple grid place-items-center shrink-0">
                  <Sparkles className="h-3.5 w-3.5 text-white" />
                </div>
                <div className="glass rounded-2xl rounded-bl-sm px-4 py-3">
                  <div className="flex gap-1">
                    {[0, 1, 2].map((i) => (
                      <span key={i} className="h-1.5 w-1.5 rounded-full bg-brand-purple animate-bounce" style={{ animationDelay: `${i * 0.15}s` }} />
                    ))}
                  </div>
                </div>
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-white/5">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && send(input)}
                placeholder="Type a command or ask anything…"
                className="flex-1 bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm outline-none focus:border-brand-purple/50 transition-colors placeholder:text-muted-foreground"
              />
              <button
                onClick={() => send(input)}
                disabled={!input.trim() || loading}
                className="btn-primary px-4 py-2.5 rounded-xl disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Quick Commands */}
        <div className="glass rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-4">
            <Zap className="h-4 w-4 text-brand-purple" />
            <span className="font-semibold text-sm">Quick Commands</span>
          </div>
          <div className="space-y-1.5">
            {quickCommands.map((q) => (
              <button
                key={q.label}
                onClick={() => send(q.cmd)}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-white/5 text-left transition-colors group"
              >
                <div className="h-7 w-7 rounded-lg bg-white/5 grid place-items-center shrink-0 group-hover:bg-brand-purple/20 transition-colors">
                  <q.icon className="h-3.5 w-3.5 text-muted-foreground group-hover:text-brand-purple transition-colors" />
                </div>
                <span className="text-xs text-muted-foreground group-hover:text-foreground transition-colors flex-1 leading-tight">{q.label}</span>
                <ChevronRight className="h-3.5 w-3.5 text-muted-foreground/40 shrink-0" />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
