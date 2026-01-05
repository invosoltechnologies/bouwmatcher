export interface Lead {
  id: string;
  service_category_id: number;
  subcategory_id: number | null;
  request_type: 'private' | 'business';
  has_photos: boolean;
  description: string | null;
  postcode: string | null;
  street_number: string | null;
  street_name: string | null;
  city: string | null;
  first_name: string | null;
  last_name: string | null;
  latitude: string;
  longitude: string;
  status: string;
  created_at: string;
  execution_timing: string | null;
  distance?: number;
  is_locked: boolean;
  service_categories?: {
    id: number;
    name_nl: string;
    name_en: string;
  };
  service_subcategories?: {
    id: number;
    name_nl: string;
    name_en: string;
    price_particulier: number;
    price_zakelijk: number;
  };
}

export interface LeadsResponse {
  leads: Lead[];
}

export interface LeadDetails extends Lead {
  company_name: string | null;
  email: string | null;
  phone: string | null;
  is_locked: boolean;
  lead_price?: number;
}

export interface ProjectPhoto {
  id: string;
  storage_path: string;
  file_name: string;
  display_order: number;
}

export interface ProjectAnswer {
  id: string;
  answer_text: string | null;
  selected_option_id: string | null;
  question_id: string;
  project_form_questions: {
    id: string;
    question_text_nl: string;
    question_text_en: string;
    question_type: string;
  };
  project_form_question_options: {
    id: string;
    option_label_nl: string;
    option_label_en: string;
  } | null;
}

export interface LeadDetailsResponse {
  lead: LeadDetails;
  photos: ProjectPhoto[];
  answers: ProjectAnswer[];
  is_locked: boolean;
}
