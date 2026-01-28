import { motion } from "framer-motion";
import { AlertTriangle, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ComplianceBlockerProps {
  onDismiss: () => void;
  violationType: string;
}

export function ComplianceBlocker({ onDismiss, violationType }: ComplianceBlockerProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="bg-card border-2 border-critical rounded-2xl p-6 max-w-md w-full mx-4 shadow-2xl"
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-critical/20 flex items-center justify-center">
            <AlertTriangle className="w-6 h-6 text-critical" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-critical">Compliance Block</h3>
            <p className="text-sm text-muted-foreground mt-1">
              FDCPA Section 807 Violation Detected
            </p>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onDismiss}
            className="h-8 w-8"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>

        <div className="mt-4 p-4 rounded-xl bg-critical/10 border border-critical/30">
          <p className="text-sm font-medium text-critical mb-2">Message Suppressed</p>
          <p className="text-sm text-muted-foreground">
            Your message contains prohibited language that violates federal debt collection regulations. 
            Threatening legal action without proper authorization is a violation of the Fair Debt Collection Practices Act.
          </p>
        </div>

        <div className="mt-4 flex items-center gap-2 text-xs text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Protected by Guardian AI Compliance Engine</span>
        </div>

        <div className="mt-6 flex gap-3">
          <Button
            variant="outline"
            className="flex-1"
            onClick={onDismiss}
          >
            Edit Message
          </Button>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={onDismiss}
          >
            Clear & Start Over
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
