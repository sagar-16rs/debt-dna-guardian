import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, CheckCircle2, AlertCircle, Clock } from "lucide-react";
import { useEffect, useState } from "react";

interface TickerItem {
  id: string;
  type: "recovery" | "alert" | "update";
  message: string;
  timestamp: string;
}

const mockTickerItems: TickerItem[] = [
  { id: "1", type: "recovery", message: "Agency B recovered $5,000 from Acme Corp", timestamp: "2m ago" },
  { id: "2", type: "alert", message: "Acct #4492 risk downgraded (High→Med)", timestamp: "5m ago" },
  { id: "3", type: "update", message: "Smart-Settle offer accepted: Invoice #8849", timestamp: "8m ago" },
  { id: "4", type: "recovery", message: "Digital resolution: $12,500 from TechFlow Inc", timestamp: "12m ago" },
  { id: "5", type: "alert", message: "Service failure detected: Hamburg shipment delay", timestamp: "15m ago" },
];

const iconMap = {
  recovery: CheckCircle2,
  alert: AlertCircle,
  update: Clock,
};

const colorMap = {
  recovery: "text-success",
  alert: "text-warning",
  update: "text-secondary",
};

export function LiveTicker() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % mockTickerItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const currentItem = mockTickerItems[currentIndex];
  const Icon = iconMap[currentItem.type];

  return (
    <div className="flex items-center gap-3 px-4 py-2 glass-card rounded-full">
      <div className="flex items-center gap-2">
        <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
        <span className="text-xs font-medium text-muted-foreground uppercase">Live</span>
      </div>
      
      <div className="h-4 w-px bg-border" />
      
      <AnimatePresence mode="wait">
        <motion.div
          key={currentItem.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="flex items-center gap-2 flex-1"
        >
          <Icon className={`w-4 h-4 ${colorMap[currentItem.type]}`} />
          <span className="text-sm">{currentItem.message}</span>
          <ArrowRight className="w-3 h-3 text-muted-foreground" />
          <span className="text-xs text-muted-foreground">{currentItem.timestamp}</span>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
