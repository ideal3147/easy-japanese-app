type ConvertButtonProps = {
    onClick: () => void;
  };
  
  const ConvertButton = ({ onClick }: ConvertButtonProps) => {
    return (
      <button
        className="mt-4 w-full p-4 bg-green-500 hover:bg-green-600 text-white text-lg font-bold rounded-lg transition"
        onClick={onClick}
      >
        やさしい日本語にする！
      </button>
    );
  };
  
  export default ConvertButton;
  