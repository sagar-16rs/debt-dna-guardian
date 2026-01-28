import { motion } from "framer-motion";
import { AlertTriangle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

const agencies = [
  { name: "Apex Recovery", score: 92, status: "active", accounts: 245 },
  { name: "Prime Collections", score: 88, status: "active", accounts: 189 },
  { name: "Horizon Collections", score: 78, status: "suspended", accounts: 0 },
  { name: "Summit Partners", score: 91, status: "active", accounts: 312 },
  { name: "Vertex Solutions", score: 86, status: "active", accounts: 156 },
];

export function AgencyPerformance() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-card rounded-xl p-4"
    >
      <h3 className="font-semibold text-sm mb-4">Agency Performance</h3>
      
      <div className="space-y-3">
        <div className="grid grid-cols-4 text-xs text-muted-foreground border-b border-border/50 pb-2">
          <span>Agency</span>
          <span className="text-center">Score</span>
          <span className="text-center">Accounts</span>
          <span className="text-right">Status</span>
        </div>
        
        {agencies.map((agency, index) => (
          <motion.div
            key={agency.name}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            className={`grid grid-cols-4 items-center text-sm py-2 rounded-lg px-2 ${
              agency.status === "suspended" ? "bg-critical/10" : ""
            }`}
          >
            <span className="font-medium truncate">{agency.name}</span>
            <span className={`text-center font-semibold ${
              agency.score >= 85 ? "text-success" : 
              agency.score >= 80 ? "text-warning" : "text-critical"
            }`}>
              {agency.score}%
            </span>
            <span className="text-center text-muted-foreground">
              {agency.accounts}
            </span>
            <div className="flex justify-end">
              {agency.status === "active" ? (
                <Badge className="bg-success/10 text-success border-0 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-success mr-1.5" />
                  Active
                </Badge>
              ) : (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Badge className="bg-critical/10 text-critical border-0 text-xs cursor-help">
                      <span className="w-1.5 h-1.5 rounded-full bg-critical mr-1.5" />
                      Suspended
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent side="left" className="max-w-[250px] p-3">
                    <div className="flex items-start gap-2">
                      <AlertTriangle className="w-4 h-4 text-critical mt-0.5" />
                      <div>
                        <p className="font-semibold text-critical">Circuit Breaker Activated</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Compliance Score dropped below 85%. Allocation Frozen by Circuit Breaker.
                        </p>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
