"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InputArea from "@/components/InputArea";
import ConvertButton from "@/components/ConvertButton";
import OutputArea from "@/components/OutputArea";
import Footer from "@/components/Footer";

export default function Home() {
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");

  const handleConvert = () => {
    // 仮の変換処理（本物はあとで作る）
    const simpleText = text.replace(/[一-龠々〆ヵヶ]/g, (kanji) => {
      // とりあえず「〇」に置き換える（仮）
      return "〇";
    });
    setConvertedText(simpleText);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <Header />
      <div className="w-full max-w-2xl">
        <InputArea text={text} setText={setText} />
        <ConvertButton onClick={handleConvert} />
        <OutputArea convertedText={convertedText} />
      </div>
      <Footer />
    </main>
  );
}
