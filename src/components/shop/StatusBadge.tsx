import { STATUS_META, type ProductStatus } from "@/lib/product";

export default function StatusBadge({
  status,
  className = "",
}: {
  status?: ProductStatus | string | null;
  className?: string;
}) {
  const meta = STATUS_META[(status as ProductStatus) ?? "active"] ?? STATUS_META.active;
  return (
    <span
      className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-1 rounded-full border ${meta.className} ${className}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {meta.label}
    </span>
  );
}
