PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS sessions (
  id TEXT PRIMARY KEY,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  summary TEXT NOT NULL,
  description TEXT,
  planned_date TEXT,
  planned_end_date TEXT,
  speaker_name TEXT,
  speaker_bio TEXT,
  meeting_link TEXT,
  status TEXT NOT NULL DEFAULT 'planned' CHECK (status IN ('planned', 'open', 'completed')),
  skill_level TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS session_agenda_items (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  title TEXT NOT NULL,
  details TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS session_resources (
  id TEXT PRIMARY KEY,
  session_id TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL,
  resource_type TEXT,
  FOREIGN KEY (session_id) REFERENCES sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS volunteer_submissions (
  id TEXT PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  expertise TEXT,
  interest_area TEXT,
  availability TEXT,
  notes TEXT,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS reviews (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  resume_object_key TEXT,
  resume_file_name TEXT,
  target_role TEXT,
  job_description_text TEXT NOT NULL,
  score INTEGER,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed')),
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS review_strengths (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  content TEXT NOT NULL,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_gaps (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  concept TEXT NOT NULL,
  gap_type TEXT,
  recommendation TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS review_improvements (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  section_name TEXT,
  suggestion TEXT NOT NULL,
  example_rewrite TEXT,
  sort_order INTEGER NOT NULL,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS video_library (
  id TEXT PRIMARY KEY,
  concept TEXT NOT NULL,
  title TEXT NOT NULL,
  provider TEXT,
  video_url TEXT NOT NULL,
  thumbnail_url TEXT,
  duration_seconds INTEGER,
  description TEXT
);

CREATE TABLE IF NOT EXISTS review_video_recommendations (
  id TEXT PRIMARY KEY,
  review_id TEXT NOT NULL,
  video_id TEXT NOT NULL,
  concept TEXT NOT NULL,
  reason TEXT,
  FOREIGN KEY (review_id) REFERENCES reviews(id) ON DELETE CASCADE,
  FOREIGN KEY (video_id) REFERENCES video_library(id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_sessions_date_status ON sessions(planned_date, status);
CREATE INDEX IF NOT EXISTS idx_agenda_session_order ON session_agenda_items(session_id, sort_order);
CREATE INDEX IF NOT EXISTS idx_reviews_status_created ON reviews(status, created_at);
