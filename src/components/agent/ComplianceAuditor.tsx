import { motion } from "framer-motion";
import { Shield, AlertCircle, CheckCircle2, FileText } from "lucide-react";

interface AnalysisLog {
  id: string;
  type: "flagged" | "sentiment" | "context";
  title: string;
  description: string;
  timestamp: string;
}

interface SuggestedScript {
  id: string;
  title: string;
  content: string;
}

interface ComplianceAuditorProps {
  score: number;
  empathy: "low" | "medium" | "high";
  clarity: "low" | "medium" | "high";
  analysisLogs: AnalysisLog[];
  suggestedScripts: SuggestedScript[];
}

const levelColors = {
  low: "text-critical",
  medium: "text-warning",
  high: "text-success",
};

const logIcons = {
  flagged: AlertCircle,
  sentiment: CheckCircle2,
  context: FileText,
};

const logColors = {
  flagged: "text-critical bg-critical/10",
  sentiment: "text-success bg-success/10",
  context: "text-secondary bg-secondary/10",
};

export function ComplianceAuditor({
  score,
  empathy,
  clarity,
  analysisLogs,
  suggestedScripts,
}: ComplianceAuditorProps) {
  const getScoreColor = () => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-critical";
  };

  const getScoreRingColor = () => {
    if (score >= 70) return "stroke-success";
    if (score >= 40) return "stroke-warning";
    return "stroke-critical";
  };

  // Calculate stroke-dasharray for circular progress
  const circumference = 2 * Math.PI * 40;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <div className="w-72 h-full glass-card border-l border-border/50 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-secondary" />
          <div>
            <h2 className="font-semibold">Compliance Auditor</h2>
            <p className="text-xs text-muted-foreground">
              Real-time tone & regulation monitoring
            </p>
          </div>
        </div>
      </div>

      {/* Score Ring */}
      <div className="p-6 border-b border-border/50">
        <p className="text-xs text-muted-foreground uppercase tracking-wider text-center mb-4">
          Current Message Score
        </p>
        <div className="relative w-24 h-24 mx-auto">
          <svg className="w-full h-full transform -rotate-90">
            <circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              stroke="hsl(var(--muted))"
              strokeWidth="8"
            />
            <motion.circle
              cx="48"
              cy="48"
              r="40"
              fill="none"
              className={getScoreRingColor()}
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray={circumference}
              initial={{ strokeDashoffset: circumference }}
              animate={{ strokeDashoffset }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </svg>
          <div className="absolute inset-0 flex flex-col items-center justify-center">
            <span className={`text-2xl font-bold ${getScoreColor()}`}>{score}%</span>
            <span className="text-xs text-critical">Critical</span>
          </div>
        </div>

        {/* Metrics */}
        <div className="flex justify-center gap-8 mt-4">
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Empathy</p>
            <p className={`text-sm font-medium capitalize ${levelColors[empathy]}`}>
              {empathy}
            </p>
          </div>
          <div className="text-center">
            <p className="text-xs text-muted-foreground">Clarity</p>
            <p className={`text-sm font-medium capitalize ${levelColors[clarity]}`}>
              {clarity}
            </p>
          </div>
        </div>
      </div>

      {/* Analysis Log */}
      <div className="flex-1 overflow-auto p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
          Live Analysis Log
        </p>
        <div className="space-y-3">
          {analysisLogs.map((log, index) => {
            const Icon = logIcons[log.type];
            return (
              <motion.div
                key={log.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <div className={`p-1 rounded ${logColors[log.type]}`}>
                  <Icon className="w-3 h-3" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium">{log.title}</p>
                  <p className="text-[10px] text-muted-foreground truncate">
                    {log.description}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {log.timestamp}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Suggested Scripts */}
        <div className="mt-6">
          <p className="text-xs text-muted-foreground uppercase tracking-wider mb-3">
            Suggested Scripts
          </p>
          <div className="space-y-3">
            {suggestedScripts.map((script) => (
              <button
                key={script.id}
                className="w-full p-3 rounded-lg bg-muted/30 hover:bg-muted/50 transition-colors text-left border border-border/50"
              >
                <p className="text-xs font-medium text-secondary">{script.title}</p>
                <p className="text-[11px] text-muted-foreground mt-1 line-clamp-2">
                  "{script.content}"
                </p>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-border/50 text-center">
        <p className="text-[10px] text-muted-foreground">AI Model: FedEx-Guardian-v2.4</p>
      </div>
    </div>
  );
}
