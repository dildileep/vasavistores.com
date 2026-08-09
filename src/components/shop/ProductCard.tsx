import { Link } from "react-router-dom";
import { Star, ImageIcon } from "lucide-react";
import { formatINR, discountPercent } from "@/lib/format";
import StatusBadge from "./StatusBadge";
import WhatsAppButton from "./WhatsAppButton";

export type ProductCardData = {
  id: string;
  name: string;
  slug: string;
  tagline: string | null;
  images: string[];
  price_paise: number;
  mrp_paise: number;
  rating_avg: number;
  rating_count: number;
  status?: string | null;
  short_description?: string | null;
  cta_text?: string | null;
};

export default function ProductCard({ p }: { p: ProductCardData }) {
  const off = discountPercent(p.mrp_paise, p.price_paise);
  return (
    <div className="group glass rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-0.5 flex flex-col">
      <Link to={`/products/${p.slug}`} className="block">
        <div className="relative aspect-square bg-white/5 overflow-hidden">
          {p.images?.[0] ? (
            <img
              src={p.images[0]}
              alt={p.name}
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
          ) : (
            <div className="w-full h-full grid place-items-center text-muted-foreground">
              <ImageIcon className="h-8 w-8" />
            </div>
          )}
          <div className="absolute top-3 left-3 flex flex-col items-start gap-2">
            <StatusBadge status={p.status ?? "active"} />
            {off > 0 && (
              <span className="text-[11px] font-semibold px-2 py-1 rounded-full bg-brand-purple/90 text-white">
                {off}% OFF
              </span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-foreground font-medium">{p.rating_avg.toFixed(1)}</span>
          <span>({p.rating_count})</span>
        </div>
        <Link to={`/products/${p.slug}`}>
          <h3 className="mt-1 font-display font-semibold line-clamp-1">{p.name}</h3>
        </Link>
        {(p.short_description || p.tagline) && (
          <p className="text-xs text-muted-foreground line-clamp-2 mt-0.5">
            {p.short_description || p.tagline}
          </p>
        )}
        {p.price_paise > 0 && (
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-semibold">{formatINR(p.price_paise)}</span>
            {p.mrp_paise > p.price_paise && (
              <span className="text-xs text-muted-foreground line-through">{formatINR(p.mrp_paise)}</span>
            )}
          </div>
        )}

        <div className="mt-4 flex flex-col gap-2">
          <Link
            to={`/products/${p.slug}`}
            className="btn-primary rounded-full px-4 py-2.5 text-sm font-medium text-center"
          >
            {p.cta_text || "Explore Product"}
          </Link>
          <WhatsAppButton productName={p.name} compact className="w-full" />
        </div>
      </div>
    </div>
  );
}
