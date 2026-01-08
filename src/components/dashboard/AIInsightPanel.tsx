import { motion } from "framer-motion";
import { X, Brain, TrendingUp, AlertTriangle, CheckCircle, Target } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Account, AIPrediction, Workflow } from "@/hooks/useAccounts";

interface AIInsightPanelProps {
  account: Account;
  predictions: AIPrediction[];
  workflows: Workflow[];
  onClose: () => void;
}

export function AIInsightPanel({ account, predictions, workflows, onClose }: AIInsightPanelProps) {
  const recoveryPrediction = predictions.find((p) => p.prediction_type === "recovery");
  const strategyPrediction = predictions.find((p) => p.prediction_type === "strategy");

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      className="w-80 glass-card border-l border-border/50 p-5 overflow-auto"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-2">
          <Brain className="w-5 h-5 text-secondary" />
          <h3 className="font-semibold">AI Insights</h3>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
          <X className="w-4 h-4" />
        </Button>
      </div>

      {/* Account Header */}
      <div className="mb-6">
        <h4 className="text-lg font-bold">{account.company_name}</h4>
        <p className="text-sm text-muted-foreground">{account.location}</p>
        <div className="flex items-center gap-2 mt-2">
          <Badge variant="outline">{account.account_id}</Badge>
          <Badge className="bg-primary/20 text-primary border-primary/30">
            {formatCurrency(account.outstanding_amount)}
          </Badge>
        </div>
      </div>

      {/* Recovery Prediction */}
      {recoveryPrediction && (
        <div className="mb-6 p-4 rounded-xl bg-muted/30 border border-border/50">
          <div className="flex items-center gap-2 mb-3">
            <Target className="w-4 h-4 text-secondary" />
            <span className="text-sm font-medium">Recovery Probability</span>
          </div>
          <div className="flex items-end gap-2 mb-2">
            <span className="text-3xl font-bold text-secondary">
              {recoveryPrediction.prediction_value?.toFixed(0)}%
            </span>
            <span className="text-xs text-muted-foreground mb-1">confidence</span>
          </div>
          <Progress value={recoveryPrediction.prediction_value || 0} className="h-2" />
          {recoveryPrediction.recommended_strategy && (
            <p className="text-xs text-muted-foreground mt-3">
              <span className="text-foreground font-medium">Strategy: </span>
              {recoveryPrediction.recommended_strategy}
            </p>
          )}
        </div>
      )}

      {/* Recommended Action */}
      {recoveryPrediction?.recommended_action && (
        <div className="mb-6 p-4 rounded-xl bg-success/5 border border-success/30">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle className="w-4 h-4 text-success" />
            <span className="text-sm font-medium text-success">Recommended Action</span>
          </div>
          <p className="text-sm text-muted-foreground">{recoveryPrediction.recommended_action}</p>
        </div>
      )}

      {/* Risk Factors */}
      {recoveryPrediction?.factors && (
        <div className="mb-6">
          <h5 className="text-sm font-medium mb-3">Risk Factors</h5>
          <div className="space-y-2">
            {Object.entries(recoveryPrediction.factors).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between text-xs">
                <span className="text-muted-foreground capitalize">{key.replace(/_/g, " ")}</span>
                <Badge variant="outline" className="text-[10px]">
                  {String(value)}
                </Badge>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Active Workflows */}
      {workflows.length > 0 && (
        <div>
          <h5 className="text-sm font-medium mb-3">Active Workflows</h5>
          <div className="space-y-2">
            {workflows.map((wf) => (
              <div key={wf.id} className="p-3 rounded-lg bg-muted/30 border border-border/50">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-medium capitalize">{wf.workflow_type}</span>
                  <Badge variant="outline" className="text-[10px]">
                    {wf.status}
                  </Badge>
                </div>
                <p className="text-[10px] text-muted-foreground mt-1">Priority: {wf.priority}/10</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Action Buttons */}
      <div className="mt-6 space-y-2">
        <Button className="w-full bg-primary hover:bg-primary/90">Start Empathy Call</Button>
        <Button variant="outline" className="w-full">Offer Flex-Terms</Button>
      </div>
    </motion.div>
  );
}
