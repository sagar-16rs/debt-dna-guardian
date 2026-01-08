import { useState } from "react";
import { TaskQueue } from "@/components/agent/TaskQueue";
import { ChatInterface } from "@/components/agent/ChatInterface";
import { ComplianceAuditor } from "@/components/agent/ComplianceAuditor";

const mockTasks = [
  { id: "1", company: "Acme Corp", accountId: "#8842-X", risk: "high" as const, overdue: "45 Days", strategy: "Value Retention" },
  { id: "2", company: "Globex Inc.", accountId: "#9921-A", risk: "medium" as const, overdue: "12 Days", strategy: "Soft Nudge" },
  { id: "3", company: "Soylent Corp", accountId: "#1102-B", risk: "low" as const, overdue: "5 Days", strategy: "Auto-Reminder" },
];

const mockMessages = [
  {
    id: "1",
    role: "customer" as const,
    content: "Hi Sarah, we received the invoice notification. We're having some cash flow timing issues this month due to a delayed shipment. Can we get an extension?",
    timestamp: "Received 10:23 AM",
  },
  {
    id: "2",
    role: "agent" as const,
    content: "I understand. Let me check what options are available for your account tier. One moment please.",
    timestamp: "Sent 10:25 AM",
  },
];

const mockAccount = {
  name: "Acme Corp",
  location: "San Francisco, CA",
  type: "Logistics Partner",
  ltv: "$1.2M",
  churnRisk: "Medium",
};

const mockAnalysisLogs = [
  { id: "1", type: "flagged" as const, title: "Draft text flagged", description: 'Violation: "Threatening" language detected (FDX-Policy-48)', timestamp: "Just now" },
  { id: "2", type: "sentiment" as const, title: "Customer Sentiment Analysis", description: "Anxious but cooperative. High probability of payment plan acceptance.", timestamp: "2 mins ago" },
  { id: "3", type: "context" as const, title: "Context Loaded", description: 'Acme Corp guidelines loaded. Tone: "Professional Partner".', timestamp: "10 mins ago" },
];

const mockSuggestedScripts = [
  { id: "1", title: "Value Preservation", content: "We value your partnership. Let's find a schedule that works for both of us..." },
  { id: "2", title: "Standard Extension", content: "I can offer a 7-day grace period if we can process a partial payment today..." },
];

export default function AgentPortal() {
  const [activeTaskId, setActiveTaskId] = useState("1");

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <TaskQueue
        tasks={mockTasks}
        activeTaskId={activeTaskId}
        onTaskSelect={setActiveTaskId}
      />
      <ChatInterface
        account={mockAccount}
        messages={mockMessages}
        complianceScore={28}
        isBlocked={true}
      />
      <ComplianceAuditor
        score={28}
        empathy="low"
        clarity="high"
        analysisLogs={mockAnalysisLogs}
        suggestedScripts={mockSuggestedScripts}
      />
    </div>
  );
}
