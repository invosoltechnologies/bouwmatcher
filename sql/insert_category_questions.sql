-- ==========================================
-- ARCHITECT CATEGORY (ID: 5)
-- ==========================================

-- ROOT QUESTION: Wat voor opdracht zoek je?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-root', 5, 'Wat voor opdracht zoek je?', 'What type of project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE);

-- ROOT OPTIONS
INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-nieuwbouw', 'q-arch-root', 'nieuwbouw', 'Nieuwbouw ontwerp', 'New build design', TRUE, 1),
('opt-arch-verbouwing', 'q-arch-root', 'verbouwing', 'Verbouwing / renovatie', 'Renovation / remodeling', TRUE, 2),
('opt-arch-aanbouw', 'q-arch-root', 'aanbouw', 'Aanbouw / uitbouw', 'Extension / addition', TRUE, 3),
('opt-arch-interieur', 'q-arch-root', 'interieur', 'Interieurontwerp', 'Interior design', TRUE, 4),
('opt-arch-vergunning', 'q-arch-root', 'vergunning', 'Vergunningen / advies', 'Permits / advice', TRUE, 5);


-- ==========================================
-- NIEUWBOUW ONTWERP → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Heb je al bouwgrond?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-nieuw-1', 5, 'Heb je al bouwgrond?', 'Do you already own a building plot?', 'radio', FALSE, 'q-arch-root', 'opt-arch-nieuwbouw', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-nieuw-1-ja', 'q-arch-nieuw-1', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-arch-nieuw-1-nee', 'q-arch-nieuw-1', 'nee', 'Nee', 'No', FALSE, 2);

-- Q2: In welke fase zit je?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-nieuw-2', 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, 'q-arch-root', 'opt-arch-nieuwbouw', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-nieuw-2-ori', 'q-arch-nieuw-2', 'orientatie', 'Oriëntatie (ideeën verzamelen)', 'Orientation (collecting ideas)', FALSE, 1),
('opt-arch-nieuw-2-ontwerp', 'q-arch-nieuw-2', 'ontwerpfase', 'Ontwerpfase', 'Design phase', FALSE, 2),
('opt-arch-nieuw-2-plan', 'q-arch-nieuw-2', 'definitief', 'Definitief plan & vergunning', 'Final plan & permit', FALSE, 3);

-- Q3: Wat voor type woning wil je bouwen?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-nieuw-3', 5, 'Wat voor type woning wil je bouwen?', 'What type of house do you want to build?', 'radio', FALSE, 'q-arch-root', 'opt-arch-nieuwbouw', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-nieuw-3-een', 'q-arch-nieuw-3', 'eengezinswoning', 'Eengezinswoning', 'Single-family home', FALSE, 1),
('opt-arch-nieuw-3-app', 'q-arch-nieuw-3', 'appartement', 'Appartement', 'Apartment', FALSE, 2),
('opt-arch-nieuw-3-villa', 'q-arch-nieuw-3', 'villa', 'Villa', 'Villa', FALSE, 3),
('opt-arch-nieuw-3-anders', 'q-arch-nieuw-3', 'anders', 'Anders', 'Other', FALSE, 4);


-- ==========================================
-- VERBOUWING / RENOVATIE → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Om wat voor verbouwing gaat het?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-verb-1', 5, 'Om wat voor verbouwing gaat het?', 'What type of renovation is it?', 'radio', FALSE, 'q-arch-root', 'opt-arch-verbouwing', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-verb-1-keuken', 'q-arch-verb-1', 'keuken_badkamer', 'Keuken/badkamer', 'Kitchen / bathroom', FALSE, 1),
('opt-arch-verb-1-kamer', 'q-arch-verb-1', 'extra_kamer', 'Extra kamer', 'Extra room', FALSE, 2),
('opt-arch-verb-1-dak', 'q-arch-verb-1', 'dakkapel', 'Dakkapel/zolder', 'Dormer / attic', FALSE, 3),
('opt-arch-verb-1-geheel', 'q-arch-verb-1', 'gehele_woning', 'Gehele woning', 'Entire home', FALSE, 4);

