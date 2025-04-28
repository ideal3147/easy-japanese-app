import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { JapaneseLevel, OpenAIModel } from '@/contexts/SettingsContext';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const getLevelSpecificPrompt = (level: JapaneseLevel) => {
  switch (level) {
    case 'elementary':
      return `
      以下の文章を、日本に住む外国籍の小学1,2年生が理解できるように、簡単な日本語に変換してください。
      以下のルールに従ってください：
      1. ひらがなを中心に使用する
      2. 難しい漢字は使わない
      3. 短い文で説明する
      4. 具体的な例を入れる
      5. 優しい言葉を使う
      6. 変換後は、本文のみを書くこと。あいさつ文や、追加の提案などは書かない
      7. 元の文章の段落構成や改行をそのまま維持すること
      8. 各段落の最初の文は、その段落の内容を簡単に説明する文から始めること
      `;
    case 'intermediate':
      return `
      以下の文章を、日本に住む外国籍の小学3,4年生が理解できるように、簡単な日本語に変換してください。
      以下のルールに従ってください：
      1. 基本的な漢字は使用してもよい
      2. 短い文で説明する
      3. 具体的な例を入れる
      4. 優しい言葉を使う
      5. 変換後は、本文のみを書くこと。あいさつ文や、追加の提案などは書かない
      6. 元の文章の段落構成や改行をそのまま維持すること
      7. 各段落の最初の文は、その段落の内容を簡単に説明する文から始めること
      `;
    case 'advanced':
      return `
      以下の文章を、日本に住む外国籍の小学5,6年生が理解できるように、簡単な日本語に変換してください。
      以下のルールに従ってください：
      1. 一般的な漢字は使用してもよい
      2. 短い文で説明する
      3. 具体的な例を入れる
      4. 優しい言葉を使う
      5. 変換後は、本文のみを書くこと。あいさつ文や、追加の提案などは書かない
      6. 元の文章の段落構成や改行をそのまま維持すること
      7. 各段落の最初の文は、その段落の内容を簡単に説明する文から始めること
      `;
  }
};

export async function POST(request: Request) {
  try {
    const { text, level, model } = await request.json();

    const prompt = `
    ${getLevelSpecificPrompt(level as JapaneseLevel)}

    変換前の文章：
    ${text}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: model as OpenAIModel,
      temperature: 0.7,
    });

    return NextResponse.json({ 
      result: completion.choices[0].message.content 
    });
  } catch (error) {
    console.error('Error:', error);
    return NextResponse.json(
      { error: '変換に失敗しました' },
      { status: 500 }
    );
  }
} 