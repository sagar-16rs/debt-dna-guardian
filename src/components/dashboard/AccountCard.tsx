import { motion } from "framer-motion";
import { Building2, Brain, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Account } from "@/hooks/useAccounts";

const riskColors = {
  low: "bg-success/20 text-success border-success/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  high: "bg-primary/20 text-primary border-primary/30",
  critical: "bg-critical/20 text-critical border-critical/30",
};

interface AccountCardProps {
  account: Account;
  isSelected: boolean;
  onSelect: () => void;
  onAnalyze: () => void;
  isAnalyzing: boolean;
}

export function AccountCard({ account, isSelected, onSelect, onAnalyze, isAnalyzing }: AccountCardProps) {
  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <motion.button
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      onClick={onSelect}
      className={cn(
        "w-full p-4 rounded-xl border text-left transition-all",
        isSelected
          ? "border-primary bg-primary/5"
          : "border-border/50 hover:border-primary/30 bg-card/30"
      )}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-muted/50 flex items-center justify-center">
            <Building2 className="w-5 h-5 text-muted-foreground" />
          </div>
          <div>
            <p className="font-medium text-sm">{account.company_name}</p>
            <p className="text-xs text-muted-foreground">{account.account_id}</p>
          </div>
        </div>
        <Badge className={cn("text-[10px]", riskColors[account.risk_level])}>
          {account.risk_level.toUpperCase()}
        </Badge>
      </div>

      <div className="grid grid-cols-2 gap-4 text-xs">
        <div>
          <p className="text-muted-foreground">Outstanding</p>
          <p className="font-semibold">{formatCurrency(account.outstanding_amount)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Overdue</p>
          <p className="font-semibold">{account.days_overdue} days</p>
        </div>
      </div>

      <Button
        size="sm"
        variant="outline"
        className="w-full mt-3 h-8 text-xs"
        onClick={(e) => {
          e.stopPropagation();
          onAnalyze();
        }}
        disabled={isAnalyzing}
      >
        {isAnalyzing ? (
          <Loader2 className="w-3 h-3 animate-spin mr-1" />
        ) : (
          <Brain className="w-3 h-3 mr-1" />
        )}
        AI Analysis
      </Button>
    </motion.button>
  );
}
