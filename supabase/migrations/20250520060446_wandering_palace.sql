/*
  # Create profiles table

  1. New Tables
    - `profiles` - Stores user profile information
      - `id` (uuid, primary key, references auth.users.id)
      - `email` (text, not null)
      - `full_name` (text)
      - `avatar_url` (text)
      - `credits_remaining` (integer, default 100)
      - `plan_type` (text, default 'free')
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable Row Level Security
    - Create policies for select, insert, update, delete
*/

CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text NOT NULL,
  full_name text,
  avatar_url text,
  credits_remaining integer DEFAULT 1000,
  plan_type text DEFAULT 'free',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own profile"
  ON profiles
  FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile"
  ON profiles
  FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles
  FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "Admin can manage all profiles"
  ON profiles
  USING (auth.uid() IN (
    SELECT id FROM auth.users WHERE auth.users.role = 'service_role'
  ));
  