-- Q2: Heb je al bestaande plannen/tekeningen?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-verb-2', 5, 'Heb je al bestaande plannen/tekeningen?', 'Do you already have existing plans/drawings?', 'radio', FALSE, 'q-arch-root', 'opt-arch-verbouwing', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-verb-2-ja', 'q-arch-verb-2', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-arch-verb-2-nee', 'q-arch-verb-2', 'nee', 'Nee', 'No', FALSE, 2);

-- Q3: Moet de architect ook de bouwaanvraag/vergunning regelen?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-verb-3', 5, 'Moet de architect ook de bouwaanvraag/vergunning regelen?', 'Should the architect also handle the building permit application?', 'radio', FALSE, 'q-arch-root', 'opt-arch-verbouwing', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-verb-3-ja', 'q-arch-verb-3', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-arch-verb-3-nee', 'q-arch-verb-3', 'nee', 'Nee', 'No', FALSE, 2),
('opt-arch-verb-3-weet', 'q-arch-verb-3', 'weet_niet', 'Weet ik nog niet', 'Not sure yet', FALSE, 3);


-- ==========================================
-- AANBOUW / UITBOUW → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Wat wil je realiseren?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-aanb-1', 5, 'Wat wil je realiseren?', 'What do you want to realize?', 'radio', FALSE, 'q-arch-root', 'opt-arch-aanbouw', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-aanb-1-woon', 'q-arch-aanb-1', 'uitbouw_woonkamer', 'Uitbouw woonkamer', 'Living room extension', FALSE, 1),
('opt-arch-aanb-1-serre', 'q-arch-aanb-1', 'serre', 'Serre/veranda', 'Conservatory / veranda', FALSE, 2),
('opt-arch-aanb-1-garage', 'q-arch-aanb-1', 'garage', 'Garage/carport', 'Garage / carport', FALSE, 3),
('opt-arch-aanb-1-anders', 'q-arch-aanb-1', 'anders', 'Anders', 'Other', FALSE, 4);

-- Q2: Heb je een vergunning nodig of al aangevraagd?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-aanb-2', 5, 'Heb je een vergunning nodig of al aangevraagd?', 'Do you need a permit or have you already applied for one?', 'radio', FALSE, 'q-arch-root', 'opt-arch-aanbouw', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-aanb-2-ja', 'q-arch-aanb-2', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-arch-aanb-2-nee', 'q-arch-aanb-2', 'nee', 'Nee', 'No', FALSE, 2),
('opt-arch-aanb-2-weet', 'q-arch-aanb-2', 'weet_niet', 'Weet ik niet', 'I don''t know', FALSE, 3);

-- Q3: Moet de architect ook het bouwtoezicht doen?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-aanb-3', 5, 'Moet de architect ook het bouwtoezicht doen?', 'Should the architect also do the construction supervision?', 'radio', FALSE, 'q-arch-root', 'opt-arch-aanbouw', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-aanb-3-ja', 'q-arch-aanb-3', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-arch-aanb-3-nee', 'q-arch-aanb-3', 'nee', 'Nee', 'No', FALSE, 2);


-- ==========================================
-- INTERIEURONTWERP → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Om welke ruimtes gaat het?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-int-1', 5, 'Om welke ruimtes gaat het?', 'Which spaces does it concern?', 'radio', FALSE, 'q-arch-root', 'opt-arch-interieur', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-int-1-woon', 'q-arch-int-1', 'woonkamer', 'Woonkamer', 'Living room', FALSE, 1),
('opt-arch-int-1-keuken', 'q-arch-int-1', 'keuken', 'Keuken', 'Kitchen', FALSE, 2),
('opt-arch-int-1-bad', 'q-arch-int-1', 'badkamer', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-arch-int-1-slaap', 'q-arch-int-1', 'slaapkamer', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-arch-int-1-meer', 'q-arch-int-1', 'meerdere', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: Wat is je doel?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-int-2', 5, 'Wat is je doel?', 'What is your goal?', 'radio', FALSE, 'q-arch-root', 'opt-arch-interieur', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-int-2-ind', 'q-arch-int-2', 'indeling', 'Indeling veranderen', 'Change the layout', FALSE, 1),
('opt-arch-int-2-stijl', 'q-arch-int-2', 'stijl', 'Stijl & sfeer bepalen', 'Determine style & atmosphere', FALSE, 2),
('opt-arch-int-2-maat', 'q-arch-int-2', 'maatwerk', 'Maatwerk meubels', 'Custom furniture', FALSE, 3),
('opt-arch-int-2-make', 'q-arch-int-2', 'makeover', 'Complete make-over', 'Complete makeover', FALSE, 4);


