import React, { createContext, useContext, useState, ReactNode } from 'react';

export type JapaneseLevel = 'elementary' | 'intermediate' | 'advanced';

interface SettingsContextType {
  japaneseLevel: JapaneseLevel;
  setJapaneseLevel: (level: JapaneseLevel) => void;
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

  return (
    <SettingsContext.Provider value={{ japaneseLevel, setJapaneseLevel }}>
      {children}
    </SettingsContext.Provider>
  );
}; 