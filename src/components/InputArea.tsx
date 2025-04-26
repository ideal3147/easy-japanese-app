type InputAreaProps = {
    text: string;
    setText: (value: string) => void;
  };
  
  const InputArea = ({ text, setText }: InputAreaProps) => {
    return (
      <textarea
        className="w-full p-4 border rounded-lg min-h-[150px] text-lg"
        placeholder="ここにぶんしょうをいれてね！"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
    );
  };
  
  export default InputArea;
  