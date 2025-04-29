'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/libs/supabaseClient';
import CryptoJS from 'crypto-js';

export default function AuthCallback() {
  const router = useRouter();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        const { data: { session }, error: sessionError } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        const user = session?.user;
        if (!user) throw new Error('No user in session');

        // user_settingsに既に登録されているか確認
        const { data: existing, error: selectError } = await supabase
          .from('user_settings')
          .select('api_key')
          .eq('user_id', user.id)
          .maybeSingle();

        if (selectError) throw selectError;

        if (!existing) {
          const pendingApiKey = user.user_metadata?.pendingApiKey;
          if (pendingApiKey && process.env.NEXT_PUBLIC_API_KEY_SECRET) {
            const encrypted = CryptoJS.AES.encrypt(pendingApiKey, process.env.NEXT_PUBLIC_API_KEY_SECRET).toString();

            // user_settingsに登録
            const { error: insertError } = await supabase.from('user_settings').insert([
              { user_id: user.id, api_key: encrypted },
            ]);
            if (insertError) throw insertError;

            // 成功したらmetadataのpendingApiKeyを削除
            const { error: updateError } = await supabase.auth.updateUser({
              data: { pendingApiKey: null },
            });
            if (updateError) throw updateError;
          }
        }
      } catch (error) {
        console.error('Auth callback error:', error);
      } finally {
        // 成功・失敗にかかわらず必ずホームに飛ばす
        router.replace('/');
      }
    };

    handleAuthCallback();
  }, [router]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">認証処理中です...</p>
      </div>
    </div>
  );
}
