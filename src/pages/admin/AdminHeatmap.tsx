import { useState } from "react";
import { Flame, MousePointer, ScrollText, BarChart2, Monitor, Smartphone } from "lucide-react";

type HeatmapPage = "landing" | "shop" | "product" | "cart" | "checkout";
type Device = "desktop" | "mobile";

const hotspots: Record<HeatmapPage, { x: number; y: number; intensity: number; label: string }[]> = {
  landing: [
    { x: 50, y: 55, intensity: 95, label: "Shop Now CTA" },
    { x: 72, y: 12, intensity: 82, label: "Nav: Shop" },
    { x: 50, y: 72, intensity: 61, label: "Features Section" },
    { x: 50, y: 88, intensity: 44, label: "Pricing Section" },
    { x: 15, y: 12, intensity: 38, label: "Logo" },
  ],
  shop: [
    { x: 25, y: 35, intensity: 90, label: "Product Card 1" },
    { x: 52, y: 35, intensity: 74, label: "Product Card 2" },
    { x: 78, y: 35, intensity: 55, label: "Product Card 3" },
    { x: 50, y: 15, intensity: 68, label: "Search Bar" },
    { x: 12, y: 25, intensity: 42, label: "Filters" },
  ],
  product: [
    { x: 68, y: 78, intensity: 97, label: "Add to Cart" },
    { x: 40, y: 30, intensity: 85, label: "Product Image" },
    { x: 68, y: 45, intensity: 71, label: "Price" },
    { x: 68, y: 60, intensity: 58, label: "Description" },
    { x: 50, y: 90, intensity: 35, label: "Reviews" },
  ],
  cart: [
    { x: 70, y: 80, intensity: 93, label: "Checkout Button" },
    { x: 30, y: 40, intensity: 67, label: "Cart Items" },
    { x: 70, y: 55, intensity: 52, label: "Order Summary" },
    { x: 30, y: 65, intensity: 40, label: "Qty Controls" },
  ],
  checkout: [
    { x: 40, y: 35, intensity: 88, label: "Address Form" },
    { x: 70, y: 60, intensity: 76, label: "Pay Now" },
    { x: 40, y: 65, intensity: 61, label: "Coupon Field" },
    { x: 70, y: 30, intensity: 48, label: "Order Summary" },
  ],
};

const scrollData = [
  { depth: "0-25%", pct: 100 }, { depth: "25-50%", pct: 72 },
  { depth: "50-75%", pct: 48 }, { depth: "75-100%", pct: 27 },
];

const sessionMetrics = [
  { label: "Total Sessions", value: "3,241" },
  { label: "Avg Duration", value: "3m 42s" },
  { label: "Rage Clicks", value: "34" },
  { label: "Dead Clicks", value: "127" },
  { label: "Exit Rate", value: "41%" },
  { label: "Recorded", value: "1,820" },
];

function intensityToColor(intensity: number): string {
  if (intensity >= 80) return "rgba(239,68,68,0.85)";
  if (intensity >= 60) return "rgba(249,115,22,0.75)";
  if (intensity >= 40) return "rgba(234,179,8,0.65)";
  return "rgba(34,197,94,0.5)";
}

function intensityToSize(intensity: number): number {
  return 20 + (intensity / 100) * 60;
}

