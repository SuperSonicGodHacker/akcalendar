-- Create events table for school calendar
CREATE TABLE IF NOT EXISTS public.events (
  id TEXT PRIMARY KEY,
  date INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL,
  is_administrative BOOLEAN NOT NULL DEFAULT false,
  description TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for fast lookups by month/year
CREATE INDEX IF NOT EXISTS idx_events_month_year ON public.events (month, year);

-- Create index for type filtering
CREATE INDEX IF NOT EXISTS idx_events_type ON public.events (type);
