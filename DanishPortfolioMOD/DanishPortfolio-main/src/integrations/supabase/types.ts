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
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      analytics_events: {
        Row: {
          created_at: string
          event_type: string
          id: string
          metadata: Json | null
          page_path: string | null
          post_id: string | null
          project_id: string | null
        }
        Insert: {
          created_at?: string
          event_type: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          post_id?: string | null
          project_id?: string | null
        }
        Update: {
          created_at?: string
          event_type?: string
          id?: string
          metadata?: Json | null
          page_path?: string | null
          post_id?: string | null
          project_id?: string | null
        }
        Relationships: []
      }
      articles: {
        Row: {
          body_markdown: string | null
          cover_image_url: string | null
          created_at: string
          id: string
          published_at: string | null
          related_project_ids: string[] | null
          slug: string
          source_type: string | null
          source_url: string | null
          status: string | null
          subtitle: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          body_markdown?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          related_project_ids?: string[] | null
          slug: string
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          body_markdown?: string | null
          cover_image_url?: string | null
          created_at?: string
          id?: string
          published_at?: string | null
          related_project_ids?: string[] | null
          slug?: string
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      avatar_knowledge_sources: {
        Row: {
          content: string | null
          created_at: string
          file_url: string | null
          id: string
          priority: number | null
          source_type: string | null
          status: string | null
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          priority?: number | null
          source_type?: string | null
          status?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          content?: string | null
          created_at?: string
          file_url?: string | null
          id?: string
          priority?: number | null
          source_type?: string | null
          status?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      avatar_messages: {
        Row: {
          audio_url: string | null
          created_at: string
          id: string
          message: string
          role: string
          session_id: string | null
          suggested_project_id: string | null
          suggested_route: string | null
        }
        Insert: {
          audio_url?: string | null
          created_at?: string
          id?: string
          message: string
          role: string
          session_id?: string | null
          suggested_project_id?: string | null
          suggested_route?: string | null
        }
        Update: {
          audio_url?: string | null
          created_at?: string
          id?: string
          message?: string
          role?: string
          session_id?: string | null
          suggested_project_id?: string | null
          suggested_route?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "avatar_messages_session_id_fkey"
            columns: ["session_id"]
            isOneToOne: false
            referencedRelation: "avatar_sessions"
            referencedColumns: ["id"]
          },
        ]
      }
      avatar_personality_rules: {
        Row: {
          active: boolean | null
          category: string | null
          created_at: string
          example: string | null
          id: string
          priority: number | null
          rule: string
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          example?: string | null
          id?: string
          priority?: number | null
          rule: string
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          category?: string | null
          created_at?: string
          example?: string | null
          id?: string
          priority?: number | null
          rule?: string
          updated_at?: string
        }
        Relationships: []
      }
      avatar_sessions: {
        Row: {
          current_page: string | null
          id: string
          last_active_at: string
          referrer: string | null
          started_at: string
          visitor_id: string | null
        }
        Insert: {
          current_page?: string | null
          id?: string
          last_active_at?: string
          referrer?: string | null
          started_at?: string
          visitor_id?: string | null
        }
        Update: {
          current_page?: string | null
          id?: string
          last_active_at?: string
          referrer?: string | null
          started_at?: string
          visitor_id?: string | null
        }
        Relationships: []
      }
      avatar_voice_profiles: {
        Row: {
          active: boolean | null
          created_at: string
          description: string | null
          id: string
          name: string
          sample_audio_url: string | null
          style: string | null
          updated_at: string
        }
        Insert: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name: string
          sample_audio_url?: string | null
          style?: string | null
          updated_at?: string
        }
        Update: {
          active?: boolean | null
          created_at?: string
          description?: string | null
          id?: string
          name?: string
          sample_audio_url?: string | null
          style?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      contact_messages: {
        Row: {
          created_at: string
          email: string
          id: string
          message: string
          name: string
          source: string | null
          status: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          message: string
          name: string
          source?: string | null
          status?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          message?: string
          name?: string
          source?: string | null
          status?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      external_integrations: {
        Row: {
          auth_type: string | null
          created_at: string
          display_name: string | null
          enabled: boolean | null
          id: string
          last_checked_at: string | null
          provider: string
          purpose: string | null
          secret_names: string[] | null
          status: string | null
          updated_at: string
        }
        Insert: {
          auth_type?: string | null
          created_at?: string
          display_name?: string | null
          enabled?: boolean | null
          id?: string
          last_checked_at?: string | null
          provider: string
          purpose?: string | null
          secret_names?: string[] | null
          status?: string | null
          updated_at?: string
        }
        Update: {
          auth_type?: string | null
          created_at?: string
          display_name?: string | null
          enabled?: boolean | null
          id?: string
          last_checked_at?: string | null
          provider?: string
          purpose?: string | null
          secret_names?: string[] | null
          status?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      github_repos: {
        Row: {
          created_at: string
          description: string | null
          forks: number | null
          full_name: string | null
          github_id: number | null
          homepage: string | null
          html_url: string | null
          id: string
          language: string | null
          linked_project_id: string | null
          name: string
          pushed_at: string | null
          readme_summary: string | null
          stars: number | null
          synced_at: string | null
          topics: string[] | null
          updated_at: string | null
          visibility: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          forks?: number | null
          full_name?: string | null
          github_id?: number | null
          homepage?: string | null
          html_url?: string | null
          id?: string
          language?: string | null
          linked_project_id?: string | null
          name: string
          pushed_at?: string | null
          readme_summary?: string | null
          stars?: number | null
          synced_at?: string | null
          topics?: string[] | null
          updated_at?: string | null
          visibility?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          forks?: number | null
          full_name?: string | null
          github_id?: number | null
          homepage?: string | null
          html_url?: string | null
          id?: string
          language?: string | null
          linked_project_id?: string | null
          name?: string
          pushed_at?: string | null
          readme_summary?: string | null
          stars?: number | null
          synced_at?: string | null
          topics?: string[] | null
          updated_at?: string | null
          visibility?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "github_repos_linked_project_id_fkey"
            columns: ["linked_project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      integration_logs: {
        Row: {
          action: string | null
          created_at: string
          id: string
          message: string | null
          metadata: Json | null
          provider: string
          status: string | null
        }
        Insert: {
          action?: string | null
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          provider: string
          status?: string | null
        }
        Update: {
          action?: string | null
          created_at?: string
          id?: string
          message?: string | null
          metadata?: Json | null
          provider?: string
          status?: string | null
        }
        Relationships: []
      }
      linkedin_posts: {
        Row: {
          created_at: string
          featured: boolean | null
          generated_summary: string | null
          id: string
          image_urls: string[] | null
          imported_at: string | null
          linkedin_urn: string | null
          post_url: string | null
          published_at: string | null
          related_project_ids: string[] | null
          slug: string
          status: string | null
          tags: string[] | null
          text: string | null
          title: string
          updated_at: string
          video_url: string | null
        }
        Insert: {
          created_at?: string
          featured?: boolean | null
          generated_summary?: string | null
          id?: string
          image_urls?: string[] | null
          imported_at?: string | null
          linkedin_urn?: string | null
          post_url?: string | null
          published_at?: string | null
          related_project_ids?: string[] | null
          slug: string
          status?: string | null
          tags?: string[] | null
          text?: string | null
          title: string
          updated_at?: string
          video_url?: string | null
        }
        Update: {
          created_at?: string
          featured?: boolean | null
          generated_summary?: string | null
          id?: string
          image_urls?: string[] | null
          imported_at?: string | null
          linkedin_urn?: string | null
          post_url?: string | null
          published_at?: string | null
          related_project_ids?: string[] | null
          slug?: string
          status?: string | null
          tags?: string[] | null
          text?: string | null
          title?: string
          updated_at?: string
          video_url?: string | null
        }
        Relationships: []
      }
      post_media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          id: string
          post_id: string | null
          sort_order: number | null
          type: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          sort_order?: number | null
          type?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          post_id?: string | null
          sort_order?: number | null
          type?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "post_media_post_id_fkey"
            columns: ["post_id"]
            isOneToOne: false
            referencedRelation: "posts"
            referencedColumns: ["id"]
          },
        ]
      }
      posts: {
        Row: {
          body_markdown: string | null
          cover_image_url: string | null
          created_at: string
          featured: boolean | null
          generated_summary: string | null
          id: string
          image_urls: string[] | null
          original_text: string | null
          post_type: string
          published_at: string | null
          related_project_ids: string[] | null
          related_skill_ids: string[] | null
          skills_shown: string[] | null
          slug: string
          source_type: string | null
          source_url: string | null
          status: string | null
          subtitle: string | null
          tags: string[] | null
          title: string
          updated_at: string
          why_this_matters: string | null
        }
        Insert: {
          body_markdown?: string | null
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean | null
          generated_summary?: string | null
          id?: string
          image_urls?: string[] | null
          original_text?: string | null
          post_type?: string
          published_at?: string | null
          related_project_ids?: string[] | null
          related_skill_ids?: string[] | null
          skills_shown?: string[] | null
          slug: string
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title: string
          updated_at?: string
          why_this_matters?: string | null
        }
        Update: {
          body_markdown?: string | null
          cover_image_url?: string | null
          created_at?: string
          featured?: boolean | null
          generated_summary?: string | null
          id?: string
          image_urls?: string[] | null
          original_text?: string | null
          post_type?: string
          published_at?: string | null
          related_project_ids?: string[] | null
          related_skill_ids?: string[] | null
          skills_shown?: string[] | null
          slug?: string
          source_type?: string | null
          source_url?: string | null
          status?: string | null
          subtitle?: string | null
          tags?: string[] | null
          title?: string
          updated_at?: string
          why_this_matters?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          avatar_fallback_image_url: string | null
          avatar_model_url: string | null
          bio_long: string | null
          bio_short: string | null
          created_at: string
          email: string | null
          github_url: string | null
          hero_image_url: string | null
          id: string
          linkedin_url: string | null
          location: string | null
          name: string
          primary_photo_url: string | null
          resume_url: string | null
          title: string | null
          updated_at: string
        }
        Insert: {
          avatar_fallback_image_url?: string | null
          avatar_model_url?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          email?: string | null
          github_url?: string | null
          hero_image_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name: string
          primary_photo_url?: string | null
          resume_url?: string | null
          title?: string | null
          updated_at?: string
        }
        Update: {
          avatar_fallback_image_url?: string | null
          avatar_model_url?: string | null
          bio_long?: string | null
          bio_short?: string | null
          created_at?: string
          email?: string | null
          github_url?: string | null
          hero_image_url?: string | null
          id?: string
          linkedin_url?: string | null
          location?: string | null
          name?: string
          primary_photo_url?: string | null
          resume_url?: string | null
          title?: string | null
          updated_at?: string
        }
        Relationships: []
      }
      project_media: {
        Row: {
          alt_text: string | null
          caption: string | null
          created_at: string
          id: string
          project_id: string | null
          sort_order: number | null
          type: string | null
          url: string
        }
        Insert: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          sort_order?: number | null
          type?: string | null
          url: string
        }
        Update: {
          alt_text?: string | null
          caption?: string | null
          created_at?: string
          id?: string
          project_id?: string | null
          sort_order?: number | null
          type?: string | null
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_media_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          architecture: string | null
          article_url: string | null
          challenges: string | null
          cover_image_url: string | null
          created_at: string
          domain: string | null
          featured: boolean | null
          github_url: string | null
          id: string
          lessons: string[] | null
          linkedin_post_url: string | null
          live_demo_url: string | null
          long_description: string | null
          metrics: Json | null
          outcomes: string[] | null
          period: string | null
          priority: number | null
          problem: string | null
          published_at: string | null
          recruiter_takeaway: string | null
          role: string | null
          slug: string
          status: string | null
          subtitle: string | null
          summary: string | null
          tech_stack: string[] | null
          title: string
          updated_at: string
          what_i_built: string | null
        }
        Insert: {
          architecture?: string | null
          article_url?: string | null
          challenges?: string | null
          cover_image_url?: string | null
          created_at?: string
          domain?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          lessons?: string[] | null
          linkedin_post_url?: string | null
          live_demo_url?: string | null
          long_description?: string | null
          metrics?: Json | null
          outcomes?: string[] | null
          period?: string | null
          priority?: number | null
          problem?: string | null
          published_at?: string | null
          recruiter_takeaway?: string | null
          role?: string | null
          slug: string
          status?: string | null
          subtitle?: string | null
          summary?: string | null
          tech_stack?: string[] | null
          title: string
          updated_at?: string
          what_i_built?: string | null
        }
        Update: {
          architecture?: string | null
          article_url?: string | null
          challenges?: string | null
          cover_image_url?: string | null
          created_at?: string
          domain?: string | null
          featured?: boolean | null
          github_url?: string | null
          id?: string
          lessons?: string[] | null
          linkedin_post_url?: string | null
          live_demo_url?: string | null
          long_description?: string | null
          metrics?: Json | null
          outcomes?: string[] | null
          period?: string | null
          priority?: number | null
          problem?: string | null
          published_at?: string | null
          recruiter_takeaway?: string | null
          role?: string | null
          slug?: string
          status?: string | null
          subtitle?: string | null
          summary?: string | null
          tech_stack?: string[] | null
          title?: string
          updated_at?: string
          what_i_built?: string | null
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string | null
          created_at: string
          description: string | null
          id: string
          level: number | null
          name: string
          related_project_ids: string[] | null
          sort_order: number | null
        }
        Insert: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          name: string
          related_project_ids?: string[] | null
          sort_order?: number | null
        }
        Update: {
          category?: string | null
          created_at?: string
          description?: string | null
          id?: string
          level?: number | null
          name?: string
          related_project_ids?: string[] | null
          sort_order?: number | null
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
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "user"
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
      app_role: ["admin", "user"],
    },
  },
} as const
