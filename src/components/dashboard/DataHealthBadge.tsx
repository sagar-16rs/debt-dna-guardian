import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface DataHealthBadgeProps {
  version?: string;
}

export function DataHealthBadge({ version = "4.2" }: DataHealthBadgeProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30 cursor-help"
          >
            <motion.div
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            >
              <ShieldCheck className="w-4 h-4 text-success" />
            </motion.div>
            <motion.span
              animate={{ opacity: [1, 0.7, 1] }}
              transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              className="text-xs font-medium text-success"
            >
              Golden Record Verified
            </motion.span>
          </motion.div>
        </TooltipTrigger>
        <TooltipContent side="bottom" className="max-w-xs">
          <div className="space-y-2">
            <p className="font-semibold text-sm">Optimistic Concurrency Control</p>
            <p className="text-xs text-muted-foreground">
              Version {version} matches SAP Ledger. No write conflicts detected.
            </p>
            <div className="flex items-center gap-2 pt-1 border-t border-border/50">
              <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
              <span className="text-xs text-success">Data Integrity: 100%</span>
            </div>
          </div>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
