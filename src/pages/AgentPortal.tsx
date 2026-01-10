import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { TaskQueue } from "@/components/agent/TaskQueue";
import { ChatInterface } from "@/components/agent/ChatInterface";
import { ComplianceAuditor } from "@/components/agent/ComplianceAuditor";
import { AIChatAssistant } from "@/components/agent/AIChatAssistant";
import { mockAccounts, mockMessages, mockAnalysisLogs, mockSuggestedScripts } from "@/data/mockData";

const mockTasks = mockAccounts.slice(0, 5).map((acc, i) => ({
  id: acc.id,
  company: acc.company_name,
  accountId: acc.account_id,
  risk: acc.risk_level as "high" | "medium" | "low",
  overdue: `${acc.days_overdue} Days`,
  strategy: acc.risk_level === "critical" ? "Escalation" : 
            acc.risk_level === "high" ? "Value Retention" : 
            acc.risk_level === "medium" ? "Soft Nudge" : "Auto-Reminder",
}));

export default function AgentPortal() {
  const [activeTaskId, setActiveTaskId] = useState(mockTasks[0]?.id || "1");
  const [complianceScore, setComplianceScore] = useState(72);
  const [isBlocked, setIsBlocked] = useState(false);

  const activeTask = mockTasks.find((t) => t.id === activeTaskId);
  const activeAccount = mockAccounts.find((a) => a.id === activeTaskId);

  const mockAccount = {
    name: activeAccount?.company_name || "Acme Corp",
    location: activeAccount?.location || "San Francisco, CA",
    type: activeAccount?.industry || "Technology",
    ltv: `$${((activeAccount?.ltv_score || 1200000) / 1000000).toFixed(1)}M`,
    churnRisk: activeAccount?.risk_level === "critical" ? "High" : 
               activeAccount?.risk_level === "high" ? "Medium" : "Low",
  };

  const handleMessageChange = (message: string) => {
    // Simulate compliance checking
    const hasThreateningLanguage = /legal|lawsuit|sue|court|threat/i.test(message);
    const hasAggressiveLanguage = /demand|must|immediately|final/i.test(message);
    
    if (hasThreateningLanguage) {
      setComplianceScore(28);
      setIsBlocked(true);
    } else if (hasAggressiveLanguage) {
      setComplianceScore(52);
      setIsBlocked(false);
    } else {
      setComplianceScore(85);
      setIsBlocked(false);
    }
  };

  const [draftMessage, setDraftMessage] = useState("");

  const handleUseAIResponse = (content: string) => {
    setDraftMessage(content);
  };

  return (
    <div className="flex h-[calc(100vh-64px)]">
      <TaskQueue
        tasks={mockTasks}
        activeTaskId={activeTaskId}
        onTaskSelect={setActiveTaskId}
      />
      <div className="flex-1 flex">
        <div className="flex-1">
          <ChatInterface
            account={mockAccount}
            messages={mockMessages}
            complianceScore={complianceScore}
            isBlocked={isBlocked}
            onMessageChange={handleMessageChange}
            draftMessage={draftMessage}
            onDraftChange={setDraftMessage}
          />
        </div>
        <div className="w-80 border-l border-border/50 p-3">
          <AIChatAssistant
            accountContext={mockAccount}
            onUseResponse={handleUseAIResponse}
          />
        </div>
      </div>
      <ComplianceAuditor
        score={complianceScore}
        empathy={complianceScore >= 70 ? "high" : complianceScore >= 40 ? "medium" : "low"}
        clarity="high"
        analysisLogs={mockAnalysisLogs}
        suggestedScripts={mockSuggestedScripts}
      />
    </div>
  );
}
