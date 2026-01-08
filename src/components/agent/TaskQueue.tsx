import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Building2 } from "lucide-react";

interface Task {
  id: string;
  company: string;
  accountId: string;
  risk: "high" | "medium" | "low";
  overdue: string;
  strategy: string;
  active?: boolean;
}

interface TaskQueueProps {
  tasks: Task[];
  activeTaskId?: string;
  onTaskSelect: (taskId: string) => void;
}

const riskColors = {
  high: "bg-critical/20 text-critical border-critical/30",
  medium: "bg-warning/20 text-warning border-warning/30",
  low: "bg-success/20 text-success border-success/30",
};

const riskLabels = {
  high: "HIGH RISK",
  medium: "MEDIUM",
  low: "LOW RISK",
};

export function TaskQueue({ tasks, activeTaskId, onTaskSelect }: TaskQueueProps) {
  return (
    <div className="w-64 h-full glass-card border-r border-border/50 flex flex-col">
      <div className="p-4 border-b border-border/50">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Task Queue</h2>
          <Badge variant="outline" className="text-xs border-primary/50 text-primary">
            {tasks.length} Active
          </Badge>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        {tasks.map((task) => (
          <button
            key={task.id}
            onClick={() => onTaskSelect(task.id)}
            className={cn(
              "w-full p-4 text-left border-b border-border/30 transition-all hover:bg-muted/30",
              activeTaskId === task.id && "bg-muted/50 border-l-2 border-l-primary"
            )}
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-muted/50 flex items-center justify-center">
                  <Building2 className="w-4 h-4 text-muted-foreground" />
                </div>
                <div>
                  <p className="font-medium text-sm">{task.company}</p>
                  <p className="text-xs text-muted-foreground">{task.accountId}</p>
                </div>
              </div>
              <Badge className={cn("text-[10px] px-2", riskColors[task.risk])}>
                {riskLabels[task.risk]}
              </Badge>
            </div>

            <div className="flex items-center justify-between text-xs">
              <div>
                <span className="text-muted-foreground">OVERDUE</span>
                <p className="font-medium">{task.overdue}</p>
              </div>
              <div className="text-right">
                <span className="text-muted-foreground">STRATEGY</span>
                <p className="font-medium text-secondary">{task.strategy}</p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
