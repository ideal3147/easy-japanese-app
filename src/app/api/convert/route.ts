import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  try {
    const { text } = await request.json();

    const prompt = `
    以下の文章を、日本に住む外国籍の小学1,2年生が理解できるように、簡単な日本語に変換してください。
    以下のルールに従ってください：
    1. ひらがなを中心に使用する
    2. 難しい漢字は使わない
    3. 短い文で説明する
    4. 具体的な例を入れる
    5. 優しい言葉を使う
    6. 変換後は、本文のみを書くこと。あいさつ文や、追加の提案などは書かない

    変換前の文章：
    ${text}
    `;

    const completion = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-4.1-nano",
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