import { useState } from "react";
import { motion } from "framer-motion";
import { RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { ERPSyncModal } from "./ERPSyncModal";

export function ERPSyncButton() {
  const [showModal, setShowModal] = useState(false);

  const handleSync = () => {
    setShowModal(true);
  };

  const handleComplete = () => {
    setShowModal(false);
    
    // Show success toast with detailed message
    toast.success("Batch Sync Complete. 14 records updated. Peak Load Impact: 0% (Safe-Mode Active).", {
      duration: 5000,
    });
    
    // Show second notification after 1 second
    setTimeout(() => {
      toast.success("Ledger Reconciled.", {
        duration: 3000,
      });
    }, 1000);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        onClick={handleSync}
        className="gap-2 border-primary/30 hover:border-primary hover:bg-primary/10"
      >
        <RefreshCw className="w-4 h-4" />
        Sync ERP Data
      </Button>
      
      <ERPSyncModal open={showModal} onComplete={handleComplete} />
    </>
  );
}
