type ConvertButtonProps = {
    onClick: () => void;
  };
  
  const ConvertButton = ({ onClick }: ConvertButtonProps) => {
    return (
      <button
        className="px-8 py-4 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700
                 text-white text-lg font-bold rounded-xl transition-all duration-200 ease-in-out
                 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl
                 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
        onClick={onClick}
      >
        やさしい日本語にする！
      </button>
    );
  };
  
  export default ConvertButton;
  