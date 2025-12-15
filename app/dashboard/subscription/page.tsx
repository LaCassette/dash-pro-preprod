import { Suspense } from 'react';
import { SubscriptionContent } from './subscription-content';
import { Loader2 } from 'lucide-react';

export const runtime = 'edge';

export default function SubscriptionPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center h-64">
        <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
      </div>
    }>
      <SubscriptionContent />
    </Suspense>
  );
}