-- ==========================================
-- VERGUNNINGEN / ADVIES → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Waar heb je hulp bij nodig?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-verg-1', 5, 'Waar heb je hulp bij nodig?', 'What do you need help with?', 'radio', FALSE, 'q-arch-root', 'opt-arch-vergunning', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-verg-1-omg', 'q-arch-verg-1', 'omgevingsvergunning', 'Omgevingsvergunning', 'Environmental permit', FALSE, 1),
('opt-arch-verg-1-bouw', 'q-arch-verg-1', 'bouwtechnisch', 'Bouwtechnisch advies', 'Structural advice', FALSE, 2),
('opt-arch-verg-1-energie', 'q-arch-verg-1', 'energie', 'Energieprestatie / duurzaamheid', 'Energy performance / sustainability', FALSE, 3),
('opt-arch-verg-1-ander', 'q-arch-verg-1', 'ander', 'Ander advies', 'Other advice', FALSE, 4);

-- Q2: In welke fase zit je?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-arch-verg-2', 5, 'In welke fase zit je?', 'What stage are you in?', 'radio', FALSE, 'q-arch-root', 'opt-arch-vergunning', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-arch-verg-2-ori', 'q-arch-verg-2', 'orientatie', 'Oriëntatie', 'Orientation', FALSE, 1),
('opt-arch-verg-2-plan', 'q-arch-verg-2', 'plannen', 'Plannen uitgewerkt', 'Plans developed', FALSE, 2),
('opt-arch-verg-2-bouw', 'q-arch-verg-2', 'bouw_gestart', 'Bouw al gestart', 'Construction already started', FALSE, 3);


-- ==========================================
-- INTERIEUR CATEGORY (ID: 23)
-- ==========================================

-- ROOT QUESTION: Wat voor type interieur-opdracht zoek je?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-root', 23, 'Wat voor type interieur-opdracht zoek je?', 'What type of interior project are you looking for?', 'radio', TRUE, NULL, NULL, 1, TRUE);

-- ROOT OPTIONS
INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-advies', 'q-int-root', 'advies', 'Interieuradvies', 'Interior advice', TRUE, 1),
('opt-int-makeover', 'q-int-root', 'makeover', 'Complete make-over', 'Complete makeover', TRUE, 2),
('opt-int-maatwerk', 'q-int-root', 'maatwerk', 'Maatwerk meubels', 'Custom furniture', TRUE, 3),
('opt-int-kleur', 'q-int-root', 'kleur', 'Kleur- en materiaaladvies', 'Color and material advice', TRUE, 4),
('opt-int-licht', 'q-int-root', 'licht', 'Lichtplan', 'Lighting plan', TRUE, 5);


