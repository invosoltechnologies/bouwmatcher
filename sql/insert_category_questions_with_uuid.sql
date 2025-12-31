-- ==========================================
-- ARCHITECT CATEGORY (ID: 5)
-- ==========================================

-- ROOT QUESTION
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
(gen_random_uuid(), 5, 'Wat voor opdracht zoek je?', 'What type of project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE)
RETURNING id AS q_arch_root_id;

-- Note: You'll need to manually copy the returned UUID and use it in the next INSERT for question_id
-- Or use a transaction with CTEs as shown below:

-- ==========================================
-- COMPLETE SQL WITH CTEs (Recommended)
-- ==========================================

WITH
-- ROOT QUESTION
q_arch_root AS (
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  VALUES (gen_random_uuid(), 5, 'Wat voor opdracht zoek je?', 'What type of project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE)
  RETURNING id
),
-- ROOT OPTIONS
opt_arch_newbuild AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'newbuild', 'Nieuwbouw ontwerp', 'New build design', TRUE, 1
  FROM q_arch_root
  RETURNING id
),
opt_arch_renovation AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'renovation', 'Verbouwing / renovatie', 'Renovation / remodeling', TRUE, 2
  FROM q_arch_root
  RETURNING id
),
opt_arch_extension AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'extension', 'Aanbouw / uitbouw', 'Extension / addition', TRUE, 3
  FROM q_arch_root
  RETURNING id
),
opt_arch_interior AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'interior', 'Interieurontwerp', 'Interior design', TRUE, 4
  FROM q_arch_root
  RETURNING id
),
opt_arch_permits AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'permits', 'Vergunningen / advies', 'Permits / advice', TRUE, 5
  FROM q_arch_root
  RETURNING id
),

-- NEWBUILD FOLLOW-UP QUESTIONS
q_arch_newbuild_1 AS (
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  SELECT gen_random_uuid(), 5, 'Heb je al bouwgrond?', 'Do you already own a building plot?', 'radio', FALSE, q.id, o.id, 1, TRUE
  FROM q_arch_root q, opt_arch_newbuild o
  RETURNING id
),
q_arch_newbuild_2 AS (
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  SELECT gen_random_uuid(), 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, q.id, o.id, 2, TRUE
  FROM q_arch_root q, opt_arch_newbuild o
  RETURNING id
),
q_arch_newbuild_3 AS (
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  SELECT gen_random_uuid(), 5, 'Wat voor type woning wil je bouwen?', 'What type of house do you want to build?', 'radio', FALSE, q.id, o.id, 3, TRUE
  FROM q_arch_root q, opt_arch_newbuild o
  RETURNING id
),

-- NEWBUILD Q1 OPTIONS
opt_arch_newbuild_1_yes AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'yes', 'Ja', 'Yes', FALSE, 1
  FROM q_arch_newbuild_1
  RETURNING id
),
opt_arch_newbuild_1_no AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'no', 'Nee', 'No', FALSE, 2
  FROM q_arch_newbuild_1
  RETURNING id
),

-- NEWBUILD Q2 OPTIONS
opt_arch_newbuild_2_orientation AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'orientation', 'Oriëntatie (ideeën verzamelen)', 'Orientation (collecting ideas)', FALSE, 1
  FROM q_arch_newbuild_2
  RETURNING id
),
opt_arch_newbuild_2_design AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'design_phase', 'Ontwerpfase', 'Design phase', FALSE, 2
  FROM q_arch_newbuild_2
  RETURNING id
),
opt_arch_newbuild_2_final AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'final_plan', 'Definitief plan & vergunning', 'Final plan & permit', FALSE, 3
  FROM q_arch_newbuild_2
  RETURNING id
),

-- NEWBUILD Q3 OPTIONS
opt_arch_newbuild_3_family AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'single_family', 'Eengezinswoning', 'Single-family home', FALSE, 1
  FROM q_arch_newbuild_3
  RETURNING id
),
opt_arch_newbuild_3_apartment AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'apartment', 'Appartement', 'Apartment', FALSE, 2
  FROM q_arch_newbuild_3
  RETURNING id
),
opt_arch_newbuild_3_villa AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'villa', 'Villa', 'Villa', FALSE, 3
  FROM q_arch_newbuild_3
  RETURNING id
),
opt_arch_newbuild_3_other AS (
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  SELECT gen_random_uuid(), id, 'other', 'Anders', 'Other', FALSE, 4
  FROM q_arch_newbuild_3
  RETURNING id
)

SELECT 'Architect - Newbuild questions inserted successfully' AS result;
