'use client';

import { createContext, useContext, useState, ReactNode } from 'react';

interface ProjectFormData {
  category: string;
  postcode: string;
  executionDate: string;
}

interface ProjectFormContextType {
  formData: ProjectFormData;
  setFormData: (data: Partial<ProjectFormData>) => void;
  clearFormData: () => void;
}

const ProjectFormContext = createContext<ProjectFormContextType | undefined>(undefined);

export const ProjectFormProvider = ({ children }: { children: ReactNode }) => {
  const [formData, setFormDataState] = useState<ProjectFormData>({
    category: '',
    postcode: '',
    executionDate: '',
  });

  const setFormData = (data: Partial<ProjectFormData>) => {
    setFormDataState((prev) => ({
      ...prev,
      ...data,
    }));
  };

  const clearFormData = () => {
    setFormDataState({
      category: '',
      postcode: '',
      executionDate: '',
    });
  };

  return (
    <ProjectFormContext.Provider value={{ formData, setFormData, clearFormData }}>
      {children}
    </ProjectFormContext.Provider>
  );
};

export const useProjectForm = () => {
  const context = useContext(ProjectFormContext);
  if (!context) {
    throw new Error('useProjectForm must be used within ProjectFormProvider');
  }
  return context;
};
