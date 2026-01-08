import { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { 
  Globe, 
  MessageSquare, 
  FileText, 
  Bell, 
  Settings,
  Shield,
  Zap
} from "lucide-react";
import { cn } from "@/lib/utils";

interface AppLayoutProps {
  children: ReactNode;
}

const navItems = [
  { path: "/", icon: Globe, label: "Dashboard" },
  { path: "/agent-portal", icon: MessageSquare, label: "Agent Portal" },
  { path: "/resolution-hub", icon: FileText, label: "Resolution Hub" },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation */}
      <header className="h-16 border-b border-border/50 glass-card flex items-center justify-between px-6 sticky top-0 z-50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center glow-primary">
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

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-success/10 border border-success/30">
            <Zap className="w-4 h-4 text-success" />
            <span className="text-xs font-medium text-success">AI Active</span>
          </div>
          <button className="relative p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Bell className="w-5 h-5 text-muted-foreground" />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-primary animate-pulse" />
          </button>
          <button className="p-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Settings className="w-5 h-5 text-muted-foreground" />
          </button>
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-accent to-primary flex items-center justify-center">
            <span className="text-sm font-semibold">SJ</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  );
}
