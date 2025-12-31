-- ==========================================
-- STEP 2: REQUEST TYPE (Soort aanvraag)
-- General question - applies to ALL categories
-- ==========================================

INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  step_number
)
VALUES (
  'q-general-request-type',
  NULL, -- NULL means this applies to ALL categories
  'Soort aanvraag',
  'Type of request',
  'radio',
  TRUE, -- First question of this step
  NULL,
  NULL,
  1,
  TRUE,
  2 -- Step 2
);

INSERT INTO project_form_question_options (
  id,
  question_id,
  option_value,
  option_label_nl,
  option_label_en,
  has_follow_up,
  order_index
)
VALUES
  ('opt-request-type-private', 'q-general-request-type', 'private', 'Particulier', 'Private individual', FALSE, 1),
  ('opt-request-type-business', 'q-general-request-type', 'business', 'Zakelijk', 'Business', FALSE, 2);


-- ==========================================
-- STEP 3: EXECUTION DATE (Uitvoeringsdatum)
-- General question - applies to ALL categories
-- ==========================================

INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  step_number
)
VALUES (
  'q-general-execution-date',
  NULL, -- NULL means this applies to ALL categories
  'Uitvoeringsdatum',
  'Execution date',
  'radio',
  TRUE, -- First question of this step
  NULL,
  NULL,
  1,
  TRUE,
  3 -- Step 3
);

INSERT INTO project_form_question_options (
  id,
  question_id,
  option_value,
  option_label_nl,
  option_label_en,
  has_follow_up,
  order_index
)
VALUES
  ('opt-exec-date-1month', 'q-general-execution-date', 'within_1_month', 'Binnen 1 maand', 'Within 1 month', FALSE, 1),
  ('opt-exec-date-1to3', 'q-general-execution-date', '1_to_3_months', 'Over 1 tot 3 maanden', 'In 1-3 months', FALSE, 2),
  ('opt-exec-date-3to6', 'q-general-execution-date', '3_to_6_months', 'Over 3 tot 6 maanden', 'In 3-6 months', FALSE, 3),
  ('opt-exec-date-no-pref', 'q-general-execution-date', 'no_preference', 'Geen voorkeur', 'No preference', FALSE, 4);


-- ==========================================
-- STEP 4: PHOTOS (Foto's toevoegen)
-- General question - applies to ALL categories
-- ==========================================

INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  step_number
)
VALUES (
  'q-general-photos',
  NULL,
  'Wil je foto''s toevoegen?',
  'Do you want to add photos?',
  'radio',
  TRUE,
  NULL,
  NULL,
  1,
  FALSE, -- Photos are optional
  4 -- Step 4
);

INSERT INTO project_form_question_options (
  id,
  question_id,
  option_value,
  option_label_nl,
  option_label_en,
  has_follow_up,
  order_index
)
VALUES
  ('opt-photos-yes', 'q-general-photos', 'yes', 'Ja', 'Yes', FALSE, 1),
  ('opt-photos-no', 'q-general-photos', 'no', 'Nee', 'No', FALSE, 2);


-- ==========================================
-- STEP 5: PROJECT DESCRIPTION (Projectomschrijving)
-- General question - applies to ALL categories
-- ==========================================

INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  placeholder_nl,
  placeholder_en,
  help_text_nl,
  help_text_en,
  step_number
)
VALUES (
  'q-general-description',
  NULL,
  'Projectomschrijving',
  'Project description',
  'textarea',
  TRUE,
  NULL,
  NULL,
  1,
  TRUE,
  'Geef een korte omschrijving van je project en ontvang nauwkeurigere offertes.',
  'Briefly describe your project and receive more accurate quotes.',
  'Geef een korte omschrijving van je project en ontvang nauwkeurigere offertes.',
  'Briefly describe your project and receive more accurate quotes.',
  5 -- Step 5
);


-- ==========================================
-- STEP 6: PROJECT LOCATION (Projectlocatie)
-- General questions - applies to ALL categories
-- Note: These are form fields, not radio options
-- ==========================================

