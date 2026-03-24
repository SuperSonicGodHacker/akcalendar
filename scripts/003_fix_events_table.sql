-- Drop and recreate the events table with proper auto-generated IDs
DROP TABLE IF EXISTS events;

CREATE TABLE events (
  id SERIAL PRIMARY KEY,
  date INTEGER NOT NULL,
  month INTEGER NOT NULL,
  year INTEGER NOT NULL,
  title TEXT NOT NULL,
  type TEXT NOT NULL DEFAULT 'admin',
  is_administrative BOOLEAN NOT NULL DEFAULT false,
  description TEXT DEFAULT '',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_events_date ON events (year, month, date);
CREATE INDEX idx_events_type ON events (type);
