import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Copy, AlertTriangle, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  role: "customer" | "agent";
  content: string;
  timestamp: string;
  blocked?: boolean;
  violation?: {
    message: string;
    suggestion: string;
  };
}

interface ChatInterfaceProps {
  account: {
    name: string;
    location: string;
    type: string;
    ltv: string;
    churnRisk: string;
  };
  messages: Message[];
  complianceScore: number;
  isBlocked: boolean;
}

export function ChatInterface({
  account,
  messages,
  complianceScore,
  isBlocked,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState(
    "Listen, you need to pay this by Friday or we're sending it to legal. We can't keep extending this."
  );

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-critical";
  };

  return (
    <div className="flex-1 flex flex-col h-full">
      {/* Account Header */}
      <div className="p-4 border-b border-border/50 glass-card">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-card-elevated flex items-center justify-center">
              <span className="text-lg font-bold">AC</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold">{account.name}</h2>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span>📍 {account.location}</span>
                <span>•</span>
                <span>{account.type}</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="px-3 py-1.5 rounded-lg bg-muted/50 text-center">
              <p className="text-xs text-muted-foreground uppercase">Lifetime Value</p>
              <p className="text-lg font-bold">{account.ltv}</p>
            </div>
            <div className="px-3 py-1.5 rounded-lg bg-warning/10 border border-warning/30 text-center">
              <p className="text-xs text-muted-foreground uppercase">Churn Risk</p>
              <p className="text-lg font-bold text-warning">{account.churnRisk}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-auto p-4 space-y-4">
        <div className="flex justify-center">
          <Badge variant="outline" className="text-xs text-muted-foreground">
            Today, 10:23 AM
          </Badge>
        </div>

        <AnimatePresence>
          {messages.map((message, index) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={cn(
                "flex",
                message.role === "agent" ? "justify-end" : "justify-start"
              )}
            >
              <div
                className={cn(
                  "max-w-[70%] p-3 rounded-2xl",
                  message.role === "agent"
                    ? "bg-primary text-primary-foreground rounded-br-md"
                    : "bg-muted rounded-bl-md",
                  message.blocked && "opacity-50"
                )}
              >
                <p className="text-sm">{message.content}</p>
                <p className="text-[10px] mt-1 opacity-70 text-right">
                  {message.timestamp}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Violation Alert */}
        {isBlocked && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="p-4 rounded-xl bg-critical/10 border border-critical/30"
          >
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-critical/20 flex items-center justify-center">
                <AlertTriangle className="w-4 h-4 text-critical" />
              </div>
              <div className="flex-1">
                <p className="font-semibold text-critical">Tone Violation Detected</p>
                <p className="text-sm text-muted-foreground mt-1">
                  Your draft is too aggressive for a "Value Retention" client. Avoid legal threats at this stage.
                </p>
                <p className="text-sm mt-2">
                  <span className="text-muted-foreground">Suggestion: </span>
                  <span className="text-secondary italic">
                    "Let's secure your account status by setting up a payment plan for Friday."
                  </span>
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {/* AI Auditor Note */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="text-secondary">●</span>
          AI Auditor analyzed payment history. 3 prior extensions granted.
        </div>
      </div>

      {/* Input Area */}
      <div className="p-4 border-t border-border/50 glass-card">
        <div className={cn(
          "rounded-xl border transition-all",
          isBlocked ? "border-critical/50 bg-critical/5" : "border-border/50 bg-card/50"
        )}>
          <Textarea
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Type your message..."
            className="border-0 bg-transparent resize-none min-h-[80px] focus-visible:ring-0"
          />
          <div className="flex items-center justify-between p-3 pt-0">
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Paperclip className="w-4 h-4" />
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Copy className="w-4 h-4" />
              </Button>
              {isBlocked && (
                <div className="flex items-center gap-1 text-xs text-critical">
                  <Lock className="w-3 h-3" />
                  Send Blocked by Guardian AI
                </div>
              )}
            </div>
            <Button
              disabled={isBlocked}
              className={cn(
                "gap-2",
                isBlocked
                  ? "bg-muted text-muted-foreground"
                  : "bg-primary hover:bg-primary/90"
              )}
            >
              Send Message
              {isBlocked ? <Lock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
