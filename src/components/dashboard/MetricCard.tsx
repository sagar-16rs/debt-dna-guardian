import { cn } from "@/lib/utils";
import { LucideIcon, TrendingUp, TrendingDown } from "lucide-react";

interface MetricCardProps {
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    direction: "up" | "down";
  };
  icon?: LucideIcon;
  variant?: "default" | "primary" | "warning" | "success";
  className?: string;
}

export function MetricCard({
  title,
  value,
  subtitle,
  trend,
  icon: Icon,
  variant = "default",
  className,
}: MetricCardProps) {
  const variantStyles = {
    default: "border-border/50",
    primary: "border-primary/30 bg-primary/5",
    warning: "border-warning/30 bg-warning/5",
    success: "border-success/30 bg-success/5",
  };

  return (
    <div
      className={cn(
        "glass-card p-4 rounded-xl border transition-all duration-300 hover:scale-[1.02]",
        variantStyles[variant],
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {title}
          </p>
          <p className="text-2xl font-bold mt-1 tracking-tight">{value}</p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
          )}
          {trend && (
            <div className="flex items-center gap-1 mt-2">
              {trend.direction === "up" ? (
                <TrendingUp className="w-3 h-3 text-success" />
              ) : (
                <TrendingDown className="w-3 h-3 text-critical" />
              )}
              <span
                className={cn(
                  "text-xs font-medium",
                  trend.direction === "up" ? "text-success" : "text-critical"
                )}
              >
                {trend.value}
              </span>
            </div>
          )}
        </div>
        {Icon && (
          <div className="p-2 rounded-lg bg-muted/50">
            <Icon className="w-4 h-4 text-muted-foreground" />
          </div>
        )}
      </div>
    </div>
  );
}
