import { MessageCircle } from "lucide-react";
import { whatsappLink } from "@/lib/product";

export default function WhatsAppButton({
  productName,
  className = "",
  label = "Enquire on WhatsApp",
  compact = false,
}: {
  productName?: string;
  className?: string;
  label?: string;
  compact?: boolean;
}) {
  return (
    <a
      href={whatsappLink(productName)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={(e) => e.stopPropagation()}
      className={`inline-flex items-center justify-center gap-2 rounded-full font-medium transition-colors bg-[#25D366]/15 text-[#4ade80] border border-[#25D366]/30 hover:bg-[#25D366]/25 ${
        compact ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm"
      } ${className}`}
    >
      <MessageCircle className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
      {label}
    </a>
  );
}
