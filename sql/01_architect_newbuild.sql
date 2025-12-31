-- ==========================================
-- ARCHITECT - NEWBUILD QUESTIONS
-- Run this after the root question is created
-- ==========================================

-- First, get the root question ID and newbuild option ID
-- You'll need to replace these with actual UUIDs from your database

-- Example:
-- SELECT id FROM project_form_questions WHERE service_category_id = 5 AND is_root_question = TRUE;
-- SELECT id FROM project_form_question_options WHERE option_value = 'newbuild';

-- Replace 'ROOT_QUESTION_UUID' and 'NEWBUILD_OPTION_UUID' with actual values

-- Q1: Do you already own a building plot?
DO $$
DECLARE
  root_q_id UUID;
  newbuild_opt_id UUID;
  q1_id UUID;
  q2_id UUID;
  q3_id UUID;
BEGIN
  -- Get root question ID
  SELECT id INTO root_q_id FROM project_form_questions
  WHERE service_category_id = 5 AND is_root_question = TRUE LIMIT 1;

  -- Get newbuild option ID
  SELECT id INTO newbuild_opt_id FROM project_form_question_options
  WHERE question_id = root_q_id AND option_value = 'newbuild' LIMIT 1;

  -- Insert Q1
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  VALUES (gen_random_uuid(), 5, 'Heb je al bouwgrond?', 'Do you already own a building plot?', 'radio', FALSE, root_q_id, newbuild_opt_id, 1, TRUE)
  RETURNING id INTO q1_id;

  -- Insert Q1 options
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  VALUES
    (gen_random_uuid(), q1_id, 'yes', 'Ja', 'Yes', FALSE, 1),
    (gen_random_uuid(), q1_id, 'no', 'Nee', 'No', FALSE, 2);

  -- Insert Q2
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  VALUES (gen_random_uuid(), 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, root_q_id, newbuild_opt_id, 2, TRUE)
  RETURNING id INTO q2_id;

  -- Insert Q2 options
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  VALUES
    (gen_random_uuid(), q2_id, 'orientation', 'Oriëntatie (ideeën verzamelen)', 'Orientation (collecting ideas)', FALSE, 1),
    (gen_random_uuid(), q2_id, 'design_phase', 'Ontwerpfase', 'Design phase', FALSE, 2),
    (gen_random_uuid(), q2_id, 'final_plan', 'Definitief plan & vergunning', 'Final plan & permit', FALSE, 3);

  -- Insert Q3
  INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
  VALUES (gen_random_uuid(), 5, 'Wat voor type woning wil je bouwen?', 'What type of house do you want to build?', 'radio', FALSE, root_q_id, newbuild_opt_id, 3, TRUE)
  RETURNING id INTO q3_id;

  -- Insert Q3 options
  INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
  VALUES
    (gen_random_uuid(), q3_id, 'single_family', 'Eengezinswoning', 'Single-family home', FALSE, 1),
    (gen_random_uuid(), q3_id, 'apartment', 'Appartement', 'Apartment', FALSE, 2),
    (gen_random_uuid(), q3_id, 'villa', 'Villa', 'Villa', FALSE, 3),
    (gen_random_uuid(), q3_id, 'other', 'Anders', 'Other', FALSE, 4);

  RAISE NOTICE 'Architect - Newbuild questions inserted successfully';
END $$;
