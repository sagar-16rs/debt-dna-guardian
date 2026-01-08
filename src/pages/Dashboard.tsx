import { useState } from "react";
import { Search, Globe, BarChart3, TrendingUp } from "lucide-react";
import { MetricCard } from "@/components/dashboard/MetricCard";
import { WorldMap } from "@/components/dashboard/WorldMap";
import { DebtDNAPanel } from "@/components/dashboard/DebtDNAPanel";
import { LiveTicker } from "@/components/dashboard/LiveTicker";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockAccount = {
  name: "Globex Corporation",
  location: "Munich, DE",
  id: "#GLB-9924",
  outstanding: "$142,500",
  daysOverdue: 24,
  ltvTag: "Top 5% LTV",
  aiPrediction:
    "85% probability of payment within 7 days if flexible terms are offered. Recent shipment delays in Hamburg correlate with payment stall.",
  strands: [
    {
      name: "Financial DNA",
      status: "at-risk" as const,
      value: 65,
      details: [
        { label: "Credit Util", value: "92%" },
        { label: "Avg Pay Time", value: "45 Days" },
      ],
    },
    {
      name: "Behavioral DNA",
      status: "stable" as const,
      value: 80,
      details: [
        { label: "Sentiment Analysis", value: "Frustrated but Cooperative" },
        { label: "Response", value: "Responsive" },
        { label: "Detail", value: "Detailed" },
      ],
    },
    {
      name: "Logistical DNA",
      status: "critical" as const,
      value: 35,
      details: [],
    },
  ],
  anomaly: {
    title: "Active Anomaly Detected",
    description:
      "Shipment #9924-X stalled in customs (5 days). Correlates with payment hold.",
  },
};

export default function Dashboard() {
  const [showPanel, setShowPanel] = useState(true);

  return (
    <div className="flex h-[calc(100vh-64px)]">
      {/* Main Content */}
      <div className="flex-1 flex flex-col p-6 overflow-auto">
        {/* Search Bar */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search Global Accounts, Invoice ID, or Helix Pattern..."
              className="pl-10 bg-card/50 border-border/50"
            />
          </div>
          <LiveTicker />
        </div>

        {/* Metric Cards */}
        <div className="grid grid-cols-2 gap-4 mb-6 max-w-md">
          <MetricCard
            title="Value Preserved"
            value="$42.8M"
            trend={{ value: "+12% vs last qtr", direction: "up" }}
            variant="success"
          />
          <MetricCard
            title="At-Risk Revenue"
            value="$8.2M"
            subtitle="Across 1,204 accounts"
            variant="warning"
          />
        </div>

        {/* World Map */}
        <div className="flex-1 glass-card rounded-xl p-4 relative overflow-hidden">
          <WorldMap />

          {/* View Toggle */}
          <div className="absolute bottom-4 left-4">
            <Tabs defaultValue="global" className="glass-card rounded-full p-1">
              <TabsList className="bg-transparent gap-1">
                <TabsTrigger
                  value="global"
                  className="rounded-full data-[state=active]:bg-muted/50 px-4"
                >
                  <Globe className="w-4 h-4 mr-2" />
                  Global
                </TabsTrigger>
                <TabsTrigger
                  value="logistics"
                  className="rounded-full data-[state=active]:bg-muted/50 px-4"
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Logistics
                </TabsTrigger>
                <TabsTrigger
                  value="trends"
                  className="rounded-full data-[state=active]:bg-muted/50 px-4"
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  Trends
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {/* Side Panel */}
      {showPanel && (
        <DebtDNAPanel account={mockAccount} onClose={() => setShowPanel(false)} />
      )}
    </div>
  );
}
