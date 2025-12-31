-- ==========================================
-- ARCHITECT CATEGORY (ID: 5)
-- ==========================================

-- ROOT QUESTION
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-root', 5, 'Wat voor opdracht zoek je?', 'What type of project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE);

-- ROOT OPTIONS
INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-newbuild', 'q-arch-root', 'newbuild', 'Nieuwbouw ontwerp', 'New build design', TRUE, 1),
('opt-arch-renovation', 'q-arch-root', 'renovation', 'Verbouwing / renovatie', 'Renovation / remodeling', TRUE, 2),
('opt-arch-extension', 'q-arch-root', 'extension', 'Aanbouw / uitbouw', 'Extension / addition', TRUE, 3),
('opt-arch-interior', 'q-arch-root', 'interior', 'Interieurontwerp', 'Interior design', TRUE, 4),
('opt-arch-permits', 'q-arch-root', 'permits', 'Vergunningen / advies', 'Permits / advice', TRUE, 5);


-- ==========================================
-- NEW BUILD DESIGN → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Do you already own a building plot?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-newbuild-1', 5, 'Heb je al bouwgrond?', 'Do you already own a building plot?', 'radio', FALSE, 'q-arch-root', 'opt-arch-newbuild', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-newbuild-1-yes', 'q-arch-newbuild-1', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-arch-newbuild-1-no', 'q-arch-newbuild-1', 'no', 'Nee', 'No', FALSE, 2);

-- Q2: What stage are you in?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-newbuild-2', 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, 'q-arch-root', 'opt-arch-newbuild', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-newbuild-2-orientation', 'q-arch-newbuild-2', 'orientation', 'Oriëntatie (ideeën verzamelen)', 'Orientation (collecting ideas)', FALSE, 1),
('opt-arch-newbuild-2-design', 'q-arch-newbuild-2', 'design_phase', 'Ontwerpfase', 'Design phase', FALSE, 2),
('opt-arch-newbuild-2-final', 'q-arch-newbuild-2', 'final_plan', 'Definitief plan & vergunning', 'Final plan & permit', FALSE, 3);

-- Q3: What type of house do you want to build?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-newbuild-3', 5, 'Wat voor type woning wil je bouwen?', 'What type of house do you want to build?', 'radio', FALSE, 'q-arch-root', 'opt-arch-newbuild', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-newbuild-3-family', 'q-arch-newbuild-3', 'single_family', 'Eengezinswoning', 'Single-family home', FALSE, 1),
('opt-arch-newbuild-3-apartment', 'q-arch-newbuild-3', 'apartment', 'Appartement', 'Apartment', FALSE, 2),
('opt-arch-newbuild-3-villa', 'q-arch-newbuild-3', 'villa', 'Villa', 'Villa', FALSE, 3),
('opt-arch-newbuild-3-other', 'q-arch-newbuild-3', 'other', 'Anders', 'Other', FALSE, 4);


-- ==========================================
-- RENOVATION / REMODELING → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: What type of renovation is it?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-renovation-1', 5, 'Om wat voor verbouwing gaat het?', 'What type of renovation is it?', 'radio', FALSE, 'q-arch-root', 'opt-arch-renovation', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-renovation-1-kitchen', 'q-arch-renovation-1', 'kitchen_bathroom', 'Keuken/badkamer', 'Kitchen / bathroom', FALSE, 1),
('opt-arch-renovation-1-room', 'q-arch-renovation-1', 'extra_room', 'Extra kamer', 'Extra room', FALSE, 2),
('opt-arch-renovation-1-dormer', 'q-arch-renovation-1', 'dormer', 'Dakkapel/zolder', 'Dormer / attic', FALSE, 3),
('opt-arch-renovation-1-entire', 'q-arch-renovation-1', 'entire_home', 'Gehele woning', 'Entire home', FALSE, 4);

-- Q2: Do you already have existing plans/drawings?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-renovation-2', 5, 'Heb je al bestaande plannen/tekeningen?', 'Do you already have existing plans/drawings?', 'radio', FALSE, 'q-arch-root', 'opt-arch-renovation', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-renovation-2-yes', 'q-arch-renovation-2', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-arch-renovation-2-no', 'q-arch-renovation-2', 'no', 'Nee', 'No', FALSE, 2);

-- Q3: Should the architect also handle the building permit application?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-renovation-3', 5, 'Moet de architect ook de bouwaanvraag/vergunning regelen?', 'Should the architect also handle the building permit application?', 'radio', FALSE, 'q-arch-root', 'opt-arch-renovation', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-renovation-3-yes', 'q-arch-renovation-3', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-arch-renovation-3-no', 'q-arch-renovation-3', 'no', 'Nee', 'No', FALSE, 2),
('opt-arch-renovation-3-unsure', 'q-arch-renovation-3', 'not_sure', 'Weet ik nog niet', 'Not sure yet', FALSE, 3);