-- ==========================================
-- INTERIEURADVIES → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Om welke ruimtes gaat het?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-adv-1', 23, 'Om welke ruimtes gaat het?', 'Which spaces does it concern?', 'radio', FALSE, 'q-int-root', 'opt-int-advies', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-adv-1-woon', 'q-int-adv-1', 'woonkamer', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-adv-1-keuken', 'q-int-adv-1', 'keuken', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-adv-1-bad', 'q-int-adv-1', 'badkamer', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-adv-1-slaap', 'q-int-adv-1', 'slaapkamer', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-adv-1-meer', 'q-int-adv-1', 'meerdere', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: Wat is je belangrijkste doel?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-adv-2', 23, 'Wat is je belangrijkste doel?', 'What is your main goal?', 'radio', FALSE, 'q-int-root', 'opt-int-advies', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-adv-2-ind', 'q-int-adv-2', 'indeling', 'Betere indeling', 'Better layout', FALSE, 1),
('opt-int-adv-2-sfeer', 'q-int-adv-2', 'sfeer', 'Meer sfeer / stijl', 'More atmosphere / style', FALSE, 2),
('opt-int-adv-2-prak', 'q-int-adv-2', 'praktisch', 'Praktischer gebruik', 'More practical use', FALSE, 3),
('opt-int-adv-2-duur', 'q-int-adv-2', 'duurzaamheid', 'Duurzaamheid', 'Sustainability', FALSE, 4);


-- ==========================================
-- COMPLETE MAKE-OVER → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Voor welk type woning?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-make-1', 23, 'Voor welk type woning?', 'For what type of property?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-make-1-app', 'q-int-make-1', 'appartement', 'Appartement', 'Apartment', FALSE, 1),
('opt-int-make-1-een', 'q-int-make-1', 'eengezinswoning', 'Eengezinswoning', 'Single-family home', FALSE, 2),
('opt-int-make-1-villa', 'q-int-make-1', 'villa', 'Villa', 'Villa', FALSE, 3),
('opt-int-make-1-kant', 'q-int-make-1', 'kantoor', 'Kantoor/praktijkruimte', 'Office / practice space', FALSE, 4);

-- Q2: Wil je ook begeleiding tijdens de uitvoering?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-make-2', 23, 'Wil je ook begeleiding tijdens de uitvoering?', 'Would you also like guidance during execution?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-make-2-ja', 'q-int-make-2', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-int-make-2-nee', 'q-int-make-2', 'nee', 'Nee', 'No', FALSE, 2),
('opt-int-make-2-weet', 'q-int-make-2', 'weet_niet', 'Weet ik nog niet', 'Not sure yet', FALSE, 3);

-- Q3: Heb je een voorkeur voor stijl?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-make-3', 23, 'Heb je een voorkeur voor stijl?', 'Do you have a preferred style?', 'radio', FALSE, 'q-int-root', 'opt-int-makeover', 3, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-make-3-mod', 'q-int-make-3', 'modern', 'Modern', 'Modern', FALSE, 1),
('opt-int-make-3-klas', 'q-int-make-3', 'klassiek', 'Klassiek', 'Classic', FALSE, 2),
('opt-int-make-3-ind', 'q-int-make-3', 'industrieel', 'Industrieel', 'Industrial', FALSE, 3),
('opt-int-make-3-land', 'q-int-make-3', 'landelijk', 'Landelijk', 'Country / rustic', FALSE, 4),
('opt-int-make-3-geen', 'q-int-make-3', 'geen', 'Anders / geen voorkeur', 'Other / no preference', FALSE, 5);


-- ==========================================
-- MAATWERK MEUBELS → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Om wat voor meubel gaat het?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-maat-1', 23, 'Om wat voor meubel gaat het?', 'What type of furniture is it?', 'radio', FALSE, 'q-int-root', 'opt-int-maatwerk', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-maat-1-kled', 'q-int-maat-1', 'kledingkast', 'Kledingkast', 'Wardrobe', FALSE, 1),
('opt-int-maat-1-boek', 'q-int-maat-1', 'boekenkast', 'Boekenkast', 'Bookcase', FALSE, 2),
('opt-int-maat-1-keuken', 'q-int-maat-1', 'keuken', 'Keuken / eettafel', 'Kitchen / dining table', FALSE, 3),
('opt-int-maat-1-bureau', 'q-int-maat-1', 'bureau', 'Bureau / werkplek', 'Desk / workspace', FALSE, 4),
('opt-int-maat-1-anders', 'q-int-maat-1', 'anders', 'Anders', 'Other', FALSE, 5);

