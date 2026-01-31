import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, BarChart3, TrendingUp, Package, Plane, Ship, Truck } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface MapPoint {
  id: string;
  x: number;
  y: number;
  status: "safe" | "risk" | "critical" | "opportunity";
  label?: string;
  packages?: number;
}

const mapPoints: MapPoint[] = [
  { id: "1", x: 25, y: 35, status: "critical", label: "São Paulo", packages: 1247 },
  { id: "2", x: 48, y: 28, status: "safe", label: "Frankfurt", packages: 3421 },
  { id: "3", x: 52, y: 42, status: "risk", label: "Dubai", packages: 892 },
  { id: "4", x: 75, y: 55, status: "opportunity", label: "Sydney", packages: 567 },
  { id: "5", x: 72, y: 25, status: "safe", label: "Tokyo", packages: 2834 },
  { id: "6", x: 15, y: 30, status: "risk", label: "New York", packages: 4521 },
];

const statusColors = {
  safe: "bg-success",
  risk: "bg-warning",
  critical: "bg-critical",
  opportunity: "bg-secondary",
};

// Package routes for the animated logistics view
const packageRoutes = [
  { id: "r1", from: { x: 15, y: 30 }, to: { x: 48, y: 28 }, type: "air" },
  { id: "r2", from: { x: 48, y: 28 }, to: { x: 72, y: 25 }, type: "air" },
  { id: "r3", from: { x: 25, y: 35 }, to: { x: 15, y: 30 }, type: "ground" },
  { id: "r4", from: { x: 52, y: 42 }, to: { x: 75, y: 55 }, type: "sea" },
];

const trendData = [
  { month: "Jan", volume: 2400, onTime: 94 },
  { month: "Feb", volume: 2800, onTime: 96 },
  { month: "Mar", volume: 3200, onTime: 93 },
  { month: "Apr", volume: 2900, onTime: 97 },
  { month: "May", volume: 3500, onTime: 95 },
  { month: "Jun", volume: 4100, onTime: 98 },
];

const regionStats = [
  { region: "North America", volume: "4.2M", growth: "+12%" },
  { region: "Europe", volume: "3.8M", growth: "+8%" },
  { region: "Asia Pacific", volume: "5.1M", growth: "+15%" },
  { region: "Latin America", volume: "1.2M", growth: "+22%" },
];

