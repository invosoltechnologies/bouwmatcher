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
  service_categories?: {
    id: number;
    name_nl: string;
    name_en: string;
  };
}

export interface LeadsResponse {
  leads: Lead[];
}
