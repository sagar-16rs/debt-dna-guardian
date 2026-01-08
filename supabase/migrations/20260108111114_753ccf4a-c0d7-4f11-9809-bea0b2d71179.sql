-- User roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'supervisor', 'agent');

-- User roles table (separate from profiles for security)
CREATE TABLE public.user_roles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    role app_role NOT NULL DEFAULT 'agent',
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    UNIQUE (user_id, role)
);

-- Profiles table for user info
CREATE TABLE public.profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    full_name TEXT,
    avatar_url TEXT,
    department TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Accounts/Debtors table
CREATE TABLE public.accounts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name TEXT NOT NULL,
    account_id TEXT NOT NULL UNIQUE,
    location TEXT,
    contact_email TEXT,
    contact_phone TEXT,
    outstanding_amount DECIMAL(12,2) NOT NULL DEFAULT 0,
    days_overdue INTEGER NOT NULL DEFAULT 0,
    risk_level TEXT CHECK (risk_level IN ('low', 'medium', 'high', 'critical')) DEFAULT 'medium',
    ltv_score DECIMAL(10,2) DEFAULT 0,
    industry TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- AI Predictions table
CREATE TABLE public.ai_predictions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    prediction_type TEXT NOT NULL CHECK (prediction_type IN ('recovery', 'churn', 'payment_timing', 'strategy')),
    prediction_value DECIMAL(5,2), -- Probability 0-100
    recommended_strategy TEXT,
    recommended_action TEXT,
    confidence_score DECIMAL(5,2),
    model_version TEXT DEFAULT 'v1.0',
    factors JSONB, -- Contributing factors
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Workflows/Tasks table
CREATE TABLE public.workflows (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    assigned_agent UUID REFERENCES auth.users(id),
    workflow_type TEXT NOT NULL CHECK (workflow_type IN ('outreach', 'negotiation', 'escalation', 'legal', 'settlement')),
    status TEXT NOT NULL CHECK (status IN ('pending', 'in_progress', 'awaiting_response', 'completed', 'cancelled')) DEFAULT 'pending',
    priority INTEGER DEFAULT 5 CHECK (priority >= 1 AND priority <= 10),
    due_date DATE,
    notes TEXT,
    automation_rules JSONB,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
    updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Audit logs for compliance
CREATE TABLE public.audit_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES auth.users(id),
    account_id UUID REFERENCES public.accounts(id),
    action_type TEXT NOT NULL,
    action_details JSONB,
    compliance_score INTEGER,
    flagged BOOLEAN DEFAULT false,
    flag_reason TEXT,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Communication history
CREATE TABLE public.communications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    account_id UUID REFERENCES public.accounts(id) ON DELETE CASCADE NOT NULL,
    agent_id UUID REFERENCES auth.users(id),
    channel TEXT CHECK (channel IN ('email', 'phone', 'sms', 'chat', 'portal')),
    direction TEXT CHECK (direction IN ('inbound', 'outbound')),
    content TEXT,
    sentiment_score DECIMAL(5,2),
    compliance_score INTEGER,
    blocked BOOLEAN DEFAULT false,
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Performance metrics for analytics
CREATE TABLE public.agent_metrics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    period_start DATE NOT NULL,
    period_end DATE NOT NULL,
    accounts_resolved INTEGER DEFAULT 0,
    total_recovered DECIMAL(12,2) DEFAULT 0,
    avg_compliance_score DECIMAL(5,2),
    avg_resolution_days DECIMAL(5,2),
    customer_satisfaction DECIMAL(5,2),
    created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on all tables
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.accounts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.ai_predictions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workflows ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.communications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.agent_metrics ENABLE ROW LEVEL SECURITY;

-- Security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id
      AND role = _role
  )
$$;

-- Function to get user's highest role
CREATE OR REPLACE FUNCTION public.get_user_role(_user_id UUID)
RETURNS app_role
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT role FROM public.user_roles 
  WHERE user_id = _user_id 
  ORDER BY 
    CASE role 
      WHEN 'admin' THEN 1 
      WHEN 'supervisor' THEN 2 
      WHEN 'agent' THEN 3 
    END
  LIMIT 1
$$;

-- RLS Policies

-- User roles: users can view their own, admins can manage all
CREATE POLICY "Users can view own roles" ON public.user_roles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Admins can manage roles" ON public.user_roles FOR ALL USING (public.has_role(auth.uid(), 'admin'));

-- Profiles: users can view/edit own, admins can view all
CREATE POLICY "Users can view own profile" ON public.profiles FOR SELECT USING (auth.uid() = user_id);
CREATE POLICY "Users can update own profile" ON public.profiles FOR UPDATE USING (auth.uid() = user_id);
CREATE POLICY "Users can insert own profile" ON public.profiles FOR INSERT WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admins can view all profiles" ON public.profiles FOR SELECT USING (public.has_role(auth.uid(), 'admin'));

-- Accounts: all authenticated users can view, admins/supervisors can modify
CREATE POLICY "Authenticated can view accounts" ON public.accounts FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can manage accounts" ON public.accounts FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));

-- AI Predictions: all authenticated can view
CREATE POLICY "Authenticated can view predictions" ON public.ai_predictions FOR SELECT TO authenticated USING (true);
CREATE POLICY "System can insert predictions" ON public.ai_predictions FOR INSERT TO authenticated WITH CHECK (true);

-- Workflows: agents see assigned, supervisors/admins see all
CREATE POLICY "Agents view assigned workflows" ON public.workflows FOR SELECT USING (assigned_agent = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));
CREATE POLICY "Agents can update assigned" ON public.workflows FOR UPDATE USING (assigned_agent = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));
CREATE POLICY "Admins can manage workflows" ON public.workflows FOR ALL USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));

-- Audit logs: admins and supervisors can view
CREATE POLICY "Admins view audit logs" ON public.audit_logs FOR SELECT USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));
CREATE POLICY "System can insert audit logs" ON public.audit_logs FOR INSERT TO authenticated WITH CHECK (true);

-- Communications: agents see their own and assigned accounts
CREATE POLICY "Agents view communications" ON public.communications FOR SELECT TO authenticated USING (true);
CREATE POLICY "Agents can insert communications" ON public.communications FOR INSERT TO authenticated WITH CHECK (true);

-- Agent metrics: agents see own, supervisors/admins see all
CREATE POLICY "Agents view own metrics" ON public.agent_metrics FOR SELECT USING (agent_id = auth.uid() OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'supervisor'));

-- Triggers for updated_at
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_accounts_updated_at BEFORE UPDATE ON public.accounts FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();
CREATE TRIGGER update_workflows_updated_at BEFORE UPDATE ON public.workflows FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Auto-create profile on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (user_id, full_name)
    VALUES (NEW.id, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.user_roles (user_id, role)
    VALUES (NEW.id, 'agent');
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER SET search_path = public;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();