interface InputAreaProps {
  text: string;
  setText: (text: string) => void;
}

const InputArea = ({ text, setText }: InputAreaProps) => {
  return (
    <div className="space-y-2">
      <label htmlFor="input" className="block text-sm font-medium text-gray-700">
        にほんごのぶんしょうをにゅうりょくしてください
      </label>
      <textarea
        id="input"
        value={text}
        onChange={(e) => setText(e.target.value)}
        className="w-full h-64 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 text-gray-900 bg-white"
        placeholder="にほんごのぶんしょうをにゅうりょくしてください..."
      />
    </div>
  );
};

export default InputArea;
  