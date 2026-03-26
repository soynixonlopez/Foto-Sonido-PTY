export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          description: string | null;
          price: number;
              color: string | null;
              previous_price: number | null;
          category: string;
          brand: string;
          product_id: string;
          images: string[];
          is_visible: boolean;
          stock: number | null;
          sections: string[];
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          description?: string | null;
          price: number;
              color?: string | null;
              previous_price?: number | null;
          category: string;
          brand: string;
          product_id: string;
          images?: string[];
          is_visible?: boolean;
          stock?: number | null;
          sections?: string[];
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          description?: string | null;
          price?: number;
              color?: string | null;
              previous_price?: number | null;
          category?: string;
          brand?: string;
          product_id?: string;
          images?: string[];
          is_visible?: boolean;
          stock?: number | null;
          sections?: string[];
        };
      };
      orders: {
        Row: {
          id: string;
          created_at: string;
          status: string;
          total: number | null;
          user_email: string | null;
          user_id: string | null;
          points_earned: number;
        };
        Insert: {
          id?: string;
          created_at?: string;
          status?: string;
          total?: number | null;
          user_email?: string | null;
          user_id?: string | null;
          points_earned?: number;
        };
        Update: {
          id?: string;
          created_at?: string;
          status?: string;
          total?: number | null;
          user_email?: string | null;
          user_id?: string | null;
          points_earned?: number;
        };
      };
      customer_profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string;
          points: number;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string;
          points?: number;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string;
          points?: number;
          created_at?: string;
          updated_at?: string;
        };
      };
      order_items: {
        Row: {
          id: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Insert: {
          id?: string;
          order_id: string;
          product_id: string;
          quantity: number;
          price: number;
        };
        Update: {
          id?: string;
          order_id?: string;
          product_id?: string;
          quantity?: number;
          price?: number;
        };
      };
    };
  };
}

export type ProductRow = Database["public"]["Tables"]["products"]["Row"];
export type ProductInsert = Database["public"]["Tables"]["products"]["Insert"];
export type ProductUpdate = Database["public"]["Tables"]["products"]["Update"];
