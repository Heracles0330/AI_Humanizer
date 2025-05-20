/*
  # Create humanized_texts table

  1. New Tables
    - `humanized_texts` - Stores user's humanized text documents
      - `id` (uuid, primary key)
      - `user_id` (uuid, references profiles.id)
      - `original_text` (text, not null)
      - `humanized_text` (text, not null)
      - `title` (text, default 'Untitled')
      - `character_count` (integer)
      - `created_at` (timestamptz, default now())

  2. Security
    - Enable Row Level Security
    - Create policies for select, insert, update, delete
*/

CREATE TABLE IF NOT EXISTS humanized_texts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
  original_text text NOT NULL,
  humanized_text text NOT NULL,
  title text DEFAULT 'Untitled',
  character_count integer,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE humanized_texts ENABLE ROW LEVEL SECURITY;

-- Policies
CREATE POLICY "Users can view their own documents"
  ON humanized_texts
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own documents"
  ON humanized_texts
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own documents"
  ON humanized_texts
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own documents"
  ON humanized_texts
  FOR DELETE
  USING (auth.uid() = user_id);