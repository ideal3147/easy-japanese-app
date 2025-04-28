import React, { createContext, useContext, useState, ReactNode } from 'react';

export type JapaneseLevel = 'elementary' | 'intermediate' | 'advanced';
export type OpenAIModel = 'gpt-4.1' | 'gpt-4.1-mini' | 'gpt-4.1-nano';

interface SettingsContextType {
  japaneseLevel: JapaneseLevel;
  setJapaneseLevel: (level: JapaneseLevel) => void;
  openAIModel: OpenAIModel;
  setOpenAIModel: (model: OpenAIModel) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const useSettings = () => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>('elementary');
  const [openAIModel, setOpenAIModel] = useState<OpenAIModel>('gpt-4.1-nano');

  return (
    <SettingsContext.Provider value={{ 
      japaneseLevel, 
      setJapaneseLevel,
      openAIModel,
      setOpenAIModel
    }}>
      {children}
    </SettingsContext.Provider>
  );
}; 