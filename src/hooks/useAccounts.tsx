import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export interface Account {
  id: string;
  company_name: string;
  account_id: string;
  location: string | null;
  contact_email: string | null;
  contact_phone: string | null;
  outstanding_amount: number;
  days_overdue: number;
  risk_level: "low" | "medium" | "high" | "critical";
  ltv_score: number | null;
  industry: string | null;
  created_at: string;
  updated_at: string;
}

export interface AIPrediction {
  id: string;
  account_id: string;
  prediction_type: string;
  prediction_value: number | null;
  recommended_strategy: string | null;
  recommended_action: string | null;
  confidence_score: number | null;
  model_version: string | null;
  factors: Record<string, any> | null;
  created_at: string;
}

export interface Workflow {
  id: string;
  account_id: string;
  assigned_agent: string | null;
  workflow_type: string;
  status: string;
  priority: number;
  due_date: string | null;
  notes: string | null;
  automation_rules: Record<string, any> | null;
  created_at: string;
  updated_at: string;
}

export function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("accounts")
        .select("*")
        .order("days_overdue", { ascending: false });

      if (error) throw error;
      return data as Account[];
    },
  });
}

export function useAccountWithPredictions(accountId: string | null) {
  return useQuery({
    queryKey: ["account", accountId],
    queryFn: async () => {
      if (!accountId) return null;

      const [accountRes, predictionsRes, workflowsRes] = await Promise.all([
        supabase.from("accounts").select("*").eq("id", accountId).single(),
        supabase.from("ai_predictions").select("*").eq("account_id", accountId),
        supabase.from("workflows").select("*").eq("account_id", accountId),
      ]);

      if (accountRes.error) throw accountRes.error;

      return {
        account: accountRes.data as Account,
        predictions: (predictionsRes.data || []) as AIPrediction[],
        workflows: (workflowsRes.data || []) as Workflow[],
      };
    },
    enabled: !!accountId,
  });
}

export function useWorkflows() {
  return useQuery({
    queryKey: ["workflows"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("workflows")
        .select(`
          *,
          accounts (
            company_name,
            account_id,
            outstanding_amount,
            days_overdue,
            risk_level
          )
        `)
        .order("priority", { ascending: false });

      if (error) throw error;
      return data;
    },
  });
}

export function useDashboardStats() {
  return useQuery({
    queryKey: ["dashboard-stats"],
    queryFn: async () => {
      const { data: accounts, error } = await supabase
        .from("accounts")
        .select("outstanding_amount, risk_level, days_overdue, ltv_score");

      if (error) throw error;

      const totalOutstanding = accounts?.reduce((sum, a) => sum + Number(a.outstanding_amount), 0) || 0;
      const atRiskAmount = accounts
        ?.filter((a) => a.risk_level === "high" || a.risk_level === "critical")
        .reduce((sum, a) => sum + Number(a.outstanding_amount), 0) || 0;
      const totalAccounts = accounts?.length || 0;
      const criticalAccounts = accounts?.filter((a) => a.risk_level === "critical").length || 0;

      return {
        totalOutstanding,
        atRiskAmount,
        totalAccounts,
        criticalAccounts,
        recoveryRate: 94.2, // Demo value
        avgResolutionDays: 12.4, // Demo value
      };
    },
  });
}
