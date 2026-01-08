// Demo data for showcasing the platform without database connection

export const mockAccounts = [
  {
    id: "1",
    company_name: "Acme Corporation",
    account_id: "ACC-8842-X",
    location: "San Francisco, CA",
    contact_email: "billing@acme.com",
    contact_phone: "+1 (415) 555-0123",
    outstanding_amount: 142500,
    days_overdue: 45,
    risk_level: "high" as const,
    ltv_score: 1250000,
    industry: "Technology",
    created_at: "2024-01-15",
    updated_at: "2024-01-20",
  },
  {
    id: "2",
    company_name: "Globex Inc.",
    account_id: "ACC-9921-A",
    location: "New York, NY",
    contact_email: "accounts@globex.com",
    contact_phone: "+1 (212) 555-0456",
    outstanding_amount: 78200,
    days_overdue: 12,
    risk_level: "medium" as const,
    ltv_score: 890000,
    industry: "Manufacturing",
    created_at: "2024-01-10",
    updated_at: "2024-01-18",
  },
  {
    id: "3",
    company_name: "Soylent Corp",
    account_id: "ACC-1102-B",
    location: "Austin, TX",
    contact_email: "finance@soylent.com",
    contact_phone: "+1 (512) 555-0789",
    outstanding_amount: 23400,
    days_overdue: 5,
    risk_level: "low" as const,
    ltv_score: 450000,
    industry: "Food & Beverage",
    created_at: "2024-01-12",
    updated_at: "2024-01-19",
  },
  {
    id: "4",
    company_name: "Initech Solutions",
    account_id: "ACC-4455-C",
    location: "Chicago, IL",
    contact_email: "ap@initech.com",
    contact_phone: "+1 (312) 555-0234",
    outstanding_amount: 189000,
    days_overdue: 67,
    risk_level: "critical" as const,
    ltv_score: 2100000,
    industry: "Consulting",
    created_at: "2024-01-08",
    updated_at: "2024-01-20",
  },
  {
    id: "5",
    company_name: "Umbrella Corp",
    account_id: "ACC-7788-D",
    location: "Miami, FL",
    contact_email: "treasury@umbrella.com",
    contact_phone: "+1 (305) 555-0567",
    outstanding_amount: 56700,
    days_overdue: 22,
    risk_level: "medium" as const,
    ltv_score: 720000,
    industry: "Pharmaceuticals",
    created_at: "2024-01-11",
    updated_at: "2024-01-17",
  },
  {
    id: "6",
    company_name: "Stark Industries",
    account_id: "ACC-3344-E",
    location: "Los Angeles, CA",
    contact_email: "payments@stark.com",
    contact_phone: "+1 (213) 555-0890",
    outstanding_amount: 312000,
    days_overdue: 89,
    risk_level: "critical" as const,
    ltv_score: 4500000,
    industry: "Defense",
    created_at: "2024-01-05",
    updated_at: "2024-01-20",
  },
];

export const mockPredictions: Record<string, any> = {
  "1": {
    recovery_probability: 68,
    recommended_strategy: "Value Retention",
    recommended_action: "Offer flexible payment plan with extended terms. Consider 3-month installment option.",
    confidence_score: 85,
    factors: {
      payment_history: "mixed",
      communication_frequency: "regular",
      industry_trend: "stable",
    },
  },
  "2": {
    recovery_probability: 82,
    recommended_strategy: "Soft Nudge",
    recommended_action: "Schedule empathy call to understand payment blockers. High likelihood of quick resolution.",
    confidence_score: 91,
    factors: {
      payment_history: "positive",
      communication_frequency: "high",
      industry_trend: "growing",
    },
  },
  "3": {
    recovery_probability: 95,
    recommended_strategy: "Auto-Reminder",
    recommended_action: "Send automated payment reminder with loyalty bonus offer. Expected payment within 3 days.",
    confidence_score: 94,
    factors: {
      payment_history: "excellent",
      communication_frequency: "regular",
      industry_trend: "stable",
    },
  },
  "4": {
    recovery_probability: 35,
    recommended_strategy: "Escalation Required",
    recommended_action: "Initiate supervisor review. Consider legal consultation if no response in 7 days.",
    confidence_score: 78,
    factors: {
      payment_history: "negative",
      communication_frequency: "low",
      industry_trend: "declining",
    },
  },
  "5": {
    recovery_probability: 75,
    recommended_strategy: "Soft Nudge",
    recommended_action: "Personalized outreach recommended. Offer early payment discount of 2%.",
    confidence_score: 87,
    factors: {
      payment_history: "positive",
      communication_frequency: "moderate",
      industry_trend: "stable",
    },
  },
  "6": {
    recovery_probability: 28,
    recommended_strategy: "Legal Review",
    recommended_action: "High-value account at risk. Immediate executive intervention required.",
    confidence_score: 72,
    factors: {
      payment_history: "poor",
      communication_frequency: "none",
      industry_trend: "volatile",
    },
  },
};

export const mockWorkflows = [
  { id: "w1", account_id: "1", workflow_type: "negotiation", status: "in_progress", priority: 8 },
  { id: "w2", account_id: "2", workflow_type: "outreach", status: "pending", priority: 5 },
  { id: "w3", account_id: "4", workflow_type: "escalation", status: "awaiting_response", priority: 10 },
  { id: "w4", account_id: "6", workflow_type: "legal", status: "in_progress", priority: 10 },
];

export const mockMessages = [
  {
    id: "1",
    role: "customer" as const,
    content: "Hi Sarah, we received the invoice notification. We're having some cash flow timing issues this month due to a delayed shipment. Can we get an extension?",
    timestamp: "10:23 AM",
  },
  {
    id: "2",
    role: "agent" as const,
    content: "I understand completely. Let me check what options are available for your account tier. Given your excellent history with us, I'm confident we can find a solution.",
    timestamp: "10:25 AM",
  },
  {
    id: "3",
    role: "customer" as const,
    content: "That would be really helpful. We expect to clear this by end of next week once our client pays us.",
    timestamp: "10:27 AM",
  },
];

export const mockAnalysisLogs = [
  { id: "1", type: "flagged" as const, title: "Compliance Check Passed", description: "Message meets FDCPA and CFPB guidelines", timestamp: "Just now" },
  { id: "2", type: "sentiment" as const, title: "Customer Sentiment", description: "Anxious but cooperative. 85% probability of payment plan acceptance.", timestamp: "2 mins ago" },
  { id: "3", type: "context" as const, title: "Account Context Loaded", description: "VIP tier customer. Tone: Professional Partner. 5-year relationship.", timestamp: "5 mins ago" },
];

export const mockSuggestedScripts = [
  { id: "1", title: "Value Preservation", content: "We truly value our partnership. Let's work together to find a payment schedule that works for your cash flow..." },
  { id: "2", title: "Flexible Extension", content: "I can offer a 7-day grace period. Would a partial payment today help ease the situation?" },
  { id: "3", title: "Loyalty Recognition", content: "Given your excellent 5-year history with us, I've been authorized to offer special terms..." },
];

export const mockDashboardStats = {
  totalOutstanding: 801800,
  atRiskAmount: 501000,
  totalAccounts: 6,
  criticalAccounts: 2,
  recoveryRate: 94.2,
  avgResolutionDays: 12.4,
};
