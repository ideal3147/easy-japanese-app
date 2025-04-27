type InputAreaProps = {
    text: string;
    setText: (value: string) => void;
  };
  
  const InputArea = ({ text, setText }: InputAreaProps) => {
    return (
      <div className="space-y-2">
        <label htmlFor="input-text" className="block text-sm font-medium text-gray-700">
          にほんごのぶんしょうをいれてね！
        </label>
        <textarea
          id="input-text"
          className="w-full p-4 border-2 border-indigo-100 rounded-xl min-h-[150px] text-lg 
                   focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent
                   transition-all duration-200 ease-in-out
                   placeholder:text-gray-400"
          placeholder="ここにぶんしょうをいれてね！"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      </div>
    );
  };
  
  export default InputArea;
  