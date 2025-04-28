import { JapaneseLevel } from '@/contexts/SettingsContext';

export const convertToEasyJapanese = async (text: string, level: JapaneseLevel): Promise<string> => {
  try {
    const response = await fetch('/api/convert', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text, level }),
    });

    if (!response.ok) {
      throw new Error('変換に失敗しました');
    }

    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('変換エラー:', error);
    throw error;
  }
}; 