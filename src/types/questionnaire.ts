// Database types for questionnaire system

export interface ProjectDraft {
  id: string;
  service_category_id: number;
  session_token: string;
  ip_address?: string;
  user_agent?: string;
  postcode?: string;
  execution_timing?: string;
  current_step: number;
  last_question_id?: string;
  is_completed: boolean;
  is_converted_to_project: boolean;
  converted_project_id?: number;
  created_at: string;
  updated_at: string;
  expires_at: string;
}

export type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'select' | 'date';

export interface ProjectFormQuestion {
  id: string;
  service_category_id?: number;
  question_text_nl: string;
  question_text_en: string;
  question_type: QuestionType;
  is_root_question: boolean;
  parent_question_id?: string;
  parent_option_id?: string;
  order_index: number;
  is_required: boolean;
  placeholder_nl?: string;
  placeholder_en?: string;
  help_text_nl?: string;
  help_text_en?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface ProjectFormQuestionOption {
  id: string;
  question_id: string;
  option_value: string;
  option_label_nl: string;
  option_label_en: string;
  has_follow_up: boolean;
  order_index: number;
  is_active: boolean;
  created_at: string;
}

export interface ProjectFormAnswer {
  id: number;
  project_id?: number;
  project_draft_id?: string;
  question_id: string;
  selected_option_id?: string;
  answer_text?: string;
  created_at: string;
}

// Extended types with relationships
export interface QuestionWithOptions extends ProjectFormQuestion {
  options?: ProjectFormQuestionOption[];
}

// Request/Response types for API
export interface InitializeDraftRequest {
  serviceCategorySlug: string;
  postcode?: string;
  executionTiming?: string;
}

export interface InitializeDraftResponse {
  success: boolean;
  draftId: string;
  sessionToken: string;
}

export interface SaveAnswerRequest {
  draftId: string;
  questionId: string;
  selectedOptionId?: string;
  answerText?: string;
}

export interface GetQuestionsRequest {
  draftId: string;
  parentQuestionId?: string;
  parentOptionId?: string;
}

export interface GetQuestionsResponse {
  questions: QuestionWithOptions[];
}
