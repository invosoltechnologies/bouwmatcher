/**
 * DTOs and interfaces for the admin category management multi-step form
 */

export type QuestionType = 'radio' | 'checkbox' | 'text' | 'textarea' | 'select' | 'date';

// ============================================================================
// Step 1: Category Information
// ============================================================================

export interface CreateCategoryDraftDTO {
  name_nl: string;
  name_en: string;
  slug: string;
  root_question_text_nl: string;
  root_question_text_en: string;
}

export interface CategoryDraftResponse {
  id: number;
  name_nl: string;
  name_en: string;
  slug: string;
  icon_url: string | null;
  created_at: string;
}

// ============================================================================
// Step 2: Subcategories with Questions
// ============================================================================

export interface QuestionOptionInput {
  option_label_nl: string;
  option_label_en: string;
  option_value: string;
  order_index: number;
}

export interface QuestionInput {
  question_text_nl: string;
  question_text_en: string;
  question_type: QuestionType;
  is_required: boolean;
  order_index: number;
  step_number: number;
  placeholder_nl?: string;
  placeholder_en?: string;
  help_text_nl?: string;
  help_text_en?: string;
  options: QuestionOptionInput[];
}

export interface CreateSubcategoryDTO {
  name_nl: string;
  name_en: string;
  slug: string;
  description_nl?: string;
  description_en?: string;
  price_particulier: number;
  price_zakelijk: number;
  sort_order: number;
  questions: QuestionInput[];
}

export interface SubcategoryResponse {
  id: number;
  name_nl: string;
  name_en: string;
  slug: string;
  description_nl: string | null;
  description_en: string | null;
  price_particulier: number;
  price_zakelijk: number;
  icon_url: string | null;
  sort_order: number;
  service_category_id: number;
  created_at: string;
  updated_at: string;
}

export interface QuestionOptionResponse {
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

export interface QuestionResponse {
  id: string;
  service_category_id: number | null;
  service_subcategory_id: number | null;
  question_text_nl: string;
  question_text_en: string;
  question_type: QuestionType;
  is_root_question: boolean;
  parent_question_id: string | null;
  parent_option_id: string | null;
  order_index: number;
  is_required: boolean;
  placeholder_nl: string | null;
  placeholder_en: string | null;
  help_text_nl: string | null;
  help_text_en: string | null;
  is_active: boolean;
  step_number: number;
  created_at: string;
  updated_at: string;
  options: QuestionOptionResponse[];
}

export interface SubcategoryWithQuestions extends SubcategoryResponse {
  questions: QuestionResponse[];
}

// ============================================================================
// Full Category Data (for edit mode)
// ============================================================================

export interface CategoryFullDataResponse {
  category: CategoryDraftResponse;
  subcategories: SubcategoryWithQuestions[];
  rootQuestion: QuestionResponse | null;
}

// ============================================================================
// Form State Interfaces
// ============================================================================

export interface CategoryInfoFormData {
  name_nl: string;
  name_en: string;
  slug: string;
  root_question_text_nl: string;
  root_question_text_en: string;
  icon?: FileList;
}

export interface QuestionFormData {
  question_text_nl: string;
  question_text_en: string;
  question_type: QuestionType;
  is_required: boolean;
  placeholder_nl?: string;
  placeholder_en?: string;
  help_text_nl?: string;
  help_text_en?: string;
  options: {
    option_label_nl: string;
    option_label_en: string;
    option_value: string;
  }[];
}

export interface SubcategoryFormData {
  name_nl: string;
  name_en: string;
  slug: string;
  description_nl?: string;
  description_en?: string;
  price_particulier: number;
  price_zakelijk: number;
  icon?: FileList;
  questions: QuestionFormData[];
}

// ============================================================================
// Update DTOs
// ============================================================================

export interface UpdateSubcategoryDTO {
  name_nl?: string;
  name_en?: string;
  slug?: string;
  description_nl?: string;
  description_en?: string;
  price_particulier?: number;
  price_zakelijk?: number;
  sort_order?: number;
}

// ============================================================================
// Utility Types
// ============================================================================

export interface IconUploadResponse {
  icon_url: string;
}

export interface SlugCheckResponse {
  exists: boolean;
  suggestion?: string;
}
