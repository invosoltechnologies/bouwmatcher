-- ==========================================
-- DROP existing tables if they exist
-- ==========================================
DROP TABLE IF EXISTS project_form_answers CASCADE;
DROP TABLE IF EXISTS project_form_question_options CASCADE;
DROP TABLE IF EXISTS project_form_questions CASCADE;

-- ==========================================
-- CREATE tables with STRING IDs
-- ==========================================

-- 1. Project Form Questions table
CREATE TABLE project_form_questions (
  id VARCHAR(100) PRIMARY KEY,  -- Changed from UUID to VARCHAR
  service_category_id INT8 REFERENCES service_categories(id) ON DELETE CASCADE,
  question_text_nl TEXT NOT NULL,
  question_text_en TEXT NOT NULL,
  question_type VARCHAR(50) NOT NULL CHECK (question_type IN ('radio', 'checkbox', 'text', 'textarea', 'select', 'date')),
  is_root_question BOOLEAN DEFAULT FALSE,
  parent_question_id VARCHAR(100) REFERENCES project_form_questions(id) ON DELETE CASCADE,
  parent_option_id VARCHAR(100),  -- Will be set after question_options table is created
  order_index INT NOT NULL DEFAULT 1,
  is_required BOOLEAN DEFAULT TRUE,
  placeholder_nl VARCHAR(255),
  placeholder_en VARCHAR(255),
  help_text_nl TEXT,
  help_text_en TEXT,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Project Form Question Options table
CREATE TABLE project_form_question_options (
  id VARCHAR(100) PRIMARY KEY,  -- Changed from UUID to VARCHAR
  question_id VARCHAR(100) REFERENCES project_form_questions(id) ON DELETE CASCADE,
  option_value VARCHAR(255) NOT NULL,
  option_label_nl VARCHAR(255) NOT NULL,
  option_label_en VARCHAR(255) NOT NULL,
  has_follow_up BOOLEAN DEFAULT FALSE,
  order_index INT NOT NULL DEFAULT 1,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Add foreign key constraint for parent_option_id (after both tables exist)
ALTER TABLE project_form_questions
ADD CONSTRAINT fk_parent_option
FOREIGN KEY (parent_option_id)
REFERENCES project_form_question_options(id)
ON DELETE CASCADE;

-- 4. Create indexes
CREATE INDEX idx_form_questions_category ON project_form_questions(service_category_id);
CREATE INDEX idx_form_questions_parent_question ON project_form_questions(parent_question_id);
CREATE INDEX idx_form_questions_parent_option ON project_form_questions(parent_option_id);
CREATE INDEX idx_form_questions_root ON project_form_questions(is_root_question);
CREATE INDEX idx_form_question_options_question ON project_form_question_options(question_id);
CREATE INDEX idx_form_question_options_followup ON project_form_question_options(has_follow_up);

-- 5. Project Form Answers table (for storing user responses)
CREATE TABLE project_form_answers (
  id VARCHAR(100) PRIMARY KEY,
  project_id UUID REFERENCES projects(id) ON DELETE CASCADE,
  question_id VARCHAR(100) REFERENCES project_form_questions(id) ON DELETE CASCADE,
  selected_option_id VARCHAR(100) REFERENCES project_form_question_options(id) ON DELETE SET NULL,
  answer_text TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(project_id, question_id)
);

CREATE INDEX idx_form_answers_project ON project_form_answers(project_id);
CREATE INDEX idx_form_answers_question ON project_form_answers(question_id);
