
-- ===============================================
-- Categories 1-10 - AUTO GENERATED
-- ===============================================


-- ===============================================
-- Category: Afbraakwerken (ID: 1)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-root', 1, NULL, 'Wat voor type afbraakwerk zoek je?', 'What type of afbraakwerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-101-1', 1, 101, 'Om wat voor gebouw gaat het?', 'Om wat voor gebouw gaat het?', 'radio', false, 'q-afbraakwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-1-woning', 'q-afbraakwerken-101-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-1-appartementencomplex', 'q-afbraakwerken-101-1', 'appartementencomplex', 'Appartementencomplex', 'Appartementencomplex', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-1-bedrijfspand', 'q-afbraakwerken-101-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-1-anders', 'q-afbraakwerken-101-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-101-2', 1, 101, 'Hoe groot is het gebouw ongeveer?', 'How large is het gebouw approximately?', 'radio', false, 'q-afbraakwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-2-klein_100_m', 'q-afbraakwerken-101-2', 'klein_100_m', 'Klein (\<100 m²)', 'Small (\<100 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-2-middel_100300_m', 'q-afbraakwerken-101-2', 'middel_100300_m', 'Middel (100–300 m²)', 'Medium (100–300 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-2-groot_3001000_m', 'q-afbraakwerken-101-2', 'groot_3001000_m', 'Groot (300–1000 m²)', 'Large (300–1000 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-2-zeer_groot_1000_m', 'q-afbraakwerken-101-2', 'zeer_groot_1000_m', 'Zeer groot (1000+ m²)', 'Very large (1000+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-101-3', 1, 101, 'Moet het puin ook afgevoerd worden?', 'Should the puin ook removed worden?', 'radio', false, 'q-afbraakwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-3-ja', 'q-afbraakwerken-101-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-101-3-nee', 'q-afbraakwerken-101-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-102-1', 1, 102, 'Wat wil je laten afbreken?', 'What do you want have afbreken?', 'radio', false, 'q-afbraakwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-1-aanbouw', 'q-afbraakwerken-102-1', 'aanbouw', 'Aanbouw', 'Aanbouw', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-1-dakkapel', 'q-afbraakwerken-102-1', 'dakkapel', 'Dakkapel', 'Dakkapel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-1-garage', 'q-afbraakwerken-102-1', 'garage', 'Garage', 'Garage', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-1-anders', 'q-afbraakwerken-102-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-102-2', 1, 102, 'Moet de afbraak machinaal of handmatig gebeuren?', 'Should the afbraak machinaal of handmatig gebeuren?', 'radio', false, 'q-afbraakwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-2-machinaal', 'q-afbraakwerken-102-2', 'machinaal', 'Machinaal', 'Machinaal', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-2-handmatig', 'q-afbraakwerken-102-2', 'handmatig', 'Handmatig', 'Handmatig', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-102-2-weet_ik_niet', 'q-afbraakwerken-102-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-103-1', 1, 103, 'Wat moet er verwijderd worden?', 'Wat moet er verwijderd worden?', 'radio', false, 'q-afbraakwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-1-binnenmuren', 'q-afbraakwerken-103-1', 'binnenmuren', 'Binnenmuren', 'Indoormuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-1-vloeren', 'q-afbraakwerken-103-1', 'vloeren', 'Vloeren', 'Vloeren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-1-plafonds', 'q-afbraakwerken-103-1', 'plafonds', 'Plafonds', 'Plafonds', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-1-anders', 'q-afbraakwerken-103-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-103-2', 1, 103, 'Hoe groot is de ruimte?', 'How large is de ruimte?', 'radio', false, 'q-afbraakwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-2-klein_tot_20_m', 'q-afbraakwerken-103-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-2-middel_2050_m', 'q-afbraakwerken-103-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-2-groot_50100_m', 'q-afbraakwerken-103-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-103-2-zeer_groot_100_m', 'q-afbraakwerken-103-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-104-1', 1, 104, 'Wat wil je slopen?', 'What do you want slopen?', 'radio', false, 'q-afbraakwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-1-garage', 'q-afbraakwerken-104-1', 'garage', 'Garage', 'Garage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-1-tuinhuis', 'q-afbraakwerken-104-1', 'tuinhuis', 'Tuinhuis', 'Gardenhuis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-1-schuur', 'q-afbraakwerken-104-1', 'schuur', 'Schuur', 'Schuur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-1-schoorsteen', 'q-afbraakwerken-104-1', 'schoorsteen', 'Schoorsteen', 'Schoorsteen', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-1-anders', 'q-afbraakwerken-104-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-afbraakwerken-104-2', 1, 104, 'Moet het puin ook afgevoerd worden?', 'Should the puin ook removed worden?', 'radio', false, 'q-afbraakwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-2-ja', 'q-afbraakwerken-104-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-afbraakwerken-104-2-nee', 'q-afbraakwerken-104-2', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Airco (ID: 2)
-- ===============================================

-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-root', 2, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuwe airco plaatsen (ID: 201)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-201-1', 2, 201, 'Wat voor type airco wil je laten plaatsen?', 'What type of air conditioning do you want to install?', 'radio', false, 'q-airco-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-1-split_unit', 'q-airco-201-1', 'split_unit', 'Split-unit', 'Split-unit', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-1-multi_split', 'q-airco-201-1', 'multi_split', 'Multi-split', 'Multi-split', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-1-mobiele_airco', 'q-airco-201-1', 'mobiele_airco', 'Mobiele airco', 'Mobile air conditioning', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-1-weet_ik_nog_niet', 'q-airco-201-1', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-201-2', 2, 201, 'Voor welk type ruimte/woning/gebouw?', 'For what type of space/home/building?', 'radio', false, 'q-airco-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-2-appartement', 'q-airco-201-2', 'appartement', 'Appartement', 'Apartment', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-2-rijtjeshuis', 'q-airco-201-2', 'rijtjeshuis', 'Rijtjeshuis', 'Terraced house', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-2-vrijstaande_woning', 'q-airco-201-2', 'vrijstaande_woning', 'Vrijstaande woning', 'Detached house', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-2-kantoor_bedrijfspand', 'q-airco-201-2', 'kantoor_bedrijfspand', 'Kantoor/bedrijfspand', 'Office/commercial building', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-201-3', 2, 201, 'Om hoeveel ruimtes gaat het?', 'How many rooms does it concern?', 'radio', false, 'q-airco-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-3-1', 'q-airco-201-3', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-3-2_3', 'q-airco-201-3', '2_3', '2–3', '2-3', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-3-4_5', 'q-airco-201-3', '4_5', '4–5', '4-5', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-201-3-meer_dan_5', 'q-airco-201-3', 'meer_dan_5', 'Meer dan 5', 'More than 5', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Airco vervangen (ID: 202)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-202-1', 2, 202, 'Wat wil je vervangen?', 'What do you want to replace?', 'radio', false, 'q-airco-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-1-binnenunits', 'q-airco-202-1', 'binnenunits', 'Binnenunit(s)', 'Indoor unit(s)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-1-buitenunit', 'q-airco-202-1', 'buitenunit', 'Buitenunit', 'Outdoor unit', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-1-complete_installatie', 'q-airco-202-1', 'complete_installatie', 'Complete installatie', 'Complete installation', false, 3, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-202-2', 2, 202, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-airco-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-2-defect', 'q-airco-202-2', 'defect', 'Defect', 'Defective', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-2-verouderd', 'q-airco-202-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-2-betere_energie_efficientie', 'q-airco-202-2', 'betere_energie_efficientie', 'Betere energie-efficiëntie', 'Better energy efficiency', false, 3, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-202-3', 2, 202, 'Moet de oude installatie verwijderd worden?', 'Should the old installation be removed?', 'radio', false, 'q-airco-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-3-ja', 'q-airco-202-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-202-3-nee', 'q-airco-202-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Airco repareren (ID: 203)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-203-1', 2, 203, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-airco-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-1-airco_koelt_niet', 'q-airco-203-1', 'airco_koelt_niet', 'Airco koelt niet', 'Air conditioning does not cool', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-1-airco_maakt_lawaai', 'q-airco-203-1', 'airco_maakt_lawaai', 'Airco maakt lawaai', 'Air conditioning makes noise', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-1-airco_lekt_water', 'q-airco-203-1', 'airco_lekt_water', 'Airco lekt water', 'Air conditioning leaks water', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-1-airco_geeft_storing_errorcode', 'q-airco-203-1', 'airco_geeft_storing_errorcode', 'Airco geeft storing / errorcode', 'Air conditioning shows error/error code', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-1-anders', 'q-airco-203-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-203-2', 2, 203, 'Hoe oud is de installatie ongeveer?', 'How old is the installation approximately?', 'radio', false, 'q-airco-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-2-0_5_jaar', 'q-airco-203-2', '0_5_jaar', '0–5 jaar', '0-5 years', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-2-5_10_jaar', 'q-airco-203-2', '5_10_jaar', '5–10 jaar', '5-10 years', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-2-10_20_jaar', 'q-airco-203-2', '10_20_jaar', '10–20 jaar', '10-20 years', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-203-2-ouder_dan_20_jaar', 'q-airco-203-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Older than 20 years', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Airco onderhouden/reinigen (ID: 204)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-204-1', 2, 204, 'Wat wil je laten doen?', 'What do you want to have done?', 'radio', false, 'q-airco-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-1-filters_reinigen', 'q-airco-204-1', 'filters_reinigen', 'Filters reinigen', 'Clean filters', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-1-binnen_buitenunit_reinigen', 'q-airco-204-1', 'binnen_buitenunit_reinigen', 'Binnen- en buitenunit reinigen', 'Clean indoor and outdoor unit', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-1-volledig_onderhoudscontract', 'q-airco-204-1', 'volledig_onderhoudscontract', 'Volledig onderhoudscontract', 'Complete maintenance contract', false, 3, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-airco-204-2', 2, 204, 'Hoe vaak wil je onderhoud?', 'How often do you want maintenance?', 'radio', false, 'q-airco-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-2-eenmalig', 'q-airco-204-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-2-jaarlijks', 'q-airco-204-2', 'jaarlijks', 'Jaarlijks', 'Yearly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-airco-204-2-halfjaarlijks', 'q-airco-204-2', 'halfjaarlijks', 'Halfjaarlijks', 'Semi-annually', false, 3, true, NULL);

-- ===============================================
-- Category: Alarmsystemen (ID: 3)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-root', 3, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-301-1', 3, 301, 'Voor welk type gebouw?', 'Voor welk type gebouw?', 'radio', false, 'q-alarmsystemen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-1-woning', 'q-alarmsystemen-301-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-1-appartement', 'q-alarmsystemen-301-1', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-1-bedrijfspand', 'q-alarmsystemen-301-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-301-2', 3, 301, 'Wat voor type systeem wil je?', 'What type of systeem wil je?', 'radio', false, 'q-alarmsystemen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-2-draadloos', 'q-alarmsystemen-301-2', 'draadloos', 'Draadloos', 'Draadloos', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-2-bekabeld', 'q-alarmsystemen-301-2', 'bekabeld', 'Bekabeld', 'Bekabeld', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-2-combinatie', 'q-alarmsystemen-301-2', 'combinatie', 'Combinatie', 'Combinatie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-2-weet_ik_nog_niet', 'q-alarmsystemen-301-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-301-3', 3, 301, 'Moet het systeem ook verbonden zijn met meldkamer?', 'Should the systeem ook verbonden zijn met meldkamer?', 'radio', false, 'q-alarmsystemen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-3-ja', 'q-alarmsystemen-301-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-301-3-nee', 'q-alarmsystemen-301-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-302-1', 3, 302, 'Wat wil je toevoegen?', 'What do you want toevoegen?', 'radio', false, 'q-alarmsystemen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-1-extra_cameras', 'q-alarmsystemen-302-1', 'extra_cameras', 'Extra camera’s', 'Extra camera’s', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-1-extra_bewegingssensoren', 'q-alarmsystemen-302-1', 'extra_bewegingssensoren', 'Extra bewegingssensoren', 'Extra bewegingssensoren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-1-extra_raam_deursensoren', 'q-alarmsystemen-302-1', 'extra_raam_deursensoren', 'Extra raam-/deursensoren', 'Extra raam-/deursensoren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-1-anders', 'q-alarmsystemen-302-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-302-2', 3, 302, 'Hoeveel extra componenten gaat het om?', 'How many extra componenten gaat het om?', 'radio', false, 'q-alarmsystemen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-2-12', 'q-alarmsystemen-302-2', '12', '1–2', '1–2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-2-35', 'q-alarmsystemen-302-2', '35', '3–5', '3–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-302-2-meer_dan_5', 'q-alarmsystemen-302-2', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-303-1', 3, 303, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-alarmsystemen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-1-verouderd', 'q-alarmsystemen-303-1', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-1-defect', 'q-alarmsystemen-303-1', 'defect', 'Defect', 'Defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-1-betere_beveiliging_gewenst', 'q-alarmsystemen-303-1', 'betere_beveiliging_gewenst', 'Betere beveiliging gewenst', 'Betere beveiliging gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-303-2', 3, 303, 'Wat voor nieuw systeem wil je?', 'What kind of nieuw systeem wil je?', 'radio', false, 'q-alarmsystemen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-2-draadloos', 'q-alarmsystemen-303-2', 'draadloos', 'Draadloos', 'Draadloos', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-2-bekabeld', 'q-alarmsystemen-303-2', 'bekabeld', 'Bekabeld', 'Bekabeld', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-2-combinatie', 'q-alarmsystemen-303-2', 'combinatie', 'Combinatie', 'Combinatie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-2-weet_ik_nog_niet', 'q-alarmsystemen-303-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-303-3', 3, 303, 'Moet het oude systeem verwijderd worden?', 'Should the old systeem verwijderd worden?', 'radio', false, 'q-alarmsystemen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-3-ja', 'q-alarmsystemen-303-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-303-3-nee', 'q-alarmsystemen-303-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-304-1', 3, 304, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-alarmsystemen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-1-alarm_gaat_onnodig_af', 'q-alarmsystemen-304-1', 'alarm_gaat_onnodig_af', 'Alarm gaat onnodig af', 'Alarm gaat onnodig af', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-1-sensor_werkt_niet', 'q-alarmsystemen-304-1', 'sensor_werkt_niet', 'Sensor werkt niet', 'Sensor werkt niet', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-1-bediening_defect', 'q-alarmsystemen-304-1', 'bediening_defect', 'Bediening defect', 'Bediening defect', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-1-anders', 'q-alarmsystemen-304-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-alarmsystemen-304-2', 3, 304, 'Hoe oud is het systeem ongeveer?', 'Hoe oud is het systeem approximately?', 'radio', false, 'q-alarmsystemen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-2-05_jaar', 'q-alarmsystemen-304-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-2-510_jaar', 'q-alarmsystemen-304-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-2-1015_jaar', 'q-alarmsystemen-304-2', '1015_jaar', '10–15 jaar', '10–15 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-alarmsystemen-304-2-ouder_dan_15_jaar', 'q-alarmsystemen-304-2', 'ouder_dan_15_jaar', 'Ouder dan 15 jaar', 'Oldr dan 15 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Alarmsystemen (ID: 4)
-- ===============================================

-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-root', 4, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuwe kantoorapparatuur installeren (ID: 401)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-401-1', 4, 401, 'Wat voor apparatuur wil je installeren?', 'What equipment do you want to install?', 'radio', false, 'q-it-apparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-1-printers_copiers', 'q-it-apparatuur-401-1', 'printers_copiers', 'Printers / copiers', 'Printers / copiers', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-1-computers_laptops', 'q-it-apparatuur-401-1', 'computers_laptops', 'Computers / laptops', 'Computers / laptops', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-1-telefooncentrale_voip', 'q-it-apparatuur-401-1', 'telefooncentrale_voip', 'Telefooncentrale / VOIP', 'Telephone exchange / VOIP', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-1-servers_netwerkapparatuur', 'q-it-apparatuur-401-1', 'servers_netwerkapparatuur', 'Servers / netwerkapparatuur', 'Servers / network equipment', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-1-anders', 'q-it-apparatuur-401-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-401-2', 4, 401, 'Voor hoeveel werkplekken?', 'For how many workstations?', 'radio', false, 'q-it-apparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-2-1_5', 'q-it-apparatuur-401-2', '1_5', '1–5', '1-5', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-2-6_20', 'q-it-apparatuur-401-2', '6_20', '6–20', '6-20', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-2-21_50', 'q-it-apparatuur-401-2', '21_50', '21–50', '21-50', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-2-meer_dan_50', 'q-it-apparatuur-401-2', 'meer_dan_50', 'Meer dan 50', 'More than 50', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-401-3', 4, 401, 'Moet ook software/configuratie worden uitgevoerd?', 'Should software/configuration also be performed?', 'radio', false, 'q-it-apparatuur-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-3-ja', 'q-it-apparatuur-401-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-401-3-nee', 'q-it-apparatuur-401-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Kantoorapparatuur vervangen (ID: 402)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-402-1', 4, 402, 'Welke apparatuur wil je vervangen?', 'Which equipment do you want to replace?', 'radio', false, 'q-it-apparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-1-printers', 'q-it-apparatuur-402-1', 'printers', 'Printers', 'Printers', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-1-computers_laptops', 'q-it-apparatuur-402-1', 'computers_laptops', 'Computers/laptops', 'Computers/laptops', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-1-telefooncentrale', 'q-it-apparatuur-402-1', 'telefooncentrale', 'Telefooncentrale', 'Telephone exchange', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-1-servers_netwerk', 'q-it-apparatuur-402-1', 'servers_netwerk', 'Servers/netwerk', 'Servers/network', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-1-anders', 'q-it-apparatuur-402-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-402-2', 4, 402, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-it-apparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-2-defect', 'q-it-apparatuur-402-2', 'defect', 'Defect', 'Defective', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-2-verouderd', 'q-it-apparatuur-402-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-2-upgraden_naar_beter_model', 'q-it-apparatuur-402-2', 'upgraden_naar_beter_model', 'Upgraden naar beter model', 'Upgrade to better model', false, 3, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-402-3', 4, 402, 'Moet oude apparatuur afgevoerd worden?', 'Should old equipment be removed?', 'radio', false, 'q-it-apparatuur-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-3-ja', 'q-it-apparatuur-402-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-402-3-nee', 'q-it-apparatuur-402-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Kantoorapparatuur repareren (ID: 403)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-403-1', 4, 403, 'Om wat voor apparaat gaat het?', 'What kind of device is it?', 'radio', false, 'q-it-apparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-1-printer', 'q-it-apparatuur-403-1', 'printer', 'Printer', 'Printer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-1-computer_laptop', 'q-it-apparatuur-403-1', 'computer_laptop', 'Computer/laptop', 'Computer/laptop', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-1-telefooncentrale', 'q-it-apparatuur-403-1', 'telefooncentrale', 'Telefooncentrale', 'Telephone exchange', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-1-server', 'q-it-apparatuur-403-1', 'server', 'Server', 'Server', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-1-anders', 'q-it-apparatuur-403-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-403-2', 4, 403, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-it-apparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-2-start_niet_op_defect', 'q-it-apparatuur-403-2', 'start_niet_op_defect', 'Start niet op / defect', 'Does not start / defective', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-2-netwerkprobleem', 'q-it-apparatuur-403-2', 'netwerkprobleem', 'Netwerkprobleem', 'Network problem', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-2-hardware_kapot', 'q-it-apparatuur-403-2', 'hardware_kapot', 'Hardware kapot', 'Hardware broken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-2-softwarefout', 'q-it-apparatuur-403-2', 'softwarefout', 'Softwarefout', 'Software error', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-403-2-anders', 'q-it-apparatuur-403-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- ===============================================
-- Subcategory: Onderhoud contract (ID: 404)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-404-1', 4, 404, 'Voor welke apparaten zoek je onderhoud?', 'For which devices are you looking for maintenance?', 'radio', false, 'q-it-apparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-1-printers', 'q-it-apparatuur-404-1', 'printers', 'Printers', 'Printers', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-1-computers_laptops', 'q-it-apparatuur-404-1', 'computers_laptops', 'Computers/laptops', 'Computers/laptops', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-1-servers_netwerk', 'q-it-apparatuur-404-1', 'servers_netwerk', 'Servers/netwerk', 'Servers/network', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-1-alles_in_een_pakket', 'q-it-apparatuur-404-1', 'alles_in_een_pakket', 'Alles-in-één pakket', 'All-in-one package', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-it-apparatuur-404-2', 4, 404, 'Hoe vaak wil je onderhoud?', 'How often do you want maintenance?', 'radio', false, 'q-it-apparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-2-maandelijks', 'q-it-apparatuur-404-2', 'maandelijks', 'Maandelijks', 'Monthly', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-2-per_kwartaal', 'q-it-apparatuur-404-2', 'per_kwartaal', 'Per kwartaal', 'Quarterly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-it-apparatuur-404-2-jaarlijks', 'q-it-apparatuur-404-2', 'jaarlijks', 'Jaarlijks', 'Yearly', false, 3, true, NULL);


-- ===============================================
-- Category: Architect (ID: 5)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-root', 5, NULL, 'Wat voor opdracht zoek je?', 'What kind of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-501-1', 5, 501, 'Heb je al bouwgrond?', 'Do you have al bouwgrond?', 'radio', false, 'q-architect-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-1-ja', 'q-architect-501-1', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-1-nee', 'q-architect-501-1', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-501-2', 5, 501, 'In welke fase zit je?', 'In welke fase zit je?', 'radio', false, 'q-architect-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-2-orintatie_ideen_verzamelen', 'q-architect-501-2', 'orintatie_ideen_verzamelen', 'Oriëntatie (ideeën verzamelen)', 'Oriëntatie (ideeën verzamelen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-2-ontwerpfase', 'q-architect-501-2', 'ontwerpfase', 'Ontwerpfase', 'Designfase', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-2-definitief_plan__vergunning', 'q-architect-501-2', 'definitief_plan__vergunning', 'Definitief plan & vergunning', 'Definitief plan & vergunning', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-501-3', 5, 501, 'Wat voor type woning wil je bouwen?', 'What type of woning wil je bouwen?', 'radio', false, 'q-architect-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-3-eengezinswoning', 'q-architect-501-3', 'eengezinswoning', 'Eengezinswoning', 'Eengezinswoning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-3-appartement', 'q-architect-501-3', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-3-villa', 'q-architect-501-3', 'villa', 'Villa', 'Villa', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-501-3-anders', 'q-architect-501-3', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-502-1', 5, 502, 'Om wat voor verbouwing gaat het?', 'Om wat voor verbouwing gaat het?', 'radio', false, 'q-architect-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-1-keuken_badkamer', 'q-architect-502-1', 'keuken_badkamer', 'Keuken/badkamer', 'Keuken/badkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-1-extra_kamer', 'q-architect-502-1', 'extra_kamer', 'Extra kamer', 'Extra kamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-1-dakkapel_zolder', 'q-architect-502-1', 'dakkapel_zolder', 'Dakkapel/zolder', 'Dakkapel/zolder', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-1-gehele_woning', 'q-architect-502-1', 'gehele_woning', 'Gehele woning', 'Gehele woning', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-502-2', 5, 502, 'Heb je al bestaande plannen/tekeningen?', 'Do you have al bestaande plannen/tekeningen?', 'radio', false, 'q-architect-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-2-ja', 'q-architect-502-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-2-nee', 'q-architect-502-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-502-3', 5, 502, 'Moet de architect ook de bouwaanvraag/vergunning regelen?', 'Should the architect ook de bouwaanvraag/vergunning regelen?', 'radio', false, 'q-architect-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-3-ja', 'q-architect-502-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-3-nee', 'q-architect-502-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-502-3-weet_ik_nog_niet', 'q-architect-502-3', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-503-1', 5, 503, 'Wat wil je realiseren?', 'What do you want realiseren?', 'radio', false, 'q-architect-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-1-uitbouw_woonkamer', 'q-architect-503-1', 'uitbouw_woonkamer', 'Uitbouw woonkamer', 'Uitbouw woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-1-serre_veranda', 'q-architect-503-1', 'serre_veranda', 'Serre/veranda', 'Serre/veranda', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-1-garage_carport', 'q-architect-503-1', 'garage_carport', 'Garage/carport', 'Garage/carport', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-1-anders', 'q-architect-503-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-503-2', 5, 503, 'Heb je een vergunning nodig of al aangevraagd?', 'Do you have een vergunning nodig of al aangevraagd?', 'radio', false, 'q-architect-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-2-ja', 'q-architect-503-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-2-nee', 'q-architect-503-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-2-weet_ik_niet', 'q-architect-503-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-503-3', 5, 503, 'Moet de architect ook het bouwtoezicht doen?', 'Should the architect ook het bouwtoezicht doen?', 'radio', false, 'q-architect-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-3-ja', 'q-architect-503-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-503-3-nee', 'q-architect-503-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-504-1', 5, 504, 'Om welke ruimtes gaat het?', 'Om welke ruimtes gaat het?', 'radio', false, 'q-architect-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-1-woonkamer', 'q-architect-504-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-1-keuken', 'q-architect-504-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-1-badkamer', 'q-architect-504-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-1-slaapkamers', 'q-architect-504-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-1-meerdere_ruimtes', 'q-architect-504-1', 'meerdere_ruimtes', 'Meerdere ruimtes', 'Meerdere ruimtes', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-504-2', 5, 504, 'Wat is je doel?', 'Wat is je doel?', 'radio', false, 'q-architect-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-2-indeling_veranderen', 'q-architect-504-2', 'indeling_veranderen', 'Indeling veranderen', 'Indeling veranderen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-2-stijl__sfeer_bepalen', 'q-architect-504-2', 'stijl__sfeer_bepalen', 'Stijl & sfeer bepalen', 'Stijl & sfeer bepalen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-2-maatwerk_meubels', 'q-architect-504-2', 'maatwerk_meubels', 'Maatwerk meubels', 'Maatwerk meubels', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-504-2-complete_makeover', 'q-architect-504-2', 'complete_makeover', 'Complete make-over', 'Complete make-over', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-505-1', 5, 505, 'Waar heb je hulp bij nodig?', 'Waar heb je hulp bij nodig?', 'radio', false, 'q-architect-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-1-omgevingsvergunning', 'q-architect-505-1', 'omgevingsvergunning', 'Omgevingsvergunning', 'Omgevingsvergunning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-1-bouwtechnisch_advies', 'q-architect-505-1', 'bouwtechnisch_advies', 'Bouwtechnisch advies', 'Bouwtechnisch advies', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-1-energieprestatie___duurzaamheid', 'q-architect-505-1', 'energieprestatie___duurzaamheid', 'Energieprestatie / duurzaamheid', 'Energieprestatie / duurzaamheid', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-1-ander_advies', 'q-architect-505-1', 'ander_advies', 'Ander advies', 'Ander advies', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-architect-505-2', 5, 505, 'In welke fase zit je?', 'In welke fase zit je?', 'radio', false, 'q-architect-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-2-orintatie', 'q-architect-505-2', 'orintatie', 'Oriëntatie', 'Oriëntatie', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-2-plannen_uitgewerkt', 'q-architect-505-2', 'plannen_uitgewerkt', 'Plannen uitgewerkt', 'Plannen uitgewerkt', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-architect-505-2-bouw_al_gestart', 'q-architect-505-2', 'bouw_al_gestart', 'Bouw al gestart', 'Bouw al gestart', false, 3, true, NULL);


-- ===============================================
-- Category: Asbest (ID: 6)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-root', 6, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-601-1', 6, 601, 'Waar moet het onderzoek plaatsvinden?', 'Where should het onderzoek plaatsvinden?', 'radio', false, 'q-asbest-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-1-woning', 'q-asbest-601-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-1-schuur_garage', 'q-asbest-601-1', 'schuur_garage', 'Schuur/garage', 'Schuur/garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-1-bedrijfspand', 'q-asbest-601-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-1-anders', 'q-asbest-601-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-601-2', 6, 601, 'Voor welk doel is het onderzoek nodig?', 'Voor welk doel is het onderzoek nodig?', 'radio', false, 'q-asbest-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-2-verkoop_woning', 'q-asbest-601-2', 'verkoop_woning', 'Verkoop woning', 'Verkoop woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-2-renovatie', 'q-asbest-601-2', 'renovatie', 'Renovatie', 'Renovatie', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-2-sloop', 'q-asbest-601-2', 'sloop', 'Sloop', 'Sloop', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-601-2-weet_ik_nog_niet', 'q-asbest-601-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-602-1', 6, 602, 'Waar zit het asbest?', 'Waar zit het asbest?', 'radio', false, 'q-asbest-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-1-dakplaten', 'q-asbest-602-1', 'dakplaten', 'Dakplaten', 'Dakphave', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-1-gevel', 'q-asbest-602-1', 'gevel', 'Gevel', 'Gevel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-1-vloer', 'q-asbest-602-1', 'vloer', 'Vloer', 'Vloer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-1-leidingen', 'q-asbest-602-1', 'leidingen', 'Leidingen', 'Leidingen', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-1-anders', 'q-asbest-602-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-602-2', 6, 602, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-asbest-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-2-klein_tot_10_m', 'q-asbest-602-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-2-middel_1050_m', 'q-asbest-602-2', 'middel_1050_m', 'Middel (10–50 m²)', 'Medium (10-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-2-groot_50100_m', 'q-asbest-602-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-2-zeer_groot_100_m', 'q-asbest-602-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-602-3', 6, 602, 'Moet er een asbestinventarisatie vooraf gebeuren?', 'Should een asbestinventarisatie vooraf gebeuren?', 'radio', false, 'q-asbest-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-3-ja', 'q-asbest-602-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-3-nee', 'q-asbest-602-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-602-3-weet_ik_niet', 'q-asbest-602-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-603-1', 6, 603, 'Wat voor type dak gaat het om?', 'What type of dak gaat het om?', 'radio', false, 'q-asbest-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-1-schuur_garage', 'q-asbest-603-1', 'schuur_garage', 'Schuur/garage', 'Schuur/garage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-1-woning', 'q-asbest-603-1', 'woning', 'Woning', 'Woning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-1-bedrijfspand', 'q-asbest-603-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-603-2', 6, 603, 'Hoe groot is het dakoppervlak ongeveer?', 'How large is het dakoppervlak approximately?', 'radio', false, 'q-asbest-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-2-klein_tot_20_m', 'q-asbest-603-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-2-middel_2050_m', 'q-asbest-603-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-2-groot_50100_m', 'q-asbest-603-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-2-zeer_groot_100_m', 'q-asbest-603-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-asbest-603-3', 6, 603, 'Wil je meteen nieuwe dakbedekking laten plaatsen?', 'Wil je meteen nieuwe dakbedekking have install?', 'radio', false, 'q-asbest-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-3-ja', 'q-asbest-603-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-asbest-603-3-nee', 'q-asbest-603-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Bestrating (ID: 7)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-root', 7, NULL, 'Wat voor type bestrating zoek je?', 'What type of paving are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-701-1', 7, 701, 'Waar moet de bestrating komen?', 'Where should de paving komen?', 'radio', false, 'q-bestrating-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-1-oprit', 'q-bestrating-701-1', 'oprit', 'Oprit', 'Driveway', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-1-terras', 'q-bestrating-701-1', 'terras', 'Terras', 'Patio', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-1-tuinpad', 'q-bestrating-701-1', 'tuinpad', 'Tuinpad', 'Gardenpad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-1-anders', 'q-bestrating-701-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-701-2', 7, 701, 'Welke soort bestrating wil je?', 'Which soort paving wil je?', 'radio', false, 'q-bestrating-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-2-betonstenen', 'q-bestrating-701-2', 'betonstenen', 'Betonstenen', 'Concrete pavers', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-2-natuursteen', 'q-bestrating-701-2', 'natuursteen', 'Natuursteen', 'Natural stone', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-2-klinkers', 'q-bestrating-701-2', 'klinkers', 'Klinkers', 'Klinkers', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-2-tegels_groot_formaat', 'q-bestrating-701-2', 'tegels_groot_formaat', 'Tegels (groot formaat)', 'Tegels (groot formaat)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-2-anders', 'q-bestrating-701-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-701-3', 7, 701, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-bestrating-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-3-klein_tot_20_m', 'q-bestrating-701-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-3-middel_2050_m', 'q-bestrating-701-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-3-groot_50100_m', 'q-bestrating-701-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-701-3-zeer_groot_100_m', 'q-bestrating-701-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-702-1', 7, 702, 'Waarom wil je de bestrating vervangen?', 'Why do you want to de paving replace?', 'radio', false, 'q-bestrating-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-1-verouderd___beschadigd', 'q-bestrating-702-1', 'verouderd___beschadigd', 'Verouderd / beschadigd', 'Outdated / beschadigd', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-1-andere_stijl_gewenst', 'q-bestrating-702-1', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-1-slechte_waterafvoer', 'q-bestrating-702-1', 'slechte_waterafvoer', 'Slechte waterafvoer', 'Slechte waterafvoer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-1-anders', 'q-bestrating-702-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-702-2', 7, 702, 'Moet de oude bestrating ook verwijderd worden?', 'Should the old paving ook verwijderd worden?', 'radio', false, 'q-bestrating-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-2-ja', 'q-bestrating-702-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-2-nee', 'q-bestrating-702-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-702-3', 7, 702, 'Welke nieuwe bestrating wil je?', 'Which nieuwe paving wil je?', 'radio', false, 'q-bestrating-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-3-betonstenen', 'q-bestrating-702-3', 'betonstenen', 'Betonstenen', 'Concrete pavers', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-3-natuursteen', 'q-bestrating-702-3', 'natuursteen', 'Natuursteen', 'Natural stone', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-3-klinkers', 'q-bestrating-702-3', 'klinkers', 'Klinkers', 'Klinkers', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-3-tegels', 'q-bestrating-702-3', 'tegels', 'Tegels', 'Tegels', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-702-3-anders', 'q-bestrating-702-3', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-703-1', 7, 703, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-bestrating-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-1-verzakte_bestrating', 'q-bestrating-703-1', 'verzakte_bestrating', 'Verzakte bestrating', 'Verzakte paving', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-1-kapotte_tegels_stukken', 'q-bestrating-703-1', 'kapotte_tegels_stukken', 'Kapotte tegels/stukken', 'Kapotte tegels/stukken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-1-onkruid_tussen_voegen', 'q-bestrating-703-1', 'onkruid_tussen_voegen', 'Onkruid tussen voegen', 'Weeds tussen voegen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-1-anders', 'q-bestrating-703-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-bestrating-703-2', 7, 703, 'Hoe groot is het oppervlak dat moet worden aangepakt?', 'How large is het oppervlak dat moet worden aangepakt?', 'radio', false, 'q-bestrating-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-2-klein_tot_10_m', 'q-bestrating-703-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-2-middel_1030_m', 'q-bestrating-703-2', 'middel_1030_m', 'Middel (10–30 m²)', 'Medium (10-30 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-2-groot_3060_m', 'q-bestrating-703-2', 'groot_3060_m', 'Groot (30–60 m²)', 'Large (30-60 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-bestrating-703-2-zeer_groot_60_m', 'q-bestrating-703-2', 'zeer_groot_60_m', 'Zeer groot (60+ m²)', 'Very large (60+ m²)', false, 4, true, NULL);




-- ===============================================
-- Category: Betonwerken (ID: 8)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-root', 8, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-801-1', 8, 801, 'Voor welk project wil je een fundering laten maken?', 'Voor welk project wil je een fundering have maken?', 'radio', false, 'q-betonwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-1-woning', 'q-betonwerken-801-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-1-garage', 'q-betonwerken-801-1', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-1-tuinhuis', 'q-betonwerken-801-1', 'tuinhuis', 'Tuinhuis', 'Gardenhuis', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-1-anders', 'q-betonwerken-801-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-801-2', 8, 801, 'Hoe groot is de fundering ongeveer?', 'How large is de fundering approximately?', 'radio', false, 'q-betonwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-2-klein_tot_20_m', 'q-betonwerken-801-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-2-middel_2050_m', 'q-betonwerken-801-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-2-groot_50100_m', 'q-betonwerken-801-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-2-zeer_groot_100_m', 'q-betonwerken-801-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-801-3', 8, 801, 'Moet er ook wapening worden geplaatst?', 'Should ook wapening worden geplaatst?', 'radio', false, 'q-betonwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-3-ja', 'q-betonwerken-801-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-801-3-nee', 'q-betonwerken-801-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-802-1', 8, 802, 'Wat voor vloer moet er komen?', 'What kind of vloer moet er komen?', 'radio', false, 'q-betonwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-1-betonvloer', 'q-betonwerken-802-1', 'betonvloer', 'Betonvloer', 'Betonvloer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-1-dekvloer___chape', 'q-betonwerken-802-1', 'dekvloer___chape', 'Dekvloer / chape', 'Dekvloer / chape', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-1-gevlinderde_vloer', 'q-betonwerken-802-1', 'gevlinderde_vloer', 'Gevlinderde vloer', 'Gevlinderde vloer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-1-gepolierde_vloer', 'q-betonwerken-802-1', 'gepolierde_vloer', 'Gepolierde vloer', 'Gepolierde vloer', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-802-2', 8, 802, 'Waar moet de vloer geplaatst worden?', 'Where should de vloer geplaatst worden?', 'radio', false, 'q-betonwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-2-woning', 'q-betonwerken-802-2', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-2-garage', 'q-betonwerken-802-2', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-2-bedrijfshal', 'q-betonwerken-802-2', 'bedrijfshal', 'Bedrijfshal', 'Bedrijfshal', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-2-anders', 'q-betonwerken-802-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-802-3', 8, 802, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-betonwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-3-klein_tot_20_m', 'q-betonwerken-802-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-3-middel_2050_m', 'q-betonwerken-802-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-3-groot_50200_m', 'q-betonwerken-802-3', 'groot_50200_m', 'Groot (50–200 m²)', 'Large (50-200 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-802-3-zeer_groot_200_m', 'q-betonwerken-802-3', 'zeer_groot_200_m', 'Zeer groot (200+ m²)', 'Very large (200+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-803-1', 8, 803, 'Wat voor constructie gaat het om?', 'What kind of constructie gaat het om?', 'radio', false, 'q-betonwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-1-muur', 'q-betonwerken-803-1', 'muur', 'Muur', 'Muur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-1-trap', 'q-betonwerken-803-1', 'trap', 'Trap', 'Trap', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-1-balkon', 'q-betonwerken-803-1', 'balkon', 'Balkon', 'Balkon', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-1-anders', 'q-betonwerken-803-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-803-2', 8, 803, 'Hoe groot moet de constructie zijn?', 'How large moet de constructie zijn?', 'radio', false, 'q-betonwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-2-klein', 'q-betonwerken-803-2', 'klein', 'Klein', 'Small', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-2-middel', 'q-betonwerken-803-2', 'middel', 'Middel', 'Medium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-803-2-groot', 'q-betonwerken-803-2', 'groot', 'Groot', 'Large', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-804-1', 8, 804, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-betonwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-1-scheuren', 'q-betonwerken-804-1', 'scheuren', 'Scheuren', 'Scheuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-1-afbrokkelend_beton', 'q-betonwerken-804-1', 'afbrokkelend_beton', 'Afbrokkelend beton', 'Afbrokkelend beton', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-1-wapening_zichtbaar', 'q-betonwerken-804-1', 'wapening_zichtbaar', 'Wapening zichtbaar', 'Wapening zichtbaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-1-anders', 'q-betonwerken-804-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-betonwerken-804-2', 8, 804, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-betonwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-2-klein_enkele_plekken', 'q-betonwerken-804-2', 'klein_enkele_plekken', 'Klein (enkele plekken)', 'Small (enkele plekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-2-middel_deel_van_constructie', 'q-betonwerken-804-2', 'middel_deel_van_constructie', 'Middel (deel van constructie)', 'Medium (deel van constructie)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-betonwerken-804-2-groot_hele_constructie', 'q-betonwerken-804-2', 'groot_hele_constructie', 'Groot (hele constructie)', 'Large (hele constructie)', false, 3, true, NULL);


-- ===============================================
-- Category: Carport (ID: 9)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-root', 9, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-901-1', 9, 901, 'Wat voor type carport wil je?', 'What type of carport wil je?', 'radio', false, 'q-carport-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-1-vrijstaand', 'q-carport-901-1', 'vrijstaand', 'Vrijstaand', 'Vrijstaand', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-1-aan_huis_bevestigd', 'q-carport-901-1', 'aan_huis_bevestigd', 'Aan huis bevestigd', 'Aan huis bevestigd', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-1-dubbele_carport', 'q-carport-901-1', 'dubbele_carport', 'Dubbele carport', 'Dubbele carport', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-1-anders', 'q-carport-901-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-901-2', 9, 901, 'Van welk materiaal moet de carport zijn?', 'Van welk materiaal moet de carport zijn?', 'radio', false, 'q-carport-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-2-hout', 'q-carport-901-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-2-aluminium', 'q-carport-901-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-2-staal', 'q-carport-901-2', 'staal', 'Staal', 'Staal', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-2-anders', 'q-carport-901-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-901-3', 9, 901, 'Moet de carport een dakbedekking hebben?', 'Should the carport een dakbedekking hebben?', 'radio', false, 'q-carport-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-3-polycarbonaat', 'q-carport-901-3', 'polycarbonaat', 'Polycarbonaat', 'Polycarbonaat', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-3-dakpannen', 'q-carport-901-3', 'dakpannen', 'Dakpannen', 'Dakpannen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-3-plat_dak_epdm_bitumen_etc', 'q-carport-901-3', 'plat_dak_epdm_bitumen_etc', 'Plat dak (EPDM, bitumen, etc.)', 'Plat dak (EPDM, bitumen, etc.)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-901-3-geen_voorkeur', 'q-carport-901-3', 'geen_voorkeur', 'Geen voorkeur', 'Geen voorkeur', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-902-1', 9, 902, 'Waarom wil je de carport vervangen?', 'Why do you want to de carport replace?', 'radio', false, 'q-carport-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-1-beschadigd', 'q-carport-902-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-1-verouderd', 'q-carport-902-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-1-andere_stijl_gewenst', 'q-carport-902-1', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-1-anders', 'q-carport-902-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-902-2', 9, 902, 'Wat voor nieuwe carport wil je?', 'What kind of nieuwe carport wil je?', 'radio', false, 'q-carport-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-2-vrijstaand', 'q-carport-902-2', 'vrijstaand', 'Vrijstaand', 'Vrijstaand', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-2-aan_huis_bevestigd', 'q-carport-902-2', 'aan_huis_bevestigd', 'Aan huis bevestigd', 'Aan huis bevestigd', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-2-dubbele_carport', 'q-carport-902-2', 'dubbele_carport', 'Dubbele carport', 'Dubbele carport', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-2-anders', 'q-carport-902-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-902-3', 9, 902, 'Moet de oude carport verwijderd worden?', 'Should the old carport verwijderd worden?', 'radio', false, 'q-carport-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-3-ja', 'q-carport-902-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-902-3-nee', 'q-carport-902-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-903-1', 9, 903, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-carport-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-1-dak_beschadigd', 'q-carport-903-1', 'dak_beschadigd', 'Dak beschadigd', 'Dak beschadigd', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-1-constructie_instabiel', 'q-carport-903-1', 'constructie_instabiel', 'Constructie instabiel', 'Constructie instabiel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-1-roest___houtrot', 'q-carport-903-1', 'roest___houtrot', 'Roest / houtrot', 'Roest / houtrot', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-1-anders', 'q-carport-903-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-carport-903-2', 9, 903, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-carport-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-2-klein_enkele_onderdelen', 'q-carport-903-2', 'klein_enkele_onderdelen', 'Klein (enkele onderdelen)', 'Small (enkele onderdelen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-2-middel_deel_van_de_carport', 'q-carport-903-2', 'middel_deel_van_de_carport', 'Middel (deel van de carport)', 'Medium (deel van de carport)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-carport-903-2-groot_bijna_volledig', 'q-carport-903-2', 'groot_bijna_volledig', 'Groot (bijna volledig)', 'Large (bijna volledig)', false, 3, true, NULL);


-- ===============================================
-- Category: Centrale verwarming (ID: 10)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-root', 10, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1001-1', 10, 1001, 'Wat voor type installatie wil je?', 'What type of installatie wil je?', 'radio', false, 'q-centrale-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-1-traditionele_cvketel_gas', 'q-centrale-verwarming-1001-1', 'traditionele_cvketel_gas', 'Traditionele cv-ketel (gas)', 'Traditionele cv-ketel (gas)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-1-hybride_installatie_cv__warmtepomp', 'q-centrale-verwarming-1001-1', 'hybride_installatie_cv__warmtepomp', 'Hybride installatie (cv \+ warmtepomp)', 'Hybride installatie (cv \+ warmtepomp)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-1-volledig_elektrisch', 'q-centrale-verwarming-1001-1', 'volledig_elektrisch', 'Volledig elektrisch', 'Volledig elektrisch', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1001-2', 10, 1001, 'Voor wat voor woning?', 'Voor wat voor woning?', 'radio', false, 'q-centrale-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-2-appartement', 'q-centrale-verwarming-1001-2', 'appartement', 'Appartement', 'Appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-2-rijtjeshuis', 'q-centrale-verwarming-1001-2', 'rijtjeshuis', 'Rijtjeshuis', 'Rijtjeshuis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-2-tweeondereenkap', 'q-centrale-verwarming-1001-2', 'tweeondereenkap', 'Twee-onder-een-kap', 'Twee-onder-een-kap', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-2-vrijstaande_woning', 'q-centrale-verwarming-1001-2', 'vrijstaande_woning', 'Vrijstaande woning', 'Vrijstaande woning', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1001-3', 10, 1001, 'Moet de vakman ook radiatoren of vloerverwarming aansluiten?', 'Should the vakman ook radiatoren of vloerverwarming aansluiten?', 'radio', false, 'q-centrale-verwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-3-ja', 'q-centrale-verwarming-1001-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1001-3-nee', 'q-centrale-verwarming-1001-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1002-1', 10, 1002, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-centrale-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-1-alleen_cvketel', 'q-centrale-verwarming-1002-1', 'alleen_cvketel', 'Alleen cv-ketel', 'Alleen cv-ketel', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-1-ketel__radiatoren', 'q-centrale-verwarming-1002-1', 'ketel__radiatoren', 'Ketel \+ radiatoren', 'Ketel \+ radiatoren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-1-ketel__vloerverwarming', 'q-centrale-verwarming-1002-1', 'ketel__vloerverwarming', 'Ketel \+ vloerverwarming', 'Ketel \+ vloerverwarming', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1002-2', 10, 1002, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-centrale-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-2-verouderd', 'q-centrale-verwarming-1002-2', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-2-defect', 'q-centrale-verwarming-1002-2', 'defect', 'Defect', 'Defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-2-energiezuiniger_alternatief', 'q-centrale-verwarming-1002-2', 'energiezuiniger_alternatief', 'Energiezuiniger alternatief', 'Energiezuiniger alternatief', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1002-3', 10, 1002, 'Moet de oude installatie verwijderd worden?', 'Should the old installatie verwijderd worden?', 'radio', false, 'q-centrale-verwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-3-ja', 'q-centrale-verwarming-1002-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1002-3-nee', 'q-centrale-verwarming-1002-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1003-1', 10, 1003, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-centrale-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-1-ketel_start_niet', 'q-centrale-verwarming-1003-1', 'ketel_start_niet', 'Ketel start niet', 'Ketel start niet', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-1-geen_warm_water', 'q-centrale-verwarming-1003-1', 'geen_warm_water', 'Geen warm water', 'Geen warm water', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-1-lekkage', 'q-centrale-verwarming-1003-1', 'lekkage', 'Lekkage', 'Lekkage', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-1-raar_geluid', 'q-centrale-verwarming-1003-1', 'raar_geluid', 'Raar geluid', 'Raar geluid', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-1-storing___foutcode', 'q-centrale-verwarming-1003-1', 'storing___foutcode', 'Storing / foutcode', 'Storing / foutcode', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1003-2', 10, 1003, 'Hoe oud is de ketel ongeveer?', 'Hoe oud is de ketel approximately?', 'radio', false, 'q-centrale-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-2-05_jaar', 'q-centrale-verwarming-1003-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-2-510_jaar', 'q-centrale-verwarming-1003-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-2-1015_jaar', 'q-centrale-verwarming-1003-2', '1015_jaar', '10–15 jaar', '10–15 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1003-2-ouder_dan_15_jaar', 'q-centrale-verwarming-1003-2', 'ouder_dan_15_jaar', 'Ouder dan 15 jaar', 'Oldr dan 15 jaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1004-1', 10, 1004, 'Wat voor onderhoud wil je?', 'What kind of onderhoud wil je?', 'radio', false, 'q-centrale-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-1-kleine_onderhoudsbeurt', 'q-centrale-verwarming-1004-1', 'kleine_onderhoudsbeurt', 'Kleine onderhoudsbeurt', 'Smalle onderhoudsbeurt', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-1-grote_onderhoudsbeurt', 'q-centrale-verwarming-1004-1', 'grote_onderhoudsbeurt', 'Grote onderhoudsbeurt', 'Grote onderhoudsbeurt', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-1-jaarlijks_onderhoudscontract', 'q-centrale-verwarming-1004-1', 'jaarlijks_onderhoudscontract', 'Jaarlijks onderhoudscontract', 'Yesarlijks onderhoudscontract', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-centrale-verwarming-1004-2', 10, 1004, 'Hoe oud is de installatie?', 'Hoe oud is de installatie?', 'radio', false, 'q-centrale-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-2-05_jaar', 'q-centrale-verwarming-1004-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-2-510_jaar', 'q-centrale-verwarming-1004-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-2-1015_jaar', 'q-centrale-verwarming-1004-2', '1015_jaar', '10–15 jaar', '10–15 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-centrale-verwarming-1004-2-ouder_dan_15_jaar', 'q-centrale-verwarming-1004-2', 'ouder_dan_15_jaar', 'Ouder dan 15 jaar', 'Oldr dan 15 jaar', false, 4, true, NULL);





-- Total Questions: 84
-- Total Options: 267



-- ===============================================
-- Categories 11-20 - AUTO GENERATED
-- ===============================================



-- ===============================================
-- Category: Dakbedekking (ID: 11)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-root', 11, NULL, 'Wat voor type dakwerk zoek je?', 'What type of dakwerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1101-1', 11, 1101, 'Wat voor type dak wil je laten plaatsen?', 'What type of dak wil je have install?', 'radio', false, 'q-dakbedekking-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-1-plat_dak', 'q-dakbedekking-1101-1', 'plat_dak', 'Plat dak', 'Plat dak', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-1-hellend_dak', 'q-dakbedekking-1101-1', 'hellend_dak', 'Hellend dak', 'Hellend dak', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1101-2', 11, 1101, 'Om wat voor gebouw gaat het?', 'Om wat voor gebouw gaat het?', 'radio', false, 'q-dakbedekking-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-2-woning', 'q-dakbedekking-1101-2', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-2-garage', 'q-dakbedekking-1101-2', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-2-schuur', 'q-dakbedekking-1101-2', 'schuur', 'Schuur', 'Schuur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-2-anders', 'q-dakbedekking-1101-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1101-3', 11, 1101, 'Welke dakbedekking wil je?', 'Which dakbedekking wil je?', 'radio', false, 'q-dakbedekking-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-3-bitumen', 'q-dakbedekking-1101-3', 'bitumen', 'Bitumen', 'Bitumen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-3-dakpannen', 'q-dakbedekking-1101-3', 'dakpannen', 'Dakpannen', 'Dakpannen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-3-epdm', 'q-dakbedekking-1101-3', 'epdm', 'EPDM', 'EPDM', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-3-pvc', 'q-dakbedekking-1101-3', 'pvc', 'PVC', 'PVC', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1101-3-anders', 'q-dakbedekking-1101-3', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1102-1', 11, 1102, 'Wat moet er vervangen worden?', 'Wat moet er replace worden?', 'radio', false, 'q-dakbedekking-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-1-alleen_dakbedekking', 'q-dakbedekking-1102-1', 'alleen_dakbedekking', 'Alleen dakbedekking', 'Alleen dakbedekking', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-1-dakconstructie__bedekking', 'q-dakbedekking-1102-1', 'dakconstructie__bedekking', 'Dakconstructie \+ bedekking', 'Dakconstructie \+ bedekking', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1102-2', 11, 1102, 'Om wat voor type dak gaat het?', 'Om wat voor type dak gaat het?', 'radio', false, 'q-dakbedekking-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-2-plat_dak', 'q-dakbedekking-1102-2', 'plat_dak', 'Plat dak', 'Plat dak', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-2-hellend_dak', 'q-dakbedekking-1102-2', 'hellend_dak', 'Hellend dak', 'Hellend dak', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1102-3', 11, 1102, 'Moet oude dakbedekking ook verwijderd worden?', 'Moet old dakbedekking ook verwijderd worden?', 'radio', false, 'q-dakbedekking-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-3-ja', 'q-dakbedekking-1102-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1102-3-nee', 'q-dakbedekking-1102-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1103-1', 11, 1103, 'Wat voor probleem ervaar je?', 'What kind of probleem ervaar je?', 'radio', false, 'q-dakbedekking-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-1-lekkage', 'q-dakbedekking-1103-1', 'lekkage', 'Lekkage', 'Lekkage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-1-beschadigde_dakpannen', 'q-dakbedekking-1103-1', 'beschadigde_dakpannen', 'Beschadigde dakpannen', 'Damagede dakpannen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-1-losse_naden_plat_dak', 'q-dakbedekking-1103-1', 'losse_naden_plat_dak', 'Losse naden (plat dak)', 'Losse naden (plat dak)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-1-anders', 'q-dakbedekking-1103-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1103-2', 11, 1103, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-dakbedekking-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-2-klein_enkele_pannen_plekken', 'q-dakbedekking-1103-2', 'klein_enkele_pannen_plekken', 'Klein (enkele pannen/plekken)', 'Small (enkele pannen/plekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-2-middel_deel_van_het_dak', 'q-dakbedekking-1103-2', 'middel_deel_van_het_dak', 'Middel (deel van het dak)', 'Medium (deel van het dak)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1103-2-groot_hele_dak', 'q-dakbedekking-1103-2', 'groot_hele_dak', 'Groot (hele dak)', 'Large (hele dak)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1104-1', 11, 1104, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-dakbedekking-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-1-nieuwe_dakbedekking', 'q-dakbedekking-1104-1', 'nieuwe_dakbedekking', 'Nieuwe dakbedekking', 'Newe dakbedekking', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-1-reparatie', 'q-dakbedekking-1104-1', 'reparatie', 'Reparatie', 'Reparatie', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-1-isolatie', 'q-dakbedekking-1104-1', 'isolatie', 'Isolatie', 'Isolatie', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1104-2', 11, 1104, 'Welke dakbedekking wil je?', 'Which dakbedekking wil je?', 'radio', false, 'q-dakbedekking-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-2-bitumen', 'q-dakbedekking-1104-2', 'bitumen', 'Bitumen', 'Bitumen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-2-epdm', 'q-dakbedekking-1104-2', 'epdm', 'EPDM', 'EPDM', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-2-pvc', 'q-dakbedekking-1104-2', 'pvc', 'PVC', 'PVC', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1104-2-anders', 'q-dakbedekking-1104-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1105-1', 11, 1105, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-dakbedekking-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-1-nieuwe_dakpannen_plaatsen', 'q-dakbedekking-1105-1', 'nieuwe_dakpannen_plaatsen', 'Nieuwe dakpannen plaatsen', 'Newe dakpannen install', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-1-reparatie___vervangen', 'q-dakbedekking-1105-1', 'reparatie___vervangen', 'Reparatie / vervangen', 'Reparatie / replace', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-1-isolatie', 'q-dakbedekking-1105-1', 'isolatie', 'Isolatie', 'Isolatie', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakbedekking-1105-2', 11, 1105, 'Wat voor soort dakpannen?', 'What kind of soort dakpannen?', 'radio', false, 'q-dakbedekking-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-2-keramische_pannen', 'q-dakbedekking-1105-2', 'keramische_pannen', 'Keramische pannen', 'Keramische pannen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-2-betonpannen', 'q-dakbedekking-1105-2', 'betonpannen', 'Betonpannen', 'Betonpannen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-2-leien', 'q-dakbedekking-1105-2', 'leien', 'Leien', 'Leien', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakbedekking-1105-2-anders', 'q-dakbedekking-1105-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);


-- ===============================================
-- Category: Dakisolatie (ID: 12)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-root', 12, NULL, 'Wat voor type dak wil je isoleren?', 'What type of dak wil je isoleren?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1201-1', 12, 1201, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-dakisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-1-nieuwe_isolatie_plaatsen', 'q-dakisolatie-1201-1', 'nieuwe_isolatie_plaatsen', 'Nieuwe isolatie plaatsen', 'Newe isolatie install', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-1-bestaande_isolatie_verbeteren', 'q-dakisolatie-1201-1', 'bestaande_isolatie_verbeteren', 'Bestaande isolatie verbeteren', 'Existing isolatie verbeteren', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1201-2', 12, 1201, 'Heb je al dakbedekking die behouden moet blijven?', 'Do you have al dakbedekking die beholdn moet blijven?', 'radio', false, 'q-dakisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-2-ja', 'q-dakisolatie-1201-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-2-nee', 'q-dakisolatie-1201-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1201-3', 12, 1201, 'Wat is de dakoppervlakte ongeveer?', 'Wat is de dakoppervlakte approximately?', 'radio', false, 'q-dakisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-3-klein_tot_20_m', 'q-dakisolatie-1201-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-3-middel_2050_m', 'q-dakisolatie-1201-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-3-groot_50100_m', 'q-dakisolatie-1201-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1201-3-zeer_groot_100_m', 'q-dakisolatie-1201-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1202-1', 12, 1202, 'Wat moet er geïsoleerd worden?', 'Wat moet er geïsoleerd worden?', 'radio', false, 'q-dakisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-1-gehele_dak', 'q-dakisolatie-1202-1', 'gehele_dak', 'Gehele dak', 'Gehele dak', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-1-alleen_bepaalde_kamers', 'q-dakisolatie-1202-1', 'alleen_bepaalde_kamers', 'Alleen bepaalde kamers', 'Alleen bepaalde kamers', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1202-2', 12, 1202, 'Wat is de afwerking na isolatie?', 'Wat is de afwerking na isolatie?', 'radio', false, 'q-dakisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-2-afwerken_met_gipsplaten', 'q-dakisolatie-1202-2', 'afwerken_met_gipsplaten', 'Afwerken met gipsplaten', 'Afwerken met gipsphave', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-2-geen_afwerking_nodig', 'q-dakisolatie-1202-2', 'geen_afwerking_nodig', 'Geen afwerking nodig', 'Geen afwerking nodig', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1202-3', 12, 1202, 'Hoe groot is het dakoppervlak ongeveer?', 'How large is het dakoppervlak approximately?', 'radio', false, 'q-dakisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-3-klein_tot_20_m', 'q-dakisolatie-1202-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-3-middel_2050_m', 'q-dakisolatie-1202-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-3-groot_50100_m', 'q-dakisolatie-1202-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1202-3-zeer_groot_100_m', 'q-dakisolatie-1202-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1203-1', 12, 1203, 'Moet de dakbedekking ook vernieuwd worden?', 'Should the dakbedekking ook vernieuwd worden?', 'radio', false, 'q-dakisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-1-ja', 'q-dakisolatie-1203-1', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-1-nee', 'q-dakisolatie-1203-1', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1203-2', 12, 1203, 'Wat voor soort dakbedekking wil je terug?', 'What kind of soort dakbedekking wil je terug?', 'radio', false, 'q-dakisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-2-dakpannen', 'q-dakisolatie-1203-2', 'dakpannen', 'Dakpannen', 'Dakpannen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-2-leien', 'q-dakisolatie-1203-2', 'leien', 'Leien', 'Leien', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-2-anders', 'q-dakisolatie-1203-2', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1203-3', 12, 1203, 'Hoe groot is het dakoppervlak ongeveer?', 'How large is het dakoppervlak approximately?', 'radio', false, 'q-dakisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-3-klein_tot_20_m', 'q-dakisolatie-1203-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-3-middel_2050_m', 'q-dakisolatie-1203-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-3-groot_50100_m', 'q-dakisolatie-1203-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1203-3-zeer_groot_100_m', 'q-dakisolatie-1203-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1204-1', 12, 1204, 'Wil je de zoldervloer afwerken als woonruimte?', 'Wil je de zoldervloer afwerken als woonruimte?', 'radio', false, 'q-dakisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-1-ja', 'q-dakisolatie-1204-1', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-1-nee', 'q-dakisolatie-1204-1', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakisolatie-1204-2', 12, 1204, 'Wat voor isolatiemateriaal heeft je voorkeur?', 'What kind of isolatiemateriaal heeft je voorkeur?', 'radio', false, 'q-dakisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-2-glaswol', 'q-dakisolatie-1204-2', 'glaswol', 'Glaswol', 'Glaswol', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-2-houtvezelplaten', 'q-dakisolatie-1204-2', 'houtvezelplaten', 'Houtvezelplaten', 'Woodvezelphave', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-2-pir_pur', 'q-dakisolatie-1204-2', 'pir_pur', 'PIR/PUR', 'PIR/PUR', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakisolatie-1204-2-geen_voorkeur', 'q-dakisolatie-1204-2', 'geen_voorkeur', 'Geen voorkeur', 'Geen voorkeur', false, 4, true, NULL);


-- ===============================================
-- Category: Dakramen (ID: 13)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-root', 13, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1301-1', 13, 1301, 'Wat voor type dakraam wil je laten plaatsen?', 'What type of dakraam wil je have install?', 'radio', false, 'q-dakramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-1-standaard_dakraam', 'q-dakramen-1301-1', 'standaard_dakraam', 'Standaard dakraam', 'Standaard dakraam', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-1-uitzettuimelraam', 'q-dakramen-1301-1', 'uitzettuimelraam', 'Uitzettuimelraam', 'Uitzettuimelraam', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-1-dakkapel', 'q-dakramen-1301-1', 'dakkapel', 'Dakkapel', 'Dakkapel', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-1-lichtkoepel', 'q-dakramen-1301-1', 'lichtkoepel', 'Lichtkoepel', 'Lichtkoepel', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1301-2', 13, 1301, 'Wat is de afmeting ongeveer?', 'Wat is de afmeting approximately?', 'radio', false, 'q-dakramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-2-klein_tot_70_cm_breed', 'q-dakramen-1301-2', 'klein_tot_70_cm_breed', 'Klein (tot 70 cm breed)', 'Small (tot 70 cm breed)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-2-middel_70120_cm', 'q-dakramen-1301-2', 'middel_70120_cm', 'Middel (70–120 cm)', 'Medium (70–120 cm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-2-groot_120_cm', 'q-dakramen-1301-2', 'groot_120_cm', 'Groot (120+ cm)', 'Large (120+ cm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-2-weet_ik_niet', 'q-dakramen-1301-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1301-3', 13, 1301, 'Moet het dakraam ook voorzien worden van zonwering of rolluik?', 'Should the dakraam ook voorzien worden van zonwering of rolluik?', 'radio', false, 'q-dakramen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-3-ja', 'q-dakramen-1301-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1301-3-nee', 'q-dakramen-1301-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1302-1', 13, 1302, 'Wat voor type raam gaat het om?', 'What type of raam gaat het om?', 'radio', false, 'q-dakramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-1-standaard_dakraam', 'q-dakramen-1302-1', 'standaard_dakraam', 'Standaard dakraam', 'Standaard dakraam', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-1-dakkapel', 'q-dakramen-1302-1', 'dakkapel', 'Dakkapel', 'Dakkapel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-1-lichtkoepel', 'q-dakramen-1302-1', 'lichtkoepel', 'Lichtkoepel', 'Lichtkoepel', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-1-anders', 'q-dakramen-1302-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1302-2', 13, 1302, 'Waarom wil je het raam vervangen?', 'Why do you want to het raam replace?', 'radio', false, 'q-dakramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-2-verouderd', 'q-dakramen-1302-2', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-2-lekkage', 'q-dakramen-1302-2', 'lekkage', 'Lekkage', 'Lekkage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-2-beter_isoleren', 'q-dakramen-1302-2', 'beter_isoleren', 'Beter isoleren', 'Beter isoleren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-2-anders', 'q-dakramen-1302-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1302-3', 13, 1302, 'Moet het oude raam ook verwijderd worden?', 'Should the old raam ook verwijderd worden?', 'radio', false, 'q-dakramen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-3-ja', 'q-dakramen-1302-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1302-3-nee', 'q-dakramen-1302-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1303-1', 13, 1303, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-dakramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-1-lekkage', 'q-dakramen-1303-1', 'lekkage', 'Lekkage', 'Lekkage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-1-glas_kapot', 'q-dakramen-1303-1', 'glas_kapot', 'Glas kapot', 'Glas kapot', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-1-scharnieren_defect', 'q-dakramen-1303-1', 'scharnieren_defect', 'Scharnieren defect', 'Scharnieren defect', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-1-anders', 'q-dakramen-1303-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-dakramen-1303-2', 13, 1303, 'Hoe oud is het raam ongeveer?', 'Hoe oud is het raam approximately?', 'radio', false, 'q-dakramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-2-05_jaar', 'q-dakramen-1303-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-2-510_jaar', 'q-dakramen-1303-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-2-1020_jaar', 'q-dakramen-1303-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-dakramen-1303-2-ouder_dan_20_jaar', 'q-dakramen-1303-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Deuren (ID: 14)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-root', 14, NULL, 'Wat voor type deuroplossing zoek je?', 'What type of deuroplossing are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1401-1', 14, 1401, 'Om wat voor type deur gaat het?', 'Om wat voor type deur gaat het?', 'radio', false, 'q-deuren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-1-binnendeur', 'q-deuren-1401-1', 'binnendeur', 'Binnendeur', 'Indoordeur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-1-buitendeur_voordeur_achterdeur', 'q-deuren-1401-1', 'buitendeur_voordeur_achterdeur', 'Buitendeur (voordeur/achterdeur)', 'Outdoordeur (voordeur/achterdeur)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-1-schuifdeur', 'q-deuren-1401-1', 'schuifdeur', 'Schuifdeur', 'Schuifdeur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-1-dubbele_deur', 'q-deuren-1401-1', 'dubbele_deur', 'Dubbele deur', 'Dubbele deur', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1401-2', 14, 1401, 'Van welk materiaal moet de deur zijn?', 'Van welk materiaal moet de deur zijn?', 'radio', false, 'q-deuren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-2-hout', 'q-deuren-1401-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-2-aluminium', 'q-deuren-1401-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-2-kunststof', 'q-deuren-1401-2', 'kunststof', 'Kunststof', 'Kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-2-glas', 'q-deuren-1401-2', 'glas', 'Glas', 'Glas', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-2-anders', 'q-deuren-1401-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1401-3', 14, 1401, 'Moet de deur ook geleverd worden of alleen geplaatst?', 'Should the deur ook geleverd worden of alleen geplaatst?', 'radio', false, 'q-deuren-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-3-alleen_plaatsen', 'q-deuren-1401-3', 'alleen_plaatsen', 'Alleen plaatsen', 'Alleen install', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1401-3-leveren_en_plaatsen', 'q-deuren-1401-3', 'leveren_en_plaatsen', 'Leveren en plaatsen', 'Leveren en install', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1402-1', 14, 1402, 'Om wat voor type deur gaat het?', 'Om wat voor type deur gaat het?', 'radio', false, 'q-deuren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-1-binnendeur', 'q-deuren-1402-1', 'binnendeur', 'Binnendeur', 'Indoordeur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-1-buitendeur', 'q-deuren-1402-1', 'buitendeur', 'Buitendeur', 'Outdoordeur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-1-schuifdeur', 'q-deuren-1402-1', 'schuifdeur', 'Schuifdeur', 'Schuifdeur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-1-dubbele_deur', 'q-deuren-1402-1', 'dubbele_deur', 'Dubbele deur', 'Dubbele deur', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1402-2', 14, 1402, 'Waarom wil je de deur vervangen?', 'Why do you want to de deur replace?', 'radio', false, 'q-deuren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-2-verouderd', 'q-deuren-1402-2', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-2-beschadigd', 'q-deuren-1402-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-2-betere_isolatie___veiligheid', 'q-deuren-1402-2', 'betere_isolatie___veiligheid', 'Betere isolatie / veiligheid', 'Betere isolatie / veiligheid', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-2-anders', 'q-deuren-1402-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1402-3', 14, 1402, 'Moet de oude deur ook verwijderd worden?', 'Should the old deur ook verwijderd worden?', 'radio', false, 'q-deuren-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-3-ja', 'q-deuren-1402-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1402-3-nee', 'q-deuren-1402-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1403-1', 14, 1403, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-deuren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-1-deur_sluit_niet_goed', 'q-deuren-1403-1', 'deur_sluit_niet_goed', 'Deur sluit niet goed', 'Deur sluit niet goed', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-1-scharnieren_defect', 'q-deuren-1403-1', 'scharnieren_defect', 'Scharnieren defect', 'Scharnieren defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-1-slot_kapot', 'q-deuren-1403-1', 'slot_kapot', 'Slot kapot', 'Slot kapot', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-1-glas_gebroken', 'q-deuren-1403-1', 'glas_gebroken', 'Glas gebroken', 'Glas gebroken', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-1-anders', 'q-deuren-1403-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1403-2', 14, 1403, 'Om wat voor type deur gaat het?', 'Om wat voor type deur gaat het?', 'radio', false, 'q-deuren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-2-binnendeur', 'q-deuren-1403-2', 'binnendeur', 'Binnendeur', 'Indoordeur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-2-buitendeur', 'q-deuren-1403-2', 'buitendeur', 'Buitendeur', 'Outdoordeur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1403-2-schuifdeur', 'q-deuren-1403-2', 'schuifdeur', 'Schuifdeur', 'Schuifdeur', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1404-1', 14, 1404, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-deuren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-1-schuren_en_schilderen_lakken', 'q-deuren-1404-1', 'schuren_en_schilderen_lakken', 'Schuren en schilderen/lakken', 'Schuren en schilderen/lakken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-1-bekleden', 'q-deuren-1404-1', 'bekleden', 'Bekleden', 'Bekleden', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-1-nieuw_beslag_plaatsen', 'q-deuren-1404-1', 'nieuw_beslag_plaatsen', 'Nieuw beslag plaatsen', 'New beslag install', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-1-anders', 'q-deuren-1404-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-deuren-1404-2', 14, 1404, 'Om hoeveel deuren gaat het?', 'How many deuren gaat het?', 'radio', false, 'q-deuren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-2-1', 'q-deuren-1404-2', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-2-25', 'q-deuren-1404-2', '25', '2–5', '2–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-2-510', 'q-deuren-1404-2', '510', '5–10', '5–10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-deuren-1404-2-meer_dan_10', 'q-deuren-1404-2', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 4, true, NULL);



-- ===============================================
-- Category: Elektricien (ID: 15)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-root', 15, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1501-1', 15, 1501, 'Voor welk type gebouw?', 'Voor welk type gebouw?', 'radio', false, 'q-elektricien-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-1-woning', 'q-elektricien-1501-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-1-appartement', 'q-elektricien-1501-1', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-1-bedrijfspand', 'q-elektricien-1501-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1501-2', 15, 1501, 'Wat moet er worden aangelegd?', 'Wat moet er worden aangelegd?', 'radio', false, 'q-elektricien-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-2-volledige_installatie', 'q-elektricien-1501-2', 'volledige_installatie', 'Volledige installatie', 'Complete installatie', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-2-stopcontacten', 'q-elektricien-1501-2', 'stopcontacten', 'Stopcontacten', 'Stopcontacten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-2-verlichting', 'q-elektricien-1501-2', 'verlichting', 'Verlichting', 'Verlichting', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-2-groepenkast', 'q-elektricien-1501-2', 'groepenkast', 'Groepenkast', 'Groepenkast', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-2-anders', 'q-elektricien-1501-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1501-3', 15, 1501, 'Heb je al een elektriciteitsplan?', 'Do you have al een elektriciteitsplan?', 'radio', false, 'q-elektricien-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-3-ja', 'q-elektricien-1501-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1501-3-nee', 'q-elektricien-1501-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1502-1', 15, 1502, 'Wat wil je uitbreiden?', 'What do you want uitbreiden?', 'radio', false, 'q-elektricien-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-1-extra_stopcontacten', 'q-elektricien-1502-1', 'extra_stopcontacten', 'Extra stopcontacten', 'Extra stopcontacten', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-1-extra_verlichting', 'q-elektricien-1502-1', 'extra_verlichting', 'Extra verlichting', 'Extra verlichting', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-1-groepenkast_uitbreiden', 'q-elektricien-1502-1', 'groepenkast_uitbreiden', 'Groepenkast uitbreiden', 'Groepenkast uitbreiden', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-1-anders', 'q-elektricien-1502-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1502-2', 15, 1502, 'Hoeveel extra punten gaat het om?', 'How many extra punten gaat het om?', 'radio', false, 'q-elektricien-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-2-13', 'q-elektricien-1502-2', '13', '1–3', '1–3', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-2-410', 'q-elektricien-1502-2', '410', '4–10', '4–10', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1502-2-meer_dan_10', 'q-elektricien-1502-2', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1503-1', 15, 1503, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-elektricien-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-1-kortsluiting', 'q-elektricien-1503-1', 'kortsluiting', 'Kortsluiting', 'Shortsluiting', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-1-stoppen_slaan_door', 'q-elektricien-1503-1', 'stoppen_slaan_door', 'Stoppen slaan door', 'Stoppen slaan door', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-1-stopcontact_werkt_niet', 'q-elektricien-1503-1', 'stopcontact_werkt_niet', 'Stopcontact werkt niet', 'Stopcontact werkt niet', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-1-verlichting_werkt_niet', 'q-elektricien-1503-1', 'verlichting_werkt_niet', 'Verlichting werkt niet', 'Verlichting werkt niet', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-1-anders', 'q-elektricien-1503-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1503-2', 15, 1503, 'Hoe dringend is de reparatie?', 'Hoe dringend is de reparatie?', 'radio', false, 'q-elektricien-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-2-spoed', 'q-elektricien-1503-2', 'spoed', 'Spoed', 'Spoed', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-2-binnen_enkele_dagen', 'q-elektricien-1503-2', 'binnen_enkele_dagen', 'Binnen enkele dagen', 'Indoor enkele dagen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1503-2-geen_haast', 'q-elektricien-1503-2', 'geen_haast', 'Geen haast', 'Geen haast', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1504-1', 15, 1504, 'Waarvoor is de keuring nodig?', 'Waarvoor is de keuring nodig?', 'radio', false, 'q-elektricien-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-1-verkoop_woning', 'q-elektricien-1504-1', 'verkoop_woning', 'Verkoop woning', 'Verkoop woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-1-oplevering_nieuwbouw', 'q-elektricien-1504-1', 'oplevering_nieuwbouw', 'Oplevering nieuwbouw', 'Oplevering nieuwbouw', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-1-periodieke_keuring_bedrijfspand', 'q-elektricien-1504-1', 'periodieke_keuring_bedrijfspand', 'Periodieke keuring bedrijfspand', 'Periodice keuring bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-1-anders', 'q-elektricien-1504-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-elektricien-1504-2', 15, 1504, 'Moet er ook direct hersteld worden bij afkeur?', 'Should ook direct hersteld worden bij afkeur?', 'radio', false, 'q-elektricien-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-2-ja', 'q-elektricien-1504-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-elektricien-1504-2-nee', 'q-elektricien-1504-2', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Garagepoorten (ID: 16)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-root', 16, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1601-1', 16, 1601, 'Wat voor type garagepoort wil je?', 'What type of garagepoort wil je?', 'radio', false, 'q-garagepoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-1-kantelpoort', 'q-garagepoorten-1601-1', 'kantelpoort', 'Kantelpoort', 'Kantelpoort', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-1-sectionaalpoort', 'q-garagepoorten-1601-1', 'sectionaalpoort', 'Sectionaalpoort', 'Sectionaalpoort', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-1-rolpoort', 'q-garagepoorten-1601-1', 'rolpoort', 'Rolpoort', 'Rolpoort', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-1-schuifpoort', 'q-garagepoorten-1601-1', 'schuifpoort', 'Schuifpoort', 'Schuifpoort', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1601-2', 16, 1601, 'Met of zonder elektrische bediening?', 'Met of zonder elektrische bediening?', 'radio', false, 'q-garagepoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-2-met_motor', 'q-garagepoorten-1601-2', 'met_motor', 'Met motor', 'Met motor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-2-zonder_motor', 'q-garagepoorten-1601-2', 'zonder_motor', 'Zonder motor', 'Zonder motor', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1601-3', 16, 1601, 'Hoe breed is de garageopening ongeveer?', 'Hoe breed is de garageopening approximately?', 'radio', false, 'q-garagepoorten-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-3-tot_25_meter', 'q-garagepoorten-1601-3', 'tot_25_meter', 'Tot 2,5 meter', 'Tot 2,5 meter', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-3-254_meter', 'q-garagepoorten-1601-3', '254_meter', '2,5–4 meter', '2,5–4 meter', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1601-3-4_meter_of_breder', 'q-garagepoorten-1601-3', '4_meter_of_breder', '4 meter of breder', '4 meter of breder', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1602-1', 16, 1602, 'Waarom wil je de garagepoort vervangen?', 'Why do you want to de garagepoort replace?', 'radio', false, 'q-garagepoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-1-verouderd', 'q-garagepoorten-1602-1', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-1-beschadigd', 'q-garagepoorten-1602-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-1-beter_isoleren', 'q-garagepoorten-1602-1', 'beter_isoleren', 'Beter isoleren', 'Beter isoleren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-1-anders', 'q-garagepoorten-1602-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1602-2', 16, 1602, 'Welk type poort wil je terugplaatsen?', 'Welk type poort wil je teruginstall?', 'radio', false, 'q-garagepoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-2-kantelpoort', 'q-garagepoorten-1602-2', 'kantelpoort', 'Kantelpoort', 'Kantelpoort', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-2-sectionaalpoort', 'q-garagepoorten-1602-2', 'sectionaalpoort', 'Sectionaalpoort', 'Sectionaalpoort', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-2-rolpoort', 'q-garagepoorten-1602-2', 'rolpoort', 'Rolpoort', 'Rolpoort', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-2-schuifpoort', 'q-garagepoorten-1602-2', 'schuifpoort', 'Schuifpoort', 'Schuifpoort', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1602-3', 16, 1602, 'Moet de oude poort verwijderd worden?', 'Should the old poort verwijderd worden?', 'radio', false, 'q-garagepoorten-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-3-ja', 'q-garagepoorten-1602-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1602-3-nee', 'q-garagepoorten-1602-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1603-1', 16, 1603, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-garagepoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-1-poort_opent_sluit_niet_goed', 'q-garagepoorten-1603-1', 'poort_opent_sluit_niet_goed', 'Poort opent/sluit niet goed', 'Poort opent/sluit niet goed', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-1-motor_defect', 'q-garagepoorten-1603-1', 'motor_defect', 'Motor defect', 'Motor defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-1-kabels_veren_kapot', 'q-garagepoorten-1603-1', 'kabels_veren_kapot', 'Kabels/veren kapot', 'Kabels/veren kapot', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-1-schade_aan_paneel', 'q-garagepoorten-1603-1', 'schade_aan_paneel', 'Schade aan paneel', 'Schade aan paneel', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-1-anders', 'q-garagepoorten-1603-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-garagepoorten-1603-2', 16, 1603, 'Hoe oud is de garagepoort ongeveer?', 'Hoe oud is de garagepoort approximately?', 'radio', false, 'q-garagepoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-2-05_jaar', 'q-garagepoorten-1603-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-2-510_jaar', 'q-garagepoorten-1603-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-2-1020_jaar', 'q-garagepoorten-1603-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-garagepoorten-1603-2-ouder_dan_20_jaar', 'q-garagepoorten-1603-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Gevelwerken (ID: 17)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-root', 17, NULL, 'Wat voor type gevelwerk zoek je?', 'What type of gevelwerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1701-1', 17, 1701, 'Wat voor soort gevel heb je?', 'What kind of soort gevel heb je?', 'radio', false, 'q-gevelwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-1-baksteen', 'q-gevelwerken-1701-1', 'baksteen', 'Baksteen', 'Baksteen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-1-natuursteen', 'q-gevelwerken-1701-1', 'natuursteen', 'Natuursteen', 'Natural stone', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-1-beton', 'q-gevelwerken-1701-1', 'beton', 'Beton', 'Beton', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-1-anders', 'q-gevelwerken-1701-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1701-2', 17, 1701, 'Hoe wil je de gevel laten reinigen?', 'Hoe wil je de gevel have reinigen?', 'radio', false, 'q-gevelwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-2-zandstralen', 'q-gevelwerken-1701-2', 'zandstralen', 'Zandstralen', 'Zandstralen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-2-chemisch_reinigen', 'q-gevelwerken-1701-2', 'chemisch_reinigen', 'Chemisch reinigen', 'Chemisch reinigen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-2-stoomreinigen', 'q-gevelwerken-1701-2', 'stoomreinigen', 'Stoomreinigen', 'Stoomreinigen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-2-weet_ik_nog_niet', 'q-gevelwerken-1701-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1701-3', 17, 1701, 'Hoe groot is de gevel ongeveer?', 'How large is de gevel approximately?', 'radio', false, 'q-gevelwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-3-klein_tot_30_m', 'q-gevelwerken-1701-3', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-3-middel_3075_m', 'q-gevelwerken-1701-3', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-3-groot_75150_m', 'q-gevelwerken-1701-3', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1701-3-zeer_groot_150_m', 'q-gevelwerken-1701-3', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1702-1', 17, 1702, 'Wat moet er hersteld worden?', 'Wat moet er hersteld worden?', 'radio', false, 'q-gevelwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-1-scheuren_in_de_muur', 'q-gevelwerken-1702-1', 'scheuren_in_de_muur', 'Scheuren in de muur', 'Scheuren in de muur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-1-kapotte_stenen_vervangen', 'q-gevelwerken-1702-1', 'kapotte_stenen_vervangen', 'Kapotte stenen vervangen', 'Kapotte stenen replace', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-1-losse_stukken_stucwerk', 'q-gevelwerken-1702-1', 'losse_stukken_stucwerk', 'Losse stukken stucwerk', 'Losse stukken stucwerk', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-1-anders', 'q-gevelwerken-1702-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1702-2', 17, 1702, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-gevelwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-2-klein_enkele_stenen_plekken', 'q-gevelwerken-1702-2', 'klein_enkele_stenen_plekken', 'Klein (enkele stenen/plekken)', 'Small (enkele stenen/plekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-2-middel_deel_van_de_gevel', 'q-gevelwerken-1702-2', 'middel_deel_van_de_gevel', 'Middel (deel van de gevel)', 'Medium (deel van de gevel)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1702-2-groot_hele_gevel', 'q-gevelwerken-1702-2', 'groot_hele_gevel', 'Groot (hele gevel)', 'Large (hele gevel)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1703-1', 17, 1703, 'Met welk materiaal wil je de gevel bekleden?', 'Met welk materiaal wil je de gevel bekleden?', 'radio', false, 'q-gevelwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-1-hout', 'q-gevelwerken-1703-1', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-1-steenstrips', 'q-gevelwerken-1703-1', 'steenstrips', 'Steenstrips', 'Steenstrips', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-1-stucwerk', 'q-gevelwerken-1703-1', 'stucwerk', 'Stucwerk', 'Stucwerk', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-1-kunststof', 'q-gevelwerken-1703-1', 'kunststof', 'Kunststof', 'Kunststof', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-1-anders', 'q-gevelwerken-1703-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1703-2', 17, 1703, 'Moet de gevel ook geïsoleerd worden?', 'Should the gevel ook geïsoleerd worden?', 'radio', false, 'q-gevelwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-2-ja', 'q-gevelwerken-1703-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-2-nee', 'q-gevelwerken-1703-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1703-3', 17, 1703, 'Hoe groot is de gevel?', 'How large is de gevel?', 'radio', false, 'q-gevelwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-3-klein_tot_30_m', 'q-gevelwerken-1703-3', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-3-middel_3075_m', 'q-gevelwerken-1703-3', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-3-groot_75150_m', 'q-gevelwerken-1703-3', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1703-3-zeer_groot_150_m', 'q-gevelwerken-1703-3', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1704-1', 17, 1704, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-gevelwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-1-enkele_voegen_herstellen', 'q-gevelwerken-1704-1', 'enkele_voegen_herstellen', 'Enkele voegen herstellen', 'Enkele voegen herstellen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-1-hele_gevel_opnieuw_voegen', 'q-gevelwerken-1704-1', 'hele_gevel_opnieuw_voegen', 'Hele gevel opnieuw voegen', 'Hele gevel opnieuw voegen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-1-oude_voegen_verwijderen__vernieuwen', 'q-gevelwerken-1704-1', 'oude_voegen_verwijderen__vernieuwen', 'Oude voegen verwijderen \+ vernieuwen', 'Old voegen remove \+ renovate', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gevelwerken-1704-2', 17, 1704, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-gevelwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-2-klein_tot_30_m', 'q-gevelwerken-1704-2', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-2-middel_3075_m', 'q-gevelwerken-1704-2', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-2-groot_75150_m', 'q-gevelwerken-1704-2', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gevelwerken-1704-2-zeer_groot_150_m', 'q-gevelwerken-1704-2', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);


-- ===============================================
-- Category: Glassetter (ID: 18)
-- ===============================================



-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-root', 18, NULL, 'Wat voor type glasopdracht zoek je?', 'What type of glass project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuw glas plaatsen (ID: 1801)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1801-1', 18, 1801, 'Waar moet het glas geplaatst worden?', 'Where should the glass be installed?', 'radio', false, 'q-glassetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-1-ramen_woning', 'q-glassetter-1801-1', 'ramen_woning', 'Ramen woning', 'House windows', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-1-deuren', 'q-glassetter-1801-1', 'deuren', 'Deuren', 'Doors', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-1-dakkapel_dakraam', 'q-glassetter-1801-1', 'dakkapel_dakraam', 'Dakkapel / dakraam', 'Dormer / skylight', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-1-anders', 'q-glassetter-1801-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1801-2', 18, 1801, 'Wat voor type glas wil je?', 'What type of glass do you want?', 'radio', false, 'q-glassetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-2-dubbel_glas', 'q-glassetter-1801-2', 'dubbel_glas', 'Dubbel glas', 'Double glazing', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-2-hr_glas', 'q-glassetter-1801-2', 'hr_glas', 'HR++ glas', 'HR++ glass', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-2-triple_glas', 'q-glassetter-1801-2', 'triple_glas', 'Triple glas', 'Triple glazing', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-2-veiligheidsglas', 'q-glassetter-1801-2', 'veiligheidsglas', 'Veiligheidsglas', 'Safety glass', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-2-melkglas_matglas', 'q-glassetter-1801-2', 'melkglas_matglas', 'Melkglas / matglas', 'Frosted / matte glass', false, 5, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1801-3', 18, 1801, 'Hoeveel ruiten gaat het om?', 'How many panes does it concern?', 'radio', false, 'q-glassetter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-3-1_2', 'q-glassetter-1801-3', '1_2', '1–2', '1-2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-3-3_5', 'q-glassetter-1801-3', '3_5', '3–5', '3-5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-3-6_10', 'q-glassetter-1801-3', '6_10', '6–10', '6-10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1801-3-meer_dan_10', 'q-glassetter-1801-3', 'meer_dan_10', 'Meer dan 10', 'More than 10', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Glas vervangen (ID: 1802)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1802-1', 18, 1802, 'Waarom wil je het glas vervangen?', 'Why do you want to replace the glass?', 'radio', false, 'q-glassetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-1-beter_isoleren', 'q-glassetter-1802-1', 'beter_isoleren', 'Beter isoleren', 'Better insulation', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-1-condens_tussen_glas', 'q-glassetter-1802-1', 'condens_tussen_glas', 'Condens tussen glas', 'Condensation between glass', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-1-glas_kapot', 'q-glassetter-1802-1', 'glas_kapot', 'Glas kapot', 'Glass broken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-1-anders', 'q-glassetter-1802-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1802-2', 18, 1802, 'Welk type glas wil je laten plaatsen?', 'What type of glass do you want to install?', 'radio', false, 'q-glassetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-2-dubbel_glas', 'q-glassetter-1802-2', 'dubbel_glas', 'Dubbel glas', 'Double glazing', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-2-hr_glas', 'q-glassetter-1802-2', 'hr_glas', 'HR++ glas', 'HR++ glass', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-2-triple_glas', 'q-glassetter-1802-2', 'triple_glas', 'Triple glas', 'Triple glazing', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-2-veiligheidsglas', 'q-glassetter-1802-2', 'veiligheidsglas', 'Veiligheidsglas', 'Safety glass', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-2-anders', 'q-glassetter-1802-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1802-3', 18, 1802, 'Moet het oude glas ook verwijderd worden?', 'Should the old glass also be removed?', 'radio', false, 'q-glassetter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-3-ja', 'q-glassetter-1802-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1802-3-nee', 'q-glassetter-1802-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Glas repareren (ID: 1803)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1803-1', 18, 1803, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-glassetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-1-barst_of_scheur', 'q-glassetter-1803-1', 'barst_of_scheur', 'Barst of scheur', 'Crack or fissure', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-1-lekkende_kitnaden', 'q-glassetter-1803-1', 'lekkende_kitnaden', 'Lekkende kitnaden', 'Leaking putty seams', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-1-losse_ruit', 'q-glassetter-1803-1', 'losse_ruit', 'Losse ruit', 'Loose pane', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-1-anders', 'q-glassetter-1803-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-glassetter-1803-2', 18, 1803, 'Hoeveel ruiten gaat het om?', 'How many panes does it concern?', 'radio', false, 'q-glassetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-2-1', 'q-glassetter-1803-2', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-2-2_5', 'q-glassetter-1803-2', '2_5', '2–5', '2-5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-glassetter-1803-2-meer_dan_5', 'q-glassetter-1803-2', 'meer_dan_5', 'Meer dan 5', 'More than 5', false, 3, true, NULL);

-- ===============================================
-- Category: Grondwerken (ID: 19)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-root', 19, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1901-1', 19, 1901, 'Wat moet er uitgegraven of opgehoogd worden?', 'Wat moet er uitgegraven of opgehoogd worden?', 'radio', false, 'q-grondwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-1-tuin', 'q-grondwerken-1901-1', 'tuin', 'Tuin', 'Garden', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-1-oprit', 'q-grondwerken-1901-1', 'oprit', 'Oprit', 'Driveway', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-1-fundering_woning_gebouw', 'q-grondwerken-1901-1', 'fundering_woning_gebouw', 'Fundering woning/gebouw', 'Fundering woning/gebouw', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-1-vijver_zwembad', 'q-grondwerken-1901-1', 'vijver_zwembad', 'Vijver/zwembad', 'Vijver/zwembad', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1901-2', 19, 1901, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-grondwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-2-klein_tot_20_m', 'q-grondwerken-1901-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-2-middel_2050_m', 'q-grondwerken-1901-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-2-groot_50200_m', 'q-grondwerken-1901-2', 'groot_50200_m', 'Groot (50–200 m²)', 'Large (50-200 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-2-zeer_groot_200_m', 'q-grondwerken-1901-2', 'zeer_groot_200_m', 'Zeer groot (200+ m²)', 'Very large (200+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1901-3', 19, 1901, 'Moet de grond ook afgevoerd worden?', 'Should the grond ook removed worden?', 'radio', false, 'q-grondwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-3-ja', 'q-grondwerken-1901-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1901-3-nee', 'q-grondwerken-1901-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1902-1', 19, 1902, 'Voor welk project?', 'Voor welk project?', 'radio', false, 'q-grondwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-1-woning', 'q-grondwerken-1902-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-1-garage', 'q-grondwerken-1902-1', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-1-tuinhuis', 'q-grondwerken-1902-1', 'tuinhuis', 'Tuinhuis', 'Gardenhuis', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-1-anders', 'q-grondwerken-1902-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1902-2', 19, 1902, 'Hoe groot is de fundering?', 'How large is de fundering?', 'radio', false, 'q-grondwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-2-klein_tot_20_m', 'q-grondwerken-1902-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-2-middel_2050_m', 'q-grondwerken-1902-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-2-groot_50100_m', 'q-grondwerken-1902-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-2-zeer_groot_100_m', 'q-grondwerken-1902-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1902-3', 19, 1902, 'Moet er ook bekisting/beton gestort worden?', 'Should ook bekisting/beton gestort worden?', 'radio', false, 'q-grondwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-3-ja', 'q-grondwerken-1902-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1902-3-nee', 'q-grondwerken-1902-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1903-1', 19, 1903, 'Voor welke leidingen?', 'Voor welke leidingen?', 'radio', false, 'q-grondwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-1-water', 'q-grondwerken-1903-1', 'water', 'Water', 'Water', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-1-gas', 'q-grondwerken-1903-1', 'gas', 'Gas', 'Gas', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-1-elektriciteit', 'q-grondwerken-1903-1', 'elektriciteit', 'Elektriciteit', 'Elektriciteit', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-1-riolering', 'q-grondwerken-1903-1', 'riolering', 'Riolering', 'Riolering', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-1-anders', 'q-grondwerken-1903-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1903-2', 19, 1903, 'Hoe lang moet er gegraven worden?', 'How long moet er gegraven worden?', 'radio', false, 'q-grondwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-2-kort_tot_10_m', 'q-grondwerken-1903-2', 'kort_tot_10_m', 'Kort (tot 10 m)', 'Short (up to 10 m)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-2-middel_1030_m', 'q-grondwerken-1903-2', 'middel_1030_m', 'Middel (10–30 m)', 'Medium (10-30 m)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-2-lang_3060_m', 'q-grondwerken-1903-2', 'lang_3060_m', 'Lang (30–60 m)', 'Long (30-60 m)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-2-zeer_lang_60_m', 'q-grondwerken-1903-2', 'zeer_lang_60_m', 'Zeer lang (60+ m)', 'Very long (60+ m)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1903-3', 19, 1903, 'Moet de sleuf weer dichtgemaakt worden?', 'Should the sleuf weer dichtgemaakt worden?', 'radio', false, 'q-grondwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-3-ja', 'q-grondwerken-1903-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1903-3-nee', 'q-grondwerken-1903-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1904-1', 19, 1904, 'Waar moet het terrein geëgaliseerd worden?', 'Where should het terrein geëgaliseerd worden?', 'radio', false, 'q-grondwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-1-tuin', 'q-grondwerken-1904-1', 'tuin', 'Tuin', 'Garden', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-1-bouwgrond', 'q-grondwerken-1904-1', 'bouwgrond', 'Bouwgrond', 'Bouwgrond', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-1-oprit', 'q-grondwerken-1904-1', 'oprit', 'Oprit', 'Driveway', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-1-anders', 'q-grondwerken-1904-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-grondwerken-1904-2', 19, 1904, 'Hoe groot is het terrein?', 'How large is het terrein?', 'radio', false, 'q-grondwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-2-klein_tot_50_m', 'q-grondwerken-1904-2', 'klein_tot_50_m', 'Klein (tot 50 m²)', 'Small (up to 50 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-2-middel_50200_m', 'q-grondwerken-1904-2', 'middel_50200_m', 'Middel (50–200 m²)', 'Medium (50-200 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-2-groot_200500_m', 'q-grondwerken-1904-2', 'groot_200500_m', 'Groot (200–500 m²)', 'Large (200-500 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-grondwerken-1904-2-zeer_groot_500_m', 'q-grondwerken-1904-2', 'zeer_groot_500_m', 'Zeer groot (500+ m²)', 'Very large (500+ sqm)', false, 4, true, NULL);


-- ===============================================
-- Category: Gyproc/plafonds (ID: 20)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-root', 20, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2001-1', 20, 2001, 'Waar wil je nieuwe wanden plaatsen?', 'Waar wil je nieuwe wanden install?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-1-woonkamer', 'q-gyproc-plafonds-2001-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-1-slaapkamer', 'q-gyproc-plafonds-2001-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-1-zolder', 'q-gyproc-plafonds-2001-1', 'zolder', 'Zolder', 'Zolder', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-1-kantoor_bedrijfspand', 'q-gyproc-plafonds-2001-1', 'kantoor_bedrijfspand', 'Kantoor/bedrijfspand', 'Kantoor/bedrijfspand', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-1-anders', 'q-gyproc-plafonds-2001-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2001-2', 20, 2001, 'Moeten de wanden geluids- of warmte-isolerend zijn?', 'Moeten de wanden geluids- of warmte-isolerend zijn?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-2-geluidsisolerend', 'q-gyproc-plafonds-2001-2', 'geluidsisolerend', 'Geluidsisolerend', 'Geluidsisolerend', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-2-warmteisolerend', 'q-gyproc-plafonds-2001-2', 'warmteisolerend', 'Warmte-isolerend', 'Warmte-isolerend', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-2-geen_voorkeur', 'q-gyproc-plafonds-2001-2', 'geen_voorkeur', 'Geen voorkeur', 'Geen voorkeur', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2001-3', 20, 2001, 'Hoe groot is de wand (in m²) ongeveer?', 'How large is de wand (in m²) approximately?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-3-klein_tot_10_m', 'q-gyproc-plafonds-2001-3', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-3-middel_1025_m', 'q-gyproc-plafonds-2001-3', 'middel_1025_m', 'Middel (10–25 m²)', 'Medium (10–25 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-3-groot_2550_m', 'q-gyproc-plafonds-2001-3', 'groot_2550_m', 'Groot (25–50 m²)', 'Large (25–50 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2001-3-zeer_groot_50_m', 'q-gyproc-plafonds-2001-3', 'zeer_groot_50_m', 'Zeer groot (50+ m²)', 'Very large (50+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2002-1', 20, 2002, 'Waar moet het plafond komen?', 'Where should het plafond komen?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-1-woonkamer', 'q-gyproc-plafonds-2002-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-1-slaapkamer', 'q-gyproc-plafonds-2002-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-1-kantoor', 'q-gyproc-plafonds-2002-1', 'kantoor', 'Kantoor', 'Kantoor', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-1-anders', 'q-gyproc-plafonds-2002-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2002-2', 20, 2002, 'Wat voor type plafond wil je?', 'What type of plafond wil je?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-2-verlaagd_plafond', 'q-gyproc-plafonds-2002-2', 'verlaagd_plafond', 'Verlaagd plafond', 'Verlaagd plafond', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-2-systeemplafond', 'q-gyproc-plafonds-2002-2', 'systeemplafond', 'Systeemplafond', 'Systeemplafond', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-2-decoratief_plafond', 'q-gyproc-plafonds-2002-2', 'decoratief_plafond', 'Decoratief plafond', 'Decoratief plafond', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2002-3', 20, 2002, 'Moet er ook verlichting geïntegreerd worden?', 'Should ook verlichting geïntegreerd worden?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-3-ja', 'q-gyproc-plafonds-2002-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2002-3-nee', 'q-gyproc-plafonds-2002-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2003-1', 20, 2003, 'Wat voor afwerking wil je?', 'What kind of afwerking wil je?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-1-schilderklaar', 'q-gyproc-plafonds-2003-1', 'schilderklaar', 'Schilderklaar', 'Schilderklaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-1-stucwerk', 'q-gyproc-plafonds-2003-1', 'stucwerk', 'Stucwerk', 'Stucwerk', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-1-behangklaar', 'q-gyproc-plafonds-2003-1', 'behangklaar', 'Behangklaar', 'Behangklaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-1-anders', 'q-gyproc-plafonds-2003-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2003-2', 20, 2003, 'Hoe groot is de oppervlakte ongeveer?', 'How large is de oppervlakte approximately?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-2-klein_tot_20_m', 'q-gyproc-plafonds-2003-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-2-middel_2050_m', 'q-gyproc-plafonds-2003-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-2-groot_50100_m', 'q-gyproc-plafonds-2003-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2003-2-zeer_groot_100_m', 'q-gyproc-plafonds-2003-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2004-1', 20, 2004, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-1-scheuren', 'q-gyproc-plafonds-2004-1', 'scheuren', 'Scheuren', 'Scheuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-1-gaten', 'q-gyproc-plafonds-2004-1', 'gaten', 'Gaten', 'Gaten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-1-loslatende_platen', 'q-gyproc-plafonds-2004-1', 'loslatende_platen', 'Loslatende platen', 'Loshavede phave', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-1-anders', 'q-gyproc-plafonds-2004-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-gyproc-plafonds-2004-2', 20, 2004, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-gyproc-plafonds-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-2-klein_tot_2_m', 'q-gyproc-plafonds-2004-2', 'klein_tot_2_m', 'Klein (tot 2 m²)', 'Small (tot 2 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-2-middel_25_m', 'q-gyproc-plafonds-2004-2', 'middel_25_m', 'Middel (2–5 m²)', 'Medium (2–5 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-2-groot_510_m', 'q-gyproc-plafonds-2004-2', 'groot_510_m', 'Groot (5–10 m²)', 'Large (5–10 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-gyproc-plafonds-2004-2-zeer_groot_10_m', 'q-gyproc-plafonds-2004-2', 'zeer_groot_10_m', 'Zeer groot (10+ m²)', 'Very large (10+ m²)', false, 4, true, NULL);


-- Total Questions: 98
-- Total Options: 306

-- ===============================================
-- Category: Haard (ID: 21)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-root', 21, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2101-1', 21, 2101, 'Wat voor type haard wil je?', 'What type of haard wil je?', 'radio', false, 'q-haard-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-1-open_haard', 'q-haard-2101-1', 'open_haard', 'Open haard', 'Open haard', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-1-houtkachel', 'q-haard-2101-1', 'houtkachel', 'Houtkachel', 'Woodkachel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-1-gashaard', 'q-haard-2101-1', 'gashaard', 'Gashaard', 'Gashaard', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-1-elektrische_haard', 'q-haard-2101-1', 'elektrische_haard', 'Elektrische haard', 'Elektrische haard', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-1-pelletkachel', 'q-haard-2101-1', 'pelletkachel', 'Pelletkachel', 'Pelletkachel', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2101-2', 21, 2101, 'Waar moet de haard komen?', 'Where should de haard komen?', 'radio', false, 'q-haard-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-2-woonkamer', 'q-haard-2101-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-2-slaapkamer', 'q-haard-2101-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-2-buiten_terras', 'q-haard-2101-2', 'buiten_terras', 'Buiten/terras', 'Outdoor/terras', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2101-3', 21, 2101, 'Moet er ook een rookkanaal aangelegd worden?', 'Should ook een rookkanaal aangelegd worden?', 'radio', false, 'q-haard-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-3-ja', 'q-haard-2101-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-3-nee', 'q-haard-2101-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2101-3-weet_ik_niet', 'q-haard-2101-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2102-1', 21, 2102, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-haard-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-1-oude_open_haard', 'q-haard-2102-1', 'oude_open_haard', 'Oude open haard', 'Old open haard', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-1-inbouwhaard', 'q-haard-2102-1', 'inbouwhaard', 'Inbouwhaard', 'Inbouwhaard', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-1-vrijstaande_kachel', 'q-haard-2102-1', 'vrijstaande_kachel', 'Vrijstaande kachel', 'Vrijstaande kachel', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2102-2', 21, 2102, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-haard-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-2-verouderd', 'q-haard-2102-2', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-2-beschadigd', 'q-haard-2102-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-2-efficinter_alternatief', 'q-haard-2102-2', 'efficinter_alternatief', 'Efficiënter alternatief', 'Efficiënter alternatief', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-2-andere_stijl_gewenst', 'q-haard-2102-2', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2102-3', 21, 2102, 'Moet de oude haard verwijderd worden?', 'Should the old haard verwijderd worden?', 'radio', false, 'q-haard-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-3-ja', 'q-haard-2102-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2102-3-nee', 'q-haard-2102-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2103-1', 21, 2103, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-haard-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-1-haard_trekt_niet_goed', 'q-haard-2103-1', 'haard_trekt_niet_goed', 'Haard trekt niet goed', 'Haard trekt niet goed', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-1-rookterugslag', 'q-haard-2103-1', 'rookterugslag', 'Rookterugslag', 'Rookterugslag', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-1-schade_aan_glas_of_deur', 'q-haard-2103-1', 'schade_aan_glas_of_deur', 'Schade aan glas of deur', 'Schade aan glas of deur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-1-defecte_ontsteking_gas_pellet', 'q-haard-2103-1', 'defecte_ontsteking_gas_pellet', 'Defecte ontsteking (gas/pellet)', 'Defecte ontsteking (gas/pellet)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-1-anders', 'q-haard-2103-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2103-2', 21, 2103, 'Hoe oud is de haard ongeveer?', 'Hoe oud is de haard approximately?', 'radio', false, 'q-haard-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-2-05_jaar', 'q-haard-2103-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-2-510_jaar', 'q-haard-2103-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-2-1020_jaar', 'q-haard-2103-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2103-2-ouder_dan_20_jaar', 'q-haard-2103-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2104-1', 21, 2104, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-haard-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-1-schoorsteen_vegen', 'q-haard-2104-1', 'schoorsteen_vegen', 'Schoorsteen vegen', 'Schoorsteen vegen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-1-reiniging_kachel_haard', 'q-haard-2104-1', 'reiniging_kachel_haard', 'Reiniging kachel/haard', 'Reiniging kachel/haard', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-1-jaarlijks_onderhoudscontract', 'q-haard-2104-1', 'jaarlijks_onderhoudscontract', 'Jaarlijks onderhoudscontract', 'Yesarlijks onderhoudscontract', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-haard-2104-2', 21, 2104, 'Om wat voor haard gaat het?', 'Om wat voor haard gaat het?', 'radio', false, 'q-haard-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-2-open_haard', 'q-haard-2104-2', 'open_haard', 'Open haard', 'Open haard', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-2-houtkachel', 'q-haard-2104-2', 'houtkachel', 'Houtkachel', 'Woodkachel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-2-gashaard', 'q-haard-2104-2', 'gashaard', 'Gashaard', 'Gashaard', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-2-pelletkachel', 'q-haard-2104-2', 'pelletkachel', 'Pelletkachel', 'Pelletkachel', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-haard-2104-2-anders', 'q-haard-2104-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);


-- ===============================================
-- Category: Hekwerken (ID: 22)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-root', 22, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2201-1', 22, 2201, 'Wat voor type hekwerk wil je?', 'What type of hekwerk wil je?', 'radio', false, 'q-hekwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-1-houten_hekwerk', 'q-hekwerken-2201-1', 'houten_hekwerk', 'Houten hekwerk', 'Wooden hekwerk', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-1-metalen_hekwerk', 'q-hekwerken-2201-1', 'metalen_hekwerk', 'Metalen hekwerk', 'Metal hekwerk', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-1-draadhekwerk', 'q-hekwerken-2201-1', 'draadhekwerk', 'Draadhekwerk', 'Draadhekwerk', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-1-sierhekwerk', 'q-hekwerken-2201-1', 'sierhekwerk', 'Sierhekwerk', 'Sierhekwerk', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-1-anders', 'q-hekwerken-2201-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2201-2', 22, 2201, 'Hoe hoog moet het hekwerk zijn?', 'How high moet het hekwerk zijn?', 'radio', false, 'q-hekwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-2-tot_1_meter', 'q-hekwerken-2201-2', 'tot_1_meter', 'Tot 1 meter', 'Up to 1 meter', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-2-12_meter', 'q-hekwerken-2201-2', '12_meter', '1–2 meter', '1-2 meters', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-2-hoger_dan_2_meter', 'q-hekwerken-2201-2', 'hoger_dan_2_meter', 'Hoger dan 2 meter', 'Higher than 2 meters', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2201-3', 22, 2201, 'Hoe lang moet het hekwerk zijn?', 'How long moet het hekwerk zijn?', 'radio', false, 'q-hekwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-3-kort_tot_10_m', 'q-hekwerken-2201-3', 'kort_tot_10_m', 'Kort (tot 10 m)', 'Short (up to 10 m)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-3-middel_1030_m', 'q-hekwerken-2201-3', 'middel_1030_m', 'Middel (10–30 m)', 'Medium (10-30 m)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-3-lang_3060_m', 'q-hekwerken-2201-3', 'lang_3060_m', 'Lang (30–60 m)', 'Long (30-60 m)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2201-3-zeer_lang_60_m', 'q-hekwerken-2201-3', 'zeer_lang_60_m', 'Zeer lang (60+ m)', 'Very long (60+ m)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2202-1', 22, 2202, 'Wat voor type hekwerk wil je vervangen?', 'What type of hekwerk wil je replace?', 'radio', false, 'q-hekwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-1-hout', 'q-hekwerken-2202-1', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-1-metaal', 'q-hekwerken-2202-1', 'metaal', 'Metaal', 'Metal', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-1-draad', 'q-hekwerken-2202-1', 'draad', 'Draad', 'Draad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-1-sierhekwerk', 'q-hekwerken-2202-1', 'sierhekwerk', 'Sierhekwerk', 'Sierhekwerk', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-1-anders', 'q-hekwerken-2202-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2202-2', 22, 2202, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-hekwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-2-beschadigd', 'q-hekwerken-2202-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-2-verouderd', 'q-hekwerken-2202-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-2-andere_stijl_gewenst', 'q-hekwerken-2202-2', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2202-3', 22, 2202, 'Moet het oude hekwerk verwijderd worden?', 'Should the old hekwerk verwijderd worden?', 'radio', false, 'q-hekwerken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-3-ja', 'q-hekwerken-2202-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2202-3-nee', 'q-hekwerken-2202-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2203-1', 22, 2203, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-hekwerken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-1-losgeraakte_delen', 'q-hekwerken-2203-1', 'losgeraakte_delen', 'Losgeraakte delen', 'Losgeraakte delen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-1-roest___houtrot', 'q-hekwerken-2203-1', 'roest___houtrot', 'Roest / houtrot', 'Roest / houtrot', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-1-beschadigde_panelen', 'q-hekwerken-2203-1', 'beschadigde_panelen', 'Beschadigde panelen', 'Damagede panelen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-1-anders', 'q-hekwerken-2203-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-hekwerken-2203-2', 22, 2203, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-hekwerken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-klein_enkele_meters', 'q-hekwerken-2203-2', 'klein_enkele_meters', 'Klein (enkele meters)', 'Small (enkele meters)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-middel_1030_m', 'q-hekwerken-2203-2', 'middel_1030_m', 'Middel (10–30 m)', 'Medium (10-30 m)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-groot_30_m', 'q-hekwerken-2203-2', 'groot_30_m', 'Groot (30+ m)', 'Large (30+ m)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-nieuwe_apparatuur_plaatsen', 'q-hekwerken-2203-2', 'nieuwe_apparatuur_plaatsen', 'Nieuwe apparatuur plaatsen', 'Newe apparatuur install', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-apparatuur_vervangen', 'q-hekwerken-2203-2', 'apparatuur_vervangen', 'Apparatuur vervangen', 'Apparatuur replace', false, 5, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-apparatuur_repareren', 'q-hekwerken-2203-2', 'apparatuur_repareren', 'Apparatuur repareren', 'Apparatuur repair', false, 6, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-hekwerken-2203-2-apparatuur_onderhouden_reinigen', 'q-hekwerken-2203-2', 'apparatuur_onderhouden_reinigen', 'Apparatuur onderhouden/reinigen', 'Apparatuur maintain/reinigen', false, 7, true, NULL);


-- ===============================================
-- Category: Interieur (ID: 23)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-root', 23, NULL, 'Wat voor type interieur-opdracht zoek je?', 'What type of interieur-project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2301-1', 23, 2301, 'Om welke ruimtes gaat het?', 'Om welke ruimtes gaat het?', 'radio', false, 'q-interieur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-1-woonkamer', 'q-interieur-2301-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-1-keuken', 'q-interieur-2301-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-1-badkamer', 'q-interieur-2301-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-1-slaapkamers', 'q-interieur-2301-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-1-meerdere_ruimtes', 'q-interieur-2301-1', 'meerdere_ruimtes', 'Meerdere ruimtes', 'Meerdere ruimtes', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2301-2', 23, 2301, 'Wat is je belangrijkste doel?', 'Wat is je belangrijkste doel?', 'radio', false, 'q-interieur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-2-betere_indeling', 'q-interieur-2301-2', 'betere_indeling', 'Betere indeling', 'Betere indeling', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-2-meer_sfeer___stijl', 'q-interieur-2301-2', 'meer_sfeer___stijl', 'Meer sfeer / stijl', 'Meer sfeer / stijl', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-2-praktischer_gebruik', 'q-interieur-2301-2', 'praktischer_gebruik', 'Praktischer gebruik', 'Praktischer gebruik', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2301-2-duurzaamheid', 'q-interieur-2301-2', 'duurzaamheid', 'Duurzaamheid', 'Duurzaamheid', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2302-1', 23, 2302, 'Voor welk type woning?', 'Voor welk type woning?', 'radio', false, 'q-interieur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-1-appartement', 'q-interieur-2302-1', 'appartement', 'Appartement', 'Appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-1-eengezinswoning', 'q-interieur-2302-1', 'eengezinswoning', 'Eengezinswoning', 'Eengezinswoning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-1-villa', 'q-interieur-2302-1', 'villa', 'Villa', 'Villa', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-1-kantoor_praktijkruimte', 'q-interieur-2302-1', 'kantoor_praktijkruimte', 'Kantoor/praktijkruimte', 'Kantoor/praktijkruimte', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2302-2', 23, 2302, 'Wil je ook begeleiding tijdens de uitvoering?', 'Wil je ook begeleiding tijdens de uitvoering?', 'radio', false, 'q-interieur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-2-ja', 'q-interieur-2302-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-2-nee', 'q-interieur-2302-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-2-weet_ik_nog_niet', 'q-interieur-2302-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2302-3', 23, 2302, 'Heb je een voorkeur voor stijl?', 'Do you have een voorkeur voor stijl?', 'radio', false, 'q-interieur-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-3-modern', 'q-interieur-2302-3', 'modern', 'Modern', 'Modern', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-3-klassiek', 'q-interieur-2302-3', 'klassiek', 'Klassiek', 'Klassiek', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-3-industrieel', 'q-interieur-2302-3', 'industrieel', 'Industrieel', 'Industrieel', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-3-landelijk', 'q-interieur-2302-3', 'landelijk', 'Landelijk', 'Landelijk', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2302-3-anders___geen_voorkeur', 'q-interieur-2302-3', 'anders___geen_voorkeur', 'Anders / geen voorkeur', 'Other / geen voorkeur', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2303-1', 23, 2303, 'Om wat voor meubel gaat het?', 'Om wat voor meubel gaat het?', 'radio', false, 'q-interieur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-1-kledingkast', 'q-interieur-2303-1', 'kledingkast', 'Kledingkast', 'Kledingkast', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-1-boekenkast', 'q-interieur-2303-1', 'boekenkast', 'Boekenkast', 'Boekenkast', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-1-keuken___eettafel', 'q-interieur-2303-1', 'keuken___eettafel', 'Keuken / eettafel', 'Keuken / eettafel', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-1-bureau___werkplek', 'q-interieur-2303-1', 'bureau___werkplek', 'Bureau / werkplek', 'Bureau / werkplek', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-1-anders', 'q-interieur-2303-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2303-2', 23, 2303, 'Waar moet het meubel komen?', 'Where should het meubel komen?', 'radio', false, 'q-interieur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-2-woonkamer', 'q-interieur-2303-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-2-slaapkamer', 'q-interieur-2303-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-2-keuken', 'q-interieur-2303-2', 'keuken', 'Keuken', 'Keuken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-2-badkamer', 'q-interieur-2303-2', 'badkamer', 'Badkamer', 'Badkamer', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2303-2-anders', 'q-interieur-2303-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2304-1', 23, 2304, 'Voor welke ruimte wil je advies?', 'Voor welke ruimte wil je advies?', 'radio', false, 'q-interieur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-1-woonkamer', 'q-interieur-2304-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-1-keuken', 'q-interieur-2304-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-1-badkamer', 'q-interieur-2304-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-1-slaapkamers', 'q-interieur-2304-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-1-meerdere_ruimtes', 'q-interieur-2304-1', 'meerdere_ruimtes', 'Meerdere ruimtes', 'Meerdere ruimtes', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2304-2', 23, 2304, 'Wat is je doel?', 'Wat is je doel?', 'radio', false, 'q-interieur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-2-warmere_uitstraling', 'q-interieur-2304-2', 'warmere_uitstraling', 'Warmere uitstraling', 'Warmere uitstraling', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-2-strakker___moderner', 'q-interieur-2304-2', 'strakker___moderner', 'Strakker / moderner', 'Strakker / moderner', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-2-lichter_maken', 'q-interieur-2304-2', 'lichter_maken', 'Lichter maken', 'Lichter maken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2304-2-duurzamere_materialen', 'q-interieur-2304-2', 'duurzamere_materialen', 'Duurzamere materialen', 'Duurzamere materialen', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2305-1', 23, 2305, 'Voor welke ruimte(s) heb je een lichtplan nodig?', 'Voor welke ruimte(s) heb je een lichtplan nodig?', 'radio', false, 'q-interieur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-1-woonkamer', 'q-interieur-2305-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-1-keuken', 'q-interieur-2305-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-1-badkamer', 'q-interieur-2305-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-1-slaapkamers', 'q-interieur-2305-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-1-hele_woning', 'q-interieur-2305-1', 'hele_woning', 'Hele woning', 'Hele woning', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-interieur-2305-2', 23, 2305, 'Wil je ook installatie laten uitvoeren?', 'Wil je ook installatie have uitvoeren?', 'radio', false, 'q-interieur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-2-ja', 'q-interieur-2305-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-interieur-2305-2-nee', 'q-interieur-2305-2', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Isolatie (ID: 24)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-root', 24, NULL, 'Wat voor type isolatie zoek je?', 'What type of isolatie are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2401-1', 24, 2401, 'Wat voor woning heb je?', 'What kind of woning heb je?', 'radio', false, 'q-isolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-1-rijtjeshuis', 'q-isolatie-2401-1', 'rijtjeshuis', 'Rijtjeshuis', 'Rijtjeshuis', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-1-hoekwoning', 'q-isolatie-2401-1', 'hoekwoning', 'Hoekwoning', 'Hoekwoning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-1-tweeondereenkap', 'q-isolatie-2401-1', 'tweeondereenkap', 'Twee-onder-een-kap', 'Twee-onder-een-kap', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-1-vrijstaande_woning', 'q-isolatie-2401-1', 'vrijstaande_woning', 'Vrijstaande woning', 'Vrijstaande woning', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-1-appartement', 'q-isolatie-2401-1', 'appartement', 'Appartement', 'Appartement', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2401-2', 24, 2401, 'Weet je of de spouwmuur al geïsoleerd is?', 'Weet je of de spouwmuur al geïsoleerd is?', 'radio', false, 'q-isolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-2-ja_deels', 'q-isolatie-2401-2', 'ja_deels', 'Ja, deels', 'Yes, deels', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-2-nee', 'q-isolatie-2401-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-2-weet_ik_niet', 'q-isolatie-2401-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2401-3', 24, 2401, 'Wat is de oppervlakte ongeveer?', 'Wat is de oppervlakte approximately?', 'radio', false, 'q-isolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-3-klein_tot_30_m', 'q-isolatie-2401-3', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-3-middel_3075_m', 'q-isolatie-2401-3', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-3-groot_75150_m', 'q-isolatie-2401-3', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2401-3-zeer_groot_150_m', 'q-isolatie-2401-3', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2402-1', 24, 2402, 'Wat voor type dak wil je isoleren?', 'What type of dak wil je isoleren?', 'radio', false, 'q-isolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-1-plat_dak', 'q-isolatie-2402-1', 'plat_dak', 'Plat dak', 'Plat dak', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-1-hellend_dak_binnenzijde', 'q-isolatie-2402-1', 'hellend_dak_binnenzijde', 'Hellend dak (binnenzijde)', 'Hellend dak (binnenzijde)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-1-hellend_dak_buitenzijde', 'q-isolatie-2402-1', 'hellend_dak_buitenzijde', 'Hellend dak (buitenzijde)', 'Hellend dak (buitenzijde)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-1-zoldervloer', 'q-isolatie-2402-1', 'zoldervloer', 'Zoldervloer', 'Zoldervloer', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2402-2', 24, 2402, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-isolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-2-klein_tot_20_m', 'q-isolatie-2402-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-2-middel_2050_m', 'q-isolatie-2402-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-2-groot_50100_m', 'q-isolatie-2402-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2402-2-zeer_groot_100_m', 'q-isolatie-2402-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2403-1', 24, 2403, 'Waar wil je isoleren?', 'Waar wil je isoleren?', 'radio', false, 'q-isolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-1-begane_grond_vloer', 'q-isolatie-2403-1', 'begane_grond_vloer', 'Begane grond vloer', 'Begane grond vloer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-1-kruipruimte', 'q-isolatie-2403-1', 'kruipruimte', 'Kruipruimte', 'Kruipruimte', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-1-anders', 'q-isolatie-2403-1', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2403-2', 24, 2403, 'Wat is de vloeroppervlakte ongeveer?', 'Wat is de vloeroppervlakte approximately?', 'radio', false, 'q-isolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-2-klein_tot_20_m', 'q-isolatie-2403-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-2-middel_2050_m', 'q-isolatie-2403-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-2-groot_50100_m', 'q-isolatie-2403-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-2-zeer_groot_100_m', 'q-isolatie-2403-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2403-3', 24, 2403, 'Moet er ook vloerverwarming meegenomen worden?', 'Should ook vloerverwarming meegenomen worden?', 'radio', false, 'q-isolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-3-ja', 'q-isolatie-2403-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2403-3-nee', 'q-isolatie-2403-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2404-1', 24, 2404, 'Wat voor afwerking wil je op de gevel?', 'What kind of afwerking wil je op de gevel?', 'radio', false, 'q-isolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-1-stucwerk', 'q-isolatie-2404-1', 'stucwerk', 'Stucwerk', 'Stucwerk', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-1-steenstrips', 'q-isolatie-2404-1', 'steenstrips', 'Steenstrips', 'Steenstrips', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-1-hout', 'q-isolatie-2404-1', 'hout', 'Hout', 'Wood', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-1-anders', 'q-isolatie-2404-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2404-2', 24, 2404, 'Moet de gevel ook gereinigd/hersteld worden vooraf?', 'Should the gevel ook gereinigd/hersteld worden vooraf?', 'radio', false, 'q-isolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-2-ja', 'q-isolatie-2404-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-2-nee', 'q-isolatie-2404-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2404-2-weet_ik_niet', 'q-isolatie-2404-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2405-1', 24, 2405, 'Wil je de zoldervloer ook als woonruimte gebruiken?', 'Wil je de zoldervloer ook als woonruimte gebruiken?', 'radio', false, 'q-isolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-1-ja', 'q-isolatie-2405-1', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-1-nee', 'q-isolatie-2405-1', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-isolatie-2405-2', 24, 2405, 'Welk isolatiemateriaal heeft je voorkeur?', 'Welk isolatiemateriaal heeft je voorkeur?', 'radio', false, 'q-isolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-2-glaswol', 'q-isolatie-2405-2', 'glaswol', 'Glaswol', 'Glaswol', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-2-pir_pur_platen', 'q-isolatie-2405-2', 'pir_pur_platen', 'PIR/PUR platen', 'PIR/PUR phave', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-2-houtvezelplaten', 'q-isolatie-2405-2', 'houtvezelplaten', 'Houtvezelplaten', 'Woodvezelphave', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-isolatie-2405-2-geen_voorkeur', 'q-isolatie-2405-2', 'geen_voorkeur', 'Geen voorkeur', 'Geen voorkeur', false, 4, true, NULL);


-- ===============================================
-- Category: Keuken (ID: 25)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-root', 25, NULL, 'Wat voor keuken-opdracht zoek je?', 'What kind of keuken-project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2501-1', 25, 2501, 'Wat voor type keuken wil je?', 'What type of keuken wil je?', 'radio', false, 'q-keuken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-1-rechte_keuken', 'q-keuken-2501-1', 'rechte_keuken', 'Rechte keuken', 'Rechte keuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-1-hoekkeuken', 'q-keuken-2501-1', 'hoekkeuken', 'Hoekkeuken', 'Hoekkeuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-1-ukeuken', 'q-keuken-2501-1', 'ukeuken', 'U-keuken', 'U-keuken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-1-keuken_met_kookeiland', 'q-keuken-2501-1', 'keuken_met_kookeiland', 'Keuken met kookeiland', 'Keuken met kookeiland', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-1-anders', 'q-keuken-2501-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2501-2', 25, 2501, 'Heb je de keuken al gekocht?', 'Do you have de keuken al gekocht?', 'radio', false, 'q-keuken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-2-ja', 'q-keuken-2501-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-2-nee', 'q-keuken-2501-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2501-3', 25, 2501, 'Moet de vakman ook oude keuken verwijderen?', 'Should the vakman ook old keuken remove?', 'radio', false, 'q-keuken-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-3-ja', 'q-keuken-2501-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2501-3-nee', 'q-keuken-2501-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2502-1', 25, 2502, 'Wat wil je laten renoveren?', 'What do you want have renoveren?', 'radio', false, 'q-keuken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-1-kastdeuren_vervangen', 'q-keuken-2502-1', 'kastdeuren_vervangen', 'Kastdeuren vervangen', 'Kastdeuren replace', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-1-keukenblad_vervangen', 'q-keuken-2502-1', 'keukenblad_vervangen', 'Keukenblad vervangen', 'Keukenblad replace', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-1-nieuwe_apparatuur', 'q-keuken-2502-1', 'nieuwe_apparatuur', 'Nieuwe apparatuur', 'Newe apparatuur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-1-volledige_renovatie', 'q-keuken-2502-1', 'volledige_renovatie', 'Volledige renovatie', 'Complete renovatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2502-2', 25, 2502, 'Moet er ook leidingwerk worden aangepast?', 'Should ook leidingwerk worden aangepast?', 'radio', false, 'q-keuken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-2-ja', 'q-keuken-2502-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-2-nee', 'q-keuken-2502-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2502-2-weet_ik_nog_niet', 'q-keuken-2502-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2503-1', 25, 2503, 'Welk materiaal wil je?', 'Welk materiaal wil je?', 'radio', false, 'q-keuken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-1-hout', 'q-keuken-2503-1', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-1-natuursteen', 'q-keuken-2503-1', 'natuursteen', 'Natuursteen', 'Natural stone', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-1-composiet', 'q-keuken-2503-1', 'composiet', 'Composiet', 'Composiet', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-1-kunststof', 'q-keuken-2503-1', 'kunststof', 'Kunststof', 'Kunststof', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-1-anders', 'q-keuken-2503-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2503-2', 25, 2503, 'Moet het oude blad verwijderd worden?', 'Should the old blad verwijderd worden?', 'radio', false, 'q-keuken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-2-ja', 'q-keuken-2503-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2503-2-nee', 'q-keuken-2503-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2504-1', 25, 2504, 'Om hoeveel kastdeuren gaat het?', 'How many kastdeuren gaat het?', 'radio', false, 'q-keuken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-1-minder_dan_5', 'q-keuken-2504-1', 'minder_dan_5', 'Minder dan 5', 'Minder dan 5', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-1-510', 'q-keuken-2504-1', '510', '5–10', '5–10', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-1-1020', 'q-keuken-2504-1', '1020', '10–20', '10–20', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-1-meer_dan_20', 'q-keuken-2504-1', 'meer_dan_20', 'Meer dan 20', 'Meer dan 20', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2504-2', 25, 2504, 'Welke afwerking wil je?', 'Which afwerking wil je?', 'radio', false, 'q-keuken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-2-hout', 'q-keuken-2504-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-2-gelakt', 'q-keuken-2504-2', 'gelakt', 'Gelakt', 'Gelakt', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-2-fineer', 'q-keuken-2504-2', 'fineer', 'Fineer', 'Fineer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2504-2-anders', 'q-keuken-2504-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2505-1', 25, 2505, 'Om welke apparatuur gaat het?', 'Om welke apparatuur gaat het?', 'radio', false, 'q-keuken-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-1-oven', 'q-keuken-2505-1', 'oven', 'Oven', 'Oven', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-1-kookplaat', 'q-keuken-2505-1', 'kookplaat', 'Kookplaat', 'Kookplaat', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-1-vaatwasser', 'q-keuken-2505-1', 'vaatwasser', 'Vaatwasser', 'Vaatwasser', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-1-koelkast', 'q-keuken-2505-1', 'koelkast', 'Koelkast', 'Koelkast', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-1-meerdere_apparaten', 'q-keuken-2505-1', 'meerdere_apparaten', 'Meerdere apparaten', 'Meerdere apparaten', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-keuken-2505-2', 25, 2505, 'Moet oude apparatuur worden verwijderd?', 'Moet old apparatuur worden verwijderd?', 'radio', false, 'q-keuken-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-2-ja', 'q-keuken-2505-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-keuken-2505-2-nee', 'q-keuken-2505-2', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Laadpaal (ID: 26)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-root', 26, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2601-1', 26, 2601, 'Waar wil je de laadpaal plaatsen?', 'Waar wil je de laadpaal install?', 'radio', false, 'q-laadpaal-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-1-oprit___voor_de_woning', 'q-laadpaal-2601-1', 'oprit___voor_de_woning', 'Oprit / voor de woning', 'Driveway / voor de woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-1-garage', 'q-laadpaal-2601-1', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-1-bedrijfsterrein', 'q-laadpaal-2601-1', 'bedrijfsterrein', 'Bedrijfsterrein', 'Bedrijfsterrein', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2601-2', 26, 2601, 'Wat voor type laadpaal wil je?', 'What type of laadpaal wil je?', 'radio', false, 'q-laadpaal-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-2-1fase_37_kw', 'q-laadpaal-2601-2', '1fase_37_kw', '1-fase (3,7 kW)', '1-fase (3,7 kW)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-2-3fase_11_kw', 'q-laadpaal-2601-2', '3fase_11_kw', '3-fase (11 kW)', '3-fase (11 kW)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-2-snel_lader_22_kw_of_meer', 'q-laadpaal-2601-2', 'snel_lader_22_kw_of_meer', 'Snel lader (22 kW of meer)', 'Snel lader (22 kW of meer)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-2-weet_ik_nog_niet', 'q-laadpaal-2601-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2601-3', 26, 2601, 'Moet de laadpaal met backoffice/app verbonden zijn?', 'Should the laadpaal met backoffice/app verbonden zijn?', 'radio', false, 'q-laadpaal-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-3-ja', 'q-laadpaal-2601-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2601-3-nee', 'q-laadpaal-2601-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2602-1', 26, 2602, 'Waarom wil je de laadpaal vervangen?', 'Why do you want to de laadpaal replace?', 'radio', false, 'q-laadpaal-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-1-defect', 'q-laadpaal-2602-1', 'defect', 'Defect', 'Defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-1-verouderd', 'q-laadpaal-2602-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-1-hogere_capaciteit_gewenst', 'q-laadpaal-2602-1', 'hogere_capaciteit_gewenst', 'Hogere capaciteit gewenst', 'Hogere capaciteit gewenst', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-1-andere_reden', 'q-laadpaal-2602-1', 'andere_reden', 'Andere reden', 'Andere reden', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2602-2', 26, 2602, 'Wat voor nieuwe laadpaal wil je?', 'What kind of nieuwe laadpaal wil je?', 'radio', false, 'q-laadpaal-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-2-1fase', 'q-laadpaal-2602-2', '1fase', '1-fase', '1-fase', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-2-3fase', 'q-laadpaal-2602-2', '3fase', '3-fase', '3-fase', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-2-snel_lader', 'q-laadpaal-2602-2', 'snel_lader', 'Snel lader', 'Snel lader', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-2-weet_ik_nog_niet', 'q-laadpaal-2602-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2602-3', 26, 2602, 'Moet de oude laadpaal verwijderd worden?', 'Should the old laadpaal verwijderd worden?', 'radio', false, 'q-laadpaal-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-3-ja', 'q-laadpaal-2602-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2602-3-nee', 'q-laadpaal-2602-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2603-1', 26, 2603, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-laadpaal-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-1-laadpaal_laadt_niet', 'q-laadpaal-2603-1', 'laadpaal_laadt_niet', 'Laadpaal laadt niet', 'Laadpaal laadt niet', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-1-kabel_defect', 'q-laadpaal-2603-1', 'kabel_defect', 'Kabel defect', 'Kabel defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-1-display_software_storing', 'q-laadpaal-2603-1', 'display_software_storing', 'Display/software storing', 'Display/software storing', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-1-anders', 'q-laadpaal-2603-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-laadpaal-2603-2', 26, 2603, 'Hoe oud is de laadpaal ongeveer?', 'Hoe oud is de laadpaal approximately?', 'radio', false, 'q-laadpaal-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-2-02_jaar', 'q-laadpaal-2603-2', '02_jaar', '0–2 jaar', '0–2 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-2-25_jaar', 'q-laadpaal-2603-2', '25_jaar', '2–5 jaar', '2–5 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-2-510_jaar', 'q-laadpaal-2603-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-laadpaal-2603-2-ouder_dan_10_jaar', 'q-laadpaal-2603-2', 'ouder_dan_10_jaar', 'Ouder dan 10 jaar', 'Oldr dan 10 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Loodgieter (ID: 27)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-root', 27, NULL, 'Wat voor type loodgieterswerk zoek je?', 'What type of loodgieterswerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2701-1', 27, 2701, 'Wat moet er geïnstalleerd worden?', 'Wat moet er geïnstalleerd worden?', 'radio', false, 'q-loodgieter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-1-waterleiding', 'q-loodgieter-2701-1', 'waterleiding', 'Waterleiding', 'Waterleiding', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-1-afvoer', 'q-loodgieter-2701-1', 'afvoer', 'Afvoer', 'Afvoer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-1-sanitaire_voorzieningen_toilet_douche_bad', 'q-loodgieter-2701-1', 'sanitaire_voorzieningen_toilet_douche_bad', 'Sanitaire voorzieningen (toilet, douche, bad)', 'Sanitaire voorzieningen (toilet, douche, bad)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-1-keuken_aansluiting', 'q-loodgieter-2701-1', 'keuken_aansluiting', 'Keuken aansluiting', 'Keuken aansluiting', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-1-anders', 'q-loodgieter-2701-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2701-2', 27, 2701, 'Voor welk type gebouw?', 'Voor welk type gebouw?', 'radio', false, 'q-loodgieter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-2-woning', 'q-loodgieter-2701-2', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-2-appartement', 'q-loodgieter-2701-2', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-2-bedrijfspand', 'q-loodgieter-2701-2', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2701-3', 27, 2701, 'Moet de loodgieter ook materiaal leveren?', 'Should the loodgieter ook materiaal leveren?', 'radio', false, 'q-loodgieter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-3-ja', 'q-loodgieter-2701-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2701-3-nee', 'q-loodgieter-2701-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2702-1', 27, 2702, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-loodgieter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-1-lekkende_kraan', 'q-loodgieter-2702-1', 'lekkende_kraan', 'Lekkende kraan', 'Lekkende kraan', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-1-lekkende_leiding', 'q-loodgieter-2702-1', 'lekkende_leiding', 'Lekkende leiding', 'Lekkende leiding', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-1-verstopt_toilet_of_afvoer', 'q-loodgieter-2702-1', 'verstopt_toilet_of_afvoer', 'Verstopt toilet of afvoer', 'Verstopt toilet of afvoer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-1-cvleiding_probleem', 'q-loodgieter-2702-1', 'cvleiding_probleem', 'Cv-leiding probleem', 'Cv-leiding probleem', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-1-anders', 'q-loodgieter-2702-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2702-2', 27, 2702, 'Waar bevindt het probleem zich?', 'Waar bevindt het probleem zich?', 'radio', false, 'q-loodgieter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-2-keuken', 'q-loodgieter-2702-2', 'keuken', 'Keuken', 'Keuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-2-badkamer', 'q-loodgieter-2702-2', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-2-toilet', 'q-loodgieter-2702-2', 'toilet', 'Toilet', 'Toilet', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-2-anders', 'q-loodgieter-2702-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2702-3', 27, 2702, 'Hoe dringend is de reparatie?', 'Hoe dringend is de reparatie?', 'radio', false, 'q-loodgieter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-3-zeer_dringend_spoed', 'q-loodgieter-2702-3', 'zeer_dringend_spoed', 'Zeer dringend (spoed)', 'Zeer dringend (spoed)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-3-binnen_enkele_dagen', 'q-loodgieter-2702-3', 'binnen_enkele_dagen', 'Binnen enkele dagen', 'Indoor enkele dagen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2702-3-geen_haast', 'q-loodgieter-2702-3', 'geen_haast', 'Geen haast', 'Geen haast', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2703-1', 27, 2703, 'Wat wil je laten onderhouden?', 'What do you want have maintain?', 'radio', false, 'q-loodgieter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-1-leidingwerk_controleren', 'q-loodgieter-2703-1', 'leidingwerk_controleren', 'Leidingwerk controleren', 'Leidingwerk controleren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-1-cvleidingen_spoelen', 'q-loodgieter-2703-1', 'cvleidingen_spoelen', 'Cv-leidingen spoelen', 'Cv-leidingen spoelen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-1-waterdruk_regelen', 'q-loodgieter-2703-1', 'waterdruk_regelen', 'Waterdruk regelen', 'Waterdruk regelen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-1-complete_installatie_nakijken', 'q-loodgieter-2703-1', 'complete_installatie_nakijken', 'Complete installatie nakijken', 'Complete installatie nakijken', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2703-2', 27, 2703, 'Hoe vaak wil je onderhoud?', 'How often wil je onderhoud?', 'radio', false, 'q-loodgieter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-2-eenmalig', 'q-loodgieter-2703-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-2-jaarlijks', 'q-loodgieter-2703-2', 'jaarlijks', 'Jaarlijks', 'Yesarlijks', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2703-2-halfjaarlijks', 'q-loodgieter-2703-2', 'halfjaarlijks', 'Halfjaarlijks', 'Halfjaarlijks', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2704-1', 27, 2704, 'Wat is verstopt?', 'Wat is verstopt?', 'radio', false, 'q-loodgieter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-1-toilet', 'q-loodgieter-2704-1', 'toilet', 'Toilet', 'Toilet', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-1-afvoer_keuken', 'q-loodgieter-2704-1', 'afvoer_keuken', 'Afvoer keuken', 'Afvoer keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-1-douche_bad', 'q-loodgieter-2704-1', 'douche_bad', 'Douche/bad', 'Douche/bad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-1-hoofdleiding', 'q-loodgieter-2704-1', 'hoofdleiding', 'Hoofdleiding', 'Hoofdleiding', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2704-2', 27, 2704, 'Hoe ernstig is de verstopping?', 'Hoe ernstig is de verstopping?', 'radio', false, 'q-loodgieter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-2-water_loopt_langzaam_weg', 'q-loodgieter-2704-2', 'water_loopt_langzaam_weg', 'Water loopt langzaam weg', 'Water loopt langzaam weg', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-2-helemaal_verstopt', 'q-loodgieter-2704-2', 'helemaal_verstopt', 'Helemaal verstopt', 'Helemaal verstopt', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-loodgieter-2704-3', 27, 2704, 'Hoe dringend is het?', 'Hoe dringend is het?', 'radio', false, 'q-loodgieter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-3-zeer_dringend_spoed', 'q-loodgieter-2704-3', 'zeer_dringend_spoed', 'Zeer dringend (spoed)', 'Zeer dringend (spoed)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-3-binnen_enkele_dagen', 'q-loodgieter-2704-3', 'binnen_enkele_dagen', 'Binnen enkele dagen', 'Indoor enkele dagen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-loodgieter-2704-3-geen_haast', 'q-loodgieter-2704-3', 'geen_haast', 'Geen haast', 'Geen haast', false, 3, true, NULL);


-- ===============================================
-- Category: Maatwerk (ID: 28)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-root', 28, NULL, 'Wat voor maatwerk zoek je?', 'What kind of maatwerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2801-1', 28, 2801, 'Om wat voor kast gaat het?', 'Om wat voor kast gaat het?', 'radio', false, 'q-maatwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-1-kledingkast', 'q-maatwerk-2801-1', 'kledingkast', 'Kledingkast', 'Kledingkast', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-1-inbouwkast', 'q-maatwerk-2801-1', 'inbouwkast', 'Inbouwkast', 'Inbouwkast', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-1-boekenkast', 'q-maatwerk-2801-1', 'boekenkast', 'Boekenkast', 'Boekenkast', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-1-tv_wandmeubel', 'q-maatwerk-2801-1', 'tv_wandmeubel', 'TV-/wandmeubel', 'TV-/wandmeubel', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-1-anders', 'q-maatwerk-2801-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2801-2', 28, 2801, 'Waar moet de kast geplaatst worden?', 'Where should de kast geplaatst worden?', 'radio', false, 'q-maatwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-2-slaapkamer', 'q-maatwerk-2801-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-2-woonkamer', 'q-maatwerk-2801-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-2-hal', 'q-maatwerk-2801-2', 'hal', 'Hal', 'Hal', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-2-zolder', 'q-maatwerk-2801-2', 'zolder', 'Zolder', 'Zolder', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-2-anders', 'q-maatwerk-2801-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2801-3', 28, 2801, 'Welke afwerking wil je?', 'Which afwerking wil je?', 'radio', false, 'q-maatwerk-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-3-hout', 'q-maatwerk-2801-3', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-3-gelakt', 'q-maatwerk-2801-3', 'gelakt', 'Gelakt', 'Gelakt', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-3-fineer', 'q-maatwerk-2801-3', 'fineer', 'Fineer', 'Fineer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2801-3-anders', 'q-maatwerk-2801-3', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2802-1', 28, 2802, 'Wat voor type keuken wil je?', 'What type of keuken wil je?', 'radio', false, 'q-maatwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-1-hoekkeuken', 'q-maatwerk-2802-1', 'hoekkeuken', 'Hoekkeuken', 'Hoekkeuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-1-rechte_keuken', 'q-maatwerk-2802-1', 'rechte_keuken', 'Rechte keuken', 'Rechte keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-1-kookeiland', 'q-maatwerk-2802-1', 'kookeiland', 'Kookeiland', 'Kookeiland', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-1-anders', 'q-maatwerk-2802-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2802-2', 28, 2802, 'Heb je al een ontwerp of plan?', 'Do you have al een ontwerp of plan?', 'radio', false, 'q-maatwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-2-ja', 'q-maatwerk-2802-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-2-nee', 'q-maatwerk-2802-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2802-3', 28, 2802, 'Moet de schrijnwerker ook toestellen leveren?', 'Should the schrijnwerker ook toestellen leveren?', 'radio', false, 'q-maatwerk-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-3-ja', 'q-maatwerk-2802-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2802-3-nee', 'q-maatwerk-2802-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2803-1', 28, 2803, 'Om wat voor meubel gaat het?', 'Om wat voor meubel gaat het?', 'radio', false, 'q-maatwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-1-tafel', 'q-maatwerk-2803-1', 'tafel', 'Tafel', 'Tafel', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-1-bureau', 'q-maatwerk-2803-1', 'bureau', 'Bureau', 'Bureau', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-1-dressoir', 'q-maatwerk-2803-1', 'dressoir', 'Dressoir', 'Dressoir', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-1-ander_meubel', 'q-maatwerk-2803-1', 'ander_meubel', 'Ander meubel', 'Ander meubel', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2803-2', 28, 2803, 'Waar komt het meubel te staan?', 'Waar komt het meubel te staan?', 'radio', false, 'q-maatwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-2-woonkamer', 'q-maatwerk-2803-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-2-slaapkamer', 'q-maatwerk-2803-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-2-kantoor', 'q-maatwerk-2803-2', 'kantoor', 'Kantoor', 'Kantoor', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2803-2-anders', 'q-maatwerk-2803-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2804-1', 28, 2804, 'Om wat voor project gaat het?', 'Om wat voor project gaat het?', 'radio', false, 'q-maatwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-1-deuren', 'q-maatwerk-2804-1', 'deuren', 'Deuren', 'Deuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-1-trappen', 'q-maatwerk-2804-1', 'trappen', 'Trappen', 'Trappen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-1-wandbekleding', 'q-maatwerk-2804-1', 'wandbekleding', 'Wandbekleding', 'Wandbekleding', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-1-anders', 'q-maatwerk-2804-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-maatwerk-2804-2', 28, 2804, 'Heb je al een ontwerp of idee?', 'Do you have al een ontwerp of idee?', 'radio', false, 'q-maatwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-2-ja_een_schets_of_plan', 'q-maatwerk-2804-2', 'ja_een_schets_of_plan', 'Ja, een schets of plan', 'Yes, een schets of plan', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-maatwerk-2804-2-nee_ik_zoek_advies', 'q-maatwerk-2804-2', 'nee_ik_zoek_advies', 'Nee, ik zoek advies', 'No, ik zoek advies', false, 2, true, NULL);


-- ===============================================
-- Category: Metselaar (ID: 29)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-root', 29, NULL, 'Wat voor type metselopdracht zoek je?', 'What type of metselproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2901-1', 29, 2901, 'Om welk type project gaat het?', 'Om welk type project gaat het?', 'radio', false, 'q-metselaar-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-1-woning', 'q-metselaar-2901-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-1-garage', 'q-metselaar-2901-1', 'garage', 'Garage', 'Garage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-1-schuur_aanbouw', 'q-metselaar-2901-1', 'schuur_aanbouw', 'Schuur/aanbouw', 'Schuur/aanbouw', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-1-anders', 'q-metselaar-2901-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2901-2', 29, 2901, 'Hoe groot is het project?', 'How large is het project?', 'radio', false, 'q-metselaar-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-2-klein_tot_10_m', 'q-metselaar-2901-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-2-middel_1050_m', 'q-metselaar-2901-2', 'middel_1050_m', 'Middel (10–50 m²)', 'Medium (10-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-2-groot_50200_m', 'q-metselaar-2901-2', 'groot_50200_m', 'Groot (50–200 m²)', 'Large (50-200 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-2-zeer_groot_200_m', 'q-metselaar-2901-2', 'zeer_groot_200_m', 'Zeer groot (200+ m²)', 'Very large (200+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2901-3', 29, 2901, 'Moet de metselaar ook de materialen leveren?', 'Should the metselaar ook de materialen leveren?', 'radio', false, 'q-metselaar-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-3-ja', 'q-metselaar-2901-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2901-3-nee', 'q-metselaar-2901-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2902-1', 29, 2902, 'Wat moet er hersteld worden?', 'Wat moet er hersteld worden?', 'radio', false, 'q-metselaar-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-1-scheuren_in_muur', 'q-metselaar-2902-1', 'scheuren_in_muur', 'Scheuren in muur', 'Scheuren in muur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-1-uitgebroken_stenen_vervangen', 'q-metselaar-2902-1', 'uitgebroken_stenen_vervangen', 'Uitgebroken stenen vervangen', 'Uitgebroken stenen replace', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-1-deel_van_muur_opnieuw_opbouwen', 'q-metselaar-2902-1', 'deel_van_muur_opnieuw_opbouwen', 'Deel van muur opnieuw opbouwen', 'Deel van muur opnieuw opbouwen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-1-anders', 'q-metselaar-2902-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2902-2', 29, 2902, 'Waar gaat het om?', 'Waar gaat het om?', 'radio', false, 'q-metselaar-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-2-buitenmuur', 'q-metselaar-2902-2', 'buitenmuur', 'Buitenmuur', 'Outdoormuur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-2-binnenmuur', 'q-metselaar-2902-2', 'binnenmuur', 'Binnenmuur', 'Indoormuur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-2-schouw___open_haard', 'q-metselaar-2902-2', 'schouw___open_haard', 'Schouw / open haard', 'Schouw / open haard', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-2-anders', 'q-metselaar-2902-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2902-3', 29, 2902, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-metselaar-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-3-klein_enkele_stenen', 'q-metselaar-2902-3', 'klein_enkele_stenen', 'Klein (enkele stenen)', 'Small (enkele stenen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-3-middel_deel_van_muur', 'q-metselaar-2902-3', 'middel_deel_van_muur', 'Middel (deel van muur)', 'Medium (deel van muur)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2902-3-groot_hele_muur', 'q-metselaar-2902-3', 'groot_hele_muur', 'Groot (hele muur)', 'Large (hele muur)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2903-1', 29, 2903, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-metselaar-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-1-bestaande_voegen_herstellen', 'q-metselaar-2903-1', 'bestaande_voegen_herstellen', 'Bestaande voegen herstellen', 'Existing voegen herstellen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-1-hele_muur_opnieuw_voegen', 'q-metselaar-2903-1', 'hele_muur_opnieuw_voegen', 'Hele muur opnieuw voegen', 'Hele muur opnieuw voegen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-1-voegwerk_verwijderen__vervangen', 'q-metselaar-2903-1', 'voegwerk_verwijderen__vervangen', 'Voegwerk verwijderen \+ vervangen', 'Voegwerk remove \+ replace', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2903-2', 29, 2903, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-metselaar-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-2-klein_tot_10_m', 'q-metselaar-2903-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-2-middel_1050_m', 'q-metselaar-2903-2', 'middel_1050_m', 'Middel (10–50 m²)', 'Medium (10-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-2-groot_50200_m', 'q-metselaar-2903-2', 'groot_50200_m', 'Groot (50–200 m²)', 'Large (50-200 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-2-zeer_groot_200_m', 'q-metselaar-2903-2', 'zeer_groot_200_m', 'Zeer groot (200+ m²)', 'Very large (200+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2903-3', 29, 2903, 'Moet de muur vooraf ook gereinigd worden?', 'Should the muur vooraf ook gereinigd worden?', 'radio', false, 'q-metselaar-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-3-ja', 'q-metselaar-2903-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2903-3-nee', 'q-metselaar-2903-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2904-1', 29, 2904, 'Wat wil je laten bouwen?', 'What do you want have bouwen?', 'radio', false, 'q-metselaar-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-1-tuinmuur', 'q-metselaar-2904-1', 'tuinmuur', 'Tuinmuur', 'Gardenmuur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-1-decoratieve_muur___sierwand', 'q-metselaar-2904-1', 'decoratieve_muur___sierwand', 'Decoratieve muur / sierwand', 'Decoratieve muur / sierwand', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-1-schuttingfundering', 'q-metselaar-2904-1', 'schuttingfundering', 'Schuttingfundering', 'Schuttingfundering', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-1-anders', 'q-metselaar-2904-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2904-2', 29, 2904, 'Hoe hoog moet de muur ongeveer zijn?', 'How high moet de muur approximately zijn?', 'radio', false, 'q-metselaar-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-2-tot_1_meter', 'q-metselaar-2904-2', 'tot_1_meter', 'Tot 1 meter', 'Up to 1 meter', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-2-12_meter', 'q-metselaar-2904-2', '12_meter', '1–2 meter', '1-2 meters', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-2-hoger_dan_2_meter', 'q-metselaar-2904-2', 'hoger_dan_2_meter', 'Hoger dan 2 meter', 'Higher than 2 meters', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-metselaar-2904-3', 29, 2904, 'Wil je ook een afwerking bovenop de muur?', 'Wil je ook een afwerking bovenop de muur?', 'radio', false, 'q-metselaar-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-3-ja_bijvoorbeeld_natuursteen_afdekkers', 'q-metselaar-2904-3', 'ja_bijvoorbeeld_natuursteen_afdekkers', 'Ja (bijvoorbeeld natuursteen afdekkers)', 'Yes (bijvoorbeeld natuursteen afdekkers)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-metselaar-2904-3-nee', 'q-metselaar-2904-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Muurisolatie (ID: 30)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-root', 30, NULL, 'Wat voor type muur wil je isoleren?', 'What type of muur wil je isoleren?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3001-1', 30, 3001, 'Wat voor woning heb je?', 'What kind of woning heb je?', 'radio', false, 'q-muurisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-1-rijtjeshuis', 'q-muurisolatie-3001-1', 'rijtjeshuis', 'Rijtjeshuis', 'Rijtjeshuis', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-1-hoekwoning', 'q-muurisolatie-3001-1', 'hoekwoning', 'Hoekwoning', 'Hoekwoning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-1-tweeondereenkap', 'q-muurisolatie-3001-1', 'tweeondereenkap', 'Twee-onder-een-kap', 'Twee-onder-een-kap', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-1-vrijstaande_woning', 'q-muurisolatie-3001-1', 'vrijstaande_woning', 'Vrijstaande woning', 'Vrijstaande woning', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-1-appartement', 'q-muurisolatie-3001-1', 'appartement', 'Appartement', 'Appartement', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3001-2', 30, 3001, 'Weet je of de spouwmuur al geïsoleerd is?', 'Weet je of de spouwmuur al geïsoleerd is?', 'radio', false, 'q-muurisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-2-ja_maar_deels', 'q-muurisolatie-3001-2', 'ja_maar_deels', 'Ja, maar deels', 'Yes, maar deels', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-2-nee', 'q-muurisolatie-3001-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-2-weet_ik_niet', 'q-muurisolatie-3001-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3001-3', 30, 3001, 'Wat is de oppervlakte ongeveer?', 'Wat is de oppervlakte approximately?', 'radio', false, 'q-muurisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-3-klein_tot_30_m', 'q-muurisolatie-3001-3', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-3-middel_3075_m', 'q-muurisolatie-3001-3', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-3-groot_75150_m', 'q-muurisolatie-3001-3', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3001-3-zeer_groot_150_m', 'q-muurisolatie-3001-3', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3002-1', 30, 3002, 'Voor welke ruimte(s)?', 'Voor welke ruimte(s)?', 'radio', false, 'q-muurisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-1-woonkamer', 'q-muurisolatie-3002-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-1-slaapkamer', 'q-muurisolatie-3002-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-1-zolder', 'q-muurisolatie-3002-1', 'zolder', 'Zolder', 'Zolder', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-1-meerdere_ruimtes', 'q-muurisolatie-3002-1', 'meerdere_ruimtes', 'Meerdere ruimtes', 'Meerdere ruimtes', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3002-2', 30, 3002, 'Welke afwerking wil je na isolatie?', 'Which afwerking wil je na isolatie?', 'radio', false, 'q-muurisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-2-gipsplaten', 'q-muurisolatie-3002-2', 'gipsplaten', 'Gipsplaten', 'Gipsphave', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-2-stucwerk', 'q-muurisolatie-3002-2', 'stucwerk', 'Stucwerk', 'Stucwerk', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-2-anders', 'q-muurisolatie-3002-2', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3002-3', 30, 3002, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-muurisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-3-klein_tot_20_m', 'q-muurisolatie-3002-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-3-middel_2050_m', 'q-muurisolatie-3002-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-3-groot_50100_m', 'q-muurisolatie-3002-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3002-3-zeer_groot_100_m', 'q-muurisolatie-3002-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3003-1', 30, 3003, 'Wat voor afwerking wil je op de gevel?', 'What kind of afwerking wil je op de gevel?', 'radio', false, 'q-muurisolatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-1-stucwerk', 'q-muurisolatie-3003-1', 'stucwerk', 'Stucwerk', 'Stucwerk', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-1-steenstrips', 'q-muurisolatie-3003-1', 'steenstrips', 'Steenstrips', 'Steenstrips', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-1-hout', 'q-muurisolatie-3003-1', 'hout', 'Hout', 'Wood', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-1-anders', 'q-muurisolatie-3003-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3003-2', 30, 3003, 'Moet de gevel ook gereinigd/hersteld worden vooraf?', 'Should the gevel ook gereinigd/hersteld worden vooraf?', 'radio', false, 'q-muurisolatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-2-ja', 'q-muurisolatie-3003-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-2-nee', 'q-muurisolatie-3003-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-2-weet_ik_niet', 'q-muurisolatie-3003-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-muurisolatie-3003-3', 30, 3003, 'Hoe groot is de gevel ongeveer?', 'How large is de gevel approximately?', 'radio', false, 'q-muurisolatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-3-klein_tot_30_m', 'q-muurisolatie-3003-3', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-3-middel_3075_m', 'q-muurisolatie-3003-3', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-3-groot_75150_m', 'q-muurisolatie-3003-3', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-muurisolatie-3003-3-zeer_groot_150_m', 'q-muurisolatie-3003-3', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

-- Total Questions: 112
-- Total Options: 371


-- ===============================================
-- Categories 31-40 - AUTO GENERATED
-- ===============================================

-- ===============================================
-- Category: Nieuwbouw (ID: 31)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-root', 31, NULL, 'Wat voor type nieuwbouw zoek je?', 'What type of nieuwbouw are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3101-1', 31, 3101, 'Wat voor type woning wil je bouwen?', 'What type of woning wil je bouwen?', 'radio', false, 'q-nieuwbouw-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-1-vrijstaand_huis', 'q-nieuwbouw-3101-1', 'vrijstaand_huis', 'Vrijstaand huis', 'Vrijstaand huis', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-1-tweeondereenkap', 'q-nieuwbouw-3101-1', 'tweeondereenkap', 'Twee-onder-een-kap', 'Twee-onder-een-kap', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-1-rijtjeswoning', 'q-nieuwbouw-3101-1', 'rijtjeswoning', 'Rijtjeswoning', 'Rijtjeswoning', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-1-villa', 'q-nieuwbouw-3101-1', 'villa', 'Villa', 'Villa', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3101-2', 31, 3101, 'Heb je al een ontwerp of bouwplan?', 'Do you have al een ontwerp of bouwplan?', 'radio', false, 'q-nieuwbouw-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-2-ja', 'q-nieuwbouw-3101-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-2-nee', 'q-nieuwbouw-3101-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3101-3', 31, 3101, 'Heb je al een bouwgrond?', 'Do you have al een bouwgrond?', 'radio', false, 'q-nieuwbouw-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-3-ja', 'q-nieuwbouw-3101-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3101-3-nee', 'q-nieuwbouw-3101-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3102-1', 31, 3102, 'Gaat het om 1 appartement of een gebouw met meerdere units?', 'Gaat het om 1 appartement of een gebouw met meerdere units?', 'radio', false, 'q-nieuwbouw-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-1-1_appartement', 'q-nieuwbouw-3102-1', '1_appartement', '1 appartement', '1 appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-1-meerdere_appartementen', 'q-nieuwbouw-3102-1', 'meerdere_appartementen', 'Meerdere appartementen', 'Meerdere appartementen', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3102-2', 31, 3102, 'Is er al een architect ingeschakeld?', 'Is er al een architect ingeschakeld?', 'radio', false, 'q-nieuwbouw-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-2-ja', 'q-nieuwbouw-3102-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-2-nee', 'q-nieuwbouw-3102-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3102-3', 31, 3102, 'Moet de aannemer ook de ruwbouw én afwerking doen?', 'Should the aannemer ook de ruwbouw én afwerking doen?', 'radio', false, 'q-nieuwbouw-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-3-alleen_ruwbouw', 'q-nieuwbouw-3102-3', 'alleen_ruwbouw', 'Alleen ruwbouw', 'Alleen ruwbouw', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3102-3-ruwbouw__afwerking', 'q-nieuwbouw-3102-3', 'ruwbouw__afwerking', 'Ruwbouw \+ afwerking', 'Ruwbouw \+ afwerking', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3103-1', 31, 3103, 'Wat wil je laten bouwen?', 'What do you want have bouwen?', 'radio', false, 'q-nieuwbouw-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-1-garage', 'q-nieuwbouw-3103-1', 'garage', 'Garage', 'Garage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-1-carport', 'q-nieuwbouw-3103-1', 'carport', 'Carport', 'Carport', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-1-tuinhuis_poolhouse', 'q-nieuwbouw-3103-1', 'tuinhuis_poolhouse', 'Tuinhuis/poolhouse', 'Gardenhuis/poolhouse', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-1-ander_bijgebouw', 'q-nieuwbouw-3103-1', 'ander_bijgebouw', 'Ander bijgebouw', 'Ander bijgebouw', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3103-2', 31, 3103, 'Van welk materiaal?', 'Van welk materiaal?', 'radio', false, 'q-nieuwbouw-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-2-steen_beton', 'q-nieuwbouw-3103-2', 'steen_beton', 'Steen/beton', 'Steen/beton', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-2-hout', 'q-nieuwbouw-3103-2', 'hout', 'Hout', 'Wood', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-2-anders', 'q-nieuwbouw-3103-2', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3103-3', 31, 3103, 'Hoe groot moet het gebouw zijn?', 'How large moet het gebouw zijn?', 'radio', false, 'q-nieuwbouw-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-3-klein_tot_20_m', 'q-nieuwbouw-3103-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-3-middel_2050_m', 'q-nieuwbouw-3103-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3103-3-groot_50_m', 'q-nieuwbouw-3103-3', 'groot_50_m', 'Groot (50+ m²)', 'Large (50+ m²)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3104-1', 31, 3104, 'Wat voor type bedrijfspand?', 'What type of bedrijfspand?', 'radio', false, 'q-nieuwbouw-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-1-kantoor', 'q-nieuwbouw-3104-1', 'kantoor', 'Kantoor', 'Kantoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-1-magazijn', 'q-nieuwbouw-3104-1', 'magazijn', 'Magazijn', 'Magazijn', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-1-winkelpand', 'q-nieuwbouw-3104-1', 'winkelpand', 'Winkelpand', 'Winkelpand', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-1-anders', 'q-nieuwbouw-3104-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3104-2', 31, 3104, 'Hoe groot moet het pand zijn?', 'How large moet het pand zijn?', 'radio', false, 'q-nieuwbouw-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-2-klein_tot_100_m', 'q-nieuwbouw-3104-2', 'klein_tot_100_m', 'Klein (tot 100 m²)', 'Small (tot 100 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-2-middel_100500_m', 'q-nieuwbouw-3104-2', 'middel_100500_m', 'Middel (100–500 m²)', 'Medium (100–500 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-2-groot_5001000_m', 'q-nieuwbouw-3104-2', 'groot_5001000_m', 'Groot (500–1000 m²)', 'Large (500–1000 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-2-zeer_groot_1000_m', 'q-nieuwbouw-3104-2', 'zeer_groot_1000_m', 'Zeer groot (1000+ m²)', 'Very large (1000+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-nieuwbouw-3104-3', 31, 3104, 'Heb je al een ontwerp?', 'Do you have al een ontwerp?', 'radio', false, 'q-nieuwbouw-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-3-ja', 'q-nieuwbouw-3104-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-nieuwbouw-3104-3-nee', 'q-nieuwbouw-3104-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Omheining (ID: 32)
-- ===============================================


-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-root', 32, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuwe omheining plaatsen (ID: 3201)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3201-1', 32, 3201, 'Welk type omheining wil je?', 'What type of enclosure do you want?', 'radio', false, 'q-omheining-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-1-houten_schutting', 'q-omheining-3201-1', 'houten_schutting', 'Houten schutting', 'Wooden fence', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-1-draadomheining', 'q-omheining-3201-1', 'draadomheining', 'Draadomheining', 'Wire fencing', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-1-steenkorven_gabion', 'q-omheining-3201-1', 'steenkorven_gabion', 'Steenkorven (gabion)', 'Stone baskets (gabion)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-1-betonplaten', 'q-omheining-3201-1', 'betonplaten', 'Betonplaten', 'Concrete panels', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-1-anders', 'q-omheining-3201-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3201-2', 32, 3201, 'Hoe hoog moet de omheining zijn?', 'How high should the enclosure be?', 'radio', false, 'q-omheining-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-2-tot_1_meter', 'q-omheining-3201-2', 'tot_1_meter', 'Tot 1 meter', 'Up to 1 meter', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-2-1_2_meter', 'q-omheining-3201-2', '1_2_meter', '1–2 meter', '1-2 meters', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-2-hoger_dan_2_meter', 'q-omheining-3201-2', 'hoger_dan_2_meter', 'Hoger dan 2 meter', 'Higher than 2 meters', false, 3, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3201-3', 32, 3201, 'Hoe lang moet de omheining ongeveer zijn?', 'How long should the enclosure be approximately?', 'radio', false, 'q-omheining-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-3-kort_tot_10_meter', 'q-omheining-3201-3', 'kort_tot_10_meter', 'Kort (tot 10 meter)', 'Short (up to 10 meters)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-3-middel_10_30_meter', 'q-omheining-3201-3', 'middel_10_30_meter', 'Middel (10–30 meter)', 'Medium (10-30 meters)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-3-lang_30_60_meter', 'q-omheining-3201-3', 'lang_30_60_meter', 'Lang (30–60 meter)', 'Long (30-60 meters)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3201-3-zeer_lang_60_meter', 'q-omheining-3201-3', 'zeer_lang_60_meter', 'Zeer lang (60+ meter)', 'Very long (60+ meters)', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Bestaande omheining vervangen (ID: 3202)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3202-1', 32, 3202, 'Welk type omheining wil je vervangen?', 'What type of enclosure do you want to replace?', 'radio', false, 'q-omheining-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-1-houten_schutting', 'q-omheining-3202-1', 'houten_schutting', 'Houten schutting', 'Wooden fence', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-1-draadomheining', 'q-omheining-3202-1', 'draadomheining', 'Draadomheining', 'Wire fencing', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-1-steenkorven', 'q-omheining-3202-1', 'steenkorven', 'Steenkorven', 'Stone baskets', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-1-betonplaten', 'q-omheining-3202-1', 'betonplaten', 'Betonplaten', 'Concrete panels', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-1-anders', 'q-omheining-3202-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3202-2', 32, 3202, 'Waarom wil je de omheining vervangen?', 'Why do you want to replace the enclosure?', 'radio', false, 'q-omheining-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-2-beschadigd', 'q-omheining-3202-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-2-verouderd', 'q-omheining-3202-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-2-andere_stijl_gewenst', 'q-omheining-3202-2', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Different style desired', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-2-anders', 'q-omheining-3202-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3202-3', 32, 3202, 'Moet de oude omheining verwijderd worden?', 'Should the old enclosure be removed?', 'radio', false, 'q-omheining-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-3-ja', 'q-omheining-3202-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3202-3-nee', 'q-omheining-3202-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Omheining repareren (ID: 3203)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3203-1', 32, 3203, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-omheining-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-1-losse_palen', 'q-omheining-3203-1', 'losse_palen', 'Losse palen', 'Loose posts', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-1-kapotte_panelen', 'q-omheining-3203-1', 'kapotte_panelen', 'Kapotte panelen', 'Broken panels', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-1-draad_beschadigd', 'q-omheining-3203-1', 'draad_beschadigd', 'Draad beschadigd', 'Wire damaged', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-1-anders', 'q-omheining-3203-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-omheining-3203-2', 32, 3203, 'Hoe groot is de schade?', 'How large is the damage?', 'radio', false, 'q-omheining-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-2-klein_enkele_meters', 'q-omheining-3203-2', 'klein_enkele_meters', 'Klein (enkele meters)', 'Small (few meters)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-2-middel_10_30_meter', 'q-omheining-3203-2', 'middel_10_30_meter', 'Middel (10–30 meter)', 'Medium (10-30 meters)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-omheining-3203-2-groot_30_meter', 'q-omheining-3203-2', 'groot_30_meter', 'Groot (30+ meter)', 'Large (30+ meters)', false, 3, true, NULL);


-- ===============================================
-- Category: Ongediertebestrijding (ID: 33)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-root', 33, NULL, 'Met welk soort ongedierte heb je last?', 'Met welk soort ongedierte heb je last?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3301-1', 33, 3301, 'Waar zit het probleem?', 'Waar zit het probleem?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3301-1-binnen_woning_kantoor', 'q-ongediertebestrijding-3301-1', 'binnen_woning_kantoor', 'Binnen (woning/kantoor)', 'Indoor (woning/kantoor)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3301-1-buiten_tuin_garage_schuur', 'q-ongediertebestrijding-3301-1', 'buiten_tuin_garage_schuur', 'Buiten (tuin/garage/schuur)', 'Outdoor (garden/garage/schuur)', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3301-2', 33, 3301, 'Hoe ernstig is de plaag?', 'Hoe ernstig is de plaag?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3301-2-enkele_muizen_ratten', 'q-ongediertebestrijding-3301-2', 'enkele_muizen_ratten', 'Enkele muizen/ratten', 'Enkele muizen/ratten', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3301-2-meerdere_nesten', 'q-ongediertebestrijding-3301-2', 'meerdere_nesten', 'Meerdere nesten', 'Meerdere nesten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3301-2-grote_plaag', 'q-ongediertebestrijding-3301-2', 'grote_plaag', 'Grote plaag', 'Grote plaag', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3302-1', 33, 3302, 'Waar zit het nest?', 'Waar zit het nest?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-1-in_huis', 'q-ongediertebestrijding-3302-1', 'in_huis', 'In huis', 'In huis', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-1-in_de_spouwmuur', 'q-ongediertebestrijding-3302-1', 'in_de_spouwmuur', 'In de spouwmuur', 'In de spouwmuur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-1-in_de_tuin', 'q-ongediertebestrijding-3302-1', 'in_de_tuin', 'In de tuin', 'In de garden', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-1-dak_of_schoorsteen', 'q-ongediertebestrijding-3302-1', 'dak_of_schoorsteen', 'Dak of schoorsteen', 'Dak of schoorsteen', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3302-2', 33, 3302, 'Hoe groot is het nest?', 'How large is het nest?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-2-klein', 'q-ongediertebestrijding-3302-2', 'klein', 'Klein', 'Small', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-2-middel', 'q-ongediertebestrijding-3302-2', 'middel', 'Middel', 'Medium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-2-groot', 'q-ongediertebestrijding-3302-2', 'groot', 'Groot', 'Large', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3302-2-weet_ik_niet', 'q-ongediertebestrijding-3302-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3303-1', 33, 3303, 'Waar heb je last van kakkerlakken?', 'Waar heb je last van kakkerlakken?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-1-keuken', 'q-ongediertebestrijding-3303-1', 'keuken', 'Keuken', 'Keuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-1-badkamer', 'q-ongediertebestrijding-3303-1', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-1-hele_woning_pand', 'q-ongediertebestrijding-3303-1', 'hele_woning_pand', 'Hele woning/pand', 'Hele woning/pand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3303-2', 33, 3303, 'Hoe ernstig is het probleem?', 'Hoe ernstig is het probleem?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-2-af_en_toe', 'q-ongediertebestrijding-3303-2', 'af_en_toe', 'Af en toe', 'Af en toe', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-2-regelmatig', 'q-ongediertebestrijding-3303-2', 'regelmatig', 'Regelmatig', 'Regelmatig', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3303-2-grote_plaag', 'q-ongediertebestrijding-3303-2', 'grote_plaag', 'Grote plaag', 'Grote plaag', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3304-1', 33, 3304, 'Waar zijn ze aanwezig?', 'Waar zijn ze aanwezig?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-1-slaapkamer', 'q-ongediertebestrijding-3304-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-1-meerdere_slaapkamers', 'q-ongediertebestrijding-3304-1', 'meerdere_slaapkamers', 'Meerdere slaapkamers', 'Meerdere slaapkamers', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-1-hele_woning_pand', 'q-ongediertebestrijding-3304-1', 'hele_woning_pand', 'Hele woning/pand', 'Hele woning/pand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3304-2', 33, 3304, 'Hoe lang ervaar je al overlast?', 'How long ervaar je al overlast?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-2-minder_dan_1_maand', 'q-ongediertebestrijding-3304-2', 'minder_dan_1_maand', 'Minder dan 1 maand', 'Minder dan 1 maand', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-2-13_maanden', 'q-ongediertebestrijding-3304-2', '13_maanden', '1–3 maanden', '1–3 maanden', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3304-2-langer_dan_3_maanden', 'q-ongediertebestrijding-3304-2', 'langer_dan_3_maanden', 'Langer dan 3 maanden', 'Longer dan 3 maanden', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3305-1', 33, 3305, 'Waar heb je last van?', 'Waar heb je last van?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-1-binnen', 'q-ongediertebestrijding-3305-1', 'binnen', 'Binnen', 'Indoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-1-buiten_tuin_terras', 'q-ongediertebestrijding-3305-1', 'buiten_tuin_terras', 'Buiten (tuin/terras)', 'Outdoor (garden/terras)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-1-beide', 'q-ongediertebestrijding-3305-1', 'beide', 'Beide', 'Beide', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3305-2', 33, 3305, 'Hoe groot is de plaag?', 'How large is de plaag?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-2-klein_af_en_toe', 'q-ongediertebestrijding-3305-2', 'klein_af_en_toe', 'Klein (af en toe)', 'Small (af en toe)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-2-middel_regelmatig', 'q-ongediertebestrijding-3305-2', 'middel_regelmatig', 'Middel (regelmatig)', 'Medium (regelmatig)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3305-2-groot_dagelijks', 'q-ongediertebestrijding-3305-2', 'groot_dagelijks', 'Groot (dagelijks)', 'Large (dagelijks)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3306-1', 33, 3306, 'Om welk soort ongedierte gaat het?', 'Om welk soort ongedierte gaat het?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-1-vlooien', 'q-ongediertebestrijding-3306-1', 'vlooien', 'Vlooien', 'Vlooien', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-1-motten', 'q-ongediertebestrijding-3306-1', 'motten', 'Motten', 'Motten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-1-houtworm', 'q-ongediertebestrijding-3306-1', 'houtworm', 'Houtworm', 'Woodworm', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-1-ander_soort', 'q-ongediertebestrijding-3306-1', 'ander_soort', 'Ander soort', 'Ander soort', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ongediertebestrijding-3306-2', 33, 3306, 'Waar is het probleem?', 'Waar is het probleem?', 'radio', false, 'q-ongediertebestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-2-binnen', 'q-ongediertebestrijding-3306-2', 'binnen', 'Binnen', 'Indoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-2-buiten', 'q-ongediertebestrijding-3306-2', 'buiten', 'Buiten', 'Outdoor', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ongediertebestrijding-3306-2-beide', 'q-ongediertebestrijding-3306-2', 'beide', 'Beide', 'Beide', false, 3, true, NULL);


-- ===============================================
-- Category: Ramen (ID: 34)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-root', 34, NULL, 'Wat voor type raamopdracht zoek je?', 'What type of raamproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3401-1', 34, 3401, 'Voor welk type gebouw?', 'Voor welk type gebouw?', 'radio', false, 'q-ramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-1-woning', 'q-ramen-3401-1', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-1-appartement', 'q-ramen-3401-1', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-1-bedrijfspand', 'q-ramen-3401-1', 'bedrijfspand', 'Bedrijfspand', 'Bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3401-2', 34, 3401, 'In welk materiaal wil je de kozijnen?', 'In welk materiaal wil je de kozijnen?', 'radio', false, 'q-ramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-2-hout', 'q-ramen-3401-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-2-aluminium', 'q-ramen-3401-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-2-kunststof', 'q-ramen-3401-2', 'kunststof', 'Kunststof', 'Kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-2-combinatie', 'q-ramen-3401-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3401-3', 34, 3401, 'Hoeveel ramen moeten geplaatst worden?', 'How many ramen moeten geplaatst worden?', 'radio', false, 'q-ramen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-3-12', 'q-ramen-3401-3', '12', '1–2', '1–2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-3-35', 'q-ramen-3401-3', '35', '3–5', '3–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-3-610', 'q-ramen-3401-3', '610', '6–10', '6–10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3401-3-meer_dan_10', 'q-ramen-3401-3', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3402-1', 34, 3402, 'Waarom wil je de ramen vervangen?', 'Why do you want to de ramen replace?', 'radio', false, 'q-ramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-1-betere_isolatie', 'q-ramen-3402-1', 'betere_isolatie', 'Betere isolatie', 'Betere isolatie', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-1-verouderd', 'q-ramen-3402-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-1-beschadigd', 'q-ramen-3402-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-1-anders', 'q-ramen-3402-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3402-2', 34, 3402, 'Welk glas wil je?', 'Welk glas wil je?', 'radio', false, 'q-ramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-2-dubbel_glas', 'q-ramen-3402-2', 'dubbel_glas', 'Dubbel glas', 'Dubbel glas', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-2-hr_glas', 'q-ramen-3402-2', 'hr_glas', 'HR++ glas', 'HR++ glas', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-2-triple_glas', 'q-ramen-3402-2', 'triple_glas', 'Triple glas', 'Triple glas', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-2-anders', 'q-ramen-3402-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3402-3', 34, 3402, 'Moet de oude ramen ook verwijderd worden?', 'Should the old ramen ook verwijderd worden?', 'radio', false, 'q-ramen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-3-ja', 'q-ramen-3402-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3402-3-nee', 'q-ramen-3402-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3403-1', 34, 3403, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-ramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-1-glas_gebroken', 'q-ramen-3403-1', 'glas_gebroken', 'Glas gebroken', 'Glas gebroken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-1-kozijn_beschadigd', 'q-ramen-3403-1', 'kozijn_beschadigd', 'Kozijn beschadigd', 'Kozijn beschadigd', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-1-slecht_sluitend_raam', 'q-ramen-3403-1', 'slecht_sluitend_raam', 'Slecht sluitend raam', 'Slecht sluitend raam', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-1-condens_tussen_glas', 'q-ramen-3403-1', 'condens_tussen_glas', 'Condens tussen glas', 'Condens tussen glas', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-1-anders', 'q-ramen-3403-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3403-2', 34, 3403, 'Hoeveel ramen gaat het om?', 'How many ramen gaat het om?', 'radio', false, 'q-ramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-2-1', 'q-ramen-3403-2', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-2-25', 'q-ramen-3403-2', '25', '2–5', '2–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3403-2-meer_dan_5', 'q-ramen-3403-2', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3404-1', 34, 3404, 'Wat wil je laten renoveren?', 'What do you want have renoveren?', 'radio', false, 'q-ramen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-1-schilderwerk_kozijnen', 'q-ramen-3404-1', 'schilderwerk_kozijnen', 'Schilderwerk kozijnen', 'Schilderwerk kozijnen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-1-nieuwe_beglazing', 'q-ramen-3404-1', 'nieuwe_beglazing', 'Nieuwe beglazing', 'Newe beglazing', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-1-kozijnen_herstellen', 'q-ramen-3404-1', 'kozijnen_herstellen', 'Kozijnen herstellen', 'Kozijnen herstellen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-1-anders', 'q-ramen-3404-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ramen-3404-2', 34, 3404, 'Om hoeveel ramen gaat het?', 'How many ramen gaat het?', 'radio', false, 'q-ramen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-2-12', 'q-ramen-3404-2', '12', '1–2', '1–2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-2-35', 'q-ramen-3404-2', '35', '3–5', '3–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-2-610', 'q-ramen-3404-2', '610', '6–10', '6–10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ramen-3404-2-meer_dan_10', 'q-ramen-3404-2', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 4, true, NULL);


-- ===============================================
-- Category: Renovatie (ID: 35)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-root', 35, NULL, 'Wat voor type renovatie zoek je?', 'What type of renovatie are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3501-1', 35, 3501, 'Wat moet er allemaal gerenoveerd worden?', 'Wat moet er allemaal gerenoveerd worden?', 'radio', false, 'q-renovatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-1-keuken', 'q-renovatie-3501-1', 'keuken', 'Keuken', 'Keuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-1-badkamer', 'q-renovatie-3501-1', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-1-vloeren', 'q-renovatie-3501-1', 'vloeren', 'Vloeren', 'Vloeren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-1-muren_plafonds', 'q-renovatie-3501-1', 'muren_plafonds', 'Muren/plafonds', 'Muren/plafonds', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-1-alles', 'q-renovatie-3501-1', 'alles', 'Alles', 'Alles', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3501-2', 35, 3501, 'Gaat het om een woning of appartement?', 'Gaat het om een woning of appartement?', 'radio', false, 'q-renovatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-2-woning', 'q-renovatie-3501-2', 'woning', 'Woning', 'Woning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-2-appartement', 'q-renovatie-3501-2', 'appartement', 'Appartement', 'Appartement', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3501-3', 35, 3501, 'Heb je al plannen of ontwerptekeningen?', 'Do you have al plannen of ontwerptekeningen?', 'radio', false, 'q-renovatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-3-ja', 'q-renovatie-3501-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3501-3-nee', 'q-renovatie-3501-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3502-1', 35, 3502, 'Wat wil je vernieuwen?', 'What do you want renovate?', 'radio', false, 'q-renovatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-1-sanitair', 'q-renovatie-3502-1', 'sanitair', 'Sanitair', 'Sanitair', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-1-tegels', 'q-renovatie-3502-1', 'tegels', 'Tegels', 'Tegels', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-1-douche_bad', 'q-renovatie-3502-1', 'douche_bad', 'Douche/bad', 'Douche/bad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-1-volledige_badkamer', 'q-renovatie-3502-1', 'volledige_badkamer', 'Volledige badkamer', 'Complete badkamer', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3502-2', 35, 3502, 'Hoe groot is de badkamer?', 'How large is de badkamer?', 'radio', false, 'q-renovatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-2-klein_tot_5_m', 'q-renovatie-3502-2', 'klein_tot_5_m', 'Klein (tot 5 m²)', 'Small (tot 5 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-2-middel_510_m', 'q-renovatie-3502-2', 'middel_510_m', 'Middel (5–10 m²)', 'Medium (5–10 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-2-groot_1020_m', 'q-renovatie-3502-2', 'groot_1020_m', 'Groot (10–20 m²)', 'Large (10–20 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-2-zeer_groot_20_m', 'q-renovatie-3502-2', 'zeer_groot_20_m', 'Zeer groot (20+ m²)', 'Very large (20+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3502-3', 35, 3502, 'Moet de oude badkamer verwijderd worden?', 'Should the old badkamer verwijderd worden?', 'radio', false, 'q-renovatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-3-ja', 'q-renovatie-3502-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3502-3-nee', 'q-renovatie-3502-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3503-1', 35, 3503, 'Wat wil je vernieuwen?', 'What do you want renovate?', 'radio', false, 'q-renovatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-1-keukenkasten_deuren', 'q-renovatie-3503-1', 'keukenkasten_deuren', 'Keukenkasten/deuren', 'Keukenkasten/deuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-1-keukenblad', 'q-renovatie-3503-1', 'keukenblad', 'Keukenblad', 'Keukenblad', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-1-apparatuur', 'q-renovatie-3503-1', 'apparatuur', 'Apparatuur', 'Apparatuur', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-1-complete_keuken', 'q-renovatie-3503-1', 'complete_keuken', 'Complete keuken', 'Complete keuken', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3503-2', 35, 3503, 'Moet leidingwerk ook aangepast worden?', 'Moet leidingwerk ook aangepast worden?', 'radio', false, 'q-renovatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-2-ja', 'q-renovatie-3503-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-2-nee', 'q-renovatie-3503-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3503-2-weet_ik_nog_niet', 'q-renovatie-3503-2', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3504-1', 35, 3504, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-renovatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-1-reinigen', 'q-renovatie-3504-1', 'reinigen', 'Reinigen', 'Reinigen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-1-hervoegen', 'q-renovatie-3504-1', 'hervoegen', 'Hervoegen', 'Hervoegen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-1-isoleren', 'q-renovatie-3504-1', 'isoleren', 'Isoleren', 'Isoleren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-1-bekleden', 'q-renovatie-3504-1', 'bekleden', 'Bekleden', 'Bekleden', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-1-anders', 'q-renovatie-3504-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3504-2', 35, 3504, 'Hoe groot is de gevel ongeveer?', 'How large is de gevel approximately?', 'radio', false, 'q-renovatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-2-klein_tot_30_m', 'q-renovatie-3504-2', 'klein_tot_30_m', 'Klein (tot 30 m²)', 'Small (tot 30 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-2-middel_3075_m', 'q-renovatie-3504-2', 'middel_3075_m', 'Middel (30–75 m²)', 'Medium (30–75 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-2-groot_75150_m', 'q-renovatie-3504-2', 'groot_75150_m', 'Groot (75–150 m²)', 'Large (75–150 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3504-2-zeer_groot_150_m', 'q-renovatie-3504-2', 'zeer_groot_150_m', 'Zeer groot (150+ m²)', 'Very large (150+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3505-1', 35, 3505, 'Om welk type renovatie gaat het?', 'Om welk type renovatie gaat het?', 'radio', false, 'q-renovatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-1-zolder', 'q-renovatie-3505-1', 'zolder', 'Zolder', 'Zolder', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-1-vloeren', 'q-renovatie-3505-1', 'vloeren', 'Vloeren', 'Vloeren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-1-dak', 'q-renovatie-3505-1', 'dak', 'Dak', 'Dak', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-1-anders', 'q-renovatie-3505-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-renovatie-3505-2', 35, 3505, 'Hoe groot is het project ongeveer?', 'How large is het project approximately?', 'radio', false, 'q-renovatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-2-klein', 'q-renovatie-3505-2', 'klein', 'Klein', 'Small', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-2-middel', 'q-renovatie-3505-2', 'middel', 'Middel', 'Medium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-renovatie-3505-2-groot', 'q-renovatie-3505-2', 'groot', 'Groot', 'Large', false, 3, true, NULL);


-- ===============================================
-- Category: Schilderwerk (ID: 36)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-root', 36, NULL, 'Wat voor type schilderopdracht zoek je?', 'What type of schilderproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3601-1', 36, 3601, 'Welke ruimtes wil je laten schilderen?', 'Which ruimtes wil je have schilderen?', 'radio', false, 'q-schilderwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-1-woonkamer', 'q-schilderwerk-3601-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-1-keuken', 'q-schilderwerk-3601-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-1-badkamer', 'q-schilderwerk-3601-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-1-slaapkamers', 'q-schilderwerk-3601-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-1-hele_woning', 'q-schilderwerk-3601-1', 'hele_woning', 'Hele woning', 'Hele woning', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3601-2', 36, 3601, 'Wat wil je laten schilderen?', 'What do you want have schilderen?', 'radio', false, 'q-schilderwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-2-muren', 'q-schilderwerk-3601-2', 'muren', 'Muren', 'Muren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-2-plafonds', 'q-schilderwerk-3601-2', 'plafonds', 'Plafonds', 'Plafonds', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-2-kozijnen_deuren', 'q-schilderwerk-3601-2', 'kozijnen_deuren', 'Kozijnen/deuren', 'Kozijnen/deuren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-2-alles', 'q-schilderwerk-3601-2', 'alles', 'Alles', 'Alles', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3601-3', 36, 3601, 'Hoe groot is de ruimte?', 'How large is de ruimte?', 'radio', false, 'q-schilderwerk-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-3-klein_tot_20_m', 'q-schilderwerk-3601-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-3-middel_2050_m', 'q-schilderwerk-3601-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-3-groot_50100_m', 'q-schilderwerk-3601-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3601-3-zeer_groot_100_m', 'q-schilderwerk-3601-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3602-1', 36, 3602, 'Wat moet er geschilderd worden?', 'Wat moet er geschilderd worden?', 'radio', false, 'q-schilderwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-1-gevel', 'q-schilderwerk-3602-1', 'gevel', 'Gevel', 'Gevel', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-1-kozijnen_deuren', 'q-schilderwerk-3602-1', 'kozijnen_deuren', 'Kozijnen/deuren', 'Kozijnen/deuren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-1-dakgoten', 'q-schilderwerk-3602-1', 'dakgoten', 'Dakgoten', 'Dakgoten', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-1-anders', 'q-schilderwerk-3602-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3602-2', 36, 3602, 'Hoe hoog is het gebouw?', 'How high is het gebouw?', 'radio', false, 'q-schilderwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-2-begane_grond', 'q-schilderwerk-3602-2', 'begane_grond', 'Begane grond', 'Begane grond', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-2-tot_2_verdiepingen', 'q-schilderwerk-3602-2', 'tot_2_verdiepingen', 'Tot 2 verdiepingen', 'Tot 2 verdiepingen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-2-hoger_dan_2_verdiepingen', 'q-schilderwerk-3602-2', 'hoger_dan_2_verdiepingen', 'Hoger dan 2 verdiepingen', 'Hoger dan 2 verdiepingen', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3602-3', 36, 3602, 'Moet de oude verf eerst verwijderd worden?', 'Should the old verf eerst verwijderd worden?', 'radio', false, 'q-schilderwerk-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-3-ja', 'q-schilderwerk-3602-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-3-nee', 'q-schilderwerk-3602-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3602-3-weet_ik_niet', 'q-schilderwerk-3602-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3603-1', 36, 3603, 'Wat wil je laten schilderen?', 'What do you want have schilderen?', 'radio', false, 'q-schilderwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-1-trap', 'q-schilderwerk-3603-1', 'trap', 'Trap', 'Trap', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-1-kast', 'q-schilderwerk-3603-1', 'kast', 'Kast', 'Kast', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-1-deuren', 'q-schilderwerk-3603-1', 'deuren', 'Deuren', 'Deuren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-1-ander_meubel', 'q-schilderwerk-3603-1', 'ander_meubel', 'Ander meubel', 'Ander meubel', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3603-2', 36, 3603, 'Hoeveel stuks gaat het om?', 'How many stuks gaat het om?', 'radio', false, 'q-schilderwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-2-1', 'q-schilderwerk-3603-2', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-2-25', 'q-schilderwerk-3603-2', '25', '2–5', '2–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3603-2-meer_dan_5', 'q-schilderwerk-3603-2', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3604-1', 36, 3604, 'Wat is de huidige staat van het schilderwerk?', 'Wat is de huidige staat van het schilderwerk?', 'radio', false, 'q-schilderwerk-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-1-goed_alleen_opfrissen', 'q-schilderwerk-3604-1', 'goed_alleen_opfrissen', 'Goed, alleen opfrissen', 'Goed, alleen opfrissen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-1-slecht_veel_beschadigingen', 'q-schilderwerk-3604-1', 'slecht_veel_beschadigingen', 'Slecht, veel beschadigingen', 'Slecht, veel beschadigingen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-1-verf_bladdert_af', 'q-schilderwerk-3604-1', 'verf_bladdert_af', 'Verf bladdert af', 'Verf bladdert af', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schilderwerk-3604-2', 36, 3604, 'Hoe groot is het oppervlak dat aangepakt moet worden?', 'How large is het oppervlak dat aangepakt moet worden?', 'radio', false, 'q-schilderwerk-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-2-klein_tot_10_m', 'q-schilderwerk-3604-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-2-middel_1030_m', 'q-schilderwerk-3604-2', 'middel_1030_m', 'Middel (10–30 m²)', 'Medium (10-30 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-2-groot_3060_m', 'q-schilderwerk-3604-2', 'groot_3060_m', 'Groot (30–60 m²)', 'Large (30-60 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schilderwerk-3604-2-zeer_groot_60_m', 'q-schilderwerk-3604-2', 'zeer_groot_60_m', 'Zeer groot (60+ m²)', 'Very large (60+ m²)', false, 4, true, NULL);


-- ===============================================
-- Category: Schoonmaak (ID: 37)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-root', 37, NULL, 'Wat voor type schoonmaakopdracht zoek je?', 'What type of schoonmaakproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3701-1', 37, 3701, 'Wat moet er schoongemaakt worden?', 'Wat moet er schoongemaakt worden?', 'radio', false, 'q-schoonmaak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-1-woning_volledig', 'q-schoonmaak-3701-1', 'woning_volledig', 'Woning volledig', 'Woning volledig', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-1-badkamer', 'q-schoonmaak-3701-1', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-1-keuken', 'q-schoonmaak-3701-1', 'keuken', 'Keuken', 'Keuken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-1-ramen', 'q-schoonmaak-3701-1', 'ramen', 'Ramen', 'Ramen', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-1-anders', 'q-schoonmaak-3701-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3701-2', 37, 3701, 'Hoe vaak wil je schoonmaak?', 'How often wil je schoonmaak?', 'radio', false, 'q-schoonmaak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-2-eenmalig', 'q-schoonmaak-3701-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-2-wekelijks', 'q-schoonmaak-3701-2', 'wekelijks', 'Wekelijks', 'Weekly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-2-tweewekelijks', 'q-schoonmaak-3701-2', 'tweewekelijks', 'Tweewekelijks', 'Tweewekelijks', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3701-2-maandelijks', 'q-schoonmaak-3701-2', 'maandelijks', 'Maandelijks', 'Monthly', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3702-1', 37, 3702, 'Wat voor type gebouw?', 'What type of gebouw?', 'radio', false, 'q-schoonmaak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-1-kantoor', 'q-schoonmaak-3702-1', 'kantoor', 'Kantoor', 'Kantoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-1-winkel', 'q-schoonmaak-3702-1', 'winkel', 'Winkel', 'Winkel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-1-magazijn', 'q-schoonmaak-3702-1', 'magazijn', 'Magazijn', 'Magazijn', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-1-anders', 'q-schoonmaak-3702-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3702-2', 37, 3702, 'Hoe groot is de oppervlakte?', 'How large is de oppervlakte?', 'radio', false, 'q-schoonmaak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-2-klein_tot_100_m', 'q-schoonmaak-3702-2', 'klein_tot_100_m', 'Klein (tot 100 m²)', 'Small (tot 100 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-2-middel_100500_m', 'q-schoonmaak-3702-2', 'middel_100500_m', 'Middel (100–500 m²)', 'Medium (100–500 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-2-groot_5001000_m', 'q-schoonmaak-3702-2', 'groot_5001000_m', 'Groot (500–1000 m²)', 'Large (500–1000 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-2-zeer_groot_1000_m', 'q-schoonmaak-3702-2', 'zeer_groot_1000_m', 'Zeer groot (1000+ m²)', 'Very large (1000+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3702-3', 37, 3702, 'Hoe vaak wil je schoonmaak?', 'How often wil je schoonmaak?', 'radio', false, 'q-schoonmaak-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-3-dagelijks', 'q-schoonmaak-3702-3', 'dagelijks', 'Dagelijks', 'Dagelijks', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-3-wekelijks', 'q-schoonmaak-3702-3', 'wekelijks', 'Wekelijks', 'Weekly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3702-3-maandelijks', 'q-schoonmaak-3702-3', 'maandelijks', 'Maandelijks', 'Monthly', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3703-1', 37, 3703, 'Waarvoor wil je een grote schoonmaak?', 'Waarvoor wil je een grote schoonmaak?', 'radio', false, 'q-schoonmaak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-1-verhuis', 'q-schoonmaak-3703-1', 'verhuis', 'Verhuis', 'Verhuis', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-1-renovatie', 'q-schoonmaak-3703-1', 'renovatie', 'Renovatie', 'Renovatie', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-1-voorjaarsschoonmaak', 'q-schoonmaak-3703-1', 'voorjaarsschoonmaak', 'Voorjaarsschoonmaak', 'Voorjaarsschoonmaak', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-1-anders', 'q-schoonmaak-3703-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3703-2', 37, 3703, 'Om wat voor woning/gebouw gaat het?', 'Om wat voor woning/gebouw gaat het?', 'radio', false, 'q-schoonmaak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-2-appartement', 'q-schoonmaak-3703-2', 'appartement', 'Appartement', 'Appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-2-huis', 'q-schoonmaak-3703-2', 'huis', 'Huis', 'Huis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-2-kantoor_bedrijfspand', 'q-schoonmaak-3703-2', 'kantoor_bedrijfspand', 'Kantoor/bedrijfspand', 'Kantoor/bedrijfspand', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3703-2-anders', 'q-schoonmaak-3703-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3704-1', 37, 3704, 'Wat moet er specialistisch gereinigd worden?', 'Wat moet er specialistisch gereinigd worden?', 'radio', false, 'q-schoonmaak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-1-tapijt', 'q-schoonmaak-3704-1', 'tapijt', 'Tapijt', 'Tapijt', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-1-meubels', 'q-schoonmaak-3704-1', 'meubels', 'Meubels', 'Meubels', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-1-vloer_steen_parket', 'q-schoonmaak-3704-1', 'vloer_steen_parket', 'Vloer (steen/parket)', 'Vloer (steen/parket)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-1-gevel___ramen_op_hoogte', 'q-schoonmaak-3704-1', 'gevel___ramen_op_hoogte', 'Gevel / ramen op hoogte', 'Gevel / ramen op hoogte', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-1-anders', 'q-schoonmaak-3704-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schoonmaak-3704-2', 37, 3704, 'Hoe groot is het oppervlak of aantal stuks?', 'How large is het oppervlak of aantal stuks?', 'radio', false, 'q-schoonmaak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-2-klein_12_kamers_stukken', 'q-schoonmaak-3704-2', 'klein_12_kamers_stukken', 'Klein (1–2 kamers/stukken)', 'Small (1–2 kamers/stukken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-2-middel_35', 'q-schoonmaak-3704-2', 'middel_35', 'Middel (3–5)', 'Medium (3–5)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-2-groot_610', 'q-schoonmaak-3704-2', 'groot_610', 'Groot (6–10)', 'Large (6–10)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schoonmaak-3704-2-zeer_groot_10', 'q-schoonmaak-3704-2', 'zeer_groot_10', 'Zeer groot (10+)', 'Very large (10+)', false, 4, true, NULL);


-- ===============================================
-- Category: Schrijnwerker (ID: 38)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-root', 38, NULL, 'Wat voor soort schrijnwerk wil je laten uitvoeren?', 'What kind of soort schrijnwerk wil je have uitvoeren?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3801-1', 38, 3801, 'Om welk project gaat het?', 'Om welk project gaat het?', 'radio', false, 'q-schrijnwerker-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-1-deuren', 'q-schrijnwerker-3801-1', 'deuren', 'Deuren', 'Deuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-1-ramen', 'q-schrijnwerker-3801-1', 'ramen', 'Ramen', 'Ramen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-1-trappen', 'q-schrijnwerker-3801-1', 'trappen', 'Trappen', 'Trappen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-1-plafonds___wanden', 'q-schrijnwerker-3801-1', 'plafonds___wanden', 'Plafonds / wanden', 'Plafonds / wanden', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-1-anders', 'q-schrijnwerker-3801-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3801-2', 38, 3801, 'Welke materiaalsoort wil je?', 'Which materiaalsoort wil je?', 'radio', false, 'q-schrijnwerker-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-2-massief_hout', 'q-schrijnwerker-3801-2', 'massief_hout', 'Massief hout', 'Massief hout', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-2-mdf', 'q-schrijnwerker-3801-2', 'mdf', 'MDF', 'MDF', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-2-fineer', 'q-schrijnwerker-3801-2', 'fineer', 'Fineer', 'Fineer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-2-anders', 'q-schrijnwerker-3801-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3801-3', 38, 3801, 'Moet het ook afgewerkt worden (lak/verf)?', 'Should the ook afgewerkt worden (lak/verf)?', 'radio', false, 'q-schrijnwerker-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-3-ja', 'q-schrijnwerker-3801-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3801-3-nee', 'q-schrijnwerker-3801-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3802-1', 38, 3802, 'Wat moet er gemaakt/geleverd worden?', 'Wat moet er gemaakt/geleverd worden?', 'radio', false, 'q-schrijnwerker-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-1-ramen', 'q-schrijnwerker-3802-1', 'ramen', 'Ramen', 'Ramen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-1-deuren', 'q-schrijnwerker-3802-1', 'deuren', 'Deuren', 'Deuren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-1-poorten', 'q-schrijnwerker-3802-1', 'poorten', 'Poorten', 'Poorten', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-1-gevelbekleding', 'q-schrijnwerker-3802-1', 'gevelbekleding', 'Gevelbekleding', 'Gevelbekleding', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-1-anders', 'q-schrijnwerker-3802-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3802-2', 38, 3802, 'In welk materiaal?', 'In welk materiaal?', 'radio', false, 'q-schrijnwerker-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-2-hout', 'q-schrijnwerker-3802-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-2-aluminium', 'q-schrijnwerker-3802-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-2-kunststof', 'q-schrijnwerker-3802-2', 'kunststof', 'Kunststof', 'Kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-2-combinatie', 'q-schrijnwerker-3802-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3802-3', 38, 3802, 'Moet het ook geplaatst worden?', 'Should the ook geplaatst worden?', 'radio', false, 'q-schrijnwerker-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-3-ja', 'q-schrijnwerker-3802-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3802-3-nee', 'q-schrijnwerker-3802-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3803-1', 38, 3803, 'Om wat voor meubel gaat het?', 'Om wat voor meubel gaat het?', 'radio', false, 'q-schrijnwerker-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-1-kast_kledingkast_boekenkast_etc', 'q-schrijnwerker-3803-1', 'kast_kledingkast_boekenkast_etc', 'Kast (kledingkast, boekenkast, etc.)', 'Kast (kledingkast, boekenkast, etc.)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-1-tafel', 'q-schrijnwerker-3803-1', 'tafel', 'Tafel', 'Tafel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-1-bureau', 'q-schrijnwerker-3803-1', 'bureau', 'Bureau', 'Bureau', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-1-ander_meubel', 'q-schrijnwerker-3803-1', 'ander_meubel', 'Ander meubel', 'Ander meubel', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3803-2', 38, 3803, 'Waar komt het meubel te staan?', 'Waar komt het meubel te staan?', 'radio', false, 'q-schrijnwerker-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-2-woonkamer', 'q-schrijnwerker-3803-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-2-slaapkamer', 'q-schrijnwerker-3803-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-2-keuken', 'q-schrijnwerker-3803-2', 'keuken', 'Keuken', 'Keuken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-2-badkamer', 'q-schrijnwerker-3803-2', 'badkamer', 'Badkamer', 'Badkamer', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3803-2-anders', 'q-schrijnwerker-3803-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3804-1', 38, 3804, 'Wat moet er hersteld worden?', 'Wat moet er hersteld worden?', 'radio', false, 'q-schrijnwerker-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-1-deur_of_raam', 'q-schrijnwerker-3804-1', 'deur_of_raam', 'Deur of raam', 'Deur of raam', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-1-meubel', 'q-schrijnwerker-3804-1', 'meubel', 'Meubel', 'Meubel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-1-trap', 'q-schrijnwerker-3804-1', 'trap', 'Trap', 'Trap', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-1-anders', 'q-schrijnwerker-3804-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schrijnwerker-3804-2', 38, 3804, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-schrijnwerker-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-2-klein_enkele_onderdelen', 'q-schrijnwerker-3804-2', 'klein_enkele_onderdelen', 'Klein (enkele onderdelen)', 'Small (enkele onderdelen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-2-middel_deel_vervangen', 'q-schrijnwerker-3804-2', 'middel_deel_vervangen', 'Middel (deel vervangen)', 'Medium (deel replace)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schrijnwerker-3804-2-groot_bijna_volledig_vervangen', 'q-schrijnwerker-3804-2', 'groot_bijna_volledig_vervangen', 'Groot (bijna volledig vervangen)', 'Large (bijna volledig replace)', false, 3, true, NULL);


-- ===============================================
-- Category: Schuifraam (ID: 39)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-root', 39, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3901-1', 39, 3901, 'Waar komt het schuifraam?', 'Waar komt het schuifraam?', 'radio', false, 'q-schuifraam-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-1-woonkamer', 'q-schuifraam-3901-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-1-keuken', 'q-schuifraam-3901-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-1-slaapkamer', 'q-schuifraam-3901-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-1-anders', 'q-schuifraam-3901-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3901-2', 39, 3901, 'Welk materiaal wil je voor het kozijn?', 'Welk materiaal wil je voor het kozijn?', 'radio', false, 'q-schuifraam-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-2-hout', 'q-schuifraam-3901-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-2-aluminium', 'q-schuifraam-3901-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-2-kunststof', 'q-schuifraam-3901-2', 'kunststof', 'Kunststof', 'Kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-2-anders', 'q-schuifraam-3901-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3901-3', 39, 3901, 'Hoe groot moet het schuifraam zijn?', 'How large moet het schuifraam zijn?', 'radio', false, 'q-schuifraam-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-3-klein_tot_2_meter_breed', 'q-schuifraam-3901-3', 'klein_tot_2_meter_breed', 'Klein (tot 2 meter breed)', 'Small (tot 2 meter breed)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-3-middel_23_meter', 'q-schuifraam-3901-3', 'middel_23_meter', 'Middel (2–3 meter)', 'Medium (2–3 meter)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-3-groot_3_meter', 'q-schuifraam-3901-3', 'groot_3_meter', 'Groot (3+ meter)', 'Large (3+ meter)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3901-3-weet_ik_nog_niet', 'q-schuifraam-3901-3', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3902-1', 39, 3902, 'Waarom wil je het schuifraam vervangen?', 'Why do you want to het schuifraam replace?', 'radio', false, 'q-schuifraam-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-1-verouderd', 'q-schuifraam-3902-1', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-1-slechte_isolatie', 'q-schuifraam-3902-1', 'slechte_isolatie', 'Slechte isolatie', 'Slechte isolatie', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-1-beschadigd', 'q-schuifraam-3902-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-1-anders', 'q-schuifraam-3902-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3902-2', 39, 3902, 'Welk glas wil je in het nieuwe raam?', 'Welk glas wil je in het nieuwe raam?', 'radio', false, 'q-schuifraam-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-2-dubbel_glas', 'q-schuifraam-3902-2', 'dubbel_glas', 'Dubbel glas', 'Dubbel glas', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-2-hr_glas', 'q-schuifraam-3902-2', 'hr_glas', 'HR++ glas', 'HR++ glas', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-2-triple_glas', 'q-schuifraam-3902-2', 'triple_glas', 'Triple glas', 'Triple glas', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-2-anders', 'q-schuifraam-3902-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3902-3', 39, 3902, 'Moet het oude raam verwijderd worden?', 'Should the old raam verwijderd worden?', 'radio', false, 'q-schuifraam-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-3-ja', 'q-schuifraam-3902-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3902-3-nee', 'q-schuifraam-3902-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3903-1', 39, 3903, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-schuifraam-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-1-raam_schuift_niet_goed', 'q-schuifraam-3903-1', 'raam_schuift_niet_goed', 'Raam schuift niet goed', 'Raam schuift niet goed', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-1-glas_gebroken', 'q-schuifraam-3903-1', 'glas_gebroken', 'Glas gebroken', 'Glas gebroken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-1-kozijn_beschadigd', 'q-schuifraam-3903-1', 'kozijn_beschadigd', 'Kozijn beschadigd', 'Kozijn beschadigd', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-1-slecht_sluitend___tocht', 'q-schuifraam-3903-1', 'slecht_sluitend___tocht', 'Slecht sluitend / tocht', 'Slecht sluitend / tocht', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-1-anders', 'q-schuifraam-3903-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-schuifraam-3903-2', 39, 3903, 'Hoe oud is het schuifraam ongeveer?', 'Hoe oud is het schuifraam approximately?', 'radio', false, 'q-schuifraam-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-2-05_jaar', 'q-schuifraam-3903-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-2-510_jaar', 'q-schuifraam-3903-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-2-1020_jaar', 'q-schuifraam-3903-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-schuifraam-3903-2-ouder_dan_20_jaar', 'q-schuifraam-3903-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Septische/regenwatertak (ID: 40)
-- ===============================================


-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-root', 40, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuwe tank plaatsen (ID: 4001)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4001-1', 40, 4001, 'Wat voor type tank wil je plaatsen?', 'What type of tank do you want to install?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-1-septische_tank', 'q-septische-regenwatertak-4001-1', 'septische_tank', 'Septische tank', 'Septic tank', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-1-regenwatertank', 'q-septische-regenwatertak-4001-1', 'regenwatertank', 'Regenwatertank', 'Rainwater tank', false, 2, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4001-2', 40, 4001, 'Hoe groot moet de tank zijn?', 'How large should the tank be?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-2-klein_tot_3000_liter', 'q-septische-regenwatertak-4001-2', 'klein_tot_3000_liter', 'Klein (tot 3.000 liter)', 'Small (up to 3,000 liters)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-2-middel_3000_5000_liter', 'q-septische-regenwatertak-4001-2', 'middel_3000_5000_liter', 'Middel (3.000–5.000 liter)', 'Medium (3,000-5,000 liters)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-2-groot_5000_10000_liter', 'q-septische-regenwatertak-4001-2', 'groot_5000_10000_liter', 'Groot (5.000–10.000 liter)', 'Large (5,000-10,000 liters)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-2-zeer_groot_10000_liter', 'q-septische-regenwatertak-4001-2', 'zeer_groot_10000_liter', 'Zeer groot (10.000+ liter)', 'Very large (10,000+ liters)', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4001-3', 40, 4001, 'Waar moet de tank geplaatst worden?', 'Where should the tank be installed?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-3-ondergronds', 'q-septische-regenwatertak-4001-3', 'ondergronds', 'Ondergronds', 'Underground', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4001-3-bovengronds', 'q-septische-regenwatertak-4001-3', 'bovengronds', 'Bovengronds', 'Above ground', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Bestaande tank vervangen (ID: 4002)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4002-1', 40, 4002, 'Wat voor type tank wil je vervangen?', 'What type of tank do you want to replace?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-1-septische_tank', 'q-septische-regenwatertak-4002-1', 'septische_tank', 'Septische tank', 'Septic tank', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-1-regenwatertank', 'q-septische-regenwatertak-4002-1', 'regenwatertank', 'Regenwatertank', 'Rainwater tank', false, 2, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4002-2', 40, 4002, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-2-beschadigd', 'q-septische-regenwatertak-4002-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-2-verouderd', 'q-septische-regenwatertak-4002-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-2-grotere_capaciteit_gewenst', 'q-septische-regenwatertak-4002-2', 'grotere_capaciteit_gewenst', 'Grotere capaciteit gewenst', 'Larger capacity desired', false, 3, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4002-3', 40, 4002, 'Moet de oude tank verwijderd worden?', 'Should the old tank be removed?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-3-ja', 'q-septische-regenwatertak-4002-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4002-3-nee', 'q-septische-regenwatertak-4002-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Tank reinigen/onderhouden (ID: 4003)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4003-1', 40, 4003, 'Wat voor tank gaat het om?', 'What kind of tank is it?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-1-septische_tank', 'q-septische-regenwatertak-4003-1', 'septische_tank', 'Septische tank', 'Septic tank', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-1-regenwatertank', 'q-septische-regenwatertak-4003-1', 'regenwatertank', 'Regenwatertank', 'Rainwater tank', false, 2, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4003-2', 40, 4003, 'Wat wil je laten doen?', 'What do you want to have done?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-2-reinigen', 'q-septische-regenwatertak-4003-2', 'reinigen', 'Reinigen', 'Clean', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-2-leegpompen', 'q-septische-regenwatertak-4003-2', 'leegpompen', 'Leegpompen', 'Pump out', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-2-inspecteren', 'q-septische-regenwatertak-4003-2', 'inspecteren', 'Inspecteren', 'Inspect', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4003-2-onderhoudscontract', 'q-septische-regenwatertak-4003-2', 'onderhoudscontract', 'Onderhoudscontract', 'Maintenance contract', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Tank repareren (ID: 4004)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4004-1', 40, 4004, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-1-lekkage', 'q-septische-regenwatertak-4004-1', 'lekkage', 'Lekkage', 'Leakage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-1-verstopping', 'q-septische-regenwatertak-4004-1', 'verstopping', 'Verstopping', 'Blockage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-1-kapotte_pomp_onderdelen', 'q-septische-regenwatertak-4004-1', 'kapotte_pomp_onderdelen', 'Kapotte pomp/onderdelen', 'Broken pump/parts', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-1-anders', 'q-septische-regenwatertak-4004-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-septische-regenwatertak-4004-2', 40, 4004, 'Hoe oud is de tank ongeveer?', 'How old is the tank approximately?', 'radio', false, 'q-septische-regenwatertak-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-2-0_5_jaar', 'q-septische-regenwatertak-4004-2', '0_5_jaar', '0–5 jaar', '0-5 years', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-2-5_10_jaar', 'q-septische-regenwatertak-4004-2', '5_10_jaar', '5–10 jaar', '5-10 years', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-2-10_20_jaar', 'q-septische-regenwatertak-4004-2', '10_20_jaar', '10–20 jaar', '10-20 years', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-septische-regenwatertak-4004-2-ouder_dan_20_jaar', 'q-septische-regenwatertak-4004-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Older than 20 years', false, 4, true, NULL);

-- Total Questions: 91
-- Total Options: 294


-- ===============================================
-- Categories 41-50 - AUTO GENERATED
-- ===============================================

-- ===============================================
-- Category: Serre (ID: 41)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-root', 41, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4101-1', 41, 4101, 'Wat voor type serre wil je?', 'What type of serre wil je?', 'radio', false, 'q-serre-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-1-klassieke_serre', 'q-serre-4101-1', 'klassieke_serre', 'Klassieke serre', 'Klassieke serre', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-1-moderne_serre', 'q-serre-4101-1', 'moderne_serre', 'Moderne serre', 'Moderne serre', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-1-tuinkamer', 'q-serre-4101-1', 'tuinkamer', 'Tuinkamer', 'Gardenkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-1-wintertuin', 'q-serre-4101-1', 'wintertuin', 'Wintertuin', 'Wintergarden', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4101-2', 41, 4101, 'Van welk materiaal moet de serre zijn?', 'Van welk materiaal moet de serre zijn?', 'radio', false, 'q-serre-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-2-aluminium', 'q-serre-4101-2', 'aluminium', 'Aluminium', 'Aluminium', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-2-hout', 'q-serre-4101-2', 'hout', 'Hout', 'Wood', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-2-pvc_kunststof', 'q-serre-4101-2', 'pvc_kunststof', 'PVC/kunststof', 'PVC/kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-2-combinatie', 'q-serre-4101-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4101-3', 41, 4101, 'Hoe groot moet de serre ongeveer zijn?', 'How large moet de serre approximately zijn?', 'radio', false, 'q-serre-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-3-klein_tot_10_m', 'q-serre-4101-3', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-3-middel_1020_m', 'q-serre-4101-3', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-3-groot_2040_m', 'q-serre-4101-3', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4101-3-zeer_groot_40_m', 'q-serre-4101-3', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4102-1', 41, 4102, 'Waarom wil je de serre vervangen?', 'Why do you want to de serre replace?', 'radio', false, 'q-serre-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-1-beschadigd', 'q-serre-4102-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-1-verouderd', 'q-serre-4102-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-1-betere_isolatie', 'q-serre-4102-1', 'betere_isolatie', 'Betere isolatie', 'Betere isolatie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-1-andere_stijl_gewenst', 'q-serre-4102-1', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4102-2', 41, 4102, 'Welk materiaal wil je voor de nieuwe serre?', 'Welk materiaal wil je voor de nieuwe serre?', 'radio', false, 'q-serre-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-2-aluminium', 'q-serre-4102-2', 'aluminium', 'Aluminium', 'Aluminium', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-2-hout', 'q-serre-4102-2', 'hout', 'Hout', 'Wood', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-2-pvc_kunststof', 'q-serre-4102-2', 'pvc_kunststof', 'PVC/kunststof', 'PVC/kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-2-combinatie', 'q-serre-4102-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4102-3', 41, 4102, 'Moet de oude serre verwijderd worden?', 'Should the old serre verwijderd worden?', 'radio', false, 'q-serre-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-3-ja', 'q-serre-4102-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4102-3-nee', 'q-serre-4102-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4103-1', 41, 4103, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-serre-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-1-glas_vervangen', 'q-serre-4103-1', 'glas_vervangen', 'Glas vervangen', 'Glas replace', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-1-constructie_herstellen', 'q-serre-4103-1', 'constructie_herstellen', 'Constructie herstellen', 'Constructie herstellen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-1-dak_vernieuwen', 'q-serre-4103-1', 'dak_vernieuwen', 'Dak vernieuwen', 'Dak renovate', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-1-anders', 'q-serre-4103-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-serre-4103-2', 41, 4103, 'Hoe groot is de serre?', 'How large is de serre?', 'radio', false, 'q-serre-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-2-klein_tot_10_m', 'q-serre-4103-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-2-middel_1020_m', 'q-serre-4103-2', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-2-groot_2040_m', 'q-serre-4103-2', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-serre-4103-2-zeer_groot_40_m', 'q-serre-4103-2', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);


-- ===============================================
-- Category: Stucadoor (ID: 42)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-root', 42, NULL, 'Wat voor type stucwerk wil je laten uitvoeren?', 'What type of stucwerk wil je have uitvoeren?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4201-1', 42, 4201, 'Om welke ruimte gaat het?', 'Om welke ruimte gaat het?', 'radio', false, 'q-stucadoor-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-1-woonkamer', 'q-stucadoor-4201-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-1-keuken', 'q-stucadoor-4201-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-1-badkamer', 'q-stucadoor-4201-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-1-slaapkamers', 'q-stucadoor-4201-1', 'slaapkamers', 'Slaapkamer(s)', 'Slaapkamer(s)', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-1-meerdere_ruimtes', 'q-stucadoor-4201-1', 'meerdere_ruimtes', 'Meerdere ruimtes', 'Meerdere ruimtes', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4201-2', 42, 4201, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-stucadoor-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-2-klein_tot_20_m', 'q-stucadoor-4201-2', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-2-middel_2050_m', 'q-stucadoor-4201-2', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-2-groot_50100_m', 'q-stucadoor-4201-2', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-2-zeer_groot_100_m', 'q-stucadoor-4201-2', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4201-3', 42, 4201, 'Welke afwerking wil je?', 'Which afwerking wil je?', 'radio', false, 'q-stucadoor-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-3-glad_stucwerk', 'q-stucadoor-4201-3', 'glad_stucwerk', 'Glad stucwerk', 'Glad stucwerk', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-3-spachtelputz___sierpleister', 'q-stucadoor-4201-3', 'spachtelputz___sierpleister', 'Spachtelputz / sierpleister', 'Spachtelputz / sierpleister', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-3-behangklaar', 'q-stucadoor-4201-3', 'behangklaar', 'Behangklaar', 'Behangklaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4201-3-schilderklaar', 'q-stucadoor-4201-3', 'schilderklaar', 'Schilderklaar', 'Schilderklaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4202-1', 42, 4202, 'Om wat voor oppervlak gaat het?', 'Om wat voor oppervlak gaat het?', 'radio', false, 'q-stucadoor-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-1-gehele_gevel', 'q-stucadoor-4202-1', 'gehele_gevel', 'Gehele gevel', 'Gehele gevel', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-1-deel_van_de_gevel', 'q-stucadoor-4202-1', 'deel_van_de_gevel', 'Deel van de gevel', 'Deel van de gevel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-1-anders', 'q-stucadoor-4202-1', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4202-2', 42, 4202, 'Wat is de huidige ondergrond?', 'Wat is de huidige ondergrond?', 'radio', false, 'q-stucadoor-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-2-baksteen', 'q-stucadoor-4202-2', 'baksteen', 'Baksteen', 'Baksteen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-2-beton', 'q-stucadoor-4202-2', 'beton', 'Beton', 'Beton', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-2-isolatieplaten', 'q-stucadoor-4202-2', 'isolatieplaten', 'Isolatieplaten', 'Isolatiephave', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-2-anders', 'q-stucadoor-4202-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4202-3', 42, 4202, 'Moet de gevel ook geïsoleerd worden?', 'Should the gevel ook geïsoleerd worden?', 'radio', false, 'q-stucadoor-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-3-ja', 'q-stucadoor-4202-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4202-3-nee', 'q-stucadoor-4202-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4203-1', 42, 4203, 'Hoe groot is het plafondoppervlak?', 'How large is het plafondoppervlak?', 'radio', false, 'q-stucadoor-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-1-tot_20_m', 'q-stucadoor-4203-1', 'tot_20_m', 'Tot 20 m²', 'Tot 20 m²', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-1-2050_m', 'q-stucadoor-4203-1', '2050_m', '20–50 m²', '20-50 sqm', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-1-50100_m', 'q-stucadoor-4203-1', '50100_m', '50–100 m²', '50-100 sqm', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-1-100_m', 'q-stucadoor-4203-1', '100_m', '100+ m²', '100+ sqm', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4203-2', 42, 4203, 'Wat is de huidige staat?', 'Wat is de huidige staat?', 'radio', false, 'q-stucadoor-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-2-glad', 'q-stucadoor-4203-2', 'glad', 'Glad', 'Glad', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-2-oneffen', 'q-stucadoor-4203-2', 'oneffen', 'Oneffen', 'Oneffen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-2-met_oude_afwerking_spack_sierpleister_etc', 'q-stucadoor-4203-2', 'met_oude_afwerking_spack_sierpleister_etc', 'Met oude afwerking (spack, sierpleister, etc.)', 'Met old afwerking (spack, sierpleister, etc.)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4203-3', 42, 4203, 'Welke afwerking wil je?', 'Which afwerking wil je?', 'radio', false, 'q-stucadoor-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-3-glad_schilderklaar', 'q-stucadoor-4203-3', 'glad_schilderklaar', 'Glad (schilderklaar)', 'Glad (schilderklaar)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4203-3-spuitwerk_spack', 'q-stucadoor-4203-3', 'spuitwerk_spack', 'Spuitwerk (spack)', 'Spuitwerk (spack)', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4204-1', 42, 4204, 'Wat moet er hersteld worden?', 'Wat moet er hersteld worden?', 'radio', false, 'q-stucadoor-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-1-scheuren_in_stucwerk', 'q-stucadoor-4204-1', 'scheuren_in_stucwerk', 'Scheuren in stucwerk', 'Scheuren in stucwerk', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-1-loslatend_stucwerk', 'q-stucadoor-4204-1', 'loslatend_stucwerk', 'Loslatend stucwerk', 'Loshaved stucwerk', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-1-waterschade_herstellen', 'q-stucadoor-4204-1', 'waterschade_herstellen', 'Waterschade herstellen', 'Waterschade herstellen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-1-anders', 'q-stucadoor-4204-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-stucadoor-4204-2', 42, 4204, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-stucadoor-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-2-klein_enkele_plekken', 'q-stucadoor-4204-2', 'klein_enkele_plekken', 'Klein (enkele plekken)', 'Small (enkele plekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-2-middel_deel_van_muur_plafond', 'q-stucadoor-4204-2', 'middel_deel_van_muur_plafond', 'Middel (deel van muur/plafond)', 'Medium (deel van muur/plafond)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-stucadoor-4204-2-groot_gehele_muur_plafond', 'q-stucadoor-4204-2', 'groot_gehele_muur_plafond', 'Groot (gehele muur/plafond)', 'Large (gehele muur/plafond)', false, 3, true, NULL);


-- ===============================================
-- Category: Tegelzetter (ID: 43)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-root', 43, NULL, 'Wat voor tegelwerk wil je laten uitvoeren?', 'What kind of tegelwerk wil je have uitvoeren?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4301-1', 43, 4301, 'In welke ruimte gaat het om?', 'In welke ruimte gaat het om?', 'radio', false, 'q-tegelzetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-1-keuken', 'q-tegelzetter-4301-1', 'keuken', 'Keuken', 'Keuken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-1-badkamer', 'q-tegelzetter-4301-1', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-1-toilet', 'q-tegelzetter-4301-1', 'toilet', 'Toilet', 'Toilet', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-1-anders', 'q-tegelzetter-4301-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4301-2', 43, 4301, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-tegelzetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-2-klein_tot_5_m', 'q-tegelzetter-4301-2', 'klein_tot_5_m', 'Klein (tot 5 m²)', 'Small (tot 5 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-2-middel_515_m', 'q-tegelzetter-4301-2', 'middel_515_m', 'Middel (5–15 m²)', 'Medium (5–15 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-2-groot_1530_m', 'q-tegelzetter-4301-2', 'groot_1530_m', 'Groot (15–30 m²)', 'Large (15–30 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-2-zeer_groot_30_m', 'q-tegelzetter-4301-2', 'zeer_groot_30_m', 'Zeer groot (30+ m²)', 'Very large (30+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4301-3', 43, 4301, 'Heb je de tegels al gekocht?', 'Do you have de tegels al gekocht?', 'radio', false, 'q-tegelzetter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-3-ja', 'q-tegelzetter-4301-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4301-3-nee', 'q-tegelzetter-4301-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4302-1', 43, 4302, 'In welke ruimte gaat het om?', 'In welke ruimte gaat het om?', 'radio', false, 'q-tegelzetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-1-woonkamer', 'q-tegelzetter-4302-1', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-1-keuken', 'q-tegelzetter-4302-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-1-badkamer', 'q-tegelzetter-4302-1', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-1-hal___gang', 'q-tegelzetter-4302-1', 'hal___gang', 'Hal / gang', 'Hal / gang', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-1-anders', 'q-tegelzetter-4302-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4302-2', 43, 4302, 'Hoe groot is het oppervlak ongeveer?', 'How large is het oppervlak approximately?', 'radio', false, 'q-tegelzetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-2-klein_tot_10_m', 'q-tegelzetter-4302-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-2-middel_1030_m', 'q-tegelzetter-4302-2', 'middel_1030_m', 'Middel (10–30 m²)', 'Medium (10-30 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-2-groot_3060_m', 'q-tegelzetter-4302-2', 'groot_3060_m', 'Groot (30–60 m²)', 'Large (30-60 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-2-zeer_groot_60_m', 'q-tegelzetter-4302-2', 'zeer_groot_60_m', 'Zeer groot (60+ m²)', 'Very large (60+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4302-3', 43, 4302, 'Moet de oude vloer eerst verwijderd worden?', 'Should the old vloer eerst verwijderd worden?', 'radio', false, 'q-tegelzetter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-3-ja', 'q-tegelzetter-4302-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4302-3-nee', 'q-tegelzetter-4302-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4303-1', 43, 4303, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-tegelzetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-1-hele_badkamer_betegelen', 'q-tegelzetter-4303-1', 'hele_badkamer_betegelen', 'Hele badkamer betegelen', 'Hele badkamer betegelen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-1-alleen_douchegedeelte', 'q-tegelzetter-4303-1', 'alleen_douchegedeelte', 'Alleen douchegedeelte', 'Alleen douchegedeelte', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-1-alleen_badgedeelte', 'q-tegelzetter-4303-1', 'alleen_badgedeelte', 'Alleen badgedeelte', 'Alleen badgedeelte', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4303-2', 43, 4303, 'Hoe groot is de badkamer?', 'How large is de badkamer?', 'radio', false, 'q-tegelzetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-2-klein_tot_5_m', 'q-tegelzetter-4303-2', 'klein_tot_5_m', 'Klein (tot 5 m²)', 'Small (tot 5 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-2-middel_510_m', 'q-tegelzetter-4303-2', 'middel_510_m', 'Middel (5–10 m²)', 'Medium (5–10 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-2-groot_1020_m', 'q-tegelzetter-4303-2', 'groot_1020_m', 'Groot (10–20 m²)', 'Large (10–20 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-2-zeer_groot_20_m', 'q-tegelzetter-4303-2', 'zeer_groot_20_m', 'Zeer groot (20+ m²)', 'Very large (20+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4303-3', 43, 4303, 'Moet er ook tegelwerk verwijderd worden?', 'Should ook tegelwerk verwijderd worden?', 'radio', false, 'q-tegelzetter-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-3-ja', 'q-tegelzetter-4303-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4303-3-nee', 'q-tegelzetter-4303-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4304-1', 43, 4304, 'Wat is er nodig?', 'Wat is er nodig?', 'radio', false, 'q-tegelzetter-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-1-gebarsten_tegels_vervangen', 'q-tegelzetter-4304-1', 'gebarsten_tegels_vervangen', 'Gebarsten tegels vervangen', 'Gebarsten tegels replace', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-1-nieuwe_voegen_aanbrengen', 'q-tegelzetter-4304-1', 'nieuwe_voegen_aanbrengen', 'Nieuwe voegen aanbrengen', 'Newe voegen aanbrengen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-1-losse_tegels_herstellen', 'q-tegelzetter-4304-1', 'losse_tegels_herstellen', 'Losse tegels herstellen', 'Losse tegels herstellen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-1-anders', 'q-tegelzetter-4304-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tegelzetter-4304-2', 43, 4304, 'Hoeveel tegels gaat het ongeveer om?', 'How many tegels gaat het approximately om?', 'radio', false, 'q-tegelzetter-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-2-enkele_stuks', 'q-tegelzetter-4304-2', 'enkele_stuks', 'Enkele stuks', 'Enkele stuks', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-2-een_deel_van_de_muur_vloer', 'q-tegelzetter-4304-2', 'een_deel_van_de_muur_vloer', 'Een deel van de muur/vloer', 'Een deel van de muur/vloer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tegelzetter-4304-2-grote_oppervlakte', 'q-tegelzetter-4304-2', 'grote_oppervlakte', 'Grote oppervlakte', 'Grote oppervlakte', false, 3, true, NULL);


-- ===============================================
-- Category: Thuisbatterij (ID: 44)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-root', 44, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4401-1', 44, 4401, 'Waarvoor wil je de batterij gebruiken?', 'Waarvoor wil je de batterij gebruiken?', 'radio', false, 'q-thuisbatterij-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-1-opslag_zonnepanelen', 'q-thuisbatterij-4401-1', 'opslag_zonnepanelen', 'Opslag zonnepanelen', 'Opslag zonnepanelen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-1-backup_bij_stroomuitval', 'q-thuisbatterij-4401-1', 'backup_bij_stroomuitval', 'Back-up bij stroomuitval', 'Back-up bij stroomuitval', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-1-beide', 'q-thuisbatterij-4401-1', 'beide', 'Beide', 'Beide', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4401-2', 44, 4401, 'Hoeveel opslagcapaciteit wil je ongeveer?', 'How many opslagcapaciteit wil je approximately?', 'radio', false, 'q-thuisbatterij-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-2-klein_25_kwh', 'q-thuisbatterij-4401-2', 'klein_25_kwh', 'Klein (2–5 kWh)', 'Small (2–5 kWh)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-2-middel_510_kwh', 'q-thuisbatterij-4401-2', 'middel_510_kwh', 'Middel (5–10 kWh)', 'Medium (5–10 kWh)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-2-groot_1015_kwh', 'q-thuisbatterij-4401-2', 'groot_1015_kwh', 'Groot (10–15 kWh)', 'Large (10–15 kWh)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-2-zeer_groot_15_kwh', 'q-thuisbatterij-4401-2', 'zeer_groot_15_kwh', 'Zeer groot (15+ kWh)', 'Very large (15+ kWh)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4401-3', 44, 4401, 'Waar moet de batterij geplaatst worden?', 'Where should de batterij geplaatst worden?', 'radio', false, 'q-thuisbatterij-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-3-garage', 'q-thuisbatterij-4401-3', 'garage', 'Garage', 'Garage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-3-kelder', 'q-thuisbatterij-4401-3', 'kelder', 'Kelder', 'Kelder', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-3-buitenruimte', 'q-thuisbatterij-4401-3', 'buitenruimte', 'Buitenruimte', 'Outdoorruimte', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4401-3-anders', 'q-thuisbatterij-4401-3', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4402-1', 44, 4402, 'Hoeveel extra capaciteit wil je toevoegen?', 'How many extra capaciteit wil je toevoegen?', 'radio', false, 'q-thuisbatterij-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-1-25_kwh', 'q-thuisbatterij-4402-1', '25_kwh', '2–5 kWh', '2–5 kWh', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-1-510_kwh', 'q-thuisbatterij-4402-1', '510_kwh', '5–10 kWh', '5–10 kWh', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-1-meer_dan_10_kwh', 'q-thuisbatterij-4402-1', 'meer_dan_10_kwh', 'Meer dan 10 kWh', 'Meer dan 10 kWh', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4402-2', 44, 4402, 'Is je huidige systeem compatibel met uitbreiding?', 'Is je huidige systeem compatibel met uitbreiding?', 'radio', false, 'q-thuisbatterij-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-2-ja', 'q-thuisbatterij-4402-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-2-nee', 'q-thuisbatterij-4402-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-2-weet_ik_niet', 'q-thuisbatterij-4402-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4402-3', 44, 4402, 'Moet er ook een nieuwe omvormer geplaatst worden?', 'Should ook een nieuwe omvormer geplaatst worden?', 'radio', false, 'q-thuisbatterij-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-3-ja', 'q-thuisbatterij-4402-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-3-nee', 'q-thuisbatterij-4402-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4402-3-weet_ik_niet', 'q-thuisbatterij-4402-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4403-1', 44, 4403, 'Waarom wil je de batterij vervangen?', 'Why do you want to de batterij replace?', 'radio', false, 'q-thuisbatterij-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-1-capaciteit_te_klein', 'q-thuisbatterij-4403-1', 'capaciteit_te_klein', 'Capaciteit te klein', 'Capaciteit te klein', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-1-defect', 'q-thuisbatterij-4403-1', 'defect', 'Defect', 'Defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-1-efficinter_model_gewenst', 'q-thuisbatterij-4403-1', 'efficinter_model_gewenst', 'Efficiënter model gewenst', 'Efficiënter model gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4403-2', 44, 4403, 'Hoe oud is de batterij ongeveer?', 'Hoe oud is de batterij approximately?', 'radio', false, 'q-thuisbatterij-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-2-03_jaar', 'q-thuisbatterij-4403-2', '03_jaar', '0–3 jaar', '0–3 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-2-35_jaar', 'q-thuisbatterij-4403-2', '35_jaar', '3–5 jaar', '3–5 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-2-510_jaar', 'q-thuisbatterij-4403-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-2-ouder_dan_10_jaar', 'q-thuisbatterij-4403-2', 'ouder_dan_10_jaar', 'Ouder dan 10 jaar', 'Oldr dan 10 jaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4403-3', 44, 4403, 'Moet de oude batterij verwijderd worden?', 'Should the old batterij verwijderd worden?', 'radio', false, 'q-thuisbatterij-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-3-ja', 'q-thuisbatterij-4403-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4403-3-nee', 'q-thuisbatterij-4403-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4404-1', 44, 4404, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-thuisbatterij-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-1-batterij_laadt_niet_op', 'q-thuisbatterij-4404-1', 'batterij_laadt_niet_op', 'Batterij laadt niet op', 'Batterij laadt niet op', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-1-batterij_loopt_snel_leeg', 'q-thuisbatterij-4404-1', 'batterij_loopt_snel_leeg', 'Batterij loopt snel leeg', 'Batterij loopt snel leeg', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-1-elektronische_storing', 'q-thuisbatterij-4404-1', 'elektronische_storing', 'Elektronische storing', 'Elektronische storing', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-1-anders', 'q-thuisbatterij-4404-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-thuisbatterij-4404-2', 44, 4404, 'Wat is de capaciteit van de batterij?', 'Wat is de capaciteit van de batterij?', 'radio', false, 'q-thuisbatterij-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-2-klein_25_kwh', 'q-thuisbatterij-4404-2', 'klein_25_kwh', 'Klein (2–5 kWh)', 'Small (2–5 kWh)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-2-middel_510_kwh', 'q-thuisbatterij-4404-2', 'middel_510_kwh', 'Middel (5–10 kWh)', 'Medium (5–10 kWh)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-2-groot_1015_kwh', 'q-thuisbatterij-4404-2', 'groot_1015_kwh', 'Groot (10–15 kWh)', 'Large (10–15 kWh)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-thuisbatterij-4404-2-zeer_groot_15_kwh', 'q-thuisbatterij-4404-2', 'zeer_groot_15_kwh', 'Zeer groot (15+ kWh)', 'Very large (15+ kWh)', false, 4, true, NULL);


-- ===============================================
-- Category: Trappen (ID: 45)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-root', 45, NULL, 'Wat voor trap-opdracht zoek je?', 'What kind of trap-project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4501-1', 45, 4501, 'Wat voor type trap wil je laten plaatsen?', 'What type of trap wil je have install?', 'radio', false, 'q-trappen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-1-rechte_trap', 'q-trappen-4501-1', 'rechte_trap', 'Rechte trap', 'Rechte trap', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-1-draaitrap', 'q-trappen-4501-1', 'draaitrap', 'Draaitrap', 'Draaitrap', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-1-wenteltrap', 'q-trappen-4501-1', 'wenteltrap', 'Wenteltrap', 'Wenteltrap', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-1-zoldertrap___vlizotrap', 'q-trappen-4501-1', 'zoldertrap___vlizotrap', 'Zoldertrap / vlizotrap', 'Zoldertrap / vlizotrap', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4501-2', 45, 4501, 'Van welk materiaal moet de trap zijn?', 'Van welk materiaal moet de trap zijn?', 'radio', false, 'q-trappen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-2-hout', 'q-trappen-4501-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-2-metaal', 'q-trappen-4501-2', 'metaal', 'Metaal', 'Metal', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-2-glas', 'q-trappen-4501-2', 'glas', 'Glas', 'Glas', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-2-combinatie', 'q-trappen-4501-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4501-3', 45, 4501, 'Waar komt de trap?', 'Waar komt de trap?', 'radio', false, 'q-trappen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-3-woonkamer___hal', 'q-trappen-4501-3', 'woonkamer___hal', 'Woonkamer / hal', 'Woonkamer / hal', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-3-naar_zolder', 'q-trappen-4501-3', 'naar_zolder', 'Naar zolder', 'Naar zolder', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4501-3-buiten', 'q-trappen-4501-3', 'buiten', 'Buiten', 'Outdoor', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4502-1', 45, 4502, 'Wat moet er gerenoveerd worden?', 'Wat moet er gerenoveerd worden?', 'radio', false, 'q-trappen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-1-alleen_treden', 'q-trappen-4502-1', 'alleen_treden', 'Alleen treden', 'Alleen treden', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-1-trapleuning___balustrade', 'q-trappen-4502-1', 'trapleuning___balustrade', 'Trapleuning / balustrade', 'Trapleuning / balustrade', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-1-volledige_trap', 'q-trappen-4502-1', 'volledige_trap', 'Volledige trap', 'Complete trap', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4502-2', 45, 4502, 'Welke afwerking wil je?', 'Which afwerking wil je?', 'radio', false, 'q-trappen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-2-hout', 'q-trappen-4502-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-2-laminaat', 'q-trappen-4502-2', 'laminaat', 'Laminaat', 'Laminaat', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-2-pvc', 'q-trappen-4502-2', 'pvc', 'PVC', 'PVC', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-2-tapijt', 'q-trappen-4502-2', 'tapijt', 'Tapijt', 'Tapijt', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-2-anders', 'q-trappen-4502-2', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4502-3', 45, 4502, 'Hoeveel treden heeft de trap ongeveer?', 'How many treden heeft de trap approximately?', 'radio', false, 'q-trappen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-3-minder_dan_10', 'q-trappen-4502-3', 'minder_dan_10', 'Minder dan 10', 'Minder dan 10', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-3-1015', 'q-trappen-4502-3', '1015', '10–15', '10–15', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-3-1520', 'q-trappen-4502-3', '1520', '15–20', '15–20', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4502-3-meer_dan_20', 'q-trappen-4502-3', 'meer_dan_20', 'Meer dan 20', 'Meer dan 20', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4503-1', 45, 4503, 'Met welk materiaal wil je de trap laten bekleden?', 'Met welk materiaal wil je de trap have bekleden?', 'radio', false, 'q-trappen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-1-tapijt', 'q-trappen-4503-1', 'tapijt', 'Tapijt', 'Tapijt', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-1-laminaat', 'q-trappen-4503-1', 'laminaat', 'Laminaat', 'Laminaat', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-1-pvc', 'q-trappen-4503-1', 'pvc', 'PVC', 'PVC', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-1-hout', 'q-trappen-4503-1', 'hout', 'Hout', 'Wood', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-1-anders', 'q-trappen-4503-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4503-2', 45, 4503, 'Om hoeveel trappen gaat het?', 'How many trappen gaat het?', 'radio', false, 'q-trappen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-2-1_trap', 'q-trappen-4503-2', '1_trap', '1 trap', '1 trap', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-2-2_trappen', 'q-trappen-4503-2', '2_trappen', '2 trappen', '2 trappen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4503-2-meer_dan_2', 'q-trappen-4503-2', 'meer_dan_2', 'Meer dan 2', 'Meer dan 2', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4504-1', 45, 4504, 'Wat moet er hersteld worden?', 'Wat moet er hersteld worden?', 'radio', false, 'q-trappen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-1-losse_treden', 'q-trappen-4504-1', 'losse_treden', 'Losse treden', 'Losse treden', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-1-leuning_balustrade', 'q-trappen-4504-1', 'leuning_balustrade', 'Leuning/balustrade', 'Leuning/balustrade', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-1-knarsend_krakend_hout', 'q-trappen-4504-1', 'knarsend_krakend_hout', 'Knarsend/krakend hout', 'Knarsend/krakend hout', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-1-anders', 'q-trappen-4504-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-trappen-4504-2', 45, 4504, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-trappen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-2-klein_enkele_treden_onderdelen', 'q-trappen-4504-2', 'klein_enkele_treden_onderdelen', 'Klein (enkele treden/onderdelen)', 'Small (enkele treden/onderdelen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-2-middel_deel_van_de_trap', 'q-trappen-4504-2', 'middel_deel_van_de_trap', 'Middel (deel van de trap)', 'Medium (deel van de trap)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-trappen-4504-2-groot_bijna_complete_trap', 'q-trappen-4504-2', 'groot_bijna_complete_trap', 'Groot (bijna complete trap)', 'Large (bijna complete trap)', false, 3, true, NULL);


-- ===============================================
-- Category: Tuinhuis/poolhouse (ID: 46)
-- ===============================================

-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-root', 46, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuw tuinhuis / poolhouse plaatsen (ID: 4601)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4601-1', 46, 4601, 'Wat wil je laten bouwen?', 'What do you want to have built?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-1-tuinhuis', 'q-tuinhuis-poolhouse-4601-1', 'tuinhuis', 'Tuinhuis', 'Garden house', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-1-poolhouse', 'q-tuinhuis-poolhouse-4601-1', 'poolhouse', 'Poolhouse', 'Pool house', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-1-combinatie', 'q-tuinhuis-poolhouse-4601-1', 'combinatie', 'Combinatie', 'Combination', false, 3, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4601-2', 46, 4601, 'Van welk materiaal moet het gemaakt worden?', 'What material should it be made of?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-2-hout', 'q-tuinhuis-poolhouse-4601-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-2-metaal', 'q-tuinhuis-poolhouse-4601-2', 'metaal', 'Metaal', 'Metal', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-2-kunststof', 'q-tuinhuis-poolhouse-4601-2', 'kunststof', 'Kunststof', 'Plastic', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-2-steen_beton', 'q-tuinhuis-poolhouse-4601-2', 'steen_beton', 'Steen/beton', 'Stone/concrete', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4601-3', 46, 4601, 'Hoe groot moet het ongeveer zijn?', 'How large should it be approximately?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-3-klein_tot_10_m2', 'q-tuinhuis-poolhouse-4601-3', 'klein_tot_10_m2', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-3-middel_10_20_m2', 'q-tuinhuis-poolhouse-4601-3', 'middel_10_20_m2', 'Middel (10–20 m²)', 'Medium (10-20 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-3-groot_20_40_m2', 'q-tuinhuis-poolhouse-4601-3', 'groot_20_40_m2', 'Groot (20–40 m²)', 'Large (20-40 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4601-3-zeer_groot_40_m2', 'q-tuinhuis-poolhouse-4601-3', 'zeer_groot_40_m2', 'Zeer groot (40+ m²)', 'Very large (40+ sqm)', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Bestaand tuinhuis / poolhouse vervangen (ID: 4602)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4602-1', 46, 4602, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-1-beschadigd', 'q-tuinhuis-poolhouse-4602-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-1-verouderd', 'q-tuinhuis-poolhouse-4602-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-1-grotere_andere_uitvoering_gewenst', 'q-tuinhuis-poolhouse-4602-1', 'grotere_andere_uitvoering_gewenst', 'Grotere/andere uitvoering gewenst', 'Larger/different design desired', false, 3, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4602-2', 46, 4602, 'Moet het oude gebouw verwijderd worden?', 'Should the old building be removed?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-2-ja', 'q-tuinhuis-poolhouse-4602-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-2-nee', 'q-tuinhuis-poolhouse-4602-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4602-3', 46, 4602, 'Van welk materiaal wil je de nieuwe versie?', 'What material do you want for the new version?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-3-hout', 'q-tuinhuis-poolhouse-4602-3', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-3-metaal', 'q-tuinhuis-poolhouse-4602-3', 'metaal', 'Metaal', 'Metal', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-3-kunststof', 'q-tuinhuis-poolhouse-4602-3', 'kunststof', 'Kunststof', 'Plastic', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4602-3-steen_beton', 'q-tuinhuis-poolhouse-4602-3', 'steen_beton', 'Steen/beton', 'Stone/concrete', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Tuinhuis / poolhouse renoveren of repareren (ID: 4603)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4603-1', 46, 4603, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-1-dak_vernieuwen', 'q-tuinhuis-poolhouse-4603-1', 'dak_vernieuwen', 'Dak vernieuwen', 'Renew roof', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-1-wanden_herstellen', 'q-tuinhuis-poolhouse-4603-1', 'wanden_herstellen', 'Wanden herstellen', 'Repair walls', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-1-schilderen_behandelen', 'q-tuinhuis-poolhouse-4603-1', 'schilderen_behandelen', 'Schilderen/behandelen', 'Paint/treat', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-1-anders', 'q-tuinhuis-poolhouse-4603-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinhuis-poolhouse-4603-2', 46, 4603, 'Hoe groot is het gebouw?', 'How large is the building?', 'radio', false, 'q-tuinhuis-poolhouse-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-2-klein_tot_10_m2', 'q-tuinhuis-poolhouse-4603-2', 'klein_tot_10_m2', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-2-middel_10_20_m2', 'q-tuinhuis-poolhouse-4603-2', 'middel_10_20_m2', 'Middel (10–20 m²)', 'Medium (10-20 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-2-groot_20_40_m2', 'q-tuinhuis-poolhouse-4603-2', 'groot_20_40_m2', 'Groot (20–40 m²)', 'Large (20-40 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinhuis-poolhouse-4603-2-zeer_groot_40_m2', 'q-tuinhuis-poolhouse-4603-2', 'zeer_groot_40_m2', 'Zeer groot (40+ m²)', 'Very large (40+ sqm)', false, 4, true, NULL);

-- ===============================================
-- Category: Tuinonderhoud (ID: 47)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-root', 47, NULL, 'Wat voor type tuinwerk zoek je?', 'What type of gardenwerk are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4701-1', 47, 4701, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-tuinonderhoud-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-1-onkruid_verwijderen', 'q-tuinonderhoud-4701-1', 'onkruid_verwijderen', 'Onkruid verwijderen', 'Weeds remove', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-1-snoeien', 'q-tuinonderhoud-4701-1', 'snoeien', 'Snoeien', 'Pruning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-1-gazon_maaien', 'q-tuinonderhoud-4701-1', 'gazon_maaien', 'Gazon maaien', 'Lawn maaien', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-1-hagen_knippen', 'q-tuinonderhoud-4701-1', 'hagen_knippen', 'Hagen knippen', 'Hedges knippen', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-1-ander_onderhoud', 'q-tuinonderhoud-4701-1', 'ander_onderhoud', 'Ander onderhoud', 'Ander onderhoud', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4701-2', 47, 4701, 'Hoe groot is de tuin ongeveer?', 'How large is de garden approximately?', 'radio', false, 'q-tuinonderhoud-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-2-klein_tot_50_m', 'q-tuinonderhoud-4701-2', 'klein_tot_50_m', 'Klein (tot 50 m²)', 'Small (up to 50 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-2-middel_50200_m', 'q-tuinonderhoud-4701-2', 'middel_50200_m', 'Middel (50–200 m²)', 'Medium (50-200 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-2-groot_200500_m', 'q-tuinonderhoud-4701-2', 'groot_200500_m', 'Groot (200–500 m²)', 'Large (200-500 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4701-2-zeer_groot_500_m', 'q-tuinonderhoud-4701-2', 'zeer_groot_500_m', 'Zeer groot (500+ m²)', 'Very large (500+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4702-1', 47, 4702, 'Hoe vaak wil je onderhoud?', 'How often wil je onderhoud?', 'radio', false, 'q-tuinonderhoud-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-1-wekelijks', 'q-tuinonderhoud-4702-1', 'wekelijks', 'Wekelijks', 'Weekly', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-1-maandelijks', 'q-tuinonderhoud-4702-1', 'maandelijks', 'Maandelijks', 'Monthly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-1-seizoensgebonden', 'q-tuinonderhoud-4702-1', 'seizoensgebonden', 'Seizoensgebonden', 'Seasonal', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-1-anders', 'q-tuinonderhoud-4702-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4702-2', 47, 4702, 'Wat moet er standaard gebeuren?', 'Wat moet er standaard gebeuren?', 'radio', false, 'q-tuinonderhoud-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-2-gazon_maaien', 'q-tuinonderhoud-4702-2', 'gazon_maaien', 'Gazon maaien', 'Lawn maaien', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-2-hagen_knippen', 'q-tuinonderhoud-4702-2', 'hagen_knippen', 'Hagen knippen', 'Hedges knippen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-2-onkruid_verwijderen', 'q-tuinonderhoud-4702-2', 'onkruid_verwijderen', 'Onkruid verwijderen', 'Weeds remove', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4702-2-complete_verzorging', 'q-tuinonderhoud-4702-2', 'complete_verzorging', 'Complete verzorging', 'Complete verzorging', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4703-1', 47, 4703, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-tuinonderhoud-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-1-maaien', 'q-tuinonderhoud-4703-1', 'maaien', 'Maaien', 'Maaien', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-1-verticuteren', 'q-tuinonderhoud-4703-1', 'verticuteren', 'Verticuteren', 'Verticuteren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-1-bemesten', 'q-tuinonderhoud-4703-1', 'bemesten', 'Bemesten', 'Bemesten', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-1-nieuw_gras_inzaaien___leggen', 'q-tuinonderhoud-4703-1', 'nieuw_gras_inzaaien___leggen', 'Nieuw gras inzaaien / leggen', 'New gras inzaaien / leggen', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4703-2', 47, 4703, 'Hoe groot is het gazon ongeveer?', 'How large is het lawn approximately?', 'radio', false, 'q-tuinonderhoud-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-2-klein_tot_50_m', 'q-tuinonderhoud-4703-2', 'klein_tot_50_m', 'Klein (tot 50 m²)', 'Small (up to 50 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-2-middel_50200_m', 'q-tuinonderhoud-4703-2', 'middel_50200_m', 'Middel (50–200 m²)', 'Medium (50-200 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-2-groot_200500_m', 'q-tuinonderhoud-4703-2', 'groot_200500_m', 'Groot (200–500 m²)', 'Large (200-500 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4703-2-zeer_groot_500_m', 'q-tuinonderhoud-4703-2', 'zeer_groot_500_m', 'Zeer groot (500+ m²)', 'Very large (500+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4704-1', 47, 4704, 'Wat moet er gesnoeid worden?', 'Wat moet er gesnoeid worden?', 'radio', false, 'q-tuinonderhoud-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-1-hagen', 'q-tuinonderhoud-4704-1', 'hagen', 'Hagen', 'Hedges', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-1-struiken', 'q-tuinonderhoud-4704-1', 'struiken', 'Struiken', 'Shrubs', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-1-bomen', 'q-tuinonderhoud-4704-1', 'bomen', 'Bomen', 'Trees', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4704-2', 47, 4704, 'Hoeveel bomen of struiken gaat het om?', 'How many bomen of struiken gaat het om?', 'radio', false, 'q-tuinonderhoud-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-2-12', 'q-tuinonderhoud-4704-2', '12', '1–2', '1–2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-2-35', 'q-tuinonderhoud-4704-2', '35', '3–5', '3–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-2-meer_dan_5', 'q-tuinonderhoud-4704-2', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinonderhoud-4704-3', 47, 4704, 'Moet het snoeiafval ook worden afgevoerd?', 'Should the snoeiafval ook worden removed?', 'radio', false, 'q-tuinonderhoud-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-3-ja', 'q-tuinonderhoud-4704-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinonderhoud-4704-3-nee', 'q-tuinonderhoud-4704-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Tuinpoorten (ID: 48)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-root', 48, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4801-1', 48, 4801, 'Wat voor type poort wil je?', 'What type of poort wil je?', 'radio', false, 'q-tuinpoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-1-houten_poort', 'q-tuinpoorten-4801-1', 'houten_poort', 'Houten poort', 'Wooden poort', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-1-metalen_poort', 'q-tuinpoorten-4801-1', 'metalen_poort', 'Metalen poort', 'Metal poort', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-1-kunststof_poort', 'q-tuinpoorten-4801-1', 'kunststof_poort', 'Kunststof poort', 'Kunststof poort', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-1-combinatie_hout__metaal', 'q-tuinpoorten-4801-1', 'combinatie_hout__metaal', 'Combinatie (hout \+ metaal)', 'Combinatie (hout \+ metaal)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4801-2', 48, 4801, 'Wil je een enkele of dubbele poort?', 'Wil je een enkele of dubbele poort?', 'radio', false, 'q-tuinpoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-2-enkele_poort', 'q-tuinpoorten-4801-2', 'enkele_poort', 'Enkele poort', 'Enkele poort', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-2-dubbele_poort', 'q-tuinpoorten-4801-2', 'dubbele_poort', 'Dubbele poort', 'Dubbele poort', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4801-3', 48, 4801, 'Moet de poort voorzien worden van automatisering?', 'Should the poort voorzien worden van automatisering?', 'radio', false, 'q-tuinpoorten-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-3-ja', 'q-tuinpoorten-4801-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4801-3-nee', 'q-tuinpoorten-4801-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4802-1', 48, 4802, 'Wat voor type poort wil je vervangen?', 'What type of poort wil je replace?', 'radio', false, 'q-tuinpoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-1-houten_poort', 'q-tuinpoorten-4802-1', 'houten_poort', 'Houten poort', 'Wooden poort', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-1-metalen_poort', 'q-tuinpoorten-4802-1', 'metalen_poort', 'Metalen poort', 'Metal poort', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-1-kunststof_poort', 'q-tuinpoorten-4802-1', 'kunststof_poort', 'Kunststof poort', 'Kunststof poort', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-1-anders', 'q-tuinpoorten-4802-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4802-2', 48, 4802, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-tuinpoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-2-beschadigd', 'q-tuinpoorten-4802-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-2-verouderd', 'q-tuinpoorten-4802-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-2-andere_stijl_gewenst', 'q-tuinpoorten-4802-2', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4802-3', 48, 4802, 'Moet de oude poort verwijderd worden?', 'Should the old poort verwijderd worden?', 'radio', false, 'q-tuinpoorten-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-3-ja', 'q-tuinpoorten-4802-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4802-3-nee', 'q-tuinpoorten-4802-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4803-1', 48, 4803, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-tuinpoorten-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-1-scharnieren_defect', 'q-tuinpoorten-4803-1', 'scharnieren_defect', 'Scharnieren defect', 'Scharnieren defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-1-slot_kapot', 'q-tuinpoorten-4803-1', 'slot_kapot', 'Slot kapot', 'Slot kapot', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-1-poort_verzakt', 'q-tuinpoorten-4803-1', 'poort_verzakt', 'Poort verzakt', 'Poort verzakt', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-1-anders', 'q-tuinpoorten-4803-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-tuinpoorten-4803-2', 48, 4803, 'Hoe groot is de poort?', 'How large is de poort?', 'radio', false, 'q-tuinpoorten-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-2-klein_tot_1_m_breed', 'q-tuinpoorten-4803-2', 'klein_tot_1_m_breed', 'Klein (tot 1 m breed)', 'Small (tot 1 m breed)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-2-middel_12_m_breed', 'q-tuinpoorten-4803-2', 'middel_12_m_breed', 'Middel (1–2 m breed)', 'Medium (1–2 m breed)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-tuinpoorten-4803-2-groot_2_m_breed', 'q-tuinpoorten-4803-2', 'groot_2_m_breed', 'Groot (2+ m breed)', 'Large (2+ m breed)', false, 3, true, NULL);


-- ===============================================
-- Category: Ventilatie (ID: 49)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-root', 49, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4901-1', 49, 4901, 'Wat voor systeem wil je laten plaatsen?', 'What kind of systeem wil je have install?', 'radio', false, 'q-ventilatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-1-mechanische_ventilatie_afzuiging', 'q-ventilatie-4901-1', 'mechanische_ventilatie_afzuiging', 'Mechanische ventilatie (afzuiging)', 'Mechanische ventilatie (afzuiging)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-1-wtwsysteem_warmteterugwinning', 'q-ventilatie-4901-1', 'wtwsysteem_warmteterugwinning', 'WTW-systeem (warmteterugwinning)', 'WTW-systeem (warmteterugwinning)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-1-ventilatieroosters', 'q-ventilatie-4901-1', 'ventilatieroosters', 'Ventilatieroosters', 'Ventilatieroosters', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-1-weet_ik_nog_niet', 'q-ventilatie-4901-1', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4901-2', 49, 4901, 'Voor welk type woning/gebouw?', 'Voor welk type woning/gebouw?', 'radio', false, 'q-ventilatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-2-appartement', 'q-ventilatie-4901-2', 'appartement', 'Appartement', 'Appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-2-rijtjeshuis', 'q-ventilatie-4901-2', 'rijtjeshuis', 'Rijtjeshuis', 'Rijtjeshuis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-2-vrijstaande_woning', 'q-ventilatie-4901-2', 'vrijstaande_woning', 'Vrijstaande woning', 'Vrijstaande woning', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-2-kantoor_bedrijfspand', 'q-ventilatie-4901-2', 'kantoor_bedrijfspand', 'Kantoor/bedrijfspand', 'Kantoor/bedrijfspand', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4901-3', 49, 4901, 'Om hoeveel ruimtes gaat het?', 'How many ruimtes gaat het?', 'radio', false, 'q-ventilatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-3-1', 'q-ventilatie-4901-3', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-3-23', 'q-ventilatie-4901-3', '23', '2–3', '2–3', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-3-45', 'q-ventilatie-4901-3', '45', '4–5', '4–5', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4901-3-meer_dan_5', 'q-ventilatie-4901-3', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4902-1', 49, 4902, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-ventilatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-1-ventilatiebox___unit', 'q-ventilatie-4902-1', 'ventilatiebox___unit', 'Ventilatiebox / unit', 'Ventilatiebox / unit', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-1-kanalen', 'q-ventilatie-4902-1', 'kanalen', 'Kanalen', 'Kanalen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-1-complete_installatie', 'q-ventilatie-4902-1', 'complete_installatie', 'Complete installatie', 'Complete installatie', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4902-2', 49, 4902, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-ventilatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-2-defect', 'q-ventilatie-4902-2', 'defect', 'Defect', 'Defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-2-verouderd', 'q-ventilatie-4902-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-2-betere_energieefficintie', 'q-ventilatie-4902-2', 'betere_energieefficintie', 'Betere energie-efficiëntie', 'Betere energie-efficiëntie', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4902-3', 49, 4902, 'Moet de oude installatie verwijderd worden?', 'Should the old installatie verwijderd worden?', 'radio', false, 'q-ventilatie-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-3-ja', 'q-ventilatie-4902-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4902-3-nee', 'q-ventilatie-4902-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4903-1', 49, 4903, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-ventilatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-1-ventilatie_werkt_niet', 'q-ventilatie-4903-1', 'ventilatie_werkt_niet', 'Ventilatie werkt niet', 'Ventilatie werkt niet', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-1-lawaai', 'q-ventilatie-4903-1', 'lawaai', 'Lawaai', 'Lawaai', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-1-slechte_luchtcirculatie', 'q-ventilatie-4903-1', 'slechte_luchtcirculatie', 'Slechte luchtcirculatie', 'Slechte luchtcirculatie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-1-anders', 'q-ventilatie-4903-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4903-2', 49, 4903, 'Hoe oud is de installatie ongeveer?', 'Hoe oud is de installatie approximately?', 'radio', false, 'q-ventilatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-2-05_jaar', 'q-ventilatie-4903-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-2-510_jaar', 'q-ventilatie-4903-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-2-1020_jaar', 'q-ventilatie-4903-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4903-2-ouder_dan_20_jaar', 'q-ventilatie-4903-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4904-1', 49, 4904, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-ventilatie-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-1-kanalen_reinigen', 'q-ventilatie-4904-1', 'kanalen_reinigen', 'Kanalen reinigen', 'Kanalen reinigen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-1-unit_reinigen', 'q-ventilatie-4904-1', 'unit_reinigen', 'Unit reinigen', 'Unit reinigen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-1-volledig_onderhoudscontract', 'q-ventilatie-4904-1', 'volledig_onderhoudscontract', 'Volledig onderhoudscontract', 'Volledig onderhoudscontract', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-ventilatie-4904-2', 49, 4904, 'Hoe vaak wil je onderhoud?', 'How often wil je onderhoud?', 'radio', false, 'q-ventilatie-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-eenmalig', 'q-ventilatie-4904-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-jaarlijks', 'q-ventilatie-4904-2', 'jaarlijks', 'Jaarlijks', 'Yesarlijks', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-halfjaarlijks', 'q-ventilatie-4904-2', 'halfjaarlijks', 'Halfjaarlijks', 'Halfjaarlijks', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-nieuwe_airco_plaatsen', 'q-ventilatie-4904-2', 'nieuwe_airco_plaatsen', 'Nieuwe airco plaatsen', 'Newe airco install', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-airco_vervangen', 'q-ventilatie-4904-2', 'airco_vervangen', 'Airco vervangen', 'Airco replace', false, 5, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-airco_repareren', 'q-ventilatie-4904-2', 'airco_repareren', 'Airco repareren', 'Airco repair', false, 6, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-ventilatie-4904-2-airco_onderhouden_reinigen', 'q-ventilatie-4904-2', 'airco_onderhouden_reinigen', 'Airco onderhouden/reinigen', 'Airco maintain/reinigen', false, 7, true, NULL);


-- ===============================================
-- Category: Veranda (ID: 50)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-root', 50, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5001-1', 50, 5001, 'Wat voor type veranda wil je?', 'What type of veranda wil je?', 'radio', false, 'q-veranda-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-1-open_veranda', 'q-veranda-5001-1', 'open_veranda', 'Open veranda', 'Open veranda', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-1-overkapping_aan_huis', 'q-veranda-5001-1', 'overkapping_aan_huis', 'Overkapping aan huis', 'Overkapping aan huis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-1-gesloten_veranda_tuinkamer', 'q-veranda-5001-1', 'gesloten_veranda_tuinkamer', 'Gesloten veranda (tuinkamer)', 'Gesloten veranda (gardenkamer)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5001-2', 50, 5001, 'Van welk materiaal moet de veranda zijn?', 'Van welk materiaal moet de veranda zijn?', 'radio', false, 'q-veranda-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-2-hout', 'q-veranda-5001-2', 'hout', 'Hout', 'Wood', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-2-aluminium', 'q-veranda-5001-2', 'aluminium', 'Aluminium', 'Aluminium', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-2-pvc_kunststof', 'q-veranda-5001-2', 'pvc_kunststof', 'PVC/kunststof', 'PVC/kunststof', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-2-combinatie', 'q-veranda-5001-2', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5001-3', 50, 5001, 'Hoe groot moet de veranda ongeveer zijn?', 'How large moet de veranda approximately zijn?', 'radio', false, 'q-veranda-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-3-klein_tot_10_m', 'q-veranda-5001-3', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-3-middel_1020_m', 'q-veranda-5001-3', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-3-groot_2040_m', 'q-veranda-5001-3', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5001-3-zeer_groot_40_m', 'q-veranda-5001-3', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5002-1', 50, 5002, 'Waarom wil je de veranda vervangen?', 'Why do you want to de veranda replace?', 'radio', false, 'q-veranda-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-1-beschadigd', 'q-veranda-5002-1', 'beschadigd', 'Beschadigd', 'Damaged', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-1-verouderd', 'q-veranda-5002-1', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-1-betere_isolatie', 'q-veranda-5002-1', 'betere_isolatie', 'Betere isolatie', 'Betere isolatie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-1-andere_stijl_gewenst', 'q-veranda-5002-1', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5002-2', 50, 5002, 'Moet de oude veranda verwijderd worden?', 'Should the old veranda verwijderd worden?', 'radio', false, 'q-veranda-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-2-ja', 'q-veranda-5002-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-2-nee', 'q-veranda-5002-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5002-3', 50, 5002, 'Wat voor nieuwe veranda wil je?', 'What kind of nieuwe veranda wil je?', 'radio', false, 'q-veranda-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-3-open_veranda', 'q-veranda-5002-3', 'open_veranda', 'Open veranda', 'Open veranda', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-3-overkapping_aan_huis', 'q-veranda-5002-3', 'overkapping_aan_huis', 'Overkapping aan huis', 'Overkapping aan huis', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5002-3-gesloten_veranda_tuinkamer', 'q-veranda-5002-3', 'gesloten_veranda_tuinkamer', 'Gesloten veranda (tuinkamer)', 'Gesloten veranda (gardenkamer)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5003-1', 50, 5003, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-veranda-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-1-dak_vervangen', 'q-veranda-5003-1', 'dak_vervangen', 'Dak vervangen', 'Dak replace', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-1-glas_vervangen', 'q-veranda-5003-1', 'glas_vervangen', 'Glas vervangen', 'Glas replace', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-1-constructie_herstellen', 'q-veranda-5003-1', 'constructie_herstellen', 'Constructie herstellen', 'Constructie herstellen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-1-schilder_lakwerk', 'q-veranda-5003-1', 'schilder_lakwerk', 'Schilder-/lakwerk', 'Schilder-/lakwerk', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-1-anders', 'q-veranda-5003-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-veranda-5003-2', 50, 5003, 'Hoe groot is de veranda ongeveer?', 'How large is de veranda approximately?', 'radio', false, 'q-veranda-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-2-klein_tot_10_m', 'q-veranda-5003-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-2-middel_1020_m', 'q-veranda-5003-2', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-2-groot_2040_m', 'q-veranda-5003-2', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-veranda-5003-2-zeer_groot_40_m', 'q-veranda-5003-2', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);

-- Total Questions: 95
-- Total Options: 304

-- ===============================================
-- Categories 51-60 - AUTO GENERATED
-- ===============================================

-- ===============================================
-- Category: Verhuizer (ID: 51)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-root', 51, NULL, 'Wat voor type verhuisopdracht zoek je?', 'What type of verhuisproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5101-1', 51, 5101, 'Wat voor type woning verhuis je?', 'What type of woning verhuis je?', 'radio', false, 'q-verhuizer-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-1-appartement', 'q-verhuizer-5101-1', 'appartement', 'Appartement', 'Appartement', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-1-eengezinswoning', 'q-verhuizer-5101-1', 'eengezinswoning', 'Eengezinswoning', 'Eengezinswoning', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-1-villa', 'q-verhuizer-5101-1', 'villa', 'Villa', 'Villa', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-1-anders', 'q-verhuizer-5101-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5101-2', 51, 5101, 'Hoe groot is de verhuizing?', 'How large is de verhuizing?', 'radio', false, 'q-verhuizer-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-2-klein_12_kamers', 'q-verhuizer-5101-2', 'klein_12_kamers', 'Klein (1–2 kamers)', 'Small (1–2 kamers)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-2-middel_34_kamers', 'q-verhuizer-5101-2', 'middel_34_kamers', 'Middel (3–4 kamers)', 'Medium (3–4 kamers)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-2-groot_volledige_woning', 'q-verhuizer-5101-2', 'groot_volledige_woning', 'Groot (volledige woning)', 'Large (volledige woning)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5101-3', 51, 5101, 'Moet er ook een verhuislift geregeld worden?', 'Should ook een verhuislift geregeld worden?', 'radio', false, 'q-verhuizer-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-3-ja', 'q-verhuizer-5101-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-3-nee', 'q-verhuizer-5101-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5101-3-weet_ik_nog_niet', 'q-verhuizer-5101-3', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5102-1', 51, 5102, 'Wat voor type bedrijfspand gaat het om?', 'What type of bedrijfspand gaat het om?', 'radio', false, 'q-verhuizer-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-1-kantoor', 'q-verhuizer-5102-1', 'kantoor', 'Kantoor', 'Kantoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-1-winkel', 'q-verhuizer-5102-1', 'winkel', 'Winkel', 'Winkel', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-1-magazijn', 'q-verhuizer-5102-1', 'magazijn', 'Magazijn', 'Magazijn', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-1-anders', 'q-verhuizer-5102-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5102-2', 51, 5102, 'Hoe groot is de verhuizing?', 'How large is de verhuizing?', 'radio', false, 'q-verhuizer-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-2-klein_tot_10_werkplekken', 'q-verhuizer-5102-2', 'klein_tot_10_werkplekken', 'Klein (tot 10 werkplekken)', 'Small (tot 10 werkplekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-2-middel_1050_werkplekken', 'q-verhuizer-5102-2', 'middel_1050_werkplekken', 'Middel (10–50 werkplekken)', 'Medium (10–50 werkplekken)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-2-groot_50_werkplekken', 'q-verhuizer-5102-2', 'groot_50_werkplekken', 'Groot (50+ werkplekken)', 'Large (50+ werkplekken)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5102-3', 51, 5102, 'Moet er ook IT-apparatuur gedemonteerd/ingericht worden?', 'Should ook IT-apparatuur gedemonteerd/ingericht worden?', 'radio', false, 'q-verhuizer-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-3-ja', 'q-verhuizer-5102-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5102-3-nee', 'q-verhuizer-5102-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5103-1', 51, 5103, 'Naar welk land verhuis je?', 'Naar welk land verhuis je?', 'radio', false, 'q-verhuizer-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-1-binnen_europa', 'q-verhuizer-5103-1', 'binnen_europa', 'Binnen Europa', 'Indoor Europa', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-1-buiten_europa', 'q-verhuizer-5103-1', 'buiten_europa', 'Buiten Europa', 'Outdoor Europa', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5103-2', 51, 5103, 'Hoeveel spullen moeten verhuisd worden?', 'How many spullen moeten verhuisd worden?', 'radio', false, 'q-verhuizer-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-2-klein_enkele_dozen', 'q-verhuizer-5103-2', 'klein_enkele_dozen', 'Klein (enkele dozen)', 'Small (enkele dozen)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-2-middel_gedeelte_van_inboedel', 'q-verhuizer-5103-2', 'middel_gedeelte_van_inboedel', 'Middel (gedeelte van inboedel)', 'Medium (gedeelte van inboedel)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-2-groot_volledige_inboedel', 'q-verhuizer-5103-2', 'groot_volledige_inboedel', 'Groot (volledige inboedel)', 'Large (volledige inboedel)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5103-3', 51, 5103, 'Moet de verhuizer ook inklaring/administratie regelen?', 'Should the verhuizer ook inklaring/administratie regelen?', 'radio', false, 'q-verhuizer-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-3-ja', 'q-verhuizer-5103-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5103-3-nee', 'q-verhuizer-5103-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5104-1', 51, 5104, 'Welke extra diensten wil je?', 'Which extra diensten wil je?', 'radio', false, 'q-verhuizer-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-1-inpakken', 'q-verhuizer-5104-1', 'inpakken', 'Inpakken', 'Inpakken', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-1-uitpakken', 'q-verhuizer-5104-1', 'uitpakken', 'Uitpakken', 'Uitpakken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-1-meubels_demonteren', 'q-verhuizer-5104-1', 'meubels_demonteren', 'Meubels demonteren', 'Meubels demonteren', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-1-meubels_monteren', 'q-verhuizer-5104-1', 'meubels_monteren', 'Meubels monteren', 'Meubels monteren', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verhuizer-5104-2', 51, 5104, 'Hoeveel kamers/spullen gaat het om?', 'How many kamers/spullen gaat het om?', 'radio', false, 'q-verhuizer-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-2-klein_12_kamers', 'q-verhuizer-5104-2', 'klein_12_kamers', 'Klein (1–2 kamers)', 'Small (1–2 kamers)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-2-middel_34_kamers', 'q-verhuizer-5104-2', 'middel_34_kamers', 'Middel (3–4 kamers)', 'Medium (3–4 kamers)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verhuizer-5104-2-groot_volledige_woning', 'q-verhuizer-5104-2', 'groot_volledige_woning', 'Groot (volledige woning)', 'Large (volledige woning)', false, 3, true, NULL);


-- ===============================================
-- Category: Verwarming (ID: 52)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-root', 52, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5201-1', 52, 5201, 'Wat voor type verwarming wil je?', 'What type of verwarming wil je?', 'radio', false, 'q-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-1-radiatoren', 'q-verwarming-5201-1', 'radiatoren', 'Radiatoren', 'Radiatoren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-1-vloerverwarming', 'q-verwarming-5201-1', 'vloerverwarming', 'Vloerverwarming', 'Vloerverwarming', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-1-wand_plintverwarming', 'q-verwarming-5201-1', 'wand_plintverwarming', 'Wand-/plintverwarming', 'Wand-/plintverwarming', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-1-anders', 'q-verwarming-5201-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5201-2', 52, 5201, 'Voor welke ruimte(s)?', 'Voor welke ruimte(s)?', 'radio', false, 'q-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-2-woonkamer', 'q-verwarming-5201-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-2-badkamer', 'q-verwarming-5201-2', 'badkamer', 'Badkamer', 'Badkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-2-hele_woning', 'q-verwarming-5201-2', 'hele_woning', 'Hele woning', 'Hele woning', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5201-3', 52, 5201, 'Heb je al een cv-ketel of warmtepomp?', 'Do you have al een cv-ketel of warmtepomp?', 'radio', false, 'q-verwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-3-ja', 'q-verwarming-5201-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5201-3-nee', 'q-verwarming-5201-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5202-1', 52, 5202, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-1-radiatoren', 'q-verwarming-5202-1', 'radiatoren', 'Radiatoren', 'Radiatoren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-1-vloerverwarming', 'q-verwarming-5202-1', 'vloerverwarming', 'Vloerverwarming', 'Vloerverwarming', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-1-anders', 'q-verwarming-5202-1', 'anders', 'Anders', 'Other', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5202-2', 52, 5202, 'Waarom wil je het vervangen?', 'Why do you want to het replace?', 'radio', false, 'q-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-2-verouderd', 'q-verwarming-5202-2', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-2-beschadigd', 'q-verwarming-5202-2', 'beschadigd', 'Beschadigd', 'Damaged', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-2-betere_isolatie_efficintie', 'q-verwarming-5202-2', 'betere_isolatie_efficintie', 'Betere isolatie/efficiëntie', 'Betere isolatie/efficiëntie', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-2-andere_stijl_gewenst', 'q-verwarming-5202-2', 'andere_stijl_gewenst', 'Andere stijl gewenst', 'Andere stijl gewenst', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5202-3', 52, 5202, 'Moet de oude verwarming verwijderd worden?', 'Should the old verwarming verwijderd worden?', 'radio', false, 'q-verwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-3-ja', 'q-verwarming-5202-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5202-3-nee', 'q-verwarming-5202-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5203-1', 52, 5203, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-1-radiator_wordt_niet_warm', 'q-verwarming-5203-1', 'radiator_wordt_niet_warm', 'Radiator wordt niet warm', 'Radiator wordt niet warm', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-1-lekkage', 'q-verwarming-5203-1', 'lekkage', 'Lekkage', 'Lekkage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-1-geluid_uit_verwarming', 'q-verwarming-5203-1', 'geluid_uit_verwarming', 'Geluid uit verwarming', 'Geluid uit verwarming', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-1-anders', 'q-verwarming-5203-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5203-2', 52, 5203, 'Om hoeveel radiatoren/ruimtes gaat het?', 'How many radiatoren/ruimtes gaat het?', 'radio', false, 'q-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-2-1', 'q-verwarming-5203-2', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-2-23', 'q-verwarming-5203-2', '23', '2–3', '2–3', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-2-45', 'q-verwarming-5203-2', '45', '4–5', '4–5', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5203-2-meer_dan_5', 'q-verwarming-5203-2', 'meer_dan_5', 'Meer dan 5', 'Meer dan 5', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5204-1', 52, 5204, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-verwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-1-ontluchten_en_bijvullen', 'q-verwarming-5204-1', 'ontluchten_en_bijvullen', 'Ontluchten en bijvullen', 'Ontluchten en bijvullen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-1-radiatoren_doorspoelen', 'q-verwarming-5204-1', 'radiatoren_doorspoelen', 'Radiatoren doorspoelen', 'Radiatoren doorspoelen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-1-volledig_onderhoudsbeurt', 'q-verwarming-5204-1', 'volledig_onderhoudsbeurt', 'Volledig onderhoudsbeurt', 'Volledig onderhoudsbeurt', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-verwarming-5204-2', 52, 5204, 'Hoe vaak wil je onderhoud?', 'How often wil je onderhoud?', 'radio', false, 'q-verwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-2-eenmalig', 'q-verwarming-5204-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-2-jaarlijks', 'q-verwarming-5204-2', 'jaarlijks', 'Jaarlijks', 'Yesarlijks', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-verwarming-5204-2-halfjaarlijks', 'q-verwarming-5204-2', 'halfjaarlijks', 'Halfjaarlijks', 'Halfjaarlijks', false, 3, true, NULL);


-- ===============================================
-- Category: Vloeren (ID: 53)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-root', 53, NULL, 'Wat voor type vloeropdracht zoek je?', 'What type of vloerproject are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5301-1', 53, 5301, 'Wat voor type vloer wil je?', 'What type of vloer wil je?', 'radio', false, 'q-vloeren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-1-laminaat', 'q-vloeren-5301-1', 'laminaat', 'Laminaat', 'Laminaat', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-1-parket___hout', 'q-vloeren-5301-1', 'parket___hout', 'Parket / hout', 'Parket / hout', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-1-pvc', 'q-vloeren-5301-1', 'pvc', 'PVC', 'PVC', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-1-tegels', 'q-vloeren-5301-1', 'tegels', 'Tegels', 'Tegels', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-1-tapijt', 'q-vloeren-5301-1', 'tapijt', 'Tapijt', 'Tapijt', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5301-2', 53, 5301, 'Waar moet de vloer gelegd worden?', 'Where should de vloer gelegd worden?', 'radio', false, 'q-vloeren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-2-woonkamer', 'q-vloeren-5301-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-2-keuken', 'q-vloeren-5301-2', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-2-badkamer', 'q-vloeren-5301-2', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-2-slaapkamer', 'q-vloeren-5301-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-2-hele_woning', 'q-vloeren-5301-2', 'hele_woning', 'Hele woning', 'Hele woning', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5301-3', 53, 5301, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-vloeren-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-3-klein_tot_20_m', 'q-vloeren-5301-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-3-middel_2050_m', 'q-vloeren-5301-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-3-groot_50100_m', 'q-vloeren-5301-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5301-3-zeer_groot_100_m', 'q-vloeren-5301-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5302-1', 53, 5302, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-vloeren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-1-laminaat', 'q-vloeren-5302-1', 'laminaat', 'Laminaat', 'Laminaat', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-1-parket___hout', 'q-vloeren-5302-1', 'parket___hout', 'Parket / hout', 'Parket / hout', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-1-pvc', 'q-vloeren-5302-1', 'pvc', 'PVC', 'PVC', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-1-tegels', 'q-vloeren-5302-1', 'tegels', 'Tegels', 'Tegels', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-1-tapijt', 'q-vloeren-5302-1', 'tapijt', 'Tapijt', 'Tapijt', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5302-2', 53, 5302, 'Moet de oude vloer verwijderd worden?', 'Should the old vloer verwijderd worden?', 'radio', false, 'q-vloeren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-2-ja', 'q-vloeren-5302-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-2-nee', 'q-vloeren-5302-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5302-3', 53, 5302, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-vloeren-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-3-klein_tot_20_m', 'q-vloeren-5302-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-3-middel_2050_m', 'q-vloeren-5302-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-3-groot_50100_m', 'q-vloeren-5302-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5302-3-zeer_groot_100_m', 'q-vloeren-5302-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5303-1', 53, 5303, 'Wat voor type vloer gaat het om?', 'What type of vloer gaat het om?', 'radio', false, 'q-vloeren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-1-houten_vloer', 'q-vloeren-5303-1', 'houten_vloer', 'Houten vloer', 'Wooden vloer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-1-tegelvloer', 'q-vloeren-5303-1', 'tegelvloer', 'Tegelvloer', 'Tegelvloer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-1-natuursteen', 'q-vloeren-5303-1', 'natuursteen', 'Natuursteen', 'Natural stone', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-1-anders', 'q-vloeren-5303-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5303-2', 53, 5303, 'Wat wil je laten doen?', 'What do you want have doen?', 'radio', false, 'q-vloeren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-2-schuren_en_lakken_olin', 'q-vloeren-5303-2', 'schuren_en_lakken_olin', 'Schuren en lakken/oliën', 'Schuren en lakken/oliën', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-2-polijsten', 'q-vloeren-5303-2', 'polijsten', 'Polijsten', 'Polijsten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-2-voegwerk_herstellen', 'q-vloeren-5303-2', 'voegwerk_herstellen', 'Voegwerk herstellen', 'Voegwerk herstellen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-2-anders', 'q-vloeren-5303-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5303-3', 53, 5303, 'Hoe groot is het oppervlak?', 'How large is het oppervlak?', 'radio', false, 'q-vloeren-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-3-klein_tot_20_m', 'q-vloeren-5303-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-3-middel_2050_m', 'q-vloeren-5303-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-3-groot_50100_m', 'q-vloeren-5303-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5303-3-zeer_groot_100_m', 'q-vloeren-5303-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5304-1', 53, 5304, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-vloeren-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-1-beschadigde_planken_tegels', 'q-vloeren-5304-1', 'beschadigde_planken_tegels', 'Beschadigde planken/tegels', 'Damagede planken/tegels', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-1-krassen', 'q-vloeren-5304-1', 'krassen', 'Krassen', 'Krassen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-1-losse_delen', 'q-vloeren-5304-1', 'losse_delen', 'Losse delen', 'Losse delen', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-1-vochtschade', 'q-vloeren-5304-1', 'vochtschade', 'Vochtschade', 'Vochtschade', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloeren-5304-2', 53, 5304, 'Hoe groot is de schade?', 'How large is de schade?', 'radio', false, 'q-vloeren-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-2-klein_enkele_plekken', 'q-vloeren-5304-2', 'klein_enkele_plekken', 'Klein (enkele plekken)', 'Small (enkele plekken)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-2-middel_deel_van_de_vloer', 'q-vloeren-5304-2', 'middel_deel_van_de_vloer', 'Middel (deel van de vloer)', 'Medium (deel van de vloer)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloeren-5304-2-groot_bijna_gehele_vloer', 'q-vloeren-5304-2', 'groot_bijna_gehele_vloer', 'Groot (bijna gehele vloer)', 'Large (bijna gehele vloer)', false, 3, true, NULL);


-- ===============================================
-- Category: Vloerverwarming (ID: 54)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-root', 54, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5401-1', 54, 5401, 'Wat voor type vloerverwarming wil je?', 'What type of vloerverwarming wil je?', 'radio', false, 'q-vloerverwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-1-watergedragen', 'q-vloerverwarming-5401-1', 'watergedragen', 'Watergedragen', 'Watergedragen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-1-elektrisch', 'q-vloerverwarming-5401-1', 'elektrisch', 'Elektrisch', 'Elektrisch', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-1-weet_ik_nog_niet', 'q-vloerverwarming-5401-1', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5401-2', 54, 5401, 'Waar wil je vloerverwarming?', 'Waar wil je vloerverwarming?', 'radio', false, 'q-vloerverwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-2-woonkamer', 'q-vloerverwarming-5401-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-2-keuken', 'q-vloerverwarming-5401-2', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-2-badkamer', 'q-vloerverwarming-5401-2', 'badkamer', 'Badkamer', 'Badkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-2-hele_woning', 'q-vloerverwarming-5401-2', 'hele_woning', 'Hele woning', 'Hele woning', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5401-3', 54, 5401, 'Wat is het vloeroppervlak ongeveer?', 'Wat is het vloeroppervlak approximately?', 'radio', false, 'q-vloerverwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-3-klein_tot_20_m', 'q-vloerverwarming-5401-3', 'klein_tot_20_m', 'Klein (tot 20 m²)', 'Small (up to 20 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-3-middel_2050_m', 'q-vloerverwarming-5401-3', 'middel_2050_m', 'Middel (20–50 m²)', 'Medium (20-50 sqm)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-3-groot_50100_m', 'q-vloerverwarming-5401-3', 'groot_50100_m', 'Groot (50–100 m²)', 'Large (50-100 sqm)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5401-3-zeer_groot_100_m', 'q-vloerverwarming-5401-3', 'zeer_groot_100_m', 'Zeer groot (100+ m²)', 'Very large (100+ sqm)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5402-1', 54, 5402, 'Wat wil je vervangen?', 'What do you want replace?', 'radio', false, 'q-vloerverwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-1-volledige_installatie', 'q-vloerverwarming-5402-1', 'volledige_installatie', 'Volledige installatie', 'Complete installatie', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-1-alleen_verdeler', 'q-vloerverwarming-5402-1', 'alleen_verdeler', 'Alleen verdeler', 'Alleen verdeler', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-1-alleen_buizen_kabels', 'q-vloerverwarming-5402-1', 'alleen_buizen_kabels', 'Alleen buizen/kabels', 'Alleen buizen/kabels', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5402-2', 54, 5402, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-vloerverwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-2-defect', 'q-vloerverwarming-5402-2', 'defect', 'Defect', 'Defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-2-verouderd', 'q-vloerverwarming-5402-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-2-efficinter_systeem_gewenst', 'q-vloerverwarming-5402-2', 'efficinter_systeem_gewenst', 'Efficiënter systeem gewenst', 'Efficiënter systeem gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5402-3', 54, 5402, 'Moet de oude installatie verwijderd worden?', 'Should the old installatie verwijderd worden?', 'radio', false, 'q-vloerverwarming-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-3-ja', 'q-vloerverwarming-5402-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5402-3-nee', 'q-vloerverwarming-5402-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5403-1', 54, 5403, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-vloerverwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-1-vloer_wordt_niet_warm', 'q-vloerverwarming-5403-1', 'vloer_wordt_niet_warm', 'Vloer wordt niet warm', 'Vloer wordt niet warm', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-1-lekkage', 'q-vloerverwarming-5403-1', 'lekkage', 'Lekkage', 'Lekkage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-1-verdeler_defect', 'q-vloerverwarming-5403-1', 'verdeler_defect', 'Verdeler defect', 'Verdeler defect', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-1-anders', 'q-vloerverwarming-5403-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5403-2', 54, 5403, 'Hoe groot is het te repareren oppervlak?', 'How large is het te repair oppervlak?', 'radio', false, 'q-vloerverwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-2-klein_tot_10_m', 'q-vloerverwarming-5403-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-2-middel_1030_m', 'q-vloerverwarming-5403-2', 'middel_1030_m', 'Middel (10–30 m²)', 'Medium (10-30 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-2-groot_3060_m', 'q-vloerverwarming-5403-2', 'groot_3060_m', 'Groot (30–60 m²)', 'Large (30-60 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5403-2-zeer_groot_60_m', 'q-vloerverwarming-5403-2', 'zeer_groot_60_m', 'Zeer groot (60+ m²)', 'Very large (60+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5404-1', 54, 5404, 'Wat moet er gebeuren?', 'What needs to be done?', 'radio', false, 'q-vloerverwarming-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-1-doorspoelen', 'q-vloerverwarming-5404-1', 'doorspoelen', 'Doorspoelen', 'Doorspoelen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-1-ontluchten', 'q-vloerverwarming-5404-1', 'ontluchten', 'Ontluchten', 'Ontluchten', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-1-verdeler_schoonmaken', 'q-vloerverwarming-5404-1', 'verdeler_schoonmaken', 'Verdeler schoonmaken', 'Verdeler schoonmaken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-1-anders', 'q-vloerverwarming-5404-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vloerverwarming-5404-2', 54, 5404, 'Hoe vaak wil je onderhoud?', 'How often wil je onderhoud?', 'radio', false, 'q-vloerverwarming-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-2-eenmalig', 'q-vloerverwarming-5404-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-2-jaarlijks', 'q-vloerverwarming-5404-2', 'jaarlijks', 'Jaarlijks', 'Yesarlijks', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vloerverwarming-5404-2-halfjaarlijks', 'q-vloerverwarming-5404-2', 'halfjaarlijks', 'Halfjaarlijks', 'Halfjaarlijks', false, 3, true, NULL);


-- ===============================================
-- Category: Vochtbestrijding (ID: 55)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-root', 55, NULL, 'Wat voor type vochtprobleem wil je aanpakken?', 'What type of vochtprobleem wil je aanpakken?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5501-1', 55, 5501, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-vochtbestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-1-lekkage', 'q-vochtbestrijding-5501-1', 'lekkage', 'Lekkage', 'Lekkage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-1-vochtige_muren', 'q-vochtbestrijding-5501-1', 'vochtige_muren', 'Vochtige muren', 'Vochtige muren', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-1-water_op_de_vloer', 'q-vochtbestrijding-5501-1', 'water_op_de_vloer', 'Water op de vloer', 'Water op de vloer', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5501-2', 55, 5501, 'Hoe groot is de kelder?', 'How large is de kelder?', 'radio', false, 'q-vochtbestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-2-klein_tot_10_m', 'q-vochtbestrijding-5501-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-2-middel_1020_m', 'q-vochtbestrijding-5501-2', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-2-groot_2040_m', 'q-vochtbestrijding-5501-2', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-2-zeer_groot_40_m', 'q-vochtbestrijding-5501-2', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5501-3', 55, 5501, 'Moet de kelder ook waterdicht gemaakt worden?', 'Should the kelder ook waterdicht gemaakt worden?', 'radio', false, 'q-vochtbestrijding-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-3-ja', 'q-vochtbestrijding-5501-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-3-nee', 'q-vochtbestrijding-5501-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5501-3-weet_ik_nog_niet', 'q-vochtbestrijding-5501-3', 'weet_ik_nog_niet', 'Weet ik nog niet', 'I do not know yet', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5502-1', 55, 5502, 'Waar zit het probleem?', 'Waar zit het probleem?', 'radio', false, 'q-vochtbestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-1-binnenmuren', 'q-vochtbestrijding-5502-1', 'binnenmuren', 'Binnenmuren', 'Indoormuren', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-1-buitenmuren', 'q-vochtbestrijding-5502-1', 'buitenmuren', 'Buitenmuren', 'Outdoormuren', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5502-2', 55, 5502, 'Hoe groot is de vochtige plek?', 'How large is de vochtige plek?', 'radio', false, 'q-vochtbestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-2-klein_tot_2_m', 'q-vochtbestrijding-5502-2', 'klein_tot_2_m', 'Klein (tot 2 m²)', 'Small (tot 2 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-2-middel_25_m', 'q-vochtbestrijding-5502-2', 'middel_25_m', 'Middel (2–5 m²)', 'Medium (2–5 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-2-groot_510_m', 'q-vochtbestrijding-5502-2', 'groot_510_m', 'Groot (5–10 m²)', 'Large (5–10 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-2-zeer_groot_10_m', 'q-vochtbestrijding-5502-2', 'zeer_groot_10_m', 'Zeer groot (10+ m²)', 'Very large (10+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5502-3', 55, 5502, 'Is er al eerder iets geprobeerd tegen het vocht?', 'Is er al eerder iets geprobeerd tegen het vocht?', 'radio', false, 'q-vochtbestrijding-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-3-ja', 'q-vochtbestrijding-5502-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5502-3-nee', 'q-vochtbestrijding-5502-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5503-1', 55, 5503, 'In welke ruimte heb je last van condens?', 'In welke ruimte heb je last van condens?', 'radio', false, 'q-vochtbestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-1-badkamer', 'q-vochtbestrijding-5503-1', 'badkamer', 'Badkamer', 'Badkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-1-keuken', 'q-vochtbestrijding-5503-1', 'keuken', 'Keuken', 'Keuken', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-1-slaapkamer', 'q-vochtbestrijding-5503-1', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-1-hele_woning', 'q-vochtbestrijding-5503-1', 'hele_woning', 'Hele woning', 'Hele woning', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5503-2', 55, 5503, 'Hoe ernstig is het probleem?', 'Hoe ernstig is het probleem?', 'radio', false, 'q-vochtbestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-2-licht_af_en_toe_condens', 'q-vochtbestrijding-5503-2', 'licht_af_en_toe_condens', 'Licht (af en toe condens)', 'Licht (af en toe condens)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-2-middel_regelmatig', 'q-vochtbestrijding-5503-2', 'middel_regelmatig', 'Middel (regelmatig)', 'Medium (regelmatig)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-2-ernstig_dagelijks_met_schimmelvorming', 'q-vochtbestrijding-5503-2', 'ernstig_dagelijks_met_schimmelvorming', 'Ernstig (dagelijks, met schimmelvorming)', 'Ernstig (dagelijks, met schimmelvorming)', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5503-3', 55, 5503, 'Heb je al ventilatie?', 'Do you have al ventilatie?', 'radio', false, 'q-vochtbestrijding-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-3-ja', 'q-vochtbestrijding-5503-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-3-nee', 'q-vochtbestrijding-5503-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5503-3-weet_ik_niet', 'q-vochtbestrijding-5503-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5504-1', 55, 5504, 'Waar heb je last van optrekkend vocht?', 'Waar heb je last van optrekkend vocht?', 'radio', false, 'q-vochtbestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-1-begane_grond_muur', 'q-vochtbestrijding-5504-1', 'begane_grond_muur', 'Begane grond muur', 'Begane grond muur', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-1-binnenmuur', 'q-vochtbestrijding-5504-1', 'binnenmuur', 'Binnenmuur', 'Indoormuur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-1-buitenmuur', 'q-vochtbestrijding-5504-1', 'buitenmuur', 'Buitenmuur', 'Outdoormuur', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5504-2', 55, 5504, 'Hoe groot is het getroffen oppervlak?', 'How large is het getroffen oppervlak?', 'radio', false, 'q-vochtbestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-2-klein_tot_2_m', 'q-vochtbestrijding-5504-2', 'klein_tot_2_m', 'Klein (tot 2 m²)', 'Small (tot 2 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-2-middel_25_m', 'q-vochtbestrijding-5504-2', 'middel_25_m', 'Middel (2–5 m²)', 'Medium (2–5 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-2-groot_510_m', 'q-vochtbestrijding-5504-2', 'groot_510_m', 'Groot (5–10 m²)', 'Large (5–10 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5504-2-zeer_groot_10_m', 'q-vochtbestrijding-5504-2', 'zeer_groot_10_m', 'Zeer groot (10+ m²)', 'Very large (10+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5505-1', 55, 5505, 'Waar zit de schimmel?', 'Waar zit de schimmel?', 'radio', false, 'q-vochtbestrijding-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-1-plafond', 'q-vochtbestrijding-5505-1', 'plafond', 'Plafond', 'Plafond', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-1-muur', 'q-vochtbestrijding-5505-1', 'muur', 'Muur', 'Muur', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-1-vloer', 'q-vochtbestrijding-5505-1', 'vloer', 'Vloer', 'Vloer', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-1-hele_ruimte', 'q-vochtbestrijding-5505-1', 'hele_ruimte', 'Hele ruimte', 'Hele ruimte', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5505-2', 55, 5505, 'Hoe groot is de schimmelplek?', 'How large is de schimmelplek?', 'radio', false, 'q-vochtbestrijding-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-2-klein_tot_1_m', 'q-vochtbestrijding-5505-2', 'klein_tot_1_m', 'Klein (tot 1 m²)', 'Small (tot 1 m²)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-2-middel_13_m', 'q-vochtbestrijding-5505-2', 'middel_13_m', 'Middel (1–3 m²)', 'Medium (1–3 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-2-groot_310_m', 'q-vochtbestrijding-5505-2', 'groot_310_m', 'Groot (3–10 m²)', 'Large (3–10 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-2-zeer_groot_10_m', 'q-vochtbestrijding-5505-2', 'zeer_groot_10_m', 'Zeer groot (10+ m²)', 'Very large (10+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-vochtbestrijding-5505-3', 55, 5505, 'Moet er ook een blijvende oplossing voor de oorzaak gezocht worden?', 'Should ook een blijvende oplossing voor de oorzaak gezocht worden?', 'radio', false, 'q-vochtbestrijding-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-3-ja', 'q-vochtbestrijding-5505-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-vochtbestrijding-5505-3-nee', 'q-vochtbestrijding-5505-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Wellness (ID: 56)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-root', 56, NULL, 'Wat voor type wellness-opdracht zoek je?', 'What type of wellness-project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5601-1', 56, 5601, 'Wat voor type sauna wil je?', 'What type of sauna wil je?', 'radio', false, 'q-wellness-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-1-traditionele_finse_sauna', 'q-wellness-5601-1', 'traditionele_finse_sauna', 'Traditionele Finse sauna', 'Traditionele Finse sauna', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-1-infrarood_sauna', 'q-wellness-5601-1', 'infrarood_sauna', 'Infrarood sauna', 'Infrarood sauna', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-1-combinatie_sauna', 'q-wellness-5601-1', 'combinatie_sauna', 'Combinatie sauna', 'Combinatie sauna', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-1-anders', 'q-wellness-5601-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5601-2', 56, 5601, 'Waar moet de sauna komen?', 'Where should de sauna komen?', 'radio', false, 'q-wellness-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-2-binnen', 'q-wellness-5601-2', 'binnen', 'Binnen', 'Indoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-2-buiten', 'q-wellness-5601-2', 'buiten', 'Buiten', 'Outdoor', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5601-3', 56, 5601, 'Hoe groot moet de sauna zijn?', 'How large moet de sauna zijn?', 'radio', false, 'q-wellness-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-3-12_personen', 'q-wellness-5601-3', '12_personen', '1–2 personen', '1–2 personen', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-3-34_personen', 'q-wellness-5601-3', '34_personen', '3–4 personen', '3–4 personen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5601-3-5_personen', 'q-wellness-5601-3', '5_personen', '5+ personen', '5+ personen', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5602-1', 56, 5602, 'Waar moet de jacuzzi/hottub komen?', 'Where should de jacuzzi/hottub komen?', 'radio', false, 'q-wellness-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-1-binnen', 'q-wellness-5602-1', 'binnen', 'Binnen', 'Indoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-1-buiten', 'q-wellness-5602-1', 'buiten', 'Buiten', 'Outdoor', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5602-2', 56, 5602, 'Welke uitvoering wil je?', 'Which uitvoering wil je?', 'radio', false, 'q-wellness-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-2-inbouw', 'q-wellness-5602-2', 'inbouw', 'Inbouw', 'Inbouw', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-2-opbouw', 'q-wellness-5602-2', 'opbouw', 'Opbouw', 'Opbouw', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-2-opblaasbaar', 'q-wellness-5602-2', 'opblaasbaar', 'Opblaasbaar', 'Opblaasbaar', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5602-3', 56, 5602, 'Hoeveel personen moet de jacuzzi/hottub geschikt zijn?', 'How many personen moet de jacuzzi/hottub geschikt zijn?', 'radio', false, 'q-wellness-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-3-23', 'q-wellness-5602-3', '23', '2–3', '2–3', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-3-45', 'q-wellness-5602-3', '45', '4–5', '4–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5602-3-6', 'q-wellness-5602-3', '6', '6+', '6+', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5603-1', 56, 5603, 'Wat wil je in de wellnessruimte plaatsen?', 'What do you want in de wellnessruimte install?', 'radio', false, 'q-wellness-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-1-sauna', 'q-wellness-5603-1', 'sauna', 'Sauna', 'Sauna', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-1-jacuzzi', 'q-wellness-5603-1', 'jacuzzi', 'Jacuzzi', 'Yescuzzi', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-1-stoombad', 'q-wellness-5603-1', 'stoombad', 'Stoombad', 'Stoombad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-1-combinatie', 'q-wellness-5603-1', 'combinatie', 'Combinatie', 'Combinatie', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5603-2', 56, 5603, 'Hoe groot is de ruimte?', 'How large is de ruimte?', 'radio', false, 'q-wellness-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-2-klein_tot_10_m', 'q-wellness-5603-2', 'klein_tot_10_m', 'Klein (tot 10 m²)', 'Small (up to 10 sqm)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-2-middel_1020_m', 'q-wellness-5603-2', 'middel_1020_m', 'Middel (10–20 m²)', 'Medium (10–20 m²)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-2-groot_2040_m', 'q-wellness-5603-2', 'groot_2040_m', 'Groot (20–40 m²)', 'Large (20–40 m²)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5603-2-zeer_groot_40_m', 'q-wellness-5603-2', 'zeer_groot_40_m', 'Zeer groot (40+ m²)', 'Very large (40+ m²)', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5604-1', 56, 5604, 'Wat moet er onderhouden of gerepareerd worden?', 'Wat moet er maintain of gerepareerd worden?', 'radio', false, 'q-wellness-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-1-sauna', 'q-wellness-5604-1', 'sauna', 'Sauna', 'Sauna', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-1-jacuzzi___hottub', 'q-wellness-5604-1', 'jacuzzi___hottub', 'Jacuzzi / hottub', 'Yescuzzi / hottub', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-1-stoombad', 'q-wellness-5604-1', 'stoombad', 'Stoombad', 'Stoombad', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-1-anders', 'q-wellness-5604-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-wellness-5604-2', 56, 5604, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-wellness-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-2-elektrisch_defect', 'q-wellness-5604-2', 'elektrisch_defect', 'Elektrisch defect', 'Elektrisch defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-2-lekkage', 'q-wellness-5604-2', 'lekkage', 'Lekkage', 'Lekkage', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-2-verwarming_werkt_niet', 'q-wellness-5604-2', 'verwarming_werkt_niet', 'Verwarming werkt niet', 'Verwarming werkt niet', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-wellness-5604-2-anders', 'q-wellness-5604-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);


-- ===============================================
-- Category: Zonnepanelen (ID: 57)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-root', 57, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5701-1', 57, 5701, 'Waar moeten de zonnepanelen komen?', 'Where shoulden de zonnepanelen komen?', 'radio', false, 'q-zonnepanelen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-1-schuin_dak', 'q-zonnepanelen-5701-1', 'schuin_dak', 'Schuin dak', 'Schuin dak', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-1-plat_dak', 'q-zonnepanelen-5701-1', 'plat_dak', 'Plat dak', 'Plat dak', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-1-tuin_opstelling_op_de_grond', 'q-zonnepanelen-5701-1', 'tuin_opstelling_op_de_grond', 'Tuin/opstelling op de grond', 'Garden/opstelling op de grond', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5701-2', 57, 5701, 'Hoeveel panelen wil je ongeveer plaatsen?', 'How many panelen wil je approximately install?', 'radio', false, 'q-zonnepanelen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-2-15', 'q-zonnepanelen-5701-2', '15', '1–5', '1–5', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-2-610', 'q-zonnepanelen-5701-2', '610', '6–10', '6–10', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-2-1120', 'q-zonnepanelen-5701-2', '1120', '11–20', '11–20', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-2-meer_dan_20', 'q-zonnepanelen-5701-2', 'meer_dan_20', 'Meer dan 20', 'Meer dan 20', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5701-3', 57, 5701, 'Heb je al een omvormer?', 'Do you have al een omvormer?', 'radio', false, 'q-zonnepanelen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-3-ja', 'q-zonnepanelen-5701-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-3-nee', 'q-zonnepanelen-5701-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5701-3-weet_ik_niet', 'q-zonnepanelen-5701-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5702-1', 57, 5702, 'Hoeveel panelen wil je toevoegen?', 'How many panelen wil je toevoegen?', 'radio', false, 'q-zonnepanelen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-1-15', 'q-zonnepanelen-5702-1', '15', '1–5', '1–5', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-1-610', 'q-zonnepanelen-5702-1', '610', '6–10', '6–10', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-1-meer_dan_10', 'q-zonnepanelen-5702-1', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5702-2', 57, 5702, 'Wil je dezelfde panelen als je huidige systeem?', 'Wil je dezelfde panelen als je huidige systeem?', 'radio', false, 'q-zonnepanelen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-2-ja', 'q-zonnepanelen-5702-2', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-2-nee', 'q-zonnepanelen-5702-2', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-2-weet_ik_niet', 'q-zonnepanelen-5702-2', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5702-3', 57, 5702, 'Moet de omvormer ook vervangen/uitgebreid worden?', 'Should the omvormer ook replace/uitgebreid worden?', 'radio', false, 'q-zonnepanelen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-3-ja', 'q-zonnepanelen-5702-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-3-nee', 'q-zonnepanelen-5702-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5702-3-weet_ik_niet', 'q-zonnepanelen-5702-3', 'weet_ik_niet', 'Weet ik niet', 'I do not know', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5703-1', 57, 5703, 'Waarom wil je de zonnepanelen vervangen?', 'Why do you want to de zonnepanelen replace?', 'radio', false, 'q-zonnepanelen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-1-verouderd', 'q-zonnepanelen-5703-1', 'verouderd', 'Verouderd', 'Outdated', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-1-defect', 'q-zonnepanelen-5703-1', 'defect', 'Defect', 'Defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-1-efficinter_model_gewenst', 'q-zonnepanelen-5703-1', 'efficinter_model_gewenst', 'Efficiënter model gewenst', 'Efficiënter model gewenst', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5703-2', 57, 5703, 'Hoeveel panelen moeten vervangen worden?', 'How many panelen moeten replace worden?', 'radio', false, 'q-zonnepanelen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-2-15', 'q-zonnepanelen-5703-2', '15', '1–5', '1–5', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-2-610', 'q-zonnepanelen-5703-2', '610', '6–10', '6–10', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-2-meer_dan_10', 'q-zonnepanelen-5703-2', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5703-3', 57, 5703, 'Moet de oude installatie verwijderd worden?', 'Should the old installatie verwijderd worden?', 'radio', false, 'q-zonnepanelen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-3-ja', 'q-zonnepanelen-5703-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5703-3-nee', 'q-zonnepanelen-5703-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5704-1', 57, 5704, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-zonnepanelen-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-1-paneel_defect', 'q-zonnepanelen-5704-1', 'paneel_defect', 'Paneel defect', 'Paneel defect', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-1-omvormer_storing', 'q-zonnepanelen-5704-1', 'omvormer_storing', 'Omvormer storing', 'Omvormer storing', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-1-kabels_bekabeling_probleem', 'q-zonnepanelen-5704-1', 'kabels_bekabeling_probleem', 'Kabels/bekabeling probleem', 'Kabels/bekabeling probleem', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-1-anders', 'q-zonnepanelen-5704-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5704-2', 57, 5704, 'Hoe oud is de installatie?', 'Hoe oud is de installatie?', 'radio', false, 'q-zonnepanelen-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-2-05_jaar', 'q-zonnepanelen-5704-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-2-510_jaar', 'q-zonnepanelen-5704-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-2-1015_jaar', 'q-zonnepanelen-5704-2', '1015_jaar', '10–15 jaar', '10–15 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-2-ouder_dan_15_jaar', 'q-zonnepanelen-5704-2', 'ouder_dan_15_jaar', 'Ouder dan 15 jaar', 'Oldr dan 15 jaar', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonnepanelen-5704-3', 57, 5704, 'Wil je ook een onderhoudscontract?', 'Wil je ook een onderhoudscontract?', 'radio', false, 'q-zonnepanelen-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-3-ja', 'q-zonnepanelen-5704-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonnepanelen-5704-3-nee', 'q-zonnepanelen-5704-3', 'nee', 'Nee', 'No', false, 2, true, NULL);


-- ===============================================
-- Category: Zonwering (ID: 58)
-- ===============================================

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-root', 58, NULL, 'Wat voor type zonwering zoek je?', 'What type of zonwering are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5801-1', 58, 5801, 'Wat voor type buitenzonwering wil je?', 'What type of buitenzonwering wil je?', 'radio', false, 'q-zonwering-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-1-knikarmscherm', 'q-zonwering-5801-1', 'knikarmscherm', 'Knikarmscherm', 'Knikarmscherm', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-1-uitvalscherm', 'q-zonwering-5801-1', 'uitvalscherm', 'Uitvalscherm', 'Uitvalscherm', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-1-pergola_zonwering', 'q-zonwering-5801-1', 'pergola_zonwering', 'Pergola zonwering', 'Pergola zonwering', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-1-anders', 'q-zonwering-5801-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5801-2', 58, 5801, 'Hoe breed moet de zonwering zijn?', 'Hoe breed moet de zonwering zijn?', 'radio', false, 'q-zonwering-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-2-tot_3_meter', 'q-zonwering-5801-2', 'tot_3_meter', 'Tot 3 meter', 'Tot 3 meter', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-2-35_meter', 'q-zonwering-5801-2', '35_meter', '3–5 meter', '3–5 meter', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-2-57_meter', 'q-zonwering-5801-2', '57_meter', '5–7 meter', '5–7 meter', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-2-groter_dan_7_meter', 'q-zonwering-5801-2', 'groter_dan_7_meter', 'Groter dan 7 meter', 'Groter dan 7 meter', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5801-3', 58, 5801, 'Elektrisch of handmatig bediend?', 'Elektrisch of handmatig bediend?', 'radio', false, 'q-zonwering-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-3-elektrisch', 'q-zonwering-5801-3', 'elektrisch', 'Elektrisch', 'Elektrisch', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5801-3-handmatig', 'q-zonwering-5801-3', 'handmatig', 'Handmatig', 'Handmatig', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5802-1', 58, 5802, 'Wat voor type binnenzonwering wil je?', 'What type of binnenzonwering wil je?', 'radio', false, 'q-zonwering-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-1-jaloezien', 'q-zonwering-5802-1', 'jaloezien', 'Jaloezieën', 'Yesloezieën', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-1-rolgordijnen', 'q-zonwering-5802-1', 'rolgordijnen', 'Rolgordijnen', 'Rolgordijnen', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-1-plisss', 'q-zonwering-5802-1', 'plisss', 'Plissés', 'Plissés', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-1-vouwgordijnen', 'q-zonwering-5802-1', 'vouwgordijnen', 'Vouwgordijnen', 'Vouwgordijnen', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-1-anders', 'q-zonwering-5802-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5802-2', 58, 5802, 'Voor welke ruimte?', 'Voor welke ruimte?', 'radio', false, 'q-zonwering-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-2-woonkamer', 'q-zonwering-5802-2', 'woonkamer', 'Woonkamer', 'Woonkamer', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-2-slaapkamer', 'q-zonwering-5802-2', 'slaapkamer', 'Slaapkamer', 'Slaapkamer', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-2-keuken', 'q-zonwering-5802-2', 'keuken', 'Keuken', 'Keuken', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-2-anders', 'q-zonwering-5802-2', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5802-3', 58, 5802, 'Hoeveel ramen moeten voorzien worden?', 'How many ramen moeten voorzien worden?', 'radio', false, 'q-zonwering-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-3-12', 'q-zonwering-5802-3', '12', '1–2', '1–2', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-3-35', 'q-zonwering-5802-3', '35', '3–5', '3–5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-3-610', 'q-zonwering-5802-3', '610', '6–10', '6–10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5802-3-meer_dan_10', 'q-zonwering-5802-3', 'meer_dan_10', 'Meer dan 10', 'Meer dan 10', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5803-1', 58, 5803, 'Wat wil je laten plaatsen?', 'What do you want have install?', 'radio', false, 'q-zonwering-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-1-screens', 'q-zonwering-5803-1', 'screens', 'Screens', 'Screens', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-1-rolluiken', 'q-zonwering-5803-1', 'rolluiken', 'Rolluiken', 'Rolluiken', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5803-2', 58, 5803, 'Voor welk doel?', 'Voor welk doel?', 'radio', false, 'q-zonwering-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-2-zonwering', 'q-zonwering-5803-2', 'zonwering', 'Zonwering', 'Zonwering', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-2-inbraakbeveiliging', 'q-zonwering-5803-2', 'inbraakbeveiliging', 'Inbraakbeveiliging', 'Inbraakbeveiliging', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-2-isolatie', 'q-zonwering-5803-2', 'isolatie', 'Isolatie', 'Isolatie', false, 3, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5803-3', 58, 5803, 'Moeten ze elektrisch bediend worden?', 'Moeten ze elektrisch bediend worden?', 'radio', false, 'q-zonwering-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-3-ja', 'q-zonwering-5803-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5803-3-nee', 'q-zonwering-5803-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5804-1', 58, 5804, 'Wat is het probleem?', 'Wat is het probleem?', 'radio', false, 'q-zonwering-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-1-doek_vervangen', 'q-zonwering-5804-1', 'doek_vervangen', 'Doek vervangen', 'Doek replace', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-1-motor_defect', 'q-zonwering-5804-1', 'motor_defect', 'Motor defect', 'Motor defect', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-1-schade_aan_frame', 'q-zonwering-5804-1', 'schade_aan_frame', 'Schade aan frame', 'Schade aan frame', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-1-anders', 'q-zonwering-5804-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zonwering-5804-2', 58, 5804, 'Hoe oud is het zonnescherm ongeveer?', 'Hoe oud is het zonnescherm approximately?', 'radio', false, 'q-zonwering-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-2-05_jaar', 'q-zonwering-5804-2', '05_jaar', '0–5 jaar', '0–5 jaar', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-2-510_jaar', 'q-zonwering-5804-2', '510_jaar', '5–10 jaar', '5–10 jaar', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-2-1020_jaar', 'q-zonwering-5804-2', '1020_jaar', '10–20 jaar', '10–20 jaar', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zonwering-5804-2-ouder_dan_20_jaar', 'q-zonwering-5804-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Oldr dan 20 jaar', false, 4, true, NULL);


-- ===============================================
-- Category: Zwembad (ID: 59)
-- ===============================================

-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-root', 59, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuw zwembad plaatsen (ID: 5901)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5901-1', 59, 5901, 'Wat voor type zwembad wil je?', 'What type of swimming pool do you want?', 'radio', false, 'q-zwembad-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-1-ingebouwd_zwembad', 'q-zwembad-5901-1', 'ingebouwd_zwembad', 'Ingebouwd zwembad', 'Built-in swimming pool', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-1-opbouwzwembad', 'q-zwembad-5901-1', 'opbouwzwembad', 'Opbouwzwembad', 'Above-ground pool', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-1-natuurzwembad', 'q-zwembad-5901-1', 'natuurzwembad', 'Natuurzwembad', 'Natural swimming pool', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-1-anders', 'q-zwembad-5901-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5901-2', 59, 5901, 'Waar wil je het zwembad plaatsen?', 'Where do you want to install the swimming pool?', 'radio', false, 'q-zwembad-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-2-binnen', 'q-zwembad-5901-2', 'binnen', 'Binnen', 'Indoor', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-2-buiten', 'q-zwembad-5901-2', 'buiten', 'Buiten', 'Outdoor', false, 2, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5901-3', 59, 5901, 'Hoe groot moet het zwembad zijn?', 'How large should the swimming pool be?', 'radio', false, 'q-zwembad-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-3-klein_tot_3x5_m', 'q-zwembad-5901-3', 'klein_tot_3x5_m', 'Klein (tot 3×5 m)', 'Small (up to 3×5 m)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-3-middel_4x8_m', 'q-zwembad-5901-3', 'middel_4x8_m', 'Middel (4×8 m)', 'Medium (4×8 m)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-3-groot_5x10_m', 'q-zwembad-5901-3', 'groot_5x10_m', 'Groot (5×10 m)', 'Large (5×10 m)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5901-3-zeer_groot_groter_dan_5x10_m', 'q-zwembad-5901-3', 'zeer_groot_groter_dan_5x10_m', 'Zeer groot (groter dan 5×10 m)', 'Very large (larger than 5×10 m)', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Zwembad renoveren (ID: 5902)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5902-1', 59, 5902, 'Wat wil je renoveren?', 'What do you want to renovate?', 'radio', false, 'q-zwembad-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-1-folie_liner_vervangen', 'q-zwembad-5902-1', 'folie_liner_vervangen', 'Folie/liner vervangen', 'Replace foil/liner', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-1-betonnen_kuip_herstellen', 'q-zwembad-5902-1', 'betonnen_kuip_herstellen', 'Betonnen kuip herstellen', 'Repair concrete basin', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-1-technische_installatie_vernieuwen', 'q-zwembad-5902-1', 'technische_installatie_vernieuwen', 'Technische installatie vernieuwen', 'Renew technical installation', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-1-complete_renovatie', 'q-zwembad-5902-1', 'complete_renovatie', 'Complete renovatie', 'Complete renovation', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5902-2', 59, 5902, 'Hoe oud is het zwembad?', 'How old is the swimming pool?', 'radio', false, 'q-zwembad-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-2-0_5_jaar', 'q-zwembad-5902-2', '0_5_jaar', '0–5 jaar', '0-5 years', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-2-5_10_jaar', 'q-zwembad-5902-2', '5_10_jaar', '5–10 jaar', '5-10 years', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-2-10_20_jaar', 'q-zwembad-5902-2', '10_20_jaar', '10–20 jaar', '10-20 years', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5902-2-ouder_dan_20_jaar', 'q-zwembad-5902-2', 'ouder_dan_20_jaar', 'Ouder dan 20 jaar', 'Older than 20 years', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Zwembad onderhouden (ID: 5903)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5903-1', 59, 5903, 'Wat voor onderhoud wil je laten doen?', 'What kind of maintenance do you want?', 'radio', false, 'q-zwembad-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-1-reiniging', 'q-zwembad-5903-1', 'reiniging', 'Reiniging', 'Cleaning', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-1-waterbehandeling', 'q-zwembad-5903-1', 'waterbehandeling', 'Waterbehandeling', 'Water treatment', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-1-seizoensonderhoud', 'q-zwembad-5903-1', 'seizoensonderhoud', 'Seizoensonderhoud (zomer/winterklaar)', 'Seasonal maintenance (summer/winter ready)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-1-volledig_onderhoudscontract', 'q-zwembad-5903-1', 'volledig_onderhoudscontract', 'Volledig onderhoudscontract', 'Complete maintenance contract', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5903-2', 59, 5903, 'Hoe vaak wil je onderhoud?', 'How often do you want maintenance?', 'radio', false, 'q-zwembad-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-2-eenmalig', 'q-zwembad-5903-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-2-maandelijks', 'q-zwembad-5903-2', 'maandelijks', 'Maandelijks', 'Monthly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5903-2-wekelijks', 'q-zwembad-5903-2', 'wekelijks', 'Wekelijks', 'Weekly', false, 3, true, NULL);

-- ===============================================
-- Subcategory: Zwembad repareren (ID: 5904)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5904-1', 59, 5904, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-zwembad-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-1-lekkage', 'q-zwembad-5904-1', 'lekkage', 'Lekkage', 'Leakage', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-1-pomp_filter_defect', 'q-zwembad-5904-1', 'pomp_filter_defect', 'Pomp/filter defect', 'Pump/filter defective', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-1-bekleding_beschadigd', 'q-zwembad-5904-1', 'bekleding_beschadigd', 'Bekleding beschadigd', 'Lining damaged', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-1-verwarming_werkt_niet', 'q-zwembad-5904-1', 'verwarming_werkt_niet', 'Verwarming werkt niet', 'Heating does not work', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-1-anders', 'q-zwembad-5904-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-zwembad-5904-2', 59, 5904, 'Hoe groot is het zwembad?', 'How large is the swimming pool?', 'radio', false, 'q-zwembad-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-2-klein_tot_3x5_m', 'q-zwembad-5904-2', 'klein_tot_3x5_m', 'Klein (tot 3×5 m)', 'Small (up to 3×5 m)', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-2-middel_4x8_m', 'q-zwembad-5904-2', 'middel_4x8_m', 'Middel (4×8 m)', 'Medium (4×8 m)', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-2-groot_5x10_m', 'q-zwembad-5904-2', 'groot_5x10_m', 'Groot (5×10 m)', 'Large (5×10 m)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-zwembad-5904-2-zeer_groot_groter_dan_5x10_m', 'q-zwembad-5904-2', 'zeer_groot_groter_dan_5x10_m', 'Zeer groot (groter dan 5×10 m)', 'Very large (larger than 5×10 m)', false, 4, true, NULL);

-- ===============================================
-- Category: Kantoorapparatuur (ID: 60)
-- ===============================================


-- Root Question
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-root', 60, NULL, 'Wat voor type opdracht zoek je?', 'What type of project are you looking for?', 'radio', true, NULL, NULL, 1, true, 1, true);

-- ===============================================
-- Subcategory: Nieuwe apparatuur plaatsen (ID: 6001)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6001-1', 60, 6001, 'Wat voor type apparatuur wil je laten plaatsen?', 'What type of equipment do you want to install?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-printer_multifunctional', 'q-kantoorapparatuur-6001-1', 'printer_multifunctional', 'Printer / multifunctional', 'Printer / multifunctional', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-kopieerapparaat', 'q-kantoorapparatuur-6001-1', 'kopieerapparaat', 'Kopieerapparaat', 'Copier', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-koffiemachine', 'q-kantoorapparatuur-6001-1', 'koffiemachine', 'Koffiemachine', 'Coffee machine', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-beamer_presentatieapparatuur', 'q-kantoorapparatuur-6001-1', 'beamer_presentatieapparatuur', 'Beamer / presentatieapparatuur', 'Projector / presentation equipment', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-computers_laptops', 'q-kantoorapparatuur-6001-1', 'computers_laptops', 'Computers / laptops', 'Computers / laptops', false, 5, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-servers_netwerkapparatuur', 'q-kantoorapparatuur-6001-1', 'servers_netwerkapparatuur', 'Servers / netwerkapparatuur', 'Servers / network equipment', false, 6, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-1-anders', 'q-kantoorapparatuur-6001-1', 'anders', 'Anders', 'Other', false, 7, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6001-2', 60, 6001, 'Voor welk type organisatie/gebouw?', 'For what type of organization/building?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-2-klein_kantoor', 'q-kantoorapparatuur-6001-2', 'klein_kantoor', 'Klein kantoor', 'Small office', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-2-middelgroot_bedrijf', 'q-kantoorapparatuur-6001-2', 'middelgroot_bedrijf', 'Middelgroot bedrijf', 'Medium-sized company', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-2-groot_bedrijf', 'q-kantoorapparatuur-6001-2', 'groot_bedrijf', 'Groot bedrijf', 'Large company', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-2-school_instelling', 'q-kantoorapparatuur-6001-2', 'school_instelling', 'School / instelling', 'School / institution', false, 4, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6001-3', 60, 6001, 'Om hoeveel apparaten gaat het?', 'How many devices does it concern?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-3-1', 'q-kantoorapparatuur-6001-3', '1', '1', '1', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-3-2_5', 'q-kantoorapparatuur-6001-3', '2_5', '2–5', '2-5', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-3-6_10', 'q-kantoorapparatuur-6001-3', '6_10', '6–10', '6-10', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6001-3-meer_dan_10', 'q-kantoorapparatuur-6001-3', 'meer_dan_10', 'Meer dan 10', 'More than 10', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Apparatuur vervangen (ID: 6002)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6002-1', 60, 6002, 'Wat wil je vervangen?', 'What do you want to replace?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-1-printer_kopieerapparaat', 'q-kantoorapparatuur-6002-1', 'printer_kopieerapparaat', 'Printer / kopieerapparaat', 'Printer / copier', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-1-koffiemachine', 'q-kantoorapparatuur-6002-1', 'koffiemachine', 'Koffiemachine', 'Coffee machine', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-1-ict_apparatuur', 'q-kantoorapparatuur-6002-1', 'ict_apparatuur', 'ICT-apparatuur (computers, laptops, servers)', 'ICT equipment (computers, laptops, servers)', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-1-anders', 'q-kantoorapparatuur-6002-1', 'anders', 'Anders', 'Other', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6002-2', 60, 6002, 'Waarom wil je vervangen?', 'Why do you want to replace?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-2-defect', 'q-kantoorapparatuur-6002-2', 'defect', 'Defect', 'Defective', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-2-verouderd', 'q-kantoorapparatuur-6002-2', 'verouderd', 'Verouderd', 'Outdated', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-2-betere_prestaties_energie_efficientie', 'q-kantoorapparatuur-6002-2', 'betere_prestaties_energie_efficientie', 'Betere prestaties / energie-efficiëntie', 'Better performance / energy efficiency', false, 3, true, NULL);

-- Question 3
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6002-3', 60, 6002, 'Moet de oude apparatuur verwijderd worden?', 'Should the old equipment be removed?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 3, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-3-ja', 'q-kantoorapparatuur-6002-3', 'ja', 'Ja', 'Yes', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6002-3-nee', 'q-kantoorapparatuur-6002-3', 'nee', 'Nee', 'No', false, 2, true, NULL);

-- ===============================================
-- Subcategory: Apparatuur repareren (ID: 6003)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6003-1', 60, 6003, 'Wat is het probleem?', 'What is the problem?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-1-werkt_niet_meer', 'q-kantoorapparatuur-6003-1', 'werkt_niet_meer', 'Werkt niet meer', 'Does not work anymore', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-1-maakt_lawaai', 'q-kantoorapparatuur-6003-1', 'maakt_lawaai', 'Maakt lawaai', 'Makes noise', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-1-geeft_foutmeldingen', 'q-kantoorapparatuur-6003-1', 'geeft_foutmeldingen', 'Geeft foutmeldingen', 'Shows error messages', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-1-slechte_print_beeldkwaliteit', 'q-kantoorapparatuur-6003-1', 'slechte_print_beeldkwaliteit', 'Slechte print- of beeldkwaliteit', 'Poor print or image quality', false, 4, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-1-anders', 'q-kantoorapparatuur-6003-1', 'anders', 'Anders', 'Other', false, 5, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6003-2', 60, 6003, 'Hoe oud is de apparatuur ongeveer?', 'How old is the equipment approximately?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-2-0_2_jaar', 'q-kantoorapparatuur-6003-2', '0_2_jaar', '0–2 jaar', '0-2 years', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-2-2_5_jaar', 'q-kantoorapparatuur-6003-2', '2_5_jaar', '2–5 jaar', '2-5 years', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-2-5_10_jaar', 'q-kantoorapparatuur-6003-2', '5_10_jaar', '5–10 jaar', '5-10 years', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6003-2-ouder_dan_10_jaar', 'q-kantoorapparatuur-6003-2', 'ouder_dan_10_jaar', 'Ouder dan 10 jaar', 'Older than 10 years', false, 4, true, NULL);

-- ===============================================
-- Subcategory: Apparatuur onderhouden/reinigen (ID: 6004)
-- ===============================================

-- Question 1
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6004-1', 60, 6004, 'Wat wil je laten doen?', 'What do you want to have done?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 1, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-1-periodiek_onderhoud', 'q-kantoorapparatuur-6004-1', 'periodiek_onderhoud', 'Periodiek onderhoud', 'Periodic maintenance', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-1-schoonmaken_reinigen', 'q-kantoorapparatuur-6004-1', 'schoonmaken_reinigen', 'Schoonmaken / reinigen', 'Clean / clean', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-1-software_updates_optimalisatie', 'q-kantoorapparatuur-6004-1', 'software_updates_optimalisatie', 'Software-updates en optimalisatie', 'Software updates and optimization', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-1-volledig_onderhoudscontract', 'q-kantoorapparatuur-6004-1', 'volledig_onderhoudscontract', 'Volledig onderhoudscontract', 'Complete maintenance contract', false, 4, true, NULL);

-- Question 2
INSERT INTO project_form_questions (id, service_category_id, service_subcategory_id, question_text_nl, question_text_en, question_type, is_root_question, parent_question_id, parent_option_id, order_index, is_required, step_number, is_active) VALUES ('q-kantoorapparatuur-6004-2', 60, 6004, 'Hoe vaak wil je onderhoud?', 'How often do you want maintenance?', 'radio', false, 'q-kantoorapparatuur-root', NULL, 2, true, 1, true);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-2-eenmalig', 'q-kantoorapparatuur-6004-2', 'eenmalig', 'Eenmalig', 'One-time', false, 1, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-2-jaarlijks', 'q-kantoorapparatuur-6004-2', 'jaarlijks', 'Jaarlijks', 'Yearly', false, 2, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-2-halfjaarlijks', 'q-kantoorapparatuur-6004-2', 'halfjaarlijks', 'Halfjaarlijks', 'Semi-annually', false, 3, true, NULL);

INSERT INTO project_form_question_options (id, question_id, option_value, option_label_nl, option_label_en, has_follow_up, order_index, is_active, subcategory_id) VALUES ('opt-kantoorapparatuur-6004-2-per_kwartaal', 'q-kantoorapparatuur-6004-2', 'per_kwartaal', 'Per kwartaal', 'Quarterly', false, 4, true, NULL);


-- Total Questions: 97
-- Total Options: 296