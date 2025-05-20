import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase credentials not found. Please connect to Supabase to get your API keys.');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type UserProfile = {
  id: string;
  email: string;
  full_name?: string;
  avatar_url?: string;
  credits_remaining: number;
  plan_type: 'free' | 'basic' | 'premium' | 'enterprise';
  created_at: string;
};

export type HumanizedText = {
  id: string;
  user_id: string;
  original_text: string;
  humanized_text: string;
  created_at: string;
  title: string;
  character_count: number;
};

export type SubscriptionPlan = {
  id: string;
  name: string;
  description: string;
  price: number;
  credits: number;
  features: string[];
  is_popular?: boolean;
};