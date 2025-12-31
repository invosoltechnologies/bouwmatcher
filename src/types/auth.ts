export type ContactInfoData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
};

export type PasswordSetupData = {
  email: string;
  password: string;
  confirmPassword: string;
};

export type LoginFormData = {
  email: string;
  password: string;
  rememberMe?: boolean;
};
