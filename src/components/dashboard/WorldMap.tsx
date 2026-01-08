import { motion } from "framer-motion";

interface MapPoint {
  id: string;
  x: number;
  y: number;
  status: "safe" | "risk" | "critical" | "opportunity";
  label?: string;
}

const mapPoints: MapPoint[] = [
  { id: "1", x: 25, y: 35, status: "critical", label: "São Paulo" },
  { id: "2", x: 48, y: 28, status: "safe", label: "Frankfurt" },
  { id: "3", x: 52, y: 42, status: "risk", label: "Dubai" },
  { id: "4", x: 75, y: 55, status: "opportunity", label: "Sydney" },
  { id: "5", x: 72, y: 25, status: "safe", label: "Tokyo" },
  { id: "6", x: 15, y: 30, status: "risk", label: "New York" },
];

const statusColors = {
  safe: "bg-success",
  risk: "bg-warning",
  critical: "bg-critical",
  opportunity: "bg-secondary",
};

export function WorldMap() {
  return (
    <div className="relative w-full h-full min-h-[400px] rounded-xl overflow-hidden">
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
          className="absolute"
          style={{ left: `${point.x}%`, top: `${point.y}%` }}
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: index * 0.1, duration: 0.3 }}
        >
          {/* Pulse ring */}
          <div className={`absolute w-6 h-6 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusColors[point.status]} opacity-20 animate-pulse-ring`} />
          
          {/* Center dot */}
          <div className={`relative w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full ${statusColors[point.status]} cursor-pointer hover:scale-150 transition-transform`}>
            <div className={`absolute inset-0 rounded-full ${statusColors[point.status]} animate-ping opacity-50`} />
          </div>
        </motion.div>
      ))}

      {/* Legend */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-6 px-4 py-2 glass-card rounded-full">
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
    </div>
  );
}
