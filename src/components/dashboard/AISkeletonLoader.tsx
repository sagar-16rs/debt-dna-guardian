import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Brain } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface AISkeletonLoaderProps {
  isLoading: boolean;
  onComplete: () => void;
  duration?: number;
}

const analysisSteps = [
  "Analyzing Debt DNA...",
  "Checking FDCPA Compliance...",
  "Fetching Payment History...",
  "Calculating Recovery Probability...",
];

export function AISkeletonLoader({ isLoading, onComplete, duration = 1500 }: AISkeletonLoaderProps) {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    if (!isLoading) {
      setCurrentStep(0);
      return;
    }

    const stepDuration = duration / analysisSteps.length;
    
    const interval = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev >= analysisSteps.length - 1) {
          clearInterval(interval);
          setTimeout(onComplete, 200);
          return prev;
        }
        return prev + 1;
      });
    }, stepDuration);

    return () => clearInterval(interval);
  }, [isLoading, duration, onComplete]);

  if (!isLoading) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="space-y-4"
    >
      <div className="flex items-center gap-3 mb-4">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center"
        >
          <Brain className="w-4 h-4 text-primary" />
        </motion.div>
        <AnimatePresence mode="wait">
          <motion.span
            key={currentStep}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="text-sm text-primary font-medium"
          >
            {analysisSteps[currentStep]}
          </motion.span>
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-20 w-full" />
        <div className="flex gap-2">
          <Skeleton className="h-8 w-24" />
          <Skeleton className="h-8 w-24" />
        </div>
      </div>
    </motion.div>
  );
}
