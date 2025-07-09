export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instanciate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "12.2.3 (519615d)"
  }
  public: {
    Tables: {
      cms_faq_cards: {
        Row: {
          answer: string
          card_order: number
          created_at: string
          id: string
          is_active: boolean
          language: string
          page_id: string
          question: string
          updated_at: string
        }
        Insert: {
          answer: string
          card_order: number
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          page_id: string
          question: string
          updated_at?: string
        }
        Update: {
          answer?: string
          card_order?: number
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          page_id?: string
          question?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_page_content: {
        Row: {
          content: string | null
          created_at: string
          field_name: string
          id: string
          language: string
          page_id: string
          section_name: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          field_name: string
          id?: string
          language?: string
          page_id: string
          section_name: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          field_name?: string
          id?: string
          language?: string
          page_id?: string
          section_name?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_page_content_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_pages: {
        Row: {
          created_at: string
          description: string | null
          id: string
          is_active: boolean
          name: string
          slug: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name: string
          slug: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          is_active?: boolean
          name?: string
          slug?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_results_cards: {
        Row: {
          background_color: string | null
          background_opacity: number | null
          card_order: number
          created_at: string
          description: string
          icon_color: string
          icon_name: string
          id: string
          is_active: boolean
          language: string
          page_id: string
          title: string
          updated_at: string
        }
        Insert: {
          background_color?: string | null
          background_opacity?: number | null
          card_order: number
          created_at?: string
          description: string
          icon_color?: string
          icon_name: string
          id?: string
          is_active?: boolean
          language?: string
          page_id: string
          title: string
          updated_at?: string
        }
        Update: {
          background_color?: string | null
          background_opacity?: number | null
          card_order?: number
          created_at?: string
          description?: string
          icon_color?: string
          icon_name?: string
          id?: string
          is_active?: boolean
          language?: string
          page_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_results_cards_page_id"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_seo: {
        Row: {
          canonical_url: string | null
          created_at: string
          follow_flag: boolean | null
          id: string
          index_flag: boolean | null
          language: string
          meta_description: string | null
          meta_title: string | null
          page_id: string
          slug: string | null
          updated_at: string
        }
        Insert: {
          canonical_url?: string | null
          created_at?: string
          follow_flag?: boolean | null
          id?: string
          index_flag?: boolean | null
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          page_id: string
          slug?: string | null
          updated_at?: string
        }
        Update: {
          canonical_url?: string | null
          created_at?: string
          follow_flag?: boolean | null
          id?: string
          index_flag?: boolean | null
          language?: string
          meta_description?: string | null
          meta_title?: string | null
          page_id?: string
          slug?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "cms_seo_page_id_fkey"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_solutions_cards: {
        Row: {
          bg_color: string
          border_color: string
          card_order: number
          created_at: string
          description: string
          engine: string
          features: string[]
          focus: string
          gradient: string
          icon: string
          id: string
          is_active: boolean
          language: string
          outcome: string
          page_id: string
          title: string
          updated_at: string
        }
        Insert: {
          bg_color?: string
          border_color?: string
          card_order: number
          created_at?: string
          description: string
          engine?: string
          features: string[]
          focus: string
          gradient?: string
          icon?: string
          id?: string
          is_active?: boolean
          language?: string
          outcome: string
          page_id: string
          title: string
          updated_at?: string
        }
        Update: {
          bg_color?: string
          border_color?: string
          card_order?: number
          created_at?: string
          description?: string
          engine?: string
          features?: string[]
          focus?: string
          gradient?: string
          icon?: string
          id?: string
          is_active?: boolean
          language?: string
          outcome?: string
          page_id?: string
          title?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_solutions_cards_page_id"
            columns: ["page_id"]
            isOneToOne: false
            referencedRelation: "cms_pages"
            referencedColumns: ["id"]
          },
        ]
      }
      cms_success_stories_cards: {
        Row: {
          card_order: number
          challenge: string
          company_name: string
          created_at: string
          customer_name: string
          customer_quote: string
          customer_title: string
          id: string
          image_url: string
          industry: string
          is_active: boolean
          is_active_home: boolean
          language: string
          metric1_label: string
          metric1_value: string
          metric2_label: string
          metric2_value: string
          metric3_label: string
          metric3_value: string
          page_id: string
          solution: string
          updated_at: string
        }
        Insert: {
          card_order: number
          challenge: string
          company_name: string
          created_at?: string
          customer_name: string
          customer_quote: string
          customer_title: string
          id?: string
          image_url: string
          industry: string
          is_active?: boolean
          is_active_home?: boolean
          language?: string
          metric1_label: string
          metric1_value: string
          metric2_label: string
          metric2_value: string
          metric3_label: string
          metric3_value: string
          page_id: string
          solution: string
          updated_at?: string
        }
        Update: {
          card_order?: number
          challenge?: string
          company_name?: string
          created_at?: string
          customer_name?: string
          customer_quote?: string
          customer_title?: string
          id?: string
          image_url?: string
          industry?: string
          is_active?: boolean
          is_active_home?: boolean
          language?: string
          metric1_label?: string
          metric1_value?: string
          metric2_label?: string
          metric2_value?: string
          metric3_label?: string
          metric3_value?: string
          page_id?: string
          solution?: string
          updated_at?: string
        }
        Relationships: []
      }
      cms_testimonials: {
        Row: {
          author_name: string
          author_title: string | null
          card_order: number
          company_name: string | null
          created_at: string
          id: string
          is_active: boolean
          language: string
          page_id: string
          quote: string
          rating: number
          updated_at: string
        }
        Insert: {
          author_name: string
          author_title?: string | null
          card_order: number
          company_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          page_id: string
          quote: string
          rating?: number
          updated_at?: string
        }
        Update: {
          author_name?: string
          author_title?: string | null
          card_order?: number
          company_name?: string | null
          created_at?: string
          id?: string
          is_active?: boolean
          language?: string
          page_id?: string
          quote?: string
          rating?: number
          updated_at?: string
        }
        Relationships: []
      }
      cms_users: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          last_login_at: string | null
          password_hash: string
          role: Database["public"]["Enums"]["cms_user_role"]
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          password_hash: string
          role?: Database["public"]["Enums"]["cms_user_role"]
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          last_login_at?: string | null
          password_hash?: string
          role?: Database["public"]["Enums"]["cms_user_role"]
          updated_at?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      cms_user_role: "admin" | "editor" | "viewer"
      supported_language: "en" | "pt"
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
      cms_user_role: ["admin", "editor", "viewer"],
      supported_language: ["en", "pt"],
    },
  },
} as const
