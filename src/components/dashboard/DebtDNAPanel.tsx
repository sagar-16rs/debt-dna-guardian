import { motion } from "framer-motion";
import { X, Sparkles, AlertTriangle, Phone, Calendar, Pause } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface DNAStrand {
  name: string;
  status: "good" | "stable" | "at-risk" | "critical";
  value: number;
  details: { label: string; value: string }[];
}

interface DebtDNAPanelProps {
  account: {
    name: string;
    location: string;
    id: string;
    outstanding: string;
    daysOverdue: number;
    ltvTag?: string;
    aiPrediction: string;
    strands: DNAStrand[];
    anomaly?: {
      title: string;
      description: string;
    };
  };
  onClose?: () => void;
}

const statusColors = {
  good: "text-success",
  stable: "text-secondary",
  "at-risk": "text-warning",
  critical: "text-critical",
};

const strandGradients = {
  "Financial DNA": "from-success to-secondary",
  "Behavioral DNA": "from-secondary to-accent",
  "Logistical DNA": "from-critical to-warning",
};

export function DebtDNAPanel({ account, onClose }: DebtDNAPanelProps) {
  return (
    <motion.div
      initial={{ x: 400, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 400, opacity: 0 }}
      className="w-[380px] h-full glass-card border-l border-border/50 flex flex-col overflow-hidden"
    >
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-start justify-between">
          <div>
            {account.ltvTag && (
              <Badge variant="outline" className="mb-2 text-xs border-secondary/50 text-secondary">
                {account.ltvTag}
              </Badge>
            )}
            <h2 className="text-lg font-semibold">{account.name}</h2>
            <p className="text-sm text-muted-foreground">
              {account.location} • ID: {account.id}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg hover:bg-muted/50 transition-colors"
          >
            <X className="w-4 h-4 text-muted-foreground" />
          </button>
        </div>

        <div className="flex items-baseline gap-4 mt-4">
          <div>
            <p className="text-xs text-muted-foreground uppercase">Outstanding</p>
            <p className="text-xl font-bold">{account.outstanding}</p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase">Days Overdue</p>
            <p className="text-xl font-bold text-critical">{account.daysOverdue} Days</p>
          </div>
        </div>
      </div>

      {/* AI Prediction */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-start gap-3 p-3 rounded-lg bg-gradient-to-r from-accent/10 to-primary/10 border border-accent/20">
          <Sparkles className="w-5 h-5 text-accent mt-0.5" />
          <div>
            <p className="text-sm font-medium">AI Prediction</p>
            <p className="text-xs text-muted-foreground mt-1">{account.aiPrediction}</p>
          </div>
        </div>
      </div>

      {/* DNA Strands */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        {account.strands.map((strand, index) => (
          <motion.div
            key={strand.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="space-y-2"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-muted-foreground" />
                <span className="text-sm font-medium">{strand.name}</span>
              </div>
              <span className={`text-xs font-medium capitalize ${statusColors[strand.status]}`}>
                {strand.status.replace("-", " ")}
              </span>
            </div>

            {/* Progress bar */}
            <div className="h-1.5 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${strand.value}%` }}
                transition={{ delay: index * 0.1 + 0.2, duration: 0.5 }}
                className={`h-full rounded-full bg-gradient-to-r ${strandGradients[strand.name as keyof typeof strandGradients] || "from-primary to-secondary"}`}
              />
            </div>

            {/* Details */}
            <div className="flex flex-wrap gap-2">
              {strand.details.map((detail) => (
                <div key={detail.label} className="text-xs">
                  <span className="text-muted-foreground">{detail.label}: </span>
                  <span className="font-medium">{detail.value}</span>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        {/* Anomaly Alert */}
        {account.anomaly && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4 }}
            className="p-3 rounded-lg bg-critical/10 border border-critical/30"
          >
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-4 h-4 text-critical mt-0.5" />
              <div>
                <p className="text-sm font-medium text-critical">{account.anomaly.title}</p>
                <p className="text-xs text-muted-foreground mt-1">{account.anomaly.description}</p>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-border/50 space-y-3">
        <p className="text-xs text-muted-foreground uppercase tracking-wider">
          Preservation Actions
        </p>
        <div className="grid grid-cols-2 gap-2">
          <Button className="bg-primary hover:bg-primary/90 glow-primary">
            <Phone className="w-4 h-4 mr-2" />
            Start Empathy Call
          </Button>
          <Button variant="outline" className="border-border/50">
            <Calendar className="w-4 h-4 mr-2" />
            Offer Flex-Terms
          </Button>
        </div>
        <Button variant="outline" className="w-full border-border/50 text-muted-foreground">
          <Pause className="w-4 h-4 mr-2" />
          Pause Shipments (Requires Approval)
        </Button>
      </div>
    </motion.div>
  );
}
