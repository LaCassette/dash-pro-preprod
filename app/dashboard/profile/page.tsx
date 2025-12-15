'use client';
export const runtime = 'edge';

'use client';

import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Save, User, Dumbbell, Apple, Globe, Sun, Moon, Monitor } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { UserProfileForm } from '@/components/dashboard/user-profile-form';
import Link from 'next/link';
import { LanguageSelector } from '@/components/language-selector';

const profileSchema = z.object({
  name: z.string().min(1, 'Le nom est requis').max(100, 'Le nom est trop long'),
  email: z.string().email('Email invalide'),
});

type ProfileFormData = z.infer<typeof profileSchema>;

export default function ProfilePage() {
  const { user, loading: userLoading } = useUser();
  const { getAccentColor } = useOrganization();
  const { theme, setTheme } = useTheme();
  const { toast } = useToast();
  const [saving, setSaving] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [becomingPro, setBecomingPro] = useState(false);
  const [mounted, setMounted] = useState(false);
  const t = useTranslations('profile');
  const tCommon = useTranslations('common');
  const tRoles = useTranslations('roles');

  useEffect(() => {
    setMounted(true);
  }, []);

  const accentColor = getAccentColor(theme === 'dark');

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
    },
  });

  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || '',
        email: user.email || '',
      });
    }
  }, [user, form]);

  async function onSubmit(data: ProfileFormData) {
    if (!user) return;

    setSaving(true);
    try {
      const response = await fetch('/api/auth/user', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Erreur lors de la mise à jour');
      }

      toast({
        title: 'Succès',
        description: 'Profil mis à jour avec succès',
      });

      // Rafraîchir les données utilisateur
      setRefreshing(true);
      window.location.reload(); // Simple reload pour rafraîchir les données
    } catch (error) {
      console.error('Error updating profile:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de mettre à jour le profil',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
      setRefreshing(false);
    }
  }

  async function handleBecomePro() {
    if (!user) return;
    setBecomingPro(true);
    try {
      const response = await fetch('/api/auth/setup-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role: 'PRO' }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Impossible de mettre à jour votre rôle');
      }

      toast({
        title: 'Demande envoyée',
        description: 'Votre compte passe en mode PRO (en attente). Activez votre abonnement pour débloquer toutes les fonctionnalités.',
      });

      window.location.reload();
    } catch (error) {
      console.error('Error becoming pro:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de devenir PRO',
        variant: 'destructive',
      });
    } finally {
      setBecomingPro(false);
    }
  }

  if (userLoading || refreshing) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
      </div>
      <div className="mb-6">
        <h1
          className="text-3xl font-bold"
          style={accentColor ? { color: accentColor } : undefined}
        >
          {t('title')}
        </h1>
        <p className="text-muted-foreground">
          {t('personalInfo')}
        </p>
      </div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="personal">
            <User className="mr-2 h-4 w-4" />
            {t('personalInfo')}
          </TabsTrigger>
          <TabsTrigger value="sport">
            <Dumbbell className="mr-2 h-4 w-4" />
            {t('sportProfile')}
          </TabsTrigger>
          <TabsTrigger value="nutrition">
            <Apple className="mr-2 h-4 w-4" />
            {t('nutritionProfile')}
          </TabsTrigger>
          <TabsTrigger value="medical">
            🏥 {t('medicalProfile')}
          </TabsTrigger>
          <TabsTrigger value="lifestyle">
            🧘 {t('lifestyleProfile')}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            {/* Informations personnelles */}
            <Card>
              <CardHeader>
                <CardTitle>{t('personalInfo')}</CardTitle>
                <CardDescription>
                  {t('accountDetails')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="flex flex-col items-center gap-4 mb-6">
                      <Avatar className="h-24 w-24">
                        <AvatarImage src={user.picture || undefined} />
                        <AvatarFallback className="text-2xl">
                          {user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">
                          {t('photoManagedByAuth')}
                        </p>
                      </div>
                    </div>

                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('fullName')}</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder={t('name')} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>{t('email')}</FormLabel>
                          <FormControl>
                            <Input
                              type="email"
                              {...field}
                              placeholder="your@email.com"
                              disabled
                            />
                          </FormControl>
                          <FormMessage />
                          <p className="text-xs text-muted-foreground">
                            {t('emailManagedByAuth')}
                          </p>
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      disabled={saving}
                      className="w-full"
                      style={accentColor ? {
                        backgroundColor: accentColor,
                        color: 'white'
                      } : undefined}
                    >
                      {saving ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {t('saving')}
                        </>
                      ) : (
                        <>
                          <Save className="mr-2 h-4 w-4" />
                          {t('saveChanges')}
                        </>
                      )}
                    </Button>
                  </form>
                </Form>
              </CardContent>
            </Card>

            {/* Informations du compte */}
            <Card>
              <CardHeader>
                <CardTitle>{t('accountInfo')}</CardTitle>
                <CardDescription>
                  {t('accountDetails')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language Selection */}
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    <Label className="text-sm font-medium">{t('language')}</Label>
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    {t('languageDescription')}
                  </p>
                  <LanguageSelector />
                </div>

                {/* Personalization Section */}
                <div className="pt-4 border-t">
                  <h4 className="text-sm font-semibold mb-4">{t('personalization')}</h4>

                  {/* Theme Selection */}
                  <div className="space-y-2">
                    <Label className="text-sm text-muted-foreground">{t('theme')}</Label>
                    <div className="flex gap-2">
                      {mounted && (
                        <>
                          <Button
                            variant={theme === 'light' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('light')}
                            className="flex-1"
                          >
                            <Sun className="mr-2 h-4 w-4" />
                            {t('light')}
                          </Button>
                          <Button
                            variant={theme === 'dark' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('dark')}
                            className="flex-1"
                          >
                            <Moon className="mr-2 h-4 w-4" />
                            {t('dark')}
                          </Button>
                          <Button
                            variant={theme === 'system' ? 'default' : 'outline'}
                            size="sm"
                            onClick={() => setTheme('system')}
                            className="flex-1"
                          >
                            <Monitor className="mr-2 h-4 w-4" />
                            {t('system')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Role */}
                <div className="pt-4 border-t">
                  <Label className="text-sm text-muted-foreground">{tRoles('user') === 'User' ? 'Role' : 'Rôle'}</Label>
                  <div className="mt-1">
                    <span
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium"
                      style={accentColor ? {
                        backgroundColor: `${accentColor}15`,
                        color: accentColor
                      } : undefined}
                    >
                      {user.role}
                    </span>
                  </div>
                </div>

                {user.role === 'PRO' && (
                  <div>
                    <Label className="text-sm text-muted-foreground">{t('proStatus')}</Label>
                    <p className="mt-1 text-sm font-medium">
                      {user.proStatus || '—'}
                    </p>
                    {user.proStatus === 'PENDING' && (
                      <p className="text-xs text-muted-foreground">
                        {t('pendingProStatus')}
                      </p>
                    )}
                  </div>
                )}

                {user.role === 'USER' && (
                  <div className="rounded-lg border border-dashed border-primary/30 bg-primary/5 p-4 space-y-3">
                    <div>
                      <h4 className="text-sm font-semibold">{t('becomePro')}</h4>
                      <p className="text-sm text-muted-foreground">
                        {t('becomeProDescription')}
                      </p>
                    </div>
                    <Button
                      onClick={handleBecomePro}
                      disabled={becomingPro}
                      className="w-full"
                    >
                      {becomingPro ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          {tCommon('loading')}
                        </>
                      ) : (
                        t('becomePro')
                      )}
                    </Button>
                  </div>
                )}

                {user.role === 'PRO' && user.proStatus === 'PENDING' && (
                  <div className="rounded-lg border border-yellow-500/30 bg-yellow-500/10 p-4 space-y-3">
                    <p className="text-sm text-yellow-900 dark:text-yellow-200">
                      {t('pendingProStatus')}
                    </p>
                    <Button variant="outline" asChild size="sm" className="w-full">
                      <Link href="/dashboard/subscription">
                        {t('goToSubscription')}
                      </Link>
                    </Button>
                  </div>
                )}

                <div>
                  <Label className="text-sm text-muted-foreground">{t('userId')}</Label>
                  <p className="mt-1 text-sm font-mono text-muted-foreground">
                    {user.id}
                  </p>
                </div>

                <div>
                  <Label className="text-sm text-muted-foreground">{tRoles('user') === 'User' ? 'Organizations' : 'Organisations'}</Label>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {user.organizationMemberships?.length || 0} {t('organizationsCount')}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="sport">
          <Card>
            <CardHeader>
              <CardTitle>{t('sportProfile')}</CardTitle>
              <CardDescription>
                {t('sportProfileDescription') || 'Manage your sport and training information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <UserProfileForm
                open={true}
                onOpenChange={() => { }}
                userId={user.id}
                type="SPORT"
                embedded={true}
                onSuccess={() => {
                  toast({
                    title: tCommon('success'),
                    description: t('sportProfileSuccess') || 'Sport profile updated successfully',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="nutrition">
          <Card>
            <CardHeader>
              <CardTitle>{t('nutritionProfile')}</CardTitle>
              <CardDescription>
                {t('nutritionProfileDescription') || 'Manage your nutrition information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <UserProfileForm
                open={true}
                onOpenChange={() => { }}
                userId={user.id}
                type="NUTRITION"
                embedded={true}
                onSuccess={() => {
                  toast({
                    title: tCommon('success'),
                    description: t('nutritionProfileSuccess') || 'Nutrition profile updated successfully',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="medical">
          <Card>
            <CardHeader>
              <CardTitle>{t('medicalProfile')}</CardTitle>
              <CardDescription>
                {t('medicalProfileDescription') || 'Manage your medical information (encrypted data)'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <UserProfileForm
                open={true}
                onOpenChange={() => { }}
                userId={user.id}
                type="MEDICAL"
                embedded={true}
                onSuccess={() => {
                  toast({
                    title: tCommon('success'),
                    description: t('medicalProfileSuccess') || 'Medical profile updated successfully',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="lifestyle">
          <Card>
            <CardHeader>
              <CardTitle>{t('lifestyleProfile')}</CardTitle>
              <CardDescription>
                {t('lifestyleProfileDescription') || 'Manage your lifestyle information'}
              </CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <UserProfileForm
                open={true}
                onOpenChange={() => { }}
                userId={user.id}
                type="LIFESTYLE"
                embedded={true}
                onSuccess={() => {
                  toast({
                    title: tCommon('success'),
                    description: t('lifestyleProfileSuccess') || 'Lifestyle profile updated successfully',
                  });
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
