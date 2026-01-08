-- Fix overly permissive RLS policies

-- Drop the problematic policies
DROP POLICY IF EXISTS "System can insert predictions" ON public.ai_predictions;
DROP POLICY IF EXISTS "System can insert audit logs" ON public.audit_logs;
DROP POLICY IF EXISTS "Agents can insert communications" ON public.communications;

-- Create proper insert policies with user context
CREATE POLICY "Authenticated can insert predictions" ON public.ai_predictions 
FOR INSERT TO authenticated 
WITH CHECK (
  public.has_role(auth.uid(), 'admin') OR 
  public.has_role(auth.uid(), 'supervisor') OR
  public.has_role(auth.uid(), 'agent')
);

CREATE POLICY "Authenticated can insert audit logs" ON public.audit_logs 
FOR INSERT TO authenticated 
WITH CHECK (user_id = auth.uid());

CREATE POLICY "Agents can insert own communications" ON public.communications 
FOR INSERT TO authenticated 
WITH CHECK (agent_id = auth.uid());