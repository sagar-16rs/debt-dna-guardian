import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

const AI_FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ai-analyze`;

interface AnalysisResult {
  success: boolean;
  analysis: Record<string, any>;
  type: string;
}

export function useAIAnalysis() {
  return useMutation({
    mutationFn: async ({
      type,
      accountData,
      messageContent,
    }: {
      type: "prioritize" | "compliance" | "predict" | "workflow";
      accountData?: Record<string, any>;
      messageContent?: string;
    }): Promise<AnalysisResult> => {
      const response = await fetch(AI_FUNCTION_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY}`,
        },
        body: JSON.stringify({ type, accountData, messageContent }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        if (response.status === 429) {
          toast.error("AI rate limit exceeded. Please try again later.");
        } else if (response.status === 402) {
          toast.error("AI credits exhausted. Please contact administrator.");
        }
        throw new Error(errorData.error || "Analysis failed");
      }

      return response.json();
    },
    onError: (error: Error) => {
      toast.error(error.message || "AI analysis failed");
    },
  });
}