-- Postcode
INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  placeholder_nl,
  placeholder_en,
  step_number
)
VALUES
(
  'q-general-location-postcode',
  NULL,
  'Postcode',
  'Postcode',
  'text',
  TRUE,
  NULL,
  NULL,
  1,
  TRUE,
  'Postcode..',
  'Postcode..',
  6
),
-- City
(
  'q-general-location-city',
  NULL,
  'Woonplaats / Stad',
  'City',
  'text',
  FALSE,
  NULL,
  NULL,
  2,
  TRUE,
  'Woonplaats / Stad..',
  'City..',
  6
),
-- Street name
(
  'q-general-location-street',
  NULL,
  'Straatnaam',
  'Street name',
  'text',
  FALSE,
  NULL,
  NULL,
  3,
  TRUE,
  'Straatnaam..',
  'Street name..',
  6
),
-- House number
(
  'q-general-location-number',
  NULL,
  'Nummer / Huisnummer',
  'Number / House number',
  'text',
  FALSE,
  NULL,
  NULL,
  4,
  TRUE,
  'Nummer / Huisnummer..',
  'Number / house number..',
  6
);


-- ==========================================
-- STEP 7: CONTACT DETAILS (Persoonlijke gegevens)
-- Conditional based on Step 2 (request_type)
-- ==========================================

-- PRIVATE USER FIELDS (if request_type = 'private')

-- First name
INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  placeholder_nl,
  placeholder_en,
  step_number
)
VALUES
(
  'q-general-contact-firstname',
  NULL,
  'Voornaam',
  'First name',
  'text',
  TRUE,
  'q-general-request-type', -- Parent question
  'opt-request-type-private', -- Only show for private
  1,
  TRUE,
  'Voornaam..',
  'First name..',
  7
),
-- Last name
(
  'q-general-contact-lastname',
  NULL,
  'Achternaam',
  'Last name',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-private',
  2,
  TRUE,
  'Achternaam..',
  'Last name..',
  7
),
-- Phone
(
  'q-general-contact-phone',
  NULL,
  'Telefoonnummer',
  'Phone number',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-private',
  3,
  TRUE,
  'Telefoonnummer..',
  'Phone number..',
  7
),
-- Email
(
  'q-general-contact-email',
  NULL,
  'E-mailadres',
  'Email address',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-private',
  4,
  TRUE,
  'E-mailadres..',
  'Email address..',
  7
);

-- BUSINESS USER FIELDS (if request_type = 'business')

-- Company name
INSERT INTO project_form_questions (
  id,
  service_category_id,
  question_text_nl,
  question_text_en,
  question_type,
  is_root_question,
  parent_question_id,
  parent_option_id,
  order_index,
  is_required,
  placeholder_nl,
  placeholder_en,
  step_number
)
VALUES
(
  'q-general-contact-company',
  NULL,
  'Bedrijfsnaam',
  'Company name',
  'text',
  TRUE,
  'q-general-request-type', -- Parent question
  'opt-request-type-business', -- Only show for business
  1,
  TRUE,
  'Bedrijfsnaam..',
  'Company name..',
  7
),
-- First name (business)
(
  'q-general-contact-firstname-business',
  NULL,
  'Voornaam',
  'First name',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-business',
  2,
  TRUE,
  'Voornaam..',
  'First name..',
  7
),
-- Last name (business)
(
  'q-general-contact-lastname-business',
  NULL,
  'Achternaam',
  'Last name',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-business',
  3,
  TRUE,
  'Achternaam..',
  'Last name..',
  7
),
-- Phone (business)
(
  'q-general-contact-phone-business',
  NULL,
  'Telefoonnummer',
  'Phone number',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-business',
  4,
  TRUE,
  'Telefoonnummer..',
  'Phone number..',
  7
),
-- Email (business)
(
  'q-general-contact-email-business',
  NULL,
  'E-mailadres',
  'Email address',
  'text',
  FALSE,
  'q-general-request-type',
  'opt-request-type-business',
  5,
  TRUE,
  'E-mailadres..',
  'Email address..',
  7
);


-- ==========================================
-- STEP 8: PHONE VERIFICATION (Telefoonnummer verificatie)
-- This step is handled in the frontend with OTP
-- No database questions needed - just verification logic
-- ==========================================


COMMENT ON COLUMN project_form_questions.service_category_id IS 'NULL = applies to all categories (general questions), NOT NULL = category-specific';
COMMENT ON COLUMN project_form_questions.parent_option_id IS 'Used for conditional questions - only show if parent question has this option selected';
COMMENT ON COLUMN project_form_questions.step_number IS 'Step 1 = category-specific, Steps 2-8 = general questions';
