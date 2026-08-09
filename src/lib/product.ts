export const WHATSAPP_NUMBER = "917204343440";

export type ProductStatus = "active" | "coming_soon" | "in_progress" | "inactive";

export const STATUS_META: Record<ProductStatus, { label: string; className: string }> = {
  active: { label: "Active", className: "bg-emerald-500/15 text-emerald-300 border-emerald-400/20" },
  coming_soon: { label: "Coming Soon", className: "bg-brand-blue/15 text-brand-cyan border-brand-blue/30" },
  in_progress: { label: "In Progress", className: "bg-amber-500/15 text-amber-300 border-amber-400/20" },
  inactive: { label: "Inactive", className: "bg-white/10 text-muted-foreground border-white/10" },
};

export function whatsappLink(productName?: string) {
  const message = productName
    ? `Hi VasaviStores, I'm interested in the ${productName}. Please share more details.`
    : "Hi VasaviStores, I'd like to know more about your products.";
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
