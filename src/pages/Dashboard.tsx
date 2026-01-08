import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Globe, BarChart3, TrendingUp, Brain, Sparkles, Loader2 } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { WorldMap } from "@/components/dashboard/WorldMap";
import { LiveTicker } from "@/components/dashboard/LiveTicker";
import { AccountCard } from "@/components/dashboard/AccountCard";
import { AIInsightPanel } from "@/components/dashboard/AIInsightPanel";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { useAccounts, useDashboardStats, useAccountWithPredictions } from "@/hooks/useAccounts";
import { useAIAnalysis } from "@/hooks/useAIAnalysis";
import { toast } from "sonner";

export default function Dashboard() {
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  
  const { data: accounts, isLoading: accountsLoading } = useAccounts();
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const { data: selectedData, isLoading: selectedLoading } = useAccountWithPredictions(selectedAccountId);
  const aiAnalysis = useAIAnalysis();

  const filteredAccounts = accounts?.filter(
    (acc) =>
      acc.company_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      acc.account_id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAnalyzeAccount = async (accountId: string) => {
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

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

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
          <LiveTicker />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <MetricCard
            title="Total Outstanding"
            value={statsLoading ? "..." : formatCurrency(stats?.totalOutstanding || 0)}
            subtitle={`${stats?.totalAccounts || 0} accounts`}
            variant="primary"
          />
          <MetricCard
            title="At-Risk Revenue"
            value={statsLoading ? "..." : formatCurrency(stats?.atRiskAmount || 0)}
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
          <div className="col-span-2 glass-card rounded-xl p-4 overflow-hidden flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-semibold text-sm">Priority Accounts</h3>
              <span className="text-xs text-muted-foreground">{accounts?.length || 0} total</span>
            </div>
            
            <div className="flex-1 overflow-auto space-y-3 pr-2">
              {accountsLoading ? (
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
                    isAnalyzing={aiAnalysis.isPending}
                  />
                ))
              )}
            </div>
          </div>

          {/* World Map */}
          <div className="col-span-3 glass-card rounded-xl p-4 relative overflow-hidden">
            <WorldMap />

            {/* View Toggle */}
            <div className="absolute bottom-4 left-4">
              <Tabs defaultValue="global" className="glass-card rounded-full p-1">
                <TabsList className="bg-transparent gap-1">
                  <TabsTrigger
                    value="global"
                    className="rounded-full data-[state=active]:bg-muted/50 px-4 text-xs"
                  >
                    <Globe className="w-3 h-3 mr-1.5" />
                    Global
                  </TabsTrigger>
                  <TabsTrigger
                    value="analytics"
                    className="rounded-full data-[state=active]:bg-muted/50 px-4 text-xs"
                  >
                    <BarChart3 className="w-3 h-3 mr-1.5" />
                    Analytics
                  </TabsTrigger>
                  <TabsTrigger
                    value="trends"
                    className="rounded-full data-[state=active]:bg-muted/50 px-4 text-xs"
                  >
                    <TrendingUp className="w-3 h-3 mr-1.5" />
                    Trends
                  </TabsTrigger>
                </TabsList>
              </Tabs>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight Panel */}
      <AnimatePresence>
        {selectedAccountId && selectedData && (
          <AIInsightPanel
            account={selectedData.account}
            predictions={selectedData.predictions}
            workflows={selectedData.workflows}
            onClose={() => setSelectedAccountId(null)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
