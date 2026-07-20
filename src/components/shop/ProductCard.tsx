import { Link } from "react-router-dom";
import { Star } from "lucide-react";
import { formatINR, discountPercent } from "@/lib/format";

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
};

export default function ProductCard({ p }: { p: ProductCardData }) {
  const off = discountPercent(p.mrp_paise, p.price_paise);
  return (
    <Link
      to={`/products/${p.slug}`}
      className="group glass rounded-3xl overflow-hidden hover:border-white/20 transition-all hover:-translate-y-0.5"
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
      <div className="p-4">
        <div className="flex items-center gap-1 text-xs text-muted-foreground">
          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
          <span className="text-foreground font-medium">{p.rating_avg.toFixed(1)}</span>
          <span>({p.rating_count})</span>
        </div>
        <h3 className="mt-1 font-display font-semibold line-clamp-1">{p.name}</h3>
        {p.tagline && <p className="text-xs text-muted-foreground line-clamp-1">{p.tagline}</p>}
        <div className="mt-3 flex items-baseline gap-2">
          <span className="font-semibold">{formatINR(p.price_paise)}</span>
          {p.mrp_paise > p.price_paise && (
            <span className="text-xs text-muted-foreground line-through">
              {formatINR(p.mrp_paise)}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
