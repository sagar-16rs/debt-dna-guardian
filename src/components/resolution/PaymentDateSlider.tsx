import { useState } from "react";
import { motion } from "framer-motion";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface PaymentDateSliderProps {
  minDays?: number;
  maxDays?: number;
  autoAcceptDays?: number;
  onChange?: (days: number) => void;
}

export function PaymentDateSlider({
  minDays = 0,
  maxDays = 30,
  autoAcceptDays = 14,
  onChange,
}: PaymentDateSliderProps) {
  const [selectedDays, setSelectedDays] = useState(10);

  const handleChange = (value: number[]) => {
    setSelectedDays(value[0]);
    onChange?.(value[0]);
  };

  const getDateLabel = (days: number) => {
    const date = new Date();
    date.setDate(date.getDate() + days);
    return date.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
  };

  const isAutoAccept = selectedDays <= autoAcceptDays;
  const isReviewZone = selectedDays > autoAcceptDays;

  return (
    <div className="space-y-4">
      {/* Selected Date Tooltip */}
      <div className="relative">
        <motion.div
          className="absolute -top-10 transform -translate-x-1/2 px-3 py-1.5 rounded-lg bg-card border border-border/50 shadow-lg"
          style={{ left: `${(selectedDays / maxDays) * 100}%` }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <span className="text-sm font-medium">{getDateLabel(selectedDays)}</span>
          <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45 bg-card border-b border-r border-border/50" />
        </motion.div>
      </div>

      {/* Slider Track */}
      <div className="relative pt-4">
        {/* Zone Indicators */}
        <div className="absolute inset-0 flex rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-success/20 to-success/10"
            style={{ width: `${(autoAcceptDays / maxDays) * 100}%` }}
          />
          <div className="flex-1 bg-gradient-to-r from-warning/10 to-warning/20" />
        </div>

        <Slider
          value={[selectedDays]}
          onValueChange={handleChange}
          min={minDays}
          max={maxDays}
          step={1}
          className="relative z-10"
        />
      </div>

      {/* Zone Labels */}
      <div className="flex justify-between text-xs">
        <span className="text-muted-foreground">TODAY</span>
        <span className={cn(
          "font-medium uppercase",
          isAutoAccept ? "text-success" : "text-muted-foreground"
        )}>
          Auto-Accept Zone
        </span>
        <span className={cn(
          "font-medium uppercase",
          isReviewZone ? "text-warning" : "text-muted-foreground"
        )}>
          Review Zone
        </span>
        <span className="text-muted-foreground">+30 DAYS</span>
      </div>
    </div>
  );
}