-- ==========================================
-- EXTENSION / ADDITION → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: What do you want to realize?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-extension-1', 5, 'Wat wil je realiseren?', 'What do you want to realize?', 'radio', FALSE, 'q-arch-root', 'opt-arch-extension', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-extension-1-living', 'q-arch-extension-1', 'living_room_extension', 'Uitbouw woonkamer', 'Living room extension', FALSE, 1),
('opt-arch-extension-1-conservatory', 'q-arch-extension-1', 'conservatory', 'Serre/veranda', 'Conservatory / veranda', FALSE, 2),
('opt-arch-extension-1-garage', 'q-arch-extension-1', 'garage', 'Garage/carport', 'Garage / carport', FALSE, 3),
('opt-arch-extension-1-other', 'q-arch-extension-1', 'other', 'Anders', 'Other', FALSE, 4);

-- Q2: Do you need a permit or have you already applied for one?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-extension-2', 5, 'Heb je een vergunning nodig of al aangevraagd?', 'Do you need a permit or have you already applied for one?', 'radio', FALSE, 'q-arch-root', 'opt-arch-extension', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-extension-2-yes', 'q-arch-extension-2', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-arch-extension-2-no', 'q-arch-extension-2', 'no', 'Nee', 'No', FALSE, 2),
('opt-arch-extension-2-unknown', 'q-arch-extension-2', 'dont_know', 'Weet ik niet', 'I don''t know', FALSE, 3);

-- Q3: Should the architect also do the construction supervision?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-extension-3', 5, 'Moet de architect ook het bouwtoezicht doen?', 'Should the architect also do the construction supervision?', 'radio', FALSE, 'q-arch-root', 'opt-arch-extension', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-extension-3-yes', 'q-arch-extension-3', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-arch-extension-3-no', 'q-arch-extension-3', 'no', 'Nee', 'No', FALSE, 2);


-- ==========================================
-- INTERIOR DESIGN → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Which spaces does it concern?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-interior-1', 5, 'Om welke ruimtes gaat het?', 'Which spaces does it concern?', 'radio', FALSE, 'q-arch-root', 'opt-arch-interior', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-interior-1-living', 'q-arch-interior-1', 'living_room', 'Woonkamer', 'Living room', FALSE, 1),
('opt-arch-interior-1-kitchen', 'q-arch-interior-1', 'kitchen', 'Keuken', 'Kitchen', FALSE, 2),
('opt-arch-interior-1-bathroom', 'q-arch-interior-1', 'bathroom', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-arch-interior-1-bedroom', 'q-arch-interior-1', 'bedroom', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-arch-interior-1-multiple', 'q-arch-interior-1', 'multiple', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: What is your goal?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-interior-2', 5, 'Wat is je doel?', 'What is your goal?', 'radio', FALSE, 'q-arch-root', 'opt-arch-interior', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-interior-2-layout', 'q-arch-interior-2', 'change_layout', 'Indeling veranderen', 'Change the layout', FALSE, 1),
('opt-arch-interior-2-style', 'q-arch-interior-2', 'style_atmosphere', 'Stijl & sfeer bepalen', 'Determine style & atmosphere', FALSE, 2),
('opt-arch-interior-2-custom', 'q-arch-interior-2', 'custom_furniture', 'Maatwerk meubels', 'Custom furniture', FALSE, 3),
('opt-arch-interior-2-makeover', 'q-arch-interior-2', 'complete_makeover', 'Complete make-over', 'Complete makeover', FALSE, 4);


-- ==========================================
-- PERMITS / ADVICE → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: What do you need help with?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-permits-1', 5, 'Waar heb je hulp bij nodig?', 'What do you need help with?', 'radio', FALSE, 'q-arch-root', 'opt-arch-permits', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-permits-1-env', 'q-arch-permits-1', 'environmental_permit', 'Omgevingsvergunning', 'Environmental permit', FALSE, 1),
('opt-arch-permits-1-structural', 'q-arch-permits-1', 'structural_advice', 'Bouwtechnisch advies', 'Structural advice', FALSE, 2),
('opt-arch-permits-1-energy', 'q-arch-permits-1', 'energy_sustainability', 'Energieprestatie / duurzaamheid', 'Energy performance / sustainability', FALSE, 3),
('opt-arch-permits-1-other', 'q-arch-permits-1', 'other_advice', 'Ander advies', 'Other advice', FALSE, 4);

