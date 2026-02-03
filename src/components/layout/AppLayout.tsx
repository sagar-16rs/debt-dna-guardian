import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Globe, 
  MessageSquare, 
  FileText, 
  Bell, 
  Settings,
  Shield,
  Zap,
  BarChart3,
  LogOut,
  Beaker
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";
import { useNetwork } from "@/contexts/NetworkContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { NetworkSimulator } from "./NetworkSimulator";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/", icon: Globe, label: "Dashboard" },
  { path: "/agent-portal", icon: MessageSquare, label: "Agent Portal" },
  { path: "/resolution-hub", icon: FileText, label: "Resolution Hub" },
  { path: "/analytics", icon: BarChart3, label: "Analytics" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const { user, isDemoMode, signOut } = useAuth();
  const { isOffline, setIsOffline } = useNetwork();

  const userInitials = isDemoMode 
    ? "DM" 
    : user?.user_metadata?.full_name
        ?.split(" ")
        .map((n: string) => n[0])
        .join("")
        .toUpperCase() || user?.email?.substring(0, 2).toUpperCase() || "U";

  return (
    <div className="min-h-screen flex flex-col">
      {/* Demo Mode Banner */}
      {isDemoMode && (
        <div className="bg-gradient-to-r from-secondary to-secondary/80 text-secondary-foreground py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2">
          <Beaker className="w-4 h-4" />
          <span>Demo Mode - Exploring with sample data</span>
          <Button 
            variant="outline" 
            size="sm" 
            className="ml-4 h-6 text-xs bg-white/20 border-white/30 hover:bg-white/30"
            onClick={signOut}
          >
            Exit Demo
          </Button>
        </div>
      )}

      {/* Offline Mode Banner */}
      <AnimatePresence>
        {isOffline && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-gradient-to-r from-warning to-warning/80 text-warning-foreground py-2 px-4 text-center text-sm font-medium flex items-center justify-center gap-2 overflow-hidden"
          >
            <div className="w-2 h-2 rounded-full bg-warning-foreground animate-pulse" />
            <span>Offline Mode active. Actions are being queued locally.</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Connection Restored Banner */}
      <AnimatePresence>
        {!isOffline && location.pathname !== "/" && (
          <motion.div
            key="online-flash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0 }}
            className="hidden"
          />
        )}
      </AnimatePresence>

      {/* Top Navigation */}
      <header className={cn(
        "h-16 border-b border-border/50 glass-card flex items-center justify-between px-6 sticky top-0 z-50 transition-colors duration-300",
        isOffline && "bg-warning/10 border-warning/30"
      )}>
        <div className="flex items-center gap-3">
          <div className={cn(
            "w-10 h-10 rounded-lg flex items-center justify-center glow-primary transition-all",
            isOffline 
              ? "bg-gradient-to-br from-warning to-warning/80" 
              : "bg-gradient-to-br from-primary to-primary-glow"
          )}>
            <Shield className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h1 className="text-lg font-bold tracking-tight">Debt DNA</h1>
            <p className="text-xs text-muted-foreground">Value Preservation System</p>
          </div>
        </div>

        <nav className="flex items-center gap-1">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
                  isActive
                    ? "bg-primary/10 text-primary border border-primary/30"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                )}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-3">
          <div className={cn(
            "flex items-center gap-2 px-3 py-1.5 rounded-full border transition-colors",
            isOffline 
              ? "bg-warning/10 border-warning/30" 
              : "bg-success/10 border-success/30"
          )}>
            <Zap className={cn("w-4 h-4", isOffline ? "text-warning" : "text-success")} />
            <span className={cn("text-xs font-medium", isOffline ? "text-warning" : "text-success")}>
              {isOffline ? "Queued" : "AI Active"}
            </span>
          </div>
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/10 border border-secondary/30">
            <Shield className="w-4 h-4 text-secondary" />
            <span className="text-xs font-medium text-secondary">RPA</span>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="flex items-center gap-2">
            <div className={cn(
              "w-9 h-9 rounded-full flex items-center justify-center",
              isDemoMode 
                ? "bg-gradient-to-br from-secondary to-secondary/80" 
                : "bg-gradient-to-br from-accent to-primary"
            )}>
              <span className="text-sm font-semibold">{userInitials}</span>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={signOut}
              className="h-9 w-9 text-muted-foreground hover:text-foreground"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>

      {/* Footer with Network Simulator */}
      <footer className="border-t border-border/50 bg-card/50 py-3 px-6 flex items-center justify-between">
        <div className="text-xs text-muted-foreground">
          FedEx NEXUS | Intelligent Recovery OS
        </div>
        <NetworkSimulator isOffline={isOffline} onToggle={setIsOffline} />
        <div className="text-xs text-muted-foreground">
          © 2026 Team Smartron
        </div>
      </footer>
    </div>
  );
}
