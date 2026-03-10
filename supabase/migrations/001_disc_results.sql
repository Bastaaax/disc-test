CREATE TABLE IF NOT EXISTS disc_results (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT,
  score_d INTEGER NOT NULL CHECK (score_d >= 0 AND score_d <= 25),
  score_i INTEGER NOT NULL CHECK (score_i >= 0 AND score_i <= 25),
  score_s INTEGER NOT NULL CHECK (score_s >= 0 AND score_s <= 25),
  score_c INTEGER NOT NULL CHECK (score_c >= 0 AND score_c <= 25),
  dominant_profile TEXT NOT NULL CHECK (dominant_profile IN ('D', 'I', 'S', 'C')),
  secondary_profile TEXT CHECK (secondary_profile IN ('D', 'I', 'S', 'C')),
  answers JSONB NOT NULL,
  percentage_d NUMERIC(5,2),
  percentage_i NUMERIC(5,2),
  percentage_s NUMERIC(5,2),
  percentage_c NUMERIC(5,2)
);

CREATE INDEX IF NOT EXISTS idx_disc_results_dominant ON disc_results(dominant_profile);
CREATE INDEX IF NOT EXISTS idx_disc_results_created_at ON disc_results(created_at);

ALTER TABLE disc_results ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow insert for all" ON disc_results
  FOR INSERT TO anon WITH CHECK (true);

CREATE POLICY "Allow select for all" ON disc_results
  FOR SELECT TO anon USING (true);
