'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/libs/supabaseClient';
import Link from 'next/link';

export default function CheckEmail() {
  const [email, setEmail] = useState<string | null>(null);

  useEffect(() => {
    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email) {
        setEmail(session.user.email);
      }
    };

    checkSession();
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
            メールをかくにんしてください
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            {email ? (
              <>
                <span className="font-medium">{email}</span>にメールを送信しました。
              </>
            ) : (
              'メールを送信しました。'
            )}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          <div className="rounded-md bg-blue-50 p-4">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-blue-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-blue-800">
                  メールのかくにんがひつようです
                </h3>
                <div className="mt-2 text-sm text-blue-700 whitespace-pre-line">
                  <p>
                    メールにかかれているリンクをクリックして、<br />
                    アカウントのとうろくをかんりょうしてください。
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center">
            <p className="text-sm text-gray-600">
              メールがとどかないばあいは、めいわくメールフォルダをみてください。
            </p>
            <div className="mt-4">
              <Link
                href="/login"
                className="text-sm font-medium text-indigo-600 hover:text-indigo-500"
              >
                ログインがめんにもどる
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
  