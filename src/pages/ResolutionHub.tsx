import { useState } from "react";
import { motion } from "framer-motion";
import { Settings, Sparkles, Check, ArrowRight, Calendar, CreditCard, Send, Search, BarChart3, Shield, Brain, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ProgressStepper } from "@/components/resolution/ProgressStepper";
import { PaymentDateSlider } from "@/components/resolution/PaymentDateSlider";
import { LogisticsInsight } from "@/components/resolution/LogisticsInsight";
import { AccountHealth } from "@/components/resolution/AccountHealth";
import { toast } from "sonner";

const steps = [
  { id: "1", label: "Analysis", status: "completed" as const },
  { id: "2", label: "Optimization", status: "completed" as const },
  { id: "3", label: "Proposal", status: "current" as const },
  { id: "4", label: "Complete", status: "upcoming" as const },
];

export default function ResolutionHub() {
  const [selectedOption, setSelectedOption] = useState<"split" | "custom">("split");
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirmProposal = async () => {
    setIsProcessing(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    toast.success("Payment plan confirmed! Customer will receive confirmation email.");
    setIsProcessing(false);
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col">
      {/* Secondary Nav */}
      <div className="border-b border-border/50 glass-card">
        <div className="container max-w-6xl mx-auto px-6 py-3 flex items-center justify-between">
          <div className="flex items-center gap-6">
            <span className="text-2xl font-bold gradient-text-primary">FedEx</span>
            <span className="text-sm text-muted-foreground">Customer Resolution Portal</span>
            <Badge className="bg-secondary/10 text-secondary border-0">
              <Brain className="w-3 h-3 mr-1" />
              AI-Powered
            </Badge>
          </div>
          <nav className="flex items-center gap-4">
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Dashboard
            </button>
            <button className="text-sm text-primary font-medium border-b-2 border-primary pb-1">
              Invoices
            </button>
            <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              Support
            </button>
          </nav>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Logged in as:</span>
            <span className="text-sm font-medium">Acme Logistics Corp.</span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-xs font-semibold text-primary-foreground">AL</span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 container max-w-6xl mx-auto px-6 py-8">
        {/* Invoice Header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Settings className="w-5 h-5 text-muted-foreground animate-spin" style={{ animationDuration: '3s' }} />
              <h1 className="text-2xl font-bold">Invoice #INV-2023-8849</h1>
            </div>
            <p className="text-sm text-muted-foreground">
              Value Preservation Ecosystem active. AI analyzing payment flexibility options...
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Badge className="bg-primary/20 text-primary border border-primary/30 animate-pulse">
              ● Action Required
            </Badge>
            <Badge variant="outline" className="border-secondary/30 text-secondary">
              <Bot className="w-3 h-3 mr-1" />
              RPA Connected
            </Badge>
          </div>
        </div>

        {/* Progress Stepper */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-xs text-muted-foreground uppercase tracking-wider">
              Resolution Status
            </span>
            <span className="text-sm text-secondary">Step 3 of 4</span>
          </div>
          <div className="glass-card rounded-xl p-6">
            <p className="text-lg font-medium mb-8">Proposal Review</p>
            <ProgressStepper steps={steps} currentStep={2} />
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left Column - Invoice Details & Options */}
          <div className="col-span-2 space-y-6">
            {/* Invoice Summary Cards */}
            <div className="grid grid-cols-3 gap-4">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="glass-card rounded-xl p-4"
              >
                <p className="text-xs text-muted-foreground uppercase">Original Invoice</p>
                <p className="text-2xl font-bold mt-1">$1,250.00</p>
                <p className="text-xs text-muted-foreground mt-1">Due Oct 24, 2023</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="glass-card rounded-xl p-4 border-secondary/30 bg-secondary/5"
              >
                <div className="flex items-center gap-2">
                  <p className="text-xs text-secondary uppercase">Service Recovery Credit</p>
                  <Check className="w-4 h-4 text-secondary" />
                </div>
                <p className="text-2xl font-bold mt-1 text-secondary">-$50.00</p>
                <p className="text-xs text-success mt-1">▶ Late Delivery Detected by AI</p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="glass-card rounded-xl p-4 border-success/30 bg-success/5"
              >
                <p className="text-xs text-muted-foreground uppercase">Current Balance</p>
                <p className="text-2xl font-bold mt-1 text-success">$1,200.00</p>
                <p className="text-xs text-muted-foreground mt-1">Auto-Adjusted by ML</p>
              </motion.div>
            </div>

            {/* Smart Offer */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="glass-card rounded-xl p-6"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-secondary" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold">Let's resolve this together.</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    We've noticed you're a valued partner. Our AI has unlocked flexible options to help you clear this balance while preserving your account standing.
                  </p>
                </div>
              </div>

              {/* Payment Options */}
              <div className="mt-6 space-y-4">
                <button
                  onClick={() => setSelectedOption("split")}
                  className={`w-full p-4 rounded-xl border transition-all text-left ${
                    selectedOption === "split"
                      ? "border-primary bg-primary/5"
                      : "border-border/50 hover:border-primary/50"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        selectedOption === "split" ? "border-primary" : "border-muted-foreground"
                      }`}>
                        {selectedOption === "split" && (
                          <div className="w-2.5 h-2.5 rounded-full bg-primary" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium">Split into 3 monthly payments</p>
                        <p className="text-sm text-muted-foreground">
                          Pay <span className="text-foreground font-medium">$400.00</span> today, then $400/mo. No interest.
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      Select Plan
                    </Button>
                  </div>
                  <div className="flex items-center gap-2 mt-3">
                    <Badge className="bg-secondary/10 text-secondary border-0">
                      <Brain className="w-3 h-3 mr-1" />
                      AI Recommended
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      85% acceptance rate
                    </Badge>
                  </div>
                </button>

                {/* Custom Date Option */}
                <div className="p-4 rounded-xl border border-border/50">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="w-4 h-4 text-muted-foreground" />
                    <span className="text-sm">Or propose a custom payment date</span>
                  </div>
                  <PaymentDateSlider />
                </div>
              </div>

              {/* Confirm Button */}
              <Button 
                className="w-full mt-6 bg-primary hover:bg-primary/90 glow-primary h-12 text-base"
                onClick={handleConfirmProposal}
                disabled={isProcessing}
              >
                {isProcessing ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Processing...
                  </div>
                ) : (
                  <>
                    Confirm Proposal
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </motion.div>
          </div>

          {/* Right Column - Insights */}
          <div className="space-y-6">
            <LogisticsInsight
              location="Memphis Hub Delay"
              date="Oct 24"
              description="AI detected a logistic delay at the Memphis Hub affecting shipment #774923. Credit auto-applied."
              credit="$50.00"
            />
            <AccountHealth
              score={85}
              potentialBoost={92}
              status="good"
            />
            
            {/* Automation Status */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="glass-card rounded-xl p-4"
            >
              <div className="flex items-center gap-2 mb-3">
                <Bot className="w-4 h-4 text-secondary" />
                <h4 className="font-medium text-sm">Automation Status</h4>
              </div>
              <div className="space-y-2 text-xs">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Legacy System Sync</span>
                  <Badge className="bg-success/10 text-success border-0 text-[10px]">Connected</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Payment Gateway</span>
                  <Badge className="bg-success/10 text-success border-0 text-[10px]">Ready</Badge>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Notification Queue</span>
                  <Badge className="bg-secondary/10 text-secondary border-0 text-[10px]">Pending</Badge>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t border-border/50 py-4">
        <div className="container max-w-6xl mx-auto px-6 flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4" />
            <span>Powered by</span>
            <span className="font-semibold text-foreground">Debt DNA Value-Preservation System</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-muted-foreground">
            <button className="hover:text-foreground transition-colors">Help</button>
            <button className="hover:text-foreground transition-colors">Privacy Policy</button>
            <button className="hover:text-foreground transition-colors">Terms</button>
          </nav>
        </div>
      </footer>

      {/* Bottom Navigation Dock */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2">
        <div className="flex items-center gap-1 p-1.5 glass-card rounded-full">
          <button className="p-3 rounded-full bg-primary text-primary-foreground">
            <Send className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors">
            <CreditCard className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors">
            <Search className="w-5 h-5" />
          </button>
          <button className="p-3 rounded-full hover:bg-muted/50 text-muted-foreground transition-colors">
            <BarChart3 className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
