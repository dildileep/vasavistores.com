import type { LucideIcon } from "lucide-react";
import { motion } from "motion/react";

interface FloatingCardProps {
  icon: LucideIcon;
  label: string;
  sublabel?: string;
  className?: string;
  delay?: number;
  accent?: "blue" | "purple" | "cyan";
}

const accentMap = {
  blue: "from-brand-blue/40 to-brand-blue/0 text-brand-blue",
  purple: "from-brand-purple/40 to-brand-purple/0 text-brand-purple",
  cyan: "from-brand-cyan/40 to-brand-cyan/0 text-brand-cyan",
};

export function FloatingCard({
  icon: Icon,
  label,
  sublabel,
  className,
  delay = 0,
  accent = "blue",
}: FloatingCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: "easeOut" }}
      className={`glass glow-ring animate-float rounded-2xl px-4 py-3 flex items-center gap-3 ${className ?? ""}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <div
        className={`h-9 w-9 rounded-xl bg-gradient-to-br ${accentMap[accent]} grid place-items-center border border-white/10`}
      >
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-sm font-medium text-foreground whitespace-nowrap">{label}</div>
        {sublabel && (
          <div className="text-[11px] text-muted-foreground whitespace-nowrap">{sublabel}</div>
        )}
      </div>
    </motion.div>
  );
}
