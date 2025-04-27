import { FaRegCopy } from "react-icons/fa";

type CopyButtonProps = {
    textToCopy: string;
  };
  
  const CopyButton = ({ textToCopy }: CopyButtonProps) => {
    const handleCopy = async () => {
      try {
        await navigator.clipboard.writeText(textToCopy);
        alert("コピーしました！");
      } catch (error) {
        console.error("コピー失敗", error);
        alert("コピーに失敗しました...");
      }
    };
  
    return (
      <button
        onClick={handleCopy}
        className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow"
      >
        <FaRegCopy />
        コピーする
      </button>
    );
  };
  
  export default CopyButton;
  