export default function AdminHeatmap() {
  const [page, setPage] = useState<HeatmapPage>("landing");
  const [device, setDevice] = useState<Device>("desktop");
  const [hovered, setHovered] = useState<string | null>(null);

  const spots = hotspots[page];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-semibold">Heatmap Analytics</h1>
        <p className="text-muted-foreground text-sm mt-1">Visual click, scroll, and rage click data across your store.</p>
      </div>

      {/* Session Metrics */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-3">
        {sessionMetrics.map((m) => (
          <div key={m.label} className="glass rounded-2xl p-3 text-center">
            <div className="text-lg font-bold">{m.value}</div>
            <div className="text-[11px] text-muted-foreground mt-1">{m.label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex flex-wrap gap-3">
        <div className="flex glass rounded-xl p-1 gap-1">
          {(["landing", "shop", "product", "cart", "checkout"] as HeatmapPage[]).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                page === p ? "bg-brand-purple text-white" : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {p}
            </button>
          ))}
        </div>
        <div className="flex glass rounded-xl p-1 gap-1">
          <button
            onClick={() => setDevice("desktop")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              device === "desktop" ? "bg-brand-purple text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Monitor className="h-3.5 w-3.5" /> Desktop
          </button>
          <button
            onClick={() => setDevice("mobile")}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
              device === "mobile" ? "bg-brand-purple text-white" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Smartphone className="h-3.5 w-3.5" /> Mobile
          </button>
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        {/* Heatmap Visual */}
        <div className="md:col-span-2 glass rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-white/5 flex items-center gap-2">
            <Flame className="h-4 w-4 text-orange-400" />
            <span className="font-semibold text-sm capitalize">{page} Page — {device}</span>
          </div>
          <div className="relative bg-gradient-to-b from-slate-900 to-slate-950" style={{ height: 400 }}>
            {/* Mock page wireframe */}
            <div className="absolute inset-0 opacity-10 p-6 space-y-3">
              <div className="h-8 bg-white/30 rounded w-3/4 mx-auto" />
              <div className="h-4 bg-white/20 rounded w-full" />
              <div className="h-4 bg-white/20 rounded w-5/6" />
              <div className="grid grid-cols-3 gap-3 mt-4">
                {[1,2,3].map(i => <div key={i} className="h-32 bg-white/20 rounded-xl" />)}
              </div>
              <div className="h-10 bg-white/30 rounded-full w-40 mx-auto mt-4" />
            </div>

            {/* Heat blobs */}
            {spots.map((spot) => {
              const size = intensityToSize(spot.intensity);
              return (
                <div
                  key={spot.label}
                  className="absolute cursor-pointer transition-all duration-200"
                  style={{
                    left: `${spot.x}%`,
                    top: `${spot.y}%`,
                    transform: "translate(-50%, -50%)",
                    width: size,
                    height: size,
                    borderRadius: "50%",
                    background: `radial-gradient(circle, ${intensityToColor(spot.intensity)}, transparent 70%)`,
                    zIndex: 10,
                  }}
                  onMouseEnter={() => setHovered(spot.label)}
                  onMouseLeave={() => setHovered(null)}
                />
              );
            })}

            {/* Tooltip */}
            {hovered && (
              <div className="absolute top-4 left-4 glass rounded-xl px-3 py-2 text-xs font-medium z-20 pointer-events-none">
                <span className="text-brand-purple">●</span> {hovered}
              </div>
            )}

            {/* Legend */}
            <div className="absolute bottom-4 right-4 flex items-center gap-2 text-[10px] text-muted-foreground glass rounded-xl px-3 py-2">
              <span className="text-green-400">●</span> Low
              <span className="text-yellow-400">●</span> Med
              <span className="text-orange-400">●</span> High
              <span className="text-red-400">●</span> Peak
            </div>
          </div>
        </div>

        {/* Scroll Depth + Top Clicks */}
        <div className="space-y-4">
          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <ScrollText className="h-4 w-4 text-brand-purple" />
              <h3 className="font-semibold text-sm">Scroll Depth</h3>
            </div>
            <div className="space-y-3">
              {scrollData.map((s) => (
                <div key={s.depth}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-muted-foreground">{s.depth}</span>
                    <span className="font-medium">{s.pct}%</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-brand-blue to-brand-purple"
                      style={{ width: `${s.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="glass rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <MousePointer className="h-4 w-4 text-brand-purple" />
              <h3 className="font-semibold text-sm">Top Clicked Elements</h3>
            </div>
            <div className="space-y-2">
              {spots.sort((a, b) => b.intensity - a.intensity).map((s, i) => (
                <div key={s.label} className="flex items-center gap-2 text-xs">
                  <span className="text-muted-foreground w-4">#{i + 1}</span>
                  <div className="flex-1 truncate">{s.label}</div>
                  <div
                    className="px-2 py-0.5 rounded-full text-white font-medium text-[10px]"
                    style={{ background: intensityToColor(s.intensity) }}
                  >
                    {s.intensity}%
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
