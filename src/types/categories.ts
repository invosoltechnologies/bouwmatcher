export interface ServiceCategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en?: string;
  icon_url: string | null;
  is_active?: boolean;
  is_deleted?: boolean;
  deleted_at?: string | null;
  professional_count?: number;
}

export interface ProfessionalSpecialization {
  id: string;
  priority: number;
  service_category_id: number;
  service_categories: ServiceCategory;
}

export interface ServiceSubcategory {
  id: number;
  slug: string;
  name_nl: string;
  name_en: string | null;
  service_category_id: number;
  // service_category_name: string;
  price_particulier: number | null;
  price_zakelijk: number | null;
  icon_url: string | null;
}

export interface ServiceCategoryWithSubcategories extends ServiceCategory {
  subcategories: ServiceSubcategory[];
}

// DTOs
export interface CreateCategoryDTO {
  name_nl: string;
  name_en: string;
  slug: string;
}

export interface UpdateCategoryDTO {
  name_nl?: string;
  name_en?: string;
  icon_url?: string;
  is_active?: boolean;
}