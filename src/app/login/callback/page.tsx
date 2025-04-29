"use client"

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabaseClient';
import CryptoJS from 'crypto-js';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    console.log('AuthCallback start');
    const checkSessionAndRegisterApiKey = async () => {
      const {
        data: { session },
        error: sessionError,
      } = await supabase.auth.getSession();

      if (sessionError) {
        console.error('Session error:', sessionError);
        return;
      }

      const user = session?.user;

      if (!user) {
        console.warn('No user found in session');
        return;
      }

      // DBにAPIキーが既にあるか確認
      const { data: existingData, error: selectError } = await supabase
        .from('user_settings')
        .select('api_key')
        .eq('user_id', user.id)
        .maybeSingle();

      if (selectError) {
        console.error('DB select error:', selectError);
        return;
      }
      console.log('existingData', existingData);
      // なければ localStorage から取得して登録
      if (!existingData) {
        const pendingApiKey = session?.user.user_metadata?.pendingApiKey;
        console.log('pendingApiKey', pendingApiKey);
        if (pendingApiKey && process.env.NEXT_PUBLIC_API_KEY_SECRET) {
          const encrypted = CryptoJS.AES.encrypt(
            pendingApiKey,
            process.env.NEXT_PUBLIC_API_KEY_SECRET
          ).toString();

          const { error: insertError } = await supabase.from('user_settings').insert([
            {
              user_id: user.id,
              api_key: encrypted,
            },
          ]);

          if (insertError) {
            console.error('Insert error:', insertError);
            return;
          }
        }
      }

    console.log('AuthCallback end');

      // ホームにリダイレクト
      router.replace('/');
    };

    checkSessionAndRegisterApiKey();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">認証中...</p>
      </div>
    </div>
  );
}
