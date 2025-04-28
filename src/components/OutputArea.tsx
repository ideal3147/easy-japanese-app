import CopyButton from "@/components/CopyButton";

type OutputAreaProps = {
  convertedText: string;
};

const OutputArea = ({ convertedText }: OutputAreaProps) => {
  return (
    <div className="relative w-full space-y-2">
      <div className="flex justify-between items-center">
        <label htmlFor="output-text" className="block text-sm font-medium text-gray-700">
          ひらがなにへんかんしたぶんしょう
        </label>
        {convertedText && (
          <CopyButton textToCopy={convertedText} />
        )}
      </div>
      <div className="relative">
        <div
          id="output-text"
          className="p-4 border-2 border-indigo-100 rounded-xl min-h-[150px] text-lg 
                   bg-indigo-50/50 transition-all duration-200 ease-in-out whitespace-pre-wrap"
        >
          {convertedText ? (
            <span className="text-indigo-900">{convertedText}</span>
          ) : (
            <span className="text-gray-400">ここにけっかがでるよ！</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default OutputArea;
