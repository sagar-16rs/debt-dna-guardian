import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Brain, Loader2 } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { WorldMap } from "@/components/dashboard/WorldMap";
import { LiveTicker } from "@/components/dashboard/LiveTicker";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { AIInsightPanel } from "@/components/dashboard/AIInsightPanel";
import { ERPSyncButton } from "@/components/dashboard/ERPSyncButton";
import { AgencyPerformance } from "@/components/dashboard/AgencyPerformance";
import { AISkeletonLoader } from "@/components/dashboard/AISkeletonLoader";
import { Input } from "@/components/ui/input";
import { useAuth } from "@/hooks/useAuth";
import { useAccounts, useDashboardStats, useAccountWithPredictions } from "@/hooks/useAccounts";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { mockAccounts, mockPredictions, mockWorkflows, mockDashboardStats } from "@/data/mockData";
import { toast } from "sonner";

export default function Dashboard() {
  const { isDemoMode } = useAuth();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showAILoader, setShowAILoader] = useState(false);
  
  // Use real data or mock data based on demo mode
  const { data: realAccounts, isLoading: accountsLoading } = useAccounts();
  const { data: realStats, isLoading: statsLoading } = useDashboardStats();
  const { data: selectedData } = useAccountWithPredictions(isDemoMode ? null : selectedAccountId);
  const aiAnalysis = useAIAnalysis();

  const accounts = isDemoMode ? mockAccounts : (realAccounts || []);
  const stats = isDemoMode ? mockDashboardStats : realStats;

  const filteredAccounts = accounts?.filter(
    (acc) =>
      acc.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.account_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get selected account data for demo mode
  const getSelectedAccountData = () => {
    if (!selectedAccountId) return null;
    
    if (isDemoMode) {
      const account = mockAccounts.find((a) => a.id === selectedAccountId);
      if (!account) return null;
      
      const prediction = mockPredictions[selectedAccountId];
      const workflows = mockWorkflows.filter((w) => w.account_id === selectedAccountId);
      
      return {
        account,
        predictions: prediction ? [{
          id: "p1",
          account_id: selectedAccountId,
          prediction_type: "recovery",
          prediction_value: prediction.recovery_probability,
          recommended_strategy: prediction.recommended_strategy,
          recommended_action: prediction.recommended_action,
          confidence_score: prediction.confidence_score,
          model_version: "v1.0",
          factors: prediction.factors,
          created_at: new Date().toISOString(),
        }] : [],
        workflows,
      };
    }
    
    return selectedData;
  };

  const currentSelectedData = getSelectedAccountData();

  const handleAnalyzeAccount = async (accountId: string) => {
    if (isDemoMode) {
      setIsAnalyzing(true);
      setShowAILoader(true);
      setSelectedAccountId(accountId);
      return;
    }

    const account = accounts?.find((a) => a.id === accountId);
    if (!account) return;

    toast.info("Running AI analysis...");
    
    try {
      const result = await aiAnalysis.mutateAsync({
        type: "prioritize",
        accountData: {
          company_name: account.company_name,
          outstanding_amount: account.outstanding_amount,
          days_overdue: account.days_overdue,
          risk_level: account.risk_level,
          ltv_score: account.ltv_score,
          industry: account.industry,
        },
      });

      if (result.success) {
        toast.success("AI analysis complete!");
        setSelectedAccountId(accountId);
      }
    } catch (error) {
      // Error toast is handled in the hook
    }
  };

  const handleAILoaderComplete = () => {
    setShowAILoader(false);
    setIsAnalyzing(false);
    toast.success("AI analysis complete!");
  };

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  const loading = !isDemoMode && (accountsLoading || statsLoading);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search accounts, invoice ID, or pattern..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 h-11 bg-card/50 border-border/50 text-sm"
            />
          </div>
          <ERPSyncButton />
          <LiveTicker />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Outstanding"
            value={loading ? "..." : formatCurrency(stats?.totalOutstanding || 0)}
            subtitle={`${stats?.totalAccounts || 0} accounts`}
            variant="primary"
          />
          <MetricCard
            title="At-Risk Revenue"
            value={loading ? "..." : formatCurrency(stats?.atRiskAmount || 0)}
            subtitle={`${stats?.criticalAccounts || 0} critical`}
            variant="warning"
          />
          <MetricCard
            title="Recovery Rate"
            value={`${stats?.recoveryRate || 0}%`}
            trend={{ value: "+4.2% vs last qtr", direction: "up" }}
            variant="success"
          />
          <MetricCard
            title="Avg Resolution"
            value={`${stats?.avgResolutionDays || 0} days`}
            trend={{ value: "-3 days improved", direction: "up" }}
            variant="default"
          />
        </div>

        {/* Two Column Layout */}
        <div className="flex-1 grid grid-cols-5 gap-6">
          {/* Account List */}
          <div className="col-span-2 flex flex-col gap-6">
            <div className="glass-card rounded-xl p-4 overflow-hidden flex flex-col flex-1">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-sm">Priority Accounts</h3>
                <span className="text-xs text-muted-foreground">{accounts?.length || 0} total</span>
              </div>
              
              <div className="flex-1 overflow-auto space-y-3 pr-2">
                {loading ? (
                  <div className="flex items-center justify-center h-32">
                    <Loader2 className="w-6 h-6 animate-spin text-muted-foreground" />
                  </div>
                ) : filteredAccounts?.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-8">No accounts found</p>
                ) : (
                  filteredAccounts?.map((account) => (
                    <AccountCard
                      key={account.id}
                      account={account}
                      isSelected={selectedAccountId === account.id}
                      onSelect={() => setSelectedAccountId(account.id)}
                      onAnalyze={() => handleAnalyzeAccount(account.id)}
                      isAnalyzing={isAnalyzing || aiAnalysis.isPending}
                    />
                  ))
                )}
              </div>
            </div>
            
            {/* Agency Performance */}
            <AgencyPerformance />
          </div>

          {/* World Map */}
          <div className="col-span-3 glass-card rounded-xl p-4 relative overflow-hidden">
            <WorldMap />
          </div>
        </div>
      </div>

      {/* AI Insight Panel with Skeleton Loader */}
      <AnimatePresence>
        {selectedAccountId && (
          <motion.div
            initial={{ x: 400, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 400, opacity: 0 }}
            className="w-[400px] border-l border-border/50 glass-card p-6 overflow-auto"
          >
            {showAILoader ? (
              <AISkeletonLoader
                isLoading={showAILoader}
                onComplete={handleAILoaderComplete}
                duration={1500}
              />
            ) : currentSelectedData ? (
              <AIInsightPanel
                account={currentSelectedData.account as any}
                predictions={currentSelectedData.predictions as any}
                workflows={currentSelectedData.workflows as any}
                onClose={() => setSelectedAccountId(null)}
              />
            ) : null}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
