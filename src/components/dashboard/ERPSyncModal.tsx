import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, CheckCircle, Shield, Zap } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Progress } from "@/components/ui/progress";

interface ERPSyncModalProps {
  open: boolean;
  onComplete: () => void;
}

const SYNC_STAGES = [
  "Initiating Intelligent Throttling...",
  "Negotiating SAP ECC Connection...",
  "Applying Queue Management...",
  "Validating Data Integrity...",
  "Syncing Ledger Records...",
];

export function ERPSyncModal({ open, onComplete }: ERPSyncModalProps) {
  const [progress, setProgress] = useState(0);
  const [currentStage, setCurrentStage] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    if (!open) {
      setProgress(0);
      setCurrentStage(0);
      setIsComplete(false);
      return;
    }

    // Slow start (throttling effect), then speed up
    const intervals = [
      { duration: 400, increment: 5 },   // 0-20: very slow
      { duration: 300, increment: 8 },   // 20-40: slow
      { duration: 200, increment: 12 },  // 40-60: medium
      { duration: 100, increment: 15 },  // 60-80: fast
      { duration: 80, increment: 20 },   // 80-100: very fast
    ];

    let currentProgress = 0;
    let intervalIndex = 0;

    const updateProgress = () => {
      const { increment } = intervals[intervalIndex];
      currentProgress = Math.min(currentProgress + increment, 100);
      setProgress(currentProgress);

      // Update stage based on progress
      const newStage = Math.min(Math.floor(currentProgress / 20), SYNC_STAGES.length - 1);
      setCurrentStage(newStage);

      // Update interval speed as progress increases
      if (currentProgress >= 20 && intervalIndex === 0) intervalIndex = 1;
      if (currentProgress >= 40 && intervalIndex === 1) intervalIndex = 2;
      if (currentProgress >= 60 && intervalIndex === 2) intervalIndex = 3;
      if (currentProgress >= 80 && intervalIndex === 3) intervalIndex = 4;

      if (currentProgress >= 100) {
        setIsComplete(true);
        setTimeout(onComplete, 1500);
      } else {
        setTimeout(updateProgress, intervals[intervalIndex].duration);
      }
    };

    const timer = setTimeout(updateProgress, 500);
    return () => clearTimeout(timer);
  }, [open, onComplete]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-md bg-card border-border/50 [&>button]:hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <RefreshCw className={`w-5 h-5 text-primary ${!isComplete ? "animate-spin" : ""}`} />
            RPA Batch Synchronization
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Current Stage */}
          <div className="flex items-center gap-3">
            <motion.div
              animate={{ scale: isComplete ? 1 : [1, 1.1, 1] }}
              transition={{ repeat: isComplete ? 0 : Infinity, duration: 1.5 }}
              className={`w-10 h-10 rounded-full flex items-center justify-center ${
                isComplete ? "bg-success/20" : "bg-primary/20"
              }`}
            >
              {isComplete ? (
                <CheckCircle className="w-5 h-5 text-success" />
              ) : (
                <Zap className="w-5 h-5 text-primary" />
              )}
            </motion.div>
            <div className="flex-1">
              <p className="text-sm font-medium">
                {isComplete ? "Batch Sync Complete" : SYNC_STAGES[currentStage]}
              </p>
              <p className="text-xs text-muted-foreground">
                {isComplete
                  ? "All records validated and synchronized"
                  : "Safe-Mode throttling active to protect legacy systems"}
              </p>
            </div>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-muted-foreground">
              <span>Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <div className="relative">
              <Progress value={progress} className="h-3" />
              {/* Glow effect when speeding up */}
              {progress > 60 && !isComplete && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0.3, 0.6, 0.3] }}
                  transition={{ repeat: Infinity, duration: 0.5 }}
                  className="absolute inset-0 rounded-full bg-primary/30 blur-sm"
                />
              )}
            </div>
          </div>

          {/* Completion Stats */}
          <AnimatePresence>
            {isComplete && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 rounded-xl bg-success/10 border border-success/30 space-y-3"
              >
                <div className="flex items-center gap-2 text-success">
                  <Shield className="w-4 h-4" />
                  <span className="text-sm font-semibold">Sync Successful</span>
                </div>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground text-xs">Records Updated</p>
                    <p className="font-bold text-lg">14</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground text-xs">Peak Load Impact</p>
                    <p className="font-bold text-lg text-success">0%</p>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground flex items-center gap-1">
                  <Shield className="w-3 h-3" />
                  Safe-Mode Active - Legacy systems protected
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </DialogContent>
    </Dialog>
  );
}
