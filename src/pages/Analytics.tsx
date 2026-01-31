import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
} from "recharts";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Clock,
  Target,
  AlertTriangle,
  Brain,
  Bot,
  Workflow,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useDashboardStats } from "@/hooks/useAccounts";
import { mockDashboardStats } from "@/data/mockData";

const recoveryTrend = [
  { month: "Jul", recovered: 2.4, target: 2.2, ai_assisted: 1.8 },
  { month: "Aug", recovered: 3.1, target: 2.8, ai_assisted: 2.4 },
  { month: "Sep", recovered: 2.8, target: 3.0, ai_assisted: 2.1 },
  { month: "Oct", recovered: 3.5, target: 3.2, ai_assisted: 2.8 },
  { month: "Nov", recovered: 4.2, target: 3.5, ai_assisted: 3.5 },
  { month: "Dec", recovered: 4.8, target: 3.8, ai_assisted: 4.1 },
];

const agentPerformance = [
  { name: "Sarah J.", resolved: 142, amount: 892000, compliance: 98.2 },
  { name: "Mike R.", resolved: 128, amount: 756000, compliance: 96.8 },
  { name: "Emily K.", resolved: 115, amount: 634000, compliance: 99.1 },
  { name: "David L.", resolved: 98, amount: 521000, compliance: 95.4 },
  { name: "Lisa M.", resolved: 87, amount: 478000, compliance: 97.6 },
];

const riskDistribution = [
  { name: "Low Risk", value: 45, color: "hsl(142, 72%, 45%)" },
  { name: "Medium Risk", value: 30, color: "hsl(45, 93%, 47%)" },
  { name: "High Risk", value: 18, color: "hsl(18, 100%, 60%)" },
  { name: "Critical", value: 7, color: "hsl(0, 84%, 60%)" },
];

const resolutionTimes = [
  { range: "0-7 days", count: 234, color: "hsl(142, 72%, 45%)" },
  { range: "8-14 days", count: 187, color: "hsl(187, 92%, 42%)" },
  { range: "15-30 days", count: 142, color: "hsl(45, 93%, 47%)" },
  { range: "31-60 days", count: 89, color: "hsl(18, 100%, 60%)" },
  { range: "60+ days", count: 48, color: "hsl(0, 84%, 60%)" },
];

const automationStats = [
  { label: "AI-Prioritized Cases", value: "78%", icon: Brain, color: "text-secondary" },
  { label: "Automated Workflows", value: "1,247", icon: Workflow, color: "text-primary" },
  { label: "RPA Integrations", value: "12", icon: Bot, color: "text-success" },
];