-- Q2: What stage are you in?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-permits-2', 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, 'q-arch-root', 'opt-arch-permits', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-permits-2-orientation', 'q-arch-permits-2', 'orientation', 'Oriëntatie', 'Orientation', FALSE, 1),
('opt-arch-permits-2-plans', 'q-arch-permits-2', 'plans_developed', 'Plannen uitgewerkt', 'Plans developed', FALSE, 2),
('opt-arch-permits-2-started', 'q-arch-permits-2', 'construction_started', 'Bouw al gestart', 'Construction already started', FALSE, 3);


-- ==========================================
-- INTERIOR CATEGORY (ID: 23)
-- ==========================================

-- ROOT QUESTION
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-root', 23, 'Wat voor type interieur-opdracht zoek je?', 'What type of interior project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE);

-- ROOT OPTIONS
INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-advice', 'q-int-root', 'advice', 'Interieuradvies', 'Interior advice', TRUE, 1),
('opt-int-makeover', 'q-int-root', 'makeover', 'Complete make-over', 'Complete makeover', TRUE, 2),
('opt-int-custom', 'q-int-root', 'custom_furniture', 'Maatwerk meubels', 'Custom furniture', TRUE, 3),
('opt-int-color', 'q-int-root', 'color_material', 'Kleur- en materiaaladvies', 'Color and material advice', TRUE, 4),
('opt-int-lighting', 'q-int-root', 'lighting_plan', 'Lichtplan', 'Lighting plan', TRUE, 5);


-- ==========================================
-- INTERIOR ADVICE → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Which spaces does it concern?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-advice-1', 23, 'Om welke ruimtes gaat het?', 'Which spaces does it concern?', 'radio', FALSE, 'q-int-root', 'opt-int-advice', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-advice-1-living', 'q-int-advice-1', 'living_room', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-advice-1-kitchen', 'q-int-advice-1', 'kitchen', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-advice-1-bathroom', 'q-int-advice-1', 'bathroom', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-advice-1-bedroom', 'q-int-advice-1', 'bedroom', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-advice-1-multiple', 'q-int-advice-1', 'multiple', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: What is your main goal?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-advice-2', 23, 'Wat is je belangrijkste doel?', 'What is your main goal?', 'radio', FALSE, 'q-int-root', 'opt-int-advice', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-advice-2-layout', 'q-int-advice-2', 'better_layout', 'Betere indeling', 'Better layout', FALSE, 1),
('opt-int-advice-2-atmosphere', 'q-int-advice-2', 'more_atmosphere', 'Meer sfeer / stijl', 'More atmosphere / style', FALSE, 2),
('opt-int-advice-2-practical', 'q-int-advice-2', 'more_practical', 'Praktischer gebruik', 'More practical use', FALSE, 3),
('opt-int-advice-2-sustainability', 'q-int-advice-2', 'sustainability', 'Duurzaamheid', 'Sustainability', FALSE, 4);


-- ==========================================
-- COMPLETE MAKEOVER → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: For what type of property?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-makeover-1', 23, 'Voor welk type woning?', 'For what type of property?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-makeover-1-apartment', 'q-int-makeover-1', 'apartment', 'Appartement', 'Apartment', FALSE, 1),
('opt-int-makeover-1-family', 'q-int-makeover-1', 'single_family', 'Eengezinswoning', 'Single-family home', FALSE, 2),
('opt-int-makeover-1-villa', 'q-int-makeover-1', 'villa', 'Villa', 'Villa', FALSE, 3),
('opt-int-makeover-1-office', 'q-int-makeover-1', 'office', 'Kantoor/praktijkruimte', 'Office / practice space', FALSE, 4);

-- Q2: Would you also like guidance during execution?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-makeover-2', 23, 'Wil je ook begeleiding tijdens de uitvoering?', 'Would you also like guidance during execution?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-makeover-2-yes', 'q-int-makeover-2', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-int-makeover-2-no', 'q-int-makeover-2', 'no', 'Nee', 'No', FALSE, 2),
('opt-int-makeover-2-unsure', 'q-int-makeover-2', 'not_sure', 'Weet ik nog niet', 'Not sure yet', FALSE, 3);

-- Q3: Do you have a preferred style?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-makeover-3', 23, 'Heb je een voorkeur voor stijl?', 'Do you have a preferred style?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-makeover-3-modern', 'q-int-makeover-3', 'modern', 'Modern', 'Modern', FALSE, 1),
('opt-int-makeover-3-classic', 'q-int-makeover-3', 'classic', 'Klassiek', 'Classic', FALSE, 2),
('opt-int-makeover-3-industrial', 'q-int-makeover-3', 'industrial', 'Industrieel', 'Industrial', FALSE, 3),
('opt-int-makeover-3-rustic', 'q-int-makeover-3', 'rustic', 'Landelijk', 'Country / rustic', FALSE, 4),
('opt-int-makeover-3-no-pref', 'q-int-makeover-3', 'no_preference', 'Anders / geen voorkeur', 'Other / no preference', FALSE, 5);


