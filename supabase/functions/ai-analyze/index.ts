import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { type, accountData, messageContent } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    let userPrompt = "";

    switch (type) {
      case "prioritize":
        systemPrompt = `You are an AI debt recovery prioritization expert. Analyze the provided account data and return a JSON response with:
- priority_score (1-10, where 10 is highest priority)
- recommended_strategy (one of: "auto-reminder", "soft-nudge", "value-retention", "escalation", "legal-review")
- recovery_probability (0-100 percentage)
- key_factors (array of 3-5 key factors influencing this decision)
- recommended_actions (array of 2-3 specific actions to take)
- risk_assessment (brief text explaining risk level)

Consider factors like: outstanding amount, days overdue, LTV score, payment history patterns, and industry norms.
Respond ONLY with valid JSON, no markdown or explanations.`;
        userPrompt = `Analyze this account for debt recovery prioritization:\n${JSON.stringify(accountData, null, 2)}`;
        break;

      case "compliance":
        systemPrompt = `You are a debt collection compliance auditor. Analyze the agent's message for regulatory compliance and tone appropriateness. Return a JSON response with:
- compliance_score (0-100)
- empathy_level ("low", "medium", "high")
- clarity_level ("low", "medium", "high")
- violations (array of any policy violations detected)
- suggestions (array of improved message alternatives)
- risk_flags (any legal or compliance risks)

Follow FDCPA, CFPB, and industry best practices. Flag any threatening language, harassment indicators, or misleading statements.
Respond ONLY with valid JSON.`;
        userPrompt = `Analyze this agent message for compliance:\nMessage: "${messageContent}"\nAccount Context: ${JSON.stringify(accountData, null, 2)}`;
        break;

      case "predict":
        systemPrompt = `You are a predictive analytics expert for debt recovery. Given the account data, predict payment behavior and recommend timing strategies. Return JSON with:
- payment_likelihood_7d (0-100 percentage for next 7 days)
- payment_likelihood_30d (0-100 percentage for next 30 days)
- optimal_contact_time (best time of day/week to contact)
- churn_risk (0-100 percentage)
- recommended_payment_plan (suggested installment structure if needed)
- behavioral_insights (array of 2-3 insights about debtor behavior patterns)

Respond ONLY with valid JSON.`;
        userPrompt = `Generate predictions for this account:\n${JSON.stringify(accountData, null, 2)}`;
        break;

      case "workflow":
        systemPrompt = `You are a workflow automation specialist for debt collection. Design an optimal collection workflow based on the account profile. Return JSON with:
- workflow_type (one of: "automated", "hybrid", "manual")
- stages (array of workflow stages with name, action, trigger_condition, and duration_days)
- automation_rules (array of automation triggers)
- escalation_points (when to escalate to supervisor)
- estimated_resolution_days (predicted time to resolution)
- success_probability (0-100)

Consider compliance, customer relationship preservation, and efficiency.
Respond ONLY with valid JSON.`;
        userPrompt = `Design a collection workflow for:\n${JSON.stringify(accountData, null, 2)}`;
        break;

      default:
        throw new Error("Invalid analysis type");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.3,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again later." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "AI credits exhausted. Please add funds." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI Gateway error:", response.status, errorText);
      throw new Error("AI analysis failed");
    }

    const aiResponse = await response.json();
    const content = aiResponse.choices?.[0]?.message?.content;

    // Parse the JSON response from the AI
    let analysisResult;
    try {
      // Remove any markdown code blocks if present
      const cleanContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      analysisResult = JSON.parse(cleanContent);
    } catch (parseError) {
      console.error("Failed to parse AI response:", content);
      analysisResult = { raw_response: content, parse_error: true };
    }

    return new Response(JSON.stringify({ success: true, analysis: analysisResult, type }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (error: unknown) {
    console.error("AI analysis error:", error);
    const message = error instanceof Error ? error.message : "Analysis failed";
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
