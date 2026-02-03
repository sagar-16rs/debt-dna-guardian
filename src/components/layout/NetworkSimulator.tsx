import { motion } from "framer-motion";
import { Wifi, WifiOff } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NetworkSimulatorProps {
  isOffline: boolean;
  onToggle: (offline: boolean) => void;
}

export function NetworkSimulator({ isOffline, onToggle }: NetworkSimulatorProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex items-center gap-3 px-4 py-2 rounded-lg bg-muted/30 border border-border/50"
    >
      <div className="flex items-center gap-2">
        {isOffline ? (
          <WifiOff className="w-4 h-4 text-warning" />
        ) : (
          <Wifi className="w-4 h-4 text-success" />
        )}
        <Label htmlFor="network-sim" className="text-xs font-medium cursor-pointer">
          Simulate Network
        </Label>
      </div>
      <Switch
        id="network-sim"
        checked={isOffline}
        onCheckedChange={onToggle}
        className="data-[state=checked]:bg-warning"
      />
      <span className={`text-xs font-medium ${isOffline ? "text-warning" : "text-success"}`}>
        {isOffline ? "Offline" : "Online"}
      </span>
    </motion.div>
  );
}