export default function Analytics() {
  const { isDemoMode } = useAuth();
  const { data: realStats, isLoading: statsLoading } = useDashboardStats();
  
  const stats = isDemoMode ? mockDashboardStats : realStats;
  const loading = !isDemoMode && statsLoading;

  const formatCurrency = (value: number) => {
    if (value >= 1000000) return `$${(value / 1000000).toFixed(1)}M`;
    if (value >= 1000) return `$${(value / 1000).toFixed(0)}K`;
    return `$${value}`;
  };

  return (
    <div className="p-6 space-y-6 overflow-auto max-h-[calc(100vh-64px)]">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">Performance tracking & AI insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Badge className="bg-secondary/10 text-secondary border-secondary/30">
            <Brain className="w-3 h-3 mr-1" />
            ML Models Active
          </Badge>
          <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-success/10 border border-success/30">
            <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
            <span className="text-sm font-medium text-success">Real-time data</span>
          </div>
        </div>
      </div>

      {/* Automation Stats Row */}
      <div className="grid grid-cols-3 gap-4">
        {automationStats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className="glass-card border-border/50">
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center ${stat.color}`}>
                    <stat.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold">{stat.value}</p>
                    <p className="text-sm text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-4 gap-4">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Total Outstanding</p>
                  <p className="text-2xl font-bold mt-1">
                    {loading ? "..." : formatCurrency(stats?.totalOutstanding || 0)}
                  </p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-primary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingDown className="w-4 h-4 text-success" />
                <span className="text-success">-12.3%</span>
                <span className="text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Recovery Rate</p>
                  <p className="text-2xl font-bold mt-1">{stats?.recoveryRate || 0}%</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                  <Target className="w-6 h-6 text-success" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingUp className="w-4 h-4 text-success" />
                <span className="text-success">+4.2%</span>
                <span className="text-muted-foreground">vs last quarter</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}>
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avg Resolution</p>
                  <p className="text-2xl font-bold mt-1">{stats?.avgResolutionDays || 0} days</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-secondary/10 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <TrendingDown className="w-4 h-4 text-success" />
                <span className="text-success">-3.2 days</span>
                <span className="text-muted-foreground">improvement</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
          <Card className="glass-card border-border/50">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Active Accounts</p>
                  <p className="text-2xl font-bold mt-1">{stats?.totalAccounts || 0}</p>
                </div>
                <div className="w-12 h-12 rounded-xl bg-warning/10 flex items-center justify-center">
                  <Users className="w-6 h-6 text-warning" />
                </div>
              </div>
              <div className="flex items-center gap-1 mt-3 text-sm">
                <AlertTriangle className="w-4 h-4 text-critical" />
                <span className="text-critical">{stats?.criticalAccounts || 0} critical</span>
                <span className="text-muted-foreground">need attention</span>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-3 gap-6">
        {/* Recovery Trend with AI */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="col-span-2"
        >
          <Card className="glass-card border-border/50">
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg font-semibold">Recovery Trend</CardTitle>
              <Badge variant="outline" className="text-xs">
                <Brain className="w-3 h-3 mr-1" />
                AI-Assisted
              </Badge>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={280}>
                <AreaChart data={recoveryTrend}>
                  <defs>
                    <linearGradient id="colorRecovered" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(142, 72%, 45%)" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorAI" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="hsl(187, 92%, 42%)" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="hsl(187, 92%, 42%)" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                  <XAxis dataKey="month" stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} tickFormatter={(v) => `$${v}M`} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(230, 25%, 8%)",
                      border: "1px solid hsl(230, 20%, 18%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`$${value}M`, ""]}
                  />
                  <Area
                    type="monotone"
                    dataKey="recovered"
                    stroke="hsl(142, 72%, 45%)"
                    fillOpacity={1}
                    fill="url(#colorRecovered)"
                    strokeWidth={2}
                    name="Total Recovered"
                  />
                  <Area
                    type="monotone"
                    dataKey="ai_assisted"
                    stroke="hsl(187, 92%, 42%)"
                    fillOpacity={1}
                    fill="url(#colorAI)"
                    strokeWidth={2}
                    name="AI Assisted"
                  />
                  <Line type="monotone" dataKey="target" stroke="hsl(215, 20%, 55%)" strokeDasharray="5 5" name="Target" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Risk Distribution */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
          <Card className="glass-card border-border/50 h-full">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Risk Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={riskDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={80}
                    paddingAngle={2}
                    dataKey="value"
                    label={({ name, value }) => `${value}%`}
                    labelLine={false}
                  >
                    {riskDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(230, 25%, 8%)",
                      border: "1px solid hsl(230, 20%, 18%)",
                      borderRadius: "8px",
                    }}
                    formatter={(value: number) => [`${value}%`, ""]}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-2 gap-2 mt-4">
                {riskDistribution.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-xs text-foreground font-medium">{item.name}</span>
                    <span className="text-xs text-muted-foreground ml-auto">{item.value}%</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-2 gap-6">
        {/* Resolution Times */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Resolution Time Distribution</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={250}>
                <BarChart data={resolutionTimes}>
                  <CartesianGrid strokeDasharray="3 3" stroke="hsl(230, 20%, 18%)" />
                  <XAxis dataKey="range" stroke="hsl(215, 20%, 55%)" fontSize={11} />
                  <YAxis stroke="hsl(215, 20%, 55%)" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "hsl(230, 25%, 8%)",
                      border: "1px solid hsl(230, 20%, 18%)",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="count" radius={[4, 4, 0, 0]}>
                    {resolutionTimes.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        {/* Agent Performance */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
          <Card className="glass-card border-border/50">
            <CardHeader>
              <CardTitle className="text-lg font-semibold">Top Performing Agents</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {agentPerformance.map((agent, index) => (
                  <div key={agent.name} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-xs font-bold">
                      {index + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-medium">{agent.name}</p>
                        <p className="text-sm text-muted-foreground">{agent.resolved} resolved</p>
                      </div>
                      <div className="flex items-center gap-4 mt-1">
                        <span className="text-xs text-success">${(agent.amount / 1000).toFixed(0)}K recovered</span>
                        <span className="text-xs text-secondary">{agent.compliance}% compliance</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
