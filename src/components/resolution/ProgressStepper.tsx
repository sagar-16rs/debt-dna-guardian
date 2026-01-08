import { cn } from "@/lib/utils";
import { Check } from "lucide-react";
import { motion } from "framer-motion";

interface Step {
  id: string;
  label: string;
  status: "completed" | "current" | "upcoming";
}

interface ProgressStepperProps {
  steps: Step[];
  currentStep: number;
}

export function ProgressStepper({ steps, currentStep }: ProgressStepperProps) {
  return (
    <div className="w-full">
      <div className="relative flex items-center justify-between">
        {/* Progress Line Background */}
        <div className="absolute left-0 right-0 h-1 bg-muted rounded-full" />
        
        {/* Progress Line Fill */}
        <motion.div
          className="absolute left-0 h-1 bg-gradient-to-r from-primary to-secondary rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        />

        {/* Steps */}
        {steps.map((step, index) => (
          <div key={step.id} className="relative z-10 flex flex-col items-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "w-8 h-8 rounded-full flex items-center justify-center transition-all",
                step.status === "completed" && "bg-success",
                step.status === "current" && "bg-primary glow-primary",
                step.status === "upcoming" && "bg-muted"
              )}
            >
              {step.status === "completed" ? (
                <Check className="w-4 h-4 text-success-foreground" />
              ) : (
                <span
                  className={cn(
                    "text-xs font-medium",
                    step.status === "current"
                      ? "text-primary-foreground"
                      : "text-muted-foreground"
                  )}
                >
                  {index + 1}
                </span>
              )}
            </motion.div>
            <span
              className={cn(
                "absolute top-10 text-xs whitespace-nowrap",
                step.status === "current"
                  ? "text-foreground font-medium"
                  : "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
