import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export function ERPSyncButton() {
  const [isSyncing, setIsSyncing] = useState(false);

  const handleSync = async () => {
    setIsSyncing(true);
    
    // Simulate RPA sync with 2-second animation
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsSyncing(false);
    
    // Show success toast
    toast.success("RPA Bot Success: 14 updated records fetched from SAP ECC.", {
      duration: 4000,
    });
    
    // Show second notification after 1 second
    setTimeout(() => {
      toast.success("Ledger Reconciled.", {
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleSync}
      disabled={isSyncing}
      className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
    >
      <motion.div
        animate={isSyncing ? { rotate: 360 } : { rotate: 0 }}
        transition={isSyncing ? { duration: 1, repeat: Infinity, ease: "linear" } : {}}
      >
        <RefreshCw className="w-4 h-4" />
      </motion.div>
      {isSyncing ? "Syncing..." : "Sync ERP Data"}
    </Button>
  );
}
