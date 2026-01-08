export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      accounts: {
        Row: {
          account_id: string
          company_name: string
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          days_overdue: number
          id: string
          industry: string | null
          location: string | null
          ltv_score: number | null
          outstanding_amount: number
          risk_level: string | null
          updated_at: string
        }
        Insert: {
          account_id: string
          company_name: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          days_overdue?: number
          id?: string
          industry?: string | null
          location?: string | null
          ltv_score?: number | null
          outstanding_amount?: number
          risk_level?: string | null
          updated_at?: string
        }
        Update: {
          account_id?: string
          company_name?: string
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          days_overdue?: number
          id?: string
          industry?: string | null
          location?: string | null
          ltv_score?: number | null
          outstanding_amount?: number
          risk_level?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      agent_metrics: {
        Row: {
          accounts_resolved: number | null
          agent_id: string
          avg_compliance_score: number | null
          avg_resolution_days: number | null
          created_at: string
          customer_satisfaction: number | null
          id: string
          period_end: string
          period_start: string
          total_recovered: number | null
        }
        Insert: {
          accounts_resolved?: number | null
          agent_id: string
          avg_compliance_score?: number | null
          avg_resolution_days?: number | null
          created_at?: string
          customer_satisfaction?: number | null
          id?: string
          period_end: string
          period_start: string
          total_recovered?: number | null
        }
        Update: {
          accounts_resolved?: number | null
          agent_id?: string
          avg_compliance_score?: number | null
          avg_resolution_days?: number | null
          created_at?: string
          customer_satisfaction?: number | null
          id?: string
          period_end?: string
          period_start?: string
          total_recovered?: number | null
        }
        Relationships: []
      }
      ai_predictions: {
        Row: {
          account_id: string
          confidence_score: number | null
          created_at: string
          factors: Json | null
          id: string
          model_version: string | null
          prediction_type: string
          prediction_value: number | null
          recommended_action: string | null
          recommended_strategy: string | null
        }
        Insert: {
          account_id: string
          confidence_score?: number | null
          created_at?: string
          factors?: Json | null
          id?: string
          model_version?: string | null
          prediction_type: string
          prediction_value?: number | null
          recommended_action?: string | null
          recommended_strategy?: string | null
        }
        Update: {
          account_id?: string
          confidence_score?: number | null
          created_at?: string
          factors?: Json | null
          id?: string
          model_version?: string | null
          prediction_type?: string
          prediction_value?: number | null
          recommended_action?: string | null
          recommended_strategy?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "ai_predictions_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      audit_logs: {
        Row: {
          account_id: string | null
          action_details: Json | null
          action_type: string
          compliance_score: number | null
          created_at: string
          flag_reason: string | null
          flagged: boolean | null
          id: string
          user_id: string | null
        }
        Insert: {
          account_id?: string | null
          action_details?: Json | null
          action_type: string
          compliance_score?: number | null
          created_at?: string
          flag_reason?: string | null
          flagged?: boolean | null
          id?: string
          user_id?: string | null
        }
        Update: {
          account_id?: string | null
          action_details?: Json | null
          action_type?: string
          compliance_score?: number | null
          created_at?: string
          flag_reason?: string | null
          flagged?: boolean | null
          id?: string
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "audit_logs_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      communications: {
        Row: {
          account_id: string
          agent_id: string | null
          blocked: boolean | null
          channel: string | null
          compliance_score: number | null
          content: string | null
          created_at: string
          direction: string | null
          id: string
          sentiment_score: number | null
        }
        Insert: {
          account_id: string
          agent_id?: string | null
          blocked?: boolean | null
          channel?: string | null
          compliance_score?: number | null
          content?: string | null
          created_at?: string
          direction?: string | null
          id?: string
          sentiment_score?: number | null
        }
        Update: {
          account_id?: string
          agent_id?: string | null
          blocked?: boolean | null
          channel?: string | null
          compliance_score?: number | null
          content?: string | null
          created_at?: string
          direction?: string | null
          id?: string
          sentiment_score?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "communications_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          department: string | null
          full_name: string | null
          id: string
          updated_at: string
          user_id: string
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          department?: string | null
          full_name?: string | null
          id?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      workflows: {
        Row: {
          account_id: string
          assigned_agent: string | null
          automation_rules: Json | null
          created_at: string
          due_date: string | null
          id: string
          notes: string | null
          priority: number | null
          status: string
          updated_at: string
          workflow_type: string
        }
        Insert: {
          account_id: string
          assigned_agent?: string | null
          automation_rules?: Json | null
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          status?: string
          updated_at?: string
          workflow_type: string
        }
        Update: {
          account_id?: string
          assigned_agent?: string | null
          automation_rules?: Json | null
          created_at?: string
          due_date?: string | null
          id?: string
          notes?: string | null
          priority?: number | null
          status?: string
          updated_at?: string
          workflow_type?: string
        }
        Relationships: [
          {
            foreignKeyName: "workflows_account_id_fkey"
            columns: ["account_id"]
            isOneToOne: false
            referencedRelation: "accounts"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_user_role: {
        Args: { _user_id: string }
        Returns: Database["public"]["Enums"]["app_role"]
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "supervisor" | "agent"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "supervisor", "agent"],
    },
  },
} as const
