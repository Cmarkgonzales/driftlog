export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          user_id: string;
          timezone: string;
          usual_start_time: string;
          usual_end_time: string;
          workdays: number[];
          created_at: string;
          updated_at: string;
        };
        Insert: {
          user_id: string;
          timezone?: string;
          usual_start_time?: string;
          usual_end_time?: string;
          workdays?: number[];
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          user_id?: string;
          timezone?: string;
          usual_start_time?: string;
          usual_end_time?: string;
          workdays?: number[];
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
};

export type Profile = Database['public']['Tables']['profiles']['Row'];