function GlobalView() {
  return (
    <div className="relative w-full h-full">
      {/* Map Background - Simplified dark world map */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          {/* Simplified continent shapes */}
          <defs>
            <linearGradient id="mapGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(230 25% 15%)" />
              <stop offset="100%" stopColor="hsl(230 25% 10%)" />
            </linearGradient>
          </defs>
          
          {/* North America */}
          <path
            d="M5,15 Q10,10 20,12 L25,18 Q22,25 18,30 L10,28 Q5,22 5,15"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
          
          {/* South America */}
          <path
            d="M20,35 Q25,32 28,38 L26,50 Q22,55 20,50 L18,40 Q19,36 20,35"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
          
          {/* Europe */}
          <path
            d="M42,12 Q48,10 52,15 L50,22 Q46,25 42,22 L40,16 Q41,13 42,12"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
          
          {/* Africa */}
          <path
            d="M45,25 Q52,23 55,30 L52,45 Q48,50 45,45 L43,32 Q44,27 45,25"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
          
          {/* Asia */}
          <path
            d="M55,10 Q70,8 80,15 L78,30 Q72,35 65,32 L58,25 Q55,18 55,10"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
          
          {/* Australia */}
          <path
            d="M72,45 Q78,43 82,48 L80,55 Q75,57 72,54 L70,50 Q71,46 72,45"
            fill="url(#mapGradient)"
            stroke="hsl(230 20% 25%)"
            strokeWidth="0.2"
          />
        </svg>
      </div>

      {/* Grid overlay */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(hsl(230 20% 30%) 1px, transparent 1px),
            linear-gradient(90deg, hsl(230 20% 30%) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px",
        }}
      />

      {/* Map Points */}
      {mapPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute group"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {/* Pulse ring */}
          <div className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusColors[point.status]} opacity-20 animate-pulse`} />
          
          {/* Center dot */}
          <div className={`relative w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusColors[point.status]} cursor-pointer hover:scale-150 transition-transform`}>
            <div className={`absolute inset-0 rounded-full ${statusColors[point.status]} animate-ping opacity-50`} />
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
            <div className="glass-card px-2 py-1 rounded text-xs whitespace-nowrap">
              <p className="font-medium">{point.label}</p>
              <p className="text-muted-foreground">{point.packages?.toLocaleString()} packages</p>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function LogisticsView() {
  return (
    <div className="relative w-full h-full">
      {/* Map Background */}
      <div className="absolute inset-0 opacity-20">
        <svg viewBox="0 0 100 60" className="w-full h-full" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="mapGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="hsl(230 25% 15%)" />
              <stop offset="100%" stopColor="hsl(230 25% 10%)" />
            </linearGradient>
          </defs>
          <path d="M5,15 Q10,10 20,12 L25,18 Q22,25 18,30 L10,28 Q5,22 5,15" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
          <path d="M20,35 Q25,32 28,38 L26,50 Q22,55 20,50 L18,40 Q19,36 20,35" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
          <path d="M42,12 Q48,10 52,15 L50,22 Q46,25 42,22 L40,16 Q41,13 42,12" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
          <path d="M45,25 Q52,23 55,30 L52,45 Q48,50 45,45 L43,32 Q44,27 45,25" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
          <path d="M55,10 Q70,8 80,15 L78,30 Q72,35 65,32 L58,25 Q55,18 55,10" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
          <path d="M72,45 Q78,43 82,48 L80,55 Q75,57 72,54 L70,50 Q71,46 72,45" fill="url(#mapGradient2)" stroke="hsl(230 20% 25%)" strokeWidth="0.2" />
        </svg>
      </div>

      {/* Animated Package Routes */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none">
        {packageRoutes.map((route, i) => (
          <g key={route.id}>
            {/* Route line */}
            <motion.line
              x1={`${route.from.x}%`}
              y1={`${route.from.y}%`}
              x2={`${route.to.x}%`}
              y2={`${route.to.y}%`}
              stroke={route.type === "air" ? "hsl(187 92% 42%)" : route.type === "sea" ? "hsl(200 100% 50%)" : "hsl(18 100% 60%)"}
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity={0.4}
            />
            {/* Animated package dot */}
            <motion.circle
              r="4"
              fill={route.type === "air" ? "hsl(187 92% 42%)" : route.type === "sea" ? "hsl(200 100% 50%)" : "hsl(18 100% 60%)"}
              initial={{ 
                cx: `${route.from.x}%`, 
                cy: `${route.from.y}%`,
                opacity: 1 
              }}
              animate={{ 
                cx: [`${route.from.x}%`, `${route.to.x}%`], 
                cy: [`${route.from.y}%`, `${route.to.y}%`],
                opacity: [1, 1, 0]
              }}
              transition={{
                duration: 3,
                delay: i * 0.8,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          </g>
        ))}
      </svg>

      {/* Hub Points with Package Icons */}
      {mapPoints.map((point, index) => (
        <motion.div
          key={point.id}
          className="absolute"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: index * 0.1 }}
        >
          <div className="relative -translate-x-1/2 -translate-y-1/2">
            <div className={`w-8 h-8 rounded-lg ${statusColors[point.status]} bg-opacity-20 flex items-center justify-center border border-current`}
              style={{ borderColor: point.status === "safe" ? "hsl(142 72% 45%)" : point.status === "risk" ? "hsl(45 93% 47%)" : point.status === "critical" ? "hsl(0 84% 60%)" : "hsl(187 92% 42%)" }}>
              <Package className="w-4 h-4" style={{ color: point.status === "safe" ? "hsl(142 72% 45%)" : point.status === "risk" ? "hsl(45 93% 47%)" : point.status === "critical" ? "hsl(0 84% 60%)" : "hsl(187 92% 42%)" }} />
            </div>
          </div>
        </motion.div>
      ))}

      {/* Transport Legend */}
      <div className="absolute top-4 right-4 glass-card rounded-lg p-3 space-y-2">
        <p className="text-xs font-medium text-muted-foreground mb-2">Active Routes</p>
        <div className="flex items-center gap-2">
          <Plane className="w-3 h-3 text-secondary" />
          <span className="text-xs">Air Freight</span>
        </div>
        <div className="flex items-center gap-2">
          <Ship className="w-3 h-3 text-[hsl(200,100%,50%)]" />
          <span className="text-xs">Sea Freight</span>
        </div>
        <div className="flex items-center gap-2">
          <Truck className="w-3 h-3 text-primary" />
          <span className="text-xs">Ground</span>
        </div>
      </div>
    </div>
  );
}

function TrendsView() {
  return (
    <div className="relative w-full h-full p-4">
      {/* Mini Chart */}
      <div className="h-[60%]">
        <p className="text-xs text-muted-foreground mb-2">Global Shipment Volume Trend</p>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={trendData}>
            <defs>
              <linearGradient id="trendGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="hsl(187 92% 42%)" stopOpacity={0.3} />
                <stop offset="95%" stopColor="hsl(187 92% 42%)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis dataKey="month" stroke="hsl(215 20% 55%)" fontSize={10} axisLine={false} tickLine={false} />
            <YAxis stroke="hsl(215 20% 55%)" fontSize={10} axisLine={false} tickLine={false} tickFormatter={(v) => `${(v/1000).toFixed(0)}K`} />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(230 25% 8%)",
                border: "1px solid hsl(230 20% 18%)",
                borderRadius: "8px",
              }}
            />
            <Area
              type="monotone"
              dataKey="volume"
              stroke="hsl(187 92% 42%)"
              fill="url(#trendGradient)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Region Stats */}
      <div className="h-[40%] grid grid-cols-2 gap-2 mt-2">
        {regionStats.map((stat, i) => (
          <motion.div
            key={stat.region}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="glass-card rounded-lg p-2"
          >
            <p className="text-[10px] text-muted-foreground truncate">{stat.region}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-sm font-bold">{stat.volume}</span>
              <span className="text-[10px] text-success">{stat.growth}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export function WorldMap() {
  const [activeTab, setActiveTab] = useState("global");

  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="h-full">
        {/* Content Areas */}
        <AnimatePresence mode="wait">
          {activeTab === "global" && (
            <motion.div
              key="global"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <GlobalView />
            </motion.div>
          )}
          {activeTab === "analytics" && (
            <motion.div
              key="analytics"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <LogisticsView />
            </motion.div>
          )}
          {activeTab === "trends" && (
            <motion.div
              key="trends"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0"
            >
              <TrendsView />
            </motion.div>
          )}
        </AnimatePresence>

        {/* Legend - only show on Global view */}
        {activeTab === "global" && (
          <div className="absolute bottom-14 left-1/2 -translate-x-1/2 flex items-center gap-6 px-4 py-2 glass-card rounded-full">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-success" />
              <span className="text-xs text-muted-foreground">Safe</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-warning" />
              <span className="text-xs text-muted-foreground">Risk</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-critical" />
              <span className="text-xs text-muted-foreground">Crit</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-secondary" />
              <span className="text-xs text-muted-foreground">Oppt</span>
            </div>
          </div>
        )}

        {/* View Toggle */}
        <div className="absolute bottom-4 left-4">
          <TabsList className="glass-card rounded-full p-1 bg-transparent gap-1">
            <TabsTrigger
              value="global"
              className="rounded-full data-[state=active]:bg-primary/20 data-[state=active]:text-primary px-4 text-xs"
            >
              <Globe className="w-3 h-3 mr-1.5" />
              Global
            </TabsTrigger>
            <TabsTrigger
              value="analytics"
              className="rounded-full data-[state=active]:bg-secondary/20 data-[state=active]:text-secondary px-4 text-xs"
            >
              <Package className="w-3 h-3 mr-1.5" />
              Logistics
            </TabsTrigger>
            <TabsTrigger
              value="trends"
              className="rounded-full data-[state=active]:bg-success/20 data-[state=active]:text-success px-4 text-xs"
            >
              <TrendingUp className="w-3 h-3 mr-1.5" />
              Trends
            </TabsTrigger>
          </TabsList>
        </div>
      </Tabs>
    </div>
  );
}
