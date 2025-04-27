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
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-8">
      <Header />
      <div className="w-full max-w-2xl space-y-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
          <InputArea text={text} setText={setText} />
        </div>
        <div className="flex justify-center">
          <ConvertButton onClick={handleConvert} />
        </div>
        {isLoading ? (
          <div className="mt-4 text-center text-lg text-indigo-600 animate-pulse">
            へんかんちゅう...
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
            <OutputArea convertedText={convertedText} />
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
}
