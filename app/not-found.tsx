export const runtime = 'edge';

import Link from 'next/link';

export default function NotFound() {
    return (
        <div className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-background via-background to-violet-950/10">
            <div className="text-center space-y-6 px-4">
                <h1 className="text-6xl font-bold text-foreground">404</h1>
                <h2 className="text-2xl font-semibold text-foreground/80">Page non trouvée</h2>
                <p className="text-muted-foreground max-w-md">
                    La page que vous recherchez n'existe pas ou a été déplacée.
                </p>
                <Link
                    href="/"
                    className="inline-flex items-center justify-center rounded-md bg-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90"
                >
                    Retour à l'accueil
                </Link>
            </div>
        </div>
    );
}
