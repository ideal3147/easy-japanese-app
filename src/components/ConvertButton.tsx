type ConvertButtonProps = {
    onClick: () => void;
    disabled?: boolean;
  };
  
  const ConvertButton = ({ onClick, disabled = false }: ConvertButtonProps) => {
    return (
      <button
        className={`px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600
                 text-white text-lg font-bold rounded-xl transition-all duration-200 ease-in-out
                 shadow-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2
                 ${disabled 
                   ? 'opacity-50 cursor-not-allowed' 
                   : 'hover:from-indigo-600 hover:to-indigo-700 hover:scale-105 hover:shadow-xl active:scale-95'}`}
        onClick={onClick}
        disabled={disabled}
      >
        かんたんな にほんごにする！
      </button>
    );
  };
  
  export default ConvertButton;
  