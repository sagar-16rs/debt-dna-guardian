import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Lock, Copy, CheckCircle, Shield, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "sonner";

interface SecureVaultModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SecureVaultModal({ open, onOpenChange }: SecureVaultModalProps) {
  const [isTokenizing, setIsTokenizing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [secureLink, setSecureLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (open) {
      setIsTokenizing(true);
      setIsComplete(false);
      setCopied(false);
      
      // Simulate tokenization process
      setTimeout(() => {
        const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
        setSecureLink(`pay.fedex.com/secure/${randomId}`);
        setIsTokenizing(false);
        setIsComplete(true);
      }, 2000);
    }
  }, [open]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(`https://${secureLink}`);
    setCopied(true);
    toast.success("Secure link copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
              <Shield className="w-4 h-4 text-primary" />
            </div>
            FedEx Secure Vault
          </DialogTitle>
        </DialogHeader>

        <div className="py-6">
          <AnimatePresence mode="wait">
            {isTokenizing && (
              <motion.div
                key="tokenizing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center py-8"
              >
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary mb-4"
                />
                <motion.p
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="text-sm text-primary font-medium"
                >
                  Tokenizing Transaction...
                </motion.p>
              </motion.div>
            )}

            {isComplete && (
              <motion.div
                key="complete"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-4"
              >
                <div className="p-4 rounded-xl bg-success/10 border border-success/30">
                  <div className="flex items-center gap-2 mb-3">
                    <CheckCircle className="w-5 h-5 text-success" />
                    <span className="font-medium text-success">Secure Link Generated</span>
                  </div>
                  
                  <div className="flex items-center gap-2 p-3 rounded-lg bg-card/80 border border-border/50">
                    <Lock className="w-4 h-4 text-muted-foreground" />
                    <code className="flex-1 text-sm font-mono truncate">{secureLink}</code>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8"
                      onClick={handleCopy}
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-success" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                </div>

                <div className="p-3 rounded-lg bg-muted/50 flex items-start gap-2">
                  <Shield className="w-4 h-4 text-muted-foreground mt-0.5" />
                  <p className="text-xs text-muted-foreground">
                    Funds route directly to FedEx Escrow. No agency custody.
                  </p>
                </div>

                <Button className="w-full" onClick={handleCopy}>
                  <Copy className="w-4 h-4 mr-2" />
                  Copy Secure Link
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
