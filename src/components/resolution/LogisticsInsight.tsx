import { motion } from "framer-motion";
import { MapPin, Package } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface LogisticsInsightProps {
  location: string;
  date: string;
  description: string;
  credit: string;
}

export function LogisticsInsight({
  location,
  date,
  description,
  credit,
}: LogisticsInsightProps) {
  return (
    <div className="glass-card rounded-xl overflow-hidden">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Package className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Logistics Insight</span>
          </div>
          <Badge variant="outline" className="text-xs border-secondary/50 text-secondary">
            Auto-Applied
          </Badge>
        </div>
      </div>

      {/* Map Visualization */}
      <div className="relative h-32 bg-gradient-to-br from-muted to-card overflow-hidden">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `
              linear-gradient(hsl(230 20% 30%) 1px, transparent 1px),
              linear-gradient(90deg, hsl(230 20% 30%) 1px, transparent 1px)
            `,
            backgroundSize: "20px 20px",
          }}
        />

        {/* Location marker */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.3 }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        >
          <div className="relative">
            <div className="absolute w-12 h-12 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/20 animate-ping" />
            <div className="w-8 h-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-success/30 flex items-center justify-center">
              <MapPin className="w-4 h-4 text-success" />
            </div>
          </div>
          <div className="absolute top-6 left-1/2 -translate-x-1/2 px-2 py-1 rounded bg-success/20 border border-success/30 whitespace-nowrap">
            <span className="text-xs text-success font-medium">{location} ({date})</span>
          </div>
        </motion.div>
      </div>

      {/* Description */}
      <div className="p-4">
        <p className="text-sm text-muted-foreground">
          {description}
        </p>
        <p className="text-sm mt-2">
          As part of our <span className="text-secondary font-medium">Value-Preservation promise</span>, a{" "}
          <span className="text-success font-bold">{credit}</span> credit has been automatically applied to this invoice.
        </p>
      </div>
    </div>
  );
}