-- ==========================================
-- CUSTOM FURNITURE → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: What type of furniture is it?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-custom-1', 23, 'Om wat voor meubel gaat het?', 'What type of furniture is it?', 'radio', FALSE, 'q-int-root', 'opt-int-custom', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-custom-1-wardrobe', 'q-int-custom-1', 'wardrobe', 'Kledingkast', 'Wardrobe', FALSE, 1),
('opt-int-custom-1-bookcase', 'q-int-custom-1', 'bookcase', 'Boekenkast', 'Bookcase', FALSE, 2),
('opt-int-custom-1-kitchen', 'q-int-custom-1', 'kitchen_dining', 'Keuken / eettafel', 'Kitchen / dining table', FALSE, 3),
('opt-int-custom-1-desk', 'q-int-custom-1', 'desk', 'Bureau / werkplek', 'Desk / workspace', FALSE, 4),
('opt-int-custom-1-other', 'q-int-custom-1', 'other', 'Anders', 'Other', FALSE, 5);

-- Q2: Where should the furniture be placed?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-custom-2', 23, 'Waar moet het meubel komen?', 'Where should the furniture be placed?', 'radio', FALSE, 'q-int-root', 'opt-int-custom', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-custom-2-living', 'q-int-custom-2', 'living_room', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-custom-2-bedroom', 'q-int-custom-2', 'bedroom', 'Slaapkamer', 'Bedroom', FALSE, 2),
('opt-int-custom-2-kitchen', 'q-int-custom-2', 'kitchen', 'Keuken', 'Kitchen', FALSE, 3),
('opt-int-custom-2-bathroom', 'q-int-custom-2', 'bathroom', 'Badkamer', 'Bathroom', FALSE, 4),
('opt-int-custom-2-other', 'q-int-custom-2', 'other', 'Anders', 'Other', FALSE, 5);


-- ==========================================
-- COLOR AND MATERIAL ADVICE → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: For which space do you want advice?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-color-1', 23, 'Voor welke ruimte wil je advies?', 'For which space do you want advice?', 'radio', FALSE, 'q-int-root', 'opt-int-color', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-color-1-living', 'q-int-color-1', 'living_room', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-color-1-kitchen', 'q-int-color-1', 'kitchen', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-color-1-bathroom', 'q-int-color-1', 'bathroom', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-color-1-bedroom', 'q-int-color-1', 'bedroom', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-color-1-multiple', 'q-int-color-1', 'multiple', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: What is your goal?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-color-2', 23, 'Wat is je doel?', 'What is your goal?', 'radio', FALSE, 'q-int-root', 'opt-int-color', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-color-2-warmer', 'q-int-color-2', 'warmer', 'Warmere uitstraling', 'Warmer appearance', FALSE, 1),
('opt-int-color-2-sleeker', 'q-int-color-2', 'sleeker', 'Strakker / moderner', 'Sleeker / more modern', FALSE, 2),
('opt-int-color-2-brighter', 'q-int-color-2', 'brighter', 'Lichter maken', 'Make it brighter', FALSE, 3),
('opt-int-color-2-sustainable', 'q-int-color-2', 'sustainable', 'Duurzamere materialen', 'More sustainable materials', FALSE, 4);


-- ==========================================
-- LIGHTING PLAN → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: For which space(s) do you need a lighting plan?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-lighting-1', 23, 'Voor welke ruimte(s) heb je een lichtplan nodig?', 'For which space(s) do you need a lighting plan?', 'radio', FALSE, 'q-int-root', 'opt-int-lighting', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-lighting-1-living', 'q-int-lighting-1', 'living_room', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-lighting-1-kitchen', 'q-int-lighting-1', 'kitchen', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-lighting-1-bathroom', 'q-int-lighting-1', 'bathroom', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-lighting-1-bedroom', 'q-int-lighting-1', 'bedroom', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-lighting-1-entire', 'q-int-lighting-1', 'entire_home', 'Hele woning', 'Entire home', FALSE, 5);

-- Q2: Would you also like installation to be carried out?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-lighting-2', 23, 'Wil je ook installatie laten uitvoeren?', 'Would you also like installation to be carried out?', 'radio', FALSE, 'q-int-root', 'opt-int-lighting', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-lighting-2-yes', 'q-int-lighting-2', 'yes', 'Ja', 'Yes', FALSE, 1),
('opt-int-lighting-2-no', 'q-int-lighting-2', 'no', 'Nee', 'No', FALSE, 2);
