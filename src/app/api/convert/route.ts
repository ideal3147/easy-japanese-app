import { NextResponse } from 'next/server';
import OpenAI from 'openai';
import { createClient } from '@supabase/supabase-js';
import CryptoJS from 'crypto-js';

export async function POST(request: Request) {
  try {

    const authHeader = request.headers.get('Authorization');
    const token = authHeader?.split(' ')[1];
    
  
    if (!token) {
      return NextResponse.json({ error: '認証情報がありません' }, { status: 401 });
    }
  
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        global: {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      }
    );

    const { data: { user }, error } = await supabase.auth.getUser(token);

    if (error || !user) {
      return NextResponse.json({ error: '認証に失敗しました' }, { status: 401 });
    }
  
    const { data, error: apiKeyError } = await supabase
      .from('user_settings')
      .select('api_key')
      .eq('user_id', user.id)
      .single();
  
    if (apiKeyError || !data?.api_key) {
      console.log(apiKeyError);
      console.log(data);
      return NextResponse.json({ error: 'APIキーが見つかりません' }, { status: 401 });
    }

    const { text, level, model } = await request.json();
    if (!text || !level || !model) {
      return NextResponse.json({ error: '必要なパラメータが不足しています' }, { status: 400 });
    }

    const openai = new OpenAI({
      apiKey: decryptApiKey(data.api_key, process.env.NEXT_PUBLIC_API_KEY_SECRET!),
    });

    const prompt = `
    以下の文章を${level}レベルの日本語に変換してください。
    以下のルールに従ってください：
      1. 短い文で説明する
      2. 具体的な例を入れる
      3. 優しい言葉を使う
      4. 変換後は、本文のみを書くこと。あいさつ文や、追加の提案などは書かない
      5. 元の文章の段落構成や改行をそのまま維持すること
      6. 各段落の最初の文は、その段落の内容を簡単に説明する文から始めること
    文章:  
      ${text}
    `;

    const completion = await openai.chat.completions.create({
      model,
      messages: [
        {
          role: 'system',
          content: 'あなたは日本語の文章を簡単な日本語に変換する専門家です。',
        },
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    return NextResponse.json({ result: completion.choices[0].message.content });
  } catch (error) {
    console.error('変換エラー:', error);
    return NextResponse.json(
      { error: '変換中にエラーが発生しました' },
      { status: 500 }
    );
  }
} 

const decryptApiKey = (ciphertext: string, secretKey: string) => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};