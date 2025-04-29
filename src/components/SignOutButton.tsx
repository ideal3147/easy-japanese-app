'use client';

import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { GoSignOut } from "react-icons/go";

export default function SignOutButton() {
  const { signOut } = useAuth();
  const router = useRouter();

  const handleSignOut = async () => {
    await signOut();
    router.push('/login');
  };

  return (
    <button
      onClick={handleSignOut}
      className="inline-flex items-center gap-2 space-x-2 text-red-600 hover:text-red-800 transition-colors"
    >
      <GoSignOut  />
        サインアウト
    </button>
  );
} 