"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import InputArea from "@/components/InputArea";
import ConvertButton from "@/components/ConvertButton";
import OutputArea from "@/components/OutputArea";
import ImageUploadArea from "@/components/ImageUploadArea";
import Footer from "@/components/Footer";
import { convertToEasyJapanese } from "@/libs/openaiClient";
import { SettingsProvider, useSettings } from "@/contexts/SettingsContext";
import { useAuth } from "@/contexts/AuthContext";
import { AuthProvider } from "@/contexts/AuthContext";
import { supabase } from "@/libs/supabaseClient";

function HomeContent() {
  const [text, setText] = useState("");
  const [convertedText, setConvertedText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [accessToken, setAccessToken] = useState<string>("");
  const { japaneseLevel, openAIModel } = useSettings();
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    } else {
      const getSession = async () => {
        const { data } = await supabase.auth.getSession();
        setAccessToken(data.session?.access_token || "");
      };
      getSession();
    }
  }, [user, router]);

  const handleConvert = async () => {
    if (!text || !user || !accessToken) return;

    setIsLoading(true);
    try {
      const result = await convertToEasyJapanese(text, japaneseLevel, openAIModel, accessToken);
      setConvertedText(result);
    } catch (error) {
      console.error("変換エラー", error);
      setConvertedText("へんかんできなかったよ…😢");
    }
    setIsLoading(false);
  };

  const handleTextExtracted = (extractedText: string) => {
    setText(extractedText);
  };

  if (!user) {
    return null;
  }

  return (
    <main className="flex flex-col items-center min-h-screen bg-gradient-to-b from-indigo-50 to-white p-4 md:p-8">
      <Header />
      <div className="w-full max-w-2xl space-y-6 mt-8">
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
          <ImageUploadArea onTextExtracted={handleTextExtracted} />
        </div>
        <div className="bg-white rounded-xl shadow-lg p-6 transform transition-all hover:shadow-xl">
          <InputArea text={text} setText={setText} />
        </div>
        <div className="flex justify-center">
          <ConvertButton onClick={handleConvert} disabled={!text} />
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

export default function Home() {
  return (
    <AuthProvider>
      <SettingsProvider>
        <HomeContent />
      </SettingsProvider>
    </AuthProvider>
  );
}
