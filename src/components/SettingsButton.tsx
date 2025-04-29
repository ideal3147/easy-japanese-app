import { useState } from 'react';
import SettingsPanel from './SettingsPanel';
import { GoGear } from "react-icons/go";

const SettingsButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="inline-flex items-center gap-2 space-x-2 text-indigo-400 hover:text-indigo-900 transition-colors"
      >
        <GoGear />
        せってい
      </button>

      {isOpen && (
        <div className="fixed inset-0 backdrop-blur-sm bg-black/50 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <SettingsPanel onClose={() => setIsOpen(false)} />
          </div>
        </div>
      )}
    </>
  );
};

export default SettingsButton; 