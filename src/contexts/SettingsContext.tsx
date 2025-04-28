import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
  const [japaneseLevel, setJapaneseLevel] = useState<JapaneseLevel>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('japaneseLevel') as JapaneseLevel) || 'elementary';
    }
    return 'elementary';
  });

  const [openAIModel, setOpenAIModel] = useState<OpenAIModel>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('openAIModel') as OpenAIModel) || 'gpt-4.1-nano';
    }
    return 'gpt-4.1-nano';
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('japaneseLevel', japaneseLevel);
      localStorage.setItem('openAIModel', openAIModel);
    }
  }, [japaneseLevel, openAIModel]);

  return (
    <SettingsContext.Provider value={{
      japaneseLevel,
      setJapaneseLevel,
      openAIModel,
      setOpenAIModel,
    }}>
      {children}
    </SettingsContext.Provider>
  );
}; 