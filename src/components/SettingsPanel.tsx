import { useSettings } from '@/contexts/SettingsContext';

const SettingsPanel = () => {
  const { japaneseLevel, setJapaneseLevel } = useSettings();

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
      <h2 className="text-lg font-semibold text-gray-800">せってい</h2>
      
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">
          にほんごのレベル
        </label>
        <div className="space-y-2">
          <div className="flex items-center">
            <input
              type="radio"
              id="elementary"
              name="japaneseLevel"
              value="elementary"
              checked={japaneseLevel === 'elementary'}
              onChange={() => setJapaneseLevel('elementary')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="elementary" className="ml-2 text-sm text-gray-700">
              しょうがくせい（1・2ねんせい）
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="intermediate"
              name="japaneseLevel"
              value="intermediate"
              checked={japaneseLevel === 'intermediate'}
              onChange={() => setJapaneseLevel('intermediate')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="intermediate" className="ml-2 text-sm text-gray-700">
              しょうがくせい（3・4ねんせい）
            </label>
          </div>
          
          <div className="flex items-center">
            <input
              type="radio"
              id="advanced"
              name="japaneseLevel"
              value="advanced"
              checked={japaneseLevel === 'advanced'}
              onChange={() => setJapaneseLevel('advanced')}
              className="h-4 w-4 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="advanced" className="ml-2 text-sm text-gray-700">
              しょうがくせい（5・6ねんせい）
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel; 