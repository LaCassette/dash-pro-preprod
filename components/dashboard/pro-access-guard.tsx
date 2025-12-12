'use client';

import { useMemo } from 'react';
import { useUser } from '@/hooks/use-user';
import { useSubscription } from '@/hooks/use-subscription';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShieldAlert } from 'lucide-react';

const ALLOWED_STATUSES = ['TRIAL', 'ACTIVE'];

export function ProAccessGuard() {
  const { user, loading: userLoading } = useUser();
  const { subscription, loading: subscriptionLoading } = useSubscription();
  const pathname = usePathname();

  const loading = userLoading || subscriptionLoading;

  const shouldBlock = useMemo(() => {
    if (!user) return false;
    if (pathname.startsWith('/dashboard/subscription')) return false;
    if (user.role !== 'PRO') return false;
    if (user.proStatus !== 'PENDING') return false;

    const hasValidSubscription =
      subscription && ALLOWED_STATUSES.includes(subscription.status);

    return !hasValidSubscription;
  }, [user, subscription, pathname]);

  if (loading || !shouldBlock) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/95 backdrop-blur-sm p-4">
      <div className="max-w-lg w-full rounded-3xl border bg-background shadow-2xl p-8 space-y-6 text-center">
        <div className="flex flex-col items-center gap-3">
          <ShieldAlert className="h-12 w-12 text-primary" />
          <h2 className="text-2xl font-semibold">Activez votre compte professionnel</h2>
        </div>
        <p className="text-muted-foreground">
          Vous avez demandé à devenir PRO. Pour débloquer toutes les fonctionnalités,
          activez votre abonnement (14 jours d&apos;essai offerts). Une fois l&apos;abonnement actif,
          votre dashboard sera automatiquement débloqué.
        </p>
        <div className="space-y-3">
          <Button asChild size="lg" className="w-full">
            <Link href="/dashboard/subscription">
              Activer mon abonnement
            </Link>
          </Button>
          <p className="text-xs text-muted-foreground">
            Cette étape est obligatoire pour respecter nos conditions d&apos;utilisation et garantir
            la sécurité des données clients.
          </p>
        </div>
      </div>
    </div>
  );
}

