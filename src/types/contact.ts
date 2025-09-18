export interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  category: string;
  message: string;
  file?: FileList;
  agreeToTerms: boolean;
}

export type ContactCategory =
  | "general"
  | "quote"
  | "support"
  | "partnership"
  | "complaint";

export interface ContactFormProps {
  onSubmit?: (data: ContactFormData) => void;
}