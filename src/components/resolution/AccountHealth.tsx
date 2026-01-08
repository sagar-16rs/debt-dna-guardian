import { motion } from "framer-motion";
import { Phone } from "lucide-react";

interface AccountHealthProps {
  score: number;
  potentialBoost: number;
  status: "good" | "moderate" | "at-risk";
}

const statusColors = {
  good: "text-success border-success/30 bg-success/10",
  moderate: "text-warning border-warning/30 bg-warning/10",
  "at-risk": "text-critical border-critical/30 bg-critical/10",
};

const statusLabels = {
  good: "Good",
  moderate: "Moderate",
  "at-risk": "At Risk",
};

export function AccountHealth({ score, potentialBoost, status }: AccountHealthProps) {
  return (
    <div className="glass-card rounded-xl p-4">
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-medium">Account Health</span>
        <span className={`text-sm font-medium capitalize ${statusColors[status].split(" ")[0]}`}>
          {statusLabels[status]}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Score Circle */}
        <div className="relative w-16 h-16">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="4"
            />
            <motion.circle
              cx="32"
              cy="32"
              r="28"
              fill="none"
              stroke="hsl(var(--success))"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={2 * Math.PI * 28}
              initial={{ strokeDashoffset: 2 * Math.PI * 28 }}
              animate={{ strokeDashoffset: 2 * Math.PI * 28 * (1 - score / 100) }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-lg font-bold">{score}</span>
          </div>
        </div>

        <div className="flex-1">
          <p className="text-sm text-muted-foreground">
            Resolving this invoice today will boost your score to{" "}
            <span className="text-success font-bold">{potentialBoost}</span>
          </p>
        </div>
      </div>

      {/* Support Link */}
      <div className="mt-4 pt-4 border-t border-border/50 text-center">
        <div className="flex flex-col items-center gap-2">
          <Phone className="w-5 h-5 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">Need to speak with a specialist?</p>
          <button className="text-sm text-primary hover:underline">Request Callback</button>
        </div>
      </div>
    </div>
  );
}
