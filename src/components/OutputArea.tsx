type OutputAreaProps = {
    convertedText: string;
  };
  
  const OutputArea = ({ convertedText }: OutputAreaProps) => {
    return (
      <div className="w-full p-4 mt-4 border rounded-lg min-h-[150px] text-lg bg-gray-50">
        {convertedText ? convertedText : "ここにけっかがでるよ！"}
      </div>
    );
  };
  
  export default OutputArea;
  