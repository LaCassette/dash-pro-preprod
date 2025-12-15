'use client';
export const runtime = 'edge';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';

export default function LogoutPage() {
  const router = useRouter();
  const { user } = useUser();

  useEffect(() => {
    if (!user) {
      router.push('/');
    } else {
      // Rediriger vers la route de déconnexion Auth0
      window.location.href = '/auth/logout';
    }
  }, [user, router]);

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="text-center">
        <div className="text-lg">Déconnexion en cours...</div>
      </div>
    </div>
  );
}
