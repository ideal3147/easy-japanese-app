"use client";

import { useState } from "react";
import Header from "@/components/Header";
import InputArea from "@/components/InputArea";
import ConvertButton from "@/components/ConvertButton";
import OutputArea from "@/components/OutputArea";
import Footer from "@/components/Footer";
import { initKuroshiro, convertToHiragana } from "@/libs/kuroshiroClient";

export default function Home() {
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = async () => {
    if (!text) return;

    setIsLoading(true);
    try {
      await initKuroshiro();
      const result = await convertToHiragana(text);
      setConvertedText(result);
    } catch (error) {
      console.error("変換エラー", error);
      setConvertedText("へんかんできなかったよ…😢");
    }
    setIsLoading(false);
  };

  return (
    <main className="flex flex-col items-center min-h-screen p-8">
      <Header />
      <div className="w-full max-w-2xl">
        <InputArea text={text} setText={setText} />
        <ConvertButton onClick={handleConvert} />
        {isLoading ? (
          <div className="mt-4 text-center text-lg">へんかんちゅう...</div>
        ) : (
          <OutputArea convertedText={convertedText} />
        )}
      </div>
      <Footer />
    </main>
  );
}