-- Q2: Waar moet het meubel komen?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-maat-2', 23, 'Waar moet het meubel komen?', 'Where should the furniture be placed?', 'radio', FALSE, 'q-int-root', 'opt-int-maatwerk', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-maat-2-woon', 'q-int-maat-2', 'woonkamer', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-maat-2-slaap', 'q-int-maat-2', 'slaapkamer', 'Slaapkamer', 'Bedroom', FALSE, 2),
('opt-int-maat-2-keuken', 'q-int-maat-2', 'keuken', 'Keuken', 'Kitchen', FALSE, 3),
('opt-int-maat-2-bad', 'q-int-maat-2', 'badkamer', 'Badkamer', 'Bathroom', FALSE, 4),
('opt-int-maat-2-anders', 'q-int-maat-2', 'anders', 'Anders', 'Other', FALSE, 5);


-- ==========================================
-- KLEUR- EN MATERIAALADVIES → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Voor welke ruimte wil je advies?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-kleur-1', 23, 'Voor welke ruimte wil je advies?', 'For which space do you want advice?', 'radio', FALSE, 'q-int-root', 'opt-int-kleur', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-kleur-1-woon', 'q-int-kleur-1', 'woonkamer', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-kleur-1-keuken', 'q-int-kleur-1', 'keuken', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-kleur-1-bad', 'q-int-kleur-1', 'badkamer', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-kleur-1-slaap', 'q-int-kleur-1', 'slaapkamer', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-kleur-1-meer', 'q-int-kleur-1', 'meerdere', 'Meerdere ruimtes', 'Multiple spaces', FALSE, 5);

-- Q2: Wat is je doel?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-kleur-2', 23, 'Wat is je doel?', 'What is your goal?', 'radio', FALSE, 'q-int-root', 'opt-int-kleur', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-kleur-2-warm', 'q-int-kleur-2', 'warmer', 'Warmere uitstraling', 'Warmer appearance', FALSE, 1),
('opt-int-kleur-2-strak', 'q-int-kleur-2', 'strakker', 'Strakker / moderner', 'Sleeker / more modern', FALSE, 2),
('opt-int-kleur-2-licht', 'q-int-kleur-2', 'lichter', 'Lichter maken', 'Make it brighter', FALSE, 3),
('opt-int-kleur-2-duur', 'q-int-kleur-2', 'duurzamer', 'Duurzamere materialen', 'More sustainable materials', FALSE, 4);


-- ==========================================
-- LICHTPLAN → FOLLOW-UP QUESTIONS
-- ==========================================

-- Q1: Voor welke ruimte(s) heb je een lichtplan nodig?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-licht-1', 23, 'Voor welke ruimte(s) heb je een lichtplan nodig?', 'For which space(s) do you need a lighting plan?', 'radio', FALSE, 'q-int-root', 'opt-int-licht', 1, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-licht-1-woon', 'q-int-licht-1', 'woonkamer', 'Woonkamer', 'Living room', FALSE, 1),
('opt-int-licht-1-keuken', 'q-int-licht-1', 'keuken', 'Keuken', 'Kitchen', FALSE, 2),
('opt-int-licht-1-bad', 'q-int-licht-1', 'badkamer', 'Badkamer', 'Bathroom', FALSE, 3),
('opt-int-licht-1-slaap', 'q-int-licht-1', 'slaapkamer', 'Slaapkamer(s)', 'Bedroom(s)', FALSE, 4),
('opt-int-licht-1-hele', 'q-int-licht-1', 'hele_woning', 'Hele woning', 'Entire home', FALSE, 5);

-- Q2: Wil je ook installatie laten uitvoeren?
INSERT INTO project_form_questions (id, service_category_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required)
VALUES
('q-int-licht-2', 23, 'Wil je ook installatie laten uitvoeren?', 'Would you also like installation to be carried out?', 'radio', FALSE, 'q-int-root', 'opt-int-licht', 2, TRUE);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index)
VALUES
('opt-int-licht-2-ja', 'q-int-licht-2', 'ja', 'Ja', 'Yes', FALSE, 1),
('opt-int-licht-2-nee', 'q-int-licht-2', 'nee', 'Nee', 'No', FALSE, 2);
