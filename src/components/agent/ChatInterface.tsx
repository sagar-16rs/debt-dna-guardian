import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Paperclip, Copy, AlertTriangle, Lock, CheckCircle, Mic, Clock, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { VoiceMode } from "./VoiceMode";
import { ComplianceBlocker } from "./ComplianceBlocker";
import { useNetwork } from "@/contexts/NetworkContext";

interface Message {
  id: string;
  role: "customer" | "agent";
  content: string;
  timestamp: string;
  blocked?: boolean;
  status?: "pending" | "sent" | "delivered";
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
  onMessageChange?: (message: string) => void;
  draftMessage?: string;
  onDraftChange?: (message: string) => void;
}

// Words that trigger FDCPA compliance block
const BLOCKED_WORDS = ["sue", "legal", "lawsuit", "court", "attorney", "lawyer"];

export function ChatInterface({
  account,
  messages: initialMessages,
  complianceScore,
  isBlocked: externalBlocked,
  onMessageChange,
  draftMessage,
  onDraftChange,
}: ChatInterfaceProps) {
  const [inputValue, setInputValue] = useState("");
  const [isVoiceMode, setIsVoiceMode] = useState(false);
  const [showComplianceBlocker, setShowComplianceBlocker] = useState(false);
  const [complianceViolation, setComplianceViolation] = useState(false);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const { isOffline, queueAction } = useNetwork();

  // Sync initial messages
  useEffect(() => {
    setMessages(initialMessages);
  }, [initialMessages]);

  // Check for compliance violations
  useEffect(() => {
    const hasViolation = BLOCKED_WORDS.some(word => 
      inputValue.toLowerCase().includes(word)
    );
    setComplianceViolation(hasViolation);
    
    if (hasViolation && inputValue.length > 5) {
      // Delay showing blocker for dramatic effect
      const timer = setTimeout(() => {
        setShowComplianceBlocker(true);
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [inputValue]);

  const isBlocked = externalBlocked || complianceViolation;

  // Sync with external draft message (from AI assistant)
  useEffect(() => {
    if (draftMessage !== undefined && draftMessage !== inputValue) {
      setInputValue(draftMessage);
    }
  }, [draftMessage]);

  useEffect(() => {
    if (onMessageChange) {
      onMessageChange(inputValue);
    }
  }, [inputValue, onMessageChange]);

  const handleInputChange = (value: string) => {
    setInputValue(value);
    if (onDraftChange) {
      onDraftChange(value);
    }
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === "" || isBlocked) return;

    const newMessage: Message = {
      id: crypto.randomUUID(),
      role: "agent",
      content: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      status: isOffline ? "pending" : "sent",
    };

    if (isOffline) {
      // Queue the message for later sync
      queueAction("message", inputValue);
    }

    setMessages(prev => [...prev, newMessage]);
    setInputValue("");
  };

  // Update pending messages when coming back online
  useEffect(() => {
    if (!isOffline) {
      setMessages(prev => prev.map(msg => 
        msg.status === "pending" ? { ...msg, status: "sent" as const } : msg
      ));
    }
  }, [isOffline]);

  const handleComplianceBlockerDismiss = () => {
    setShowComplianceBlocker(false);
    setInputValue("");
    setComplianceViolation(false);
  };

  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-success";
    if (score >= 40) return "text-warning";
    return "text-critical";
  };

  const getStatusIcon = (status?: "pending" | "sent" | "delivered") => {
    switch (status) {
      case "pending":
        return <Clock className="w-3 h-3 text-muted-foreground" />;
      case "sent":
        return <Check className="w-3 h-3 text-success" />;
      case "delivered":
        return <div className="flex"><Check className="w-3 h-3 text-success -mr-1" /><Check className="w-3 h-3 text-success" /></div>;
      default:
        return null;
    }
  };

  return (
    <>
      <div className="flex-1 flex flex-col h-full">
        {/* Account Header */}
        <div className="p-4 border-b border-border/50 glass-card">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-muted to-card-elevated flex items-center justify-center">
                <span className="text-lg font-bold">{account.name.split(" ").map(n => n[0]).join("")}</span>
              </div>
              <div>
                <h2 className="text-lg font-semibold">{account.name}</h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <span>{account.location}</span>
                  <span>-</span>
                  <span>{account.type}</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="px-3 py-1.5 rounded-lg bg-muted/50 text-center">
                <p className="text-xs text-muted-foreground uppercase">Lifetime Value</p>
                <p className="text-lg font-bold">{account.ltv}</p>
              </div>
              <div className={cn(
                "px-3 py-1.5 rounded-lg text-center border",
                account.churnRisk === "High" ? "bg-critical/10 border-critical/30" :
                account.churnRisk === "Medium" ? "bg-warning/10 border-warning/30" :
                "bg-success/10 border-success/30"
              )}>
                <p className="text-xs text-muted-foreground uppercase">Churn Risk</p>
                <p className={cn(
                  "text-lg font-bold",
                  account.churnRisk === "High" ? "text-critical" :
                  account.churnRisk === "Medium" ? "text-warning" : "text-success"
                )}>{account.churnRisk}</p>
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
                    message.blocked && "opacity-50",
                    message.status === "pending" && "opacity-70"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <div className="flex items-center justify-end gap-1 mt-1">
                    <p className="text-[10px] opacity-70">
                      {message.timestamp}
                    </p>
                    {message.role === "agent" && getStatusIcon(message.status)}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Violation Alert */}
          {isBlocked && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-4 rounded-xl bg-critical/10 border-2 border-critical/50"
            >
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-critical/20 flex items-center justify-center">
                  <AlertTriangle className="w-4 h-4 text-critical" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-critical">Tone Violation Detected</p>
                  <p className="text-sm text-muted-foreground mt-1">
                    Your draft contains language that may violate compliance guidelines. Please revise before sending.
                  </p>
                  <p className="text-sm mt-2">
                    <span className="text-muted-foreground">Suggestion: </span>
                    <span className="text-secondary italic">
                      Lets work together to find a solution that works for your situation.
                    </span>
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* Compliance Status */}
          {!isBlocked && inputValue.length > 10 && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="p-3 rounded-xl bg-success/10 border border-success/30"
            >
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-success" />
                <span className="text-sm text-success font-medium">Message meets compliance standards</span>
              </div>
            </motion.div>
          )}

          {/* AI Auditor Note */}
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="text-secondary">*</span>
            AI Auditor analyzing message in real-time...
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border/50 glass-card">
          <div className={cn(
            "rounded-xl border-2 transition-all",
            isBlocked ? "border-critical bg-critical/5" : 
            isOffline ? "border-warning bg-warning/5" : "border-border/50 bg-card/50"
          )}>
            <Textarea
              value={inputValue}
              onChange={(e) => handleInputChange(e.target.value)}
              placeholder={isOffline ? "Offline - Messages will be queued..." : "Type your message... (Try typing 'legal' to see compliance block)"}
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
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8"
                  onClick={() => setIsVoiceMode(true)}
                >
                  <Mic className="w-4 h-4" />
                </Button>
                {isBlocked && (
                  <div className="flex items-center gap-1 text-xs text-critical">
                    <Lock className="w-3 h-3" />
                    Send Blocked by Guardian AI
                  </div>
                )}
                {isOffline && !isBlocked && (
                  <div className="flex items-center gap-1 text-xs text-warning">
                    <Clock className="w-3 h-3" />
                    Will queue for sync
                  </div>
                )}
              </div>
              <Button
                disabled={isBlocked || inputValue.length === 0}
                onClick={handleSendMessage}
                className={cn(
                  "gap-2",
                  isBlocked
                    ? "bg-muted text-muted-foreground"
                    : isOffline 
                      ? "bg-warning hover:bg-warning/90 text-warning-foreground"
                      : "bg-primary hover:bg-primary/90"
                )}
              >
                {isOffline ? "Queue Message" : "Send Message"}
                {isBlocked ? <Lock className="w-4 h-4" /> : isOffline ? <Clock className="w-4 h-4" /> : <Send className="w-4 h-4" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Voice Mode Overlay */}
      <VoiceMode open={isVoiceMode} onClose={() => setIsVoiceMode(false)} />

      {/* Compliance Blocker Modal */}
      <AnimatePresence>
        {showComplianceBlocker && (
          <ComplianceBlocker 
            onDismiss={handleComplianceBlockerDismiss}
            violationType="FDCPA Section 807"
          />
        )}
      </AnimatePresence>
    </>
  );
}
