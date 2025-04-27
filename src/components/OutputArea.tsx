import CopyButton from "@/components/CopyButton";

type OutputAreaProps = {
  convertedText: string;
};

const OutputArea = ({ convertedText }: OutputAreaProps) => {
  return (
    <div className="relative w-full mt-4">
      {/* テキスト表示部分 */}
      <div className="p-4 border rounded-lg min-h-[150px] text-lg mb-2 bg-gray-50">
        {convertedText ? convertedText : "ここにけっかがでるよ！"}
      </div>

      {/* コピーするボタン（右下に絶対配置） */}
      {convertedText && (
        <div className="absolute right-2 ">
          <CopyButton textToCopy={convertedText} />
        </div>
      )}
    </div>
  );
};

export default OutputArea;
