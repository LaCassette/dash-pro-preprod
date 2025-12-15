'use client';
export const runtime = 'edge';

import { useState, useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Loader2, User, UserCheck } from 'lucide-react';
import Link from 'next/link';

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const [role, setRole] = useState<'USER' | 'PRO'>('USER');
  const [loading, setLoading] = useState(false);

  // Vérifier si l'utilisateur revient d'Auth0
  useEffect(() => {
    const setupUser = async () => {
      // Vérifier si on revient d'Auth0 (code dans l'URL)
      if (searchParams.get('code')) {
        try {
          // Appeler l'endpoint de synchronisation pour créer/mettre à jour l'utilisateur
          const syncResponse = await fetch('/api/auth/sync', {
            method: 'POST',
          });

          if (syncResponse.ok) {
            const { user } = await syncResponse.json();

            // Nettoyer les cookies
            document.cookie = 'signup_role=; max-age=0; path=/';
            document.cookie = 'signup_referral_code=; max-age=0; path=/';

            // Si PRO, setup le rôle
            const signupRole = sessionStorage.getItem('signup_role');
            if (signupRole === 'PRO') {
              const roleResponse = await fetch('/api/auth/setup-role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role: 'PRO' }),
              });

              if (roleResponse.ok) {
                sessionStorage.removeItem('signup_role');
                toast({
                  title: 'Compte PRO créé',
                  description: 'Votre compte est en attente de validation par un administrateur.',
                });
              }
            } else {
              toast({
                title: 'Bienvenue !',
                description: 'Votre compte a été créé avec succès.',
              });
            }

            router.push('/dashboard');
          }
        } catch (error) {
          console.error('Error syncing user:', error);
        }
      }
    };

    setupUser();
  }, [searchParams, router, toast]);

  // Capturer le code de parrainage depuis l'URL
  useEffect(() => {
    const refCode = searchParams.get('ref');
    if (refCode) {
      // Stocker le code de parrainage dans un cookie pour qu'il soit accessible côté serveur
      document.cookie = `signup_referral_code=${refCode}; max-age=3600; path=/; SameSite=Lax`;
      console.log('Referral code captured:', refCode);
    }
  }, [searchParams]);

  const handleSignup = async () => {
    setLoading(true);
    try {
      // Stocker le rôle dans sessionStorage ET cookie pour qu'il soit récupéré après Auth0
      if (role === 'PRO') {
        sessionStorage.setItem('signup_role', 'PRO');
        document.cookie = `signup_role=PRO; max-age=3600; path=/; SameSite=Lax`;
      } else {
        // Pour les USER, stocker aussi dans un cookie
        document.cookie = `signup_role=USER; max-age=3600; path=/; SameSite=Lax`;
      }

      // Rediriger vers Auth0
      window.location.href = `/api/auth/login?screen_hint=signup`;
    } catch (error) {
      console.error('Error during signup:', error);
      toast({
        title: 'Erreur',
        description: 'Une erreur est survenue lors de l\'inscription',
        variant: 'destructive',
      });
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-primary/10 via-background to-primary/5 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold">Créer un compte</CardTitle>
          <CardDescription>
            Choisissez le type de compte qui correspond à vos besoins
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <RadioGroup value={role} onValueChange={(value) => setRole(value as 'USER' | 'PRO')}>
            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="USER" id="user" className="mt-1" />
              <Label htmlFor="user" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <User className="h-5 w-5" />
                  <span className="font-semibold">Utilisateur</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Accédez aux programmes sportifs et nutritionnels créés par vos coachs.
                  Accès immédiat après inscription.
                </p>
              </Label>
            </div>

            <div className="flex items-start space-x-3 rounded-lg border p-4 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="PRO" id="pro" className="mt-1" />
              <Label htmlFor="pro" className="flex-1 cursor-pointer">
                <div className="flex items-center gap-2 mb-1">
                  <UserCheck className="h-5 w-5" />
                  <span className="font-semibold">Professionnel</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  Créez des programmes personnalisés pour vos clients, gérez votre activité.
                  <span className="block mt-1 font-medium text-foreground">
                    ⚠️ Votre compte sera en attente de validation par un administrateur.
                  </span>
                </p>
              </Label>
            </div>
          </RadioGroup>

          <div className="space-y-3">
            <Button
              onClick={handleSignup}
              disabled={loading}
              className="w-full"
              size="lg"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Redirection...
                </>
              ) : (
                'Continuer avec Auth0'
              )}
            </Button>

            <div className="text-center text-sm text-muted-foreground">
              Vous avez déjà un compte ?{' '}
              <Link href="/api/auth/login" className="text-primary hover:underline">
                Se connecter
              </Link>
            </div>
          </div>

          {role === 'PRO' && (
            <div className="rounded-lg bg-muted p-4 text-sm">
              <p className="font-semibold mb-2">Information importante :</p>
              <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                <li>Votre compte sera créé avec le statut "En attente"</li>
                <li>Vous pourrez configurer votre dashboard pendant l'attente</li>
                <li>La création d'organisations sera désactivée jusqu'à validation</li>
                <li>Un administrateur validera votre compte sous 24-48h</li>
              </ul>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    }>
      <SignupContent />
    </Suspense>
  );
}
