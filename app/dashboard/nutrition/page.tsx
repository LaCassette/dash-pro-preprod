'use client';


import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { useSubscription } from '@/hooks/use-subscription';
import { useTheme } from 'next-themes';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Apple, Plus, MessageSquare, Eye, Edit, Building2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
import { ProgramGeneratorForm } from '@/components/dashboard/program-generator-form';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Loader2 } from 'lucide-react';

interface Program {
  id: string;
  name: string;
  description: string | null;
  type: 'SPORT' | 'NUTRITION';
  content: string;
  organizationId: string | null;
  organization: {
    id: string;
    name: string;
    accentColor: string | null;
  } | null;
  createdBy: {
    id: string;
    name: string | null;
    email: string;
  };
}

export default function NutritionPage() {
  const { user } = useUser();
  const { activeOrganization, setOrganization, organizations, getAccentColor } = useOrganization();
  const { subscription } = useSubscription();
  const { theme } = useTheme();
  const router = useRouter();
  const { toast } = useToast();
  const [programs, setPrograms] = useState<Program[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactingNutritionist, setContactingNutritionist] = useState<string | null>(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('all');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const accentColor = mounted ? getAccentColor(theme === 'dark') : undefined;

  // Vérifier si le PRO a un abonnement actif (TRIAL ou ACTIVE)
  const hasActiveSubscription = subscription &&
    (subscription.status === 'TRIAL' || subscription.status === 'ACTIVE');

  // Synchroniser le filtre avec l'organisation active de la sidebar
  useEffect(() => {
    if (activeOrganization) {
      setSelectedOrgFilter(activeOrganization.id);
    } else {
      setSelectedOrgFilter('all');
    }
  }, [activeOrganization]);

  useEffect(() => {
    if (user) {
      fetchPrograms();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, selectedOrgFilter]);

  async function fetchPrograms() {
    if (!user) return;

    setLoading(true);
    try {
      let url = '/api/programs?type=NUTRITION';

      // Si on filtre par organisation spécifique
      if (selectedOrgFilter && selectedOrgFilter !== 'all') {
        url += `&organizationId=${selectedOrgFilter}`;
      }
      // Si selectedOrgFilter === 'all', on ne passe pas organizationId pour voir tous les programmes

      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      // Filtrer pour ne garder que les programmes nutritionnels
      const nutritionPrograms = data.filter((p: Program) => p.type === 'NUTRITION');
      setPrograms(nutritionPrograms);
    } catch (error) {
      console.error('Error fetching programs:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les programmes',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  function handleOrgFilterChange(value: string) {
    setSelectedOrgFilter(value);
    if (value === 'all') {
      setOrganization(null);
    } else {
      const org = organizations.find((o) => o.id === value);
      if (org) {
        setOrganization(org);
      }
    }
  }

  async function handleContactNutritionist(nutritionistId: string) {
    setContactingNutritionist(nutritionistId);
    try {
      const response = await fetch('/api/chats/direct', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: nutritionistId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create chat');
      }

      const chat = await response.json();

      // Rediriger vers la messagerie avec le chat sélectionné
      router.push(`/dashboard/messaging?chatId=${chat.id}`);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de créer la conversation',
        variant: 'destructive',
      });
    } finally {
      setContactingNutritionist(null);
    }
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <SidebarTrigger />
            <div>
              <h1
                className="text-3xl font-bold"
                style={accentColor ? { color: accentColor } : undefined}
              >
                Ma Nutrition
              </h1>
              <p className="text-muted-foreground">
                Gérez vos programmes nutritionnels
              </p>
            </div>
          </div>
          {user?.role === 'PRO' && (
            hasActiveSubscription ? (
              <Button onClick={() => setIsFormOpen(true)}>
                <Plus className="mr-2 h-4 w-4" />
                Nouveau programme
              </Button>
            ) : (
              <Button
                disabled
                variant="outline"
                onClick={() => {
                  router.push('/dashboard/subscription');
                }}
                title="Un abonnement actif est requis pour créer des programmes"
              >
                <Plus className="mr-2 h-4 w-4" />
                Nouveau programme
              </Button>
            )
          )}
        </div>

        {/* Sélecteur d'organisation */}
        {organizations.length > 0 && (
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4 text-muted-foreground" />
            <Select value={selectedOrgFilter} onValueChange={handleOrgFilterChange}>
              <SelectTrigger className="w-[250px]">
                <SelectValue placeholder="Filtrer par organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous mes programmes</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            {selectedOrgFilter !== 'all' && (
              <Badge variant="outline" className="ml-2">
                {organizations.find((o) => o.id === selectedOrgFilter)?.name}
              </Badge>
            )}
          </div>
        )}
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-12">
          <Loader2 className="h-8 w-8 animate-spin" />
        </div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {programs.map((program) => {
            // Obtenir la couleur de bordure : priorité à l'organisation du programme
            let borderColor: string;
            if (program.organization?.accentColor) {
              // Si le programme a une organisation avec une couleur, utiliser cette couleur
              borderColor = program.organization.accentColor;
            } else if (program.organization) {
              // Si le programme a une organisation mais pas de couleur, utiliser la couleur par défaut selon le thème
              borderColor = theme === 'dark' ? '#f8fafc' : '#020617';
            } else {
              // Si le programme n'a pas d'organisation, utiliser la couleur de l'organisation active ou défaut
              borderColor = accentColor || (theme === 'dark' ? '#f8fafc' : '#020617');
            }

            return (
              <Card
                key={program.id}
                style={{
                  borderColor: borderColor,
                  borderWidth: '2px',
                }}
              >
                <CardHeader>
                  <div className="flex items-center gap-2">
                    <Apple className="h-5 w-5" />
                    <CardTitle>{program.name}</CardTitle>
                  </div>
                  <CardDescription>
                    {program.description || 'Programme nutritionnel'}
                    {program.organization && (
                      <span className="ml-2 text-xs">
                        • {program.organization.name}
                      </span>
                    )}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">Nutritionnel</Badge>
                      {program.organization && (
                        <Badge
                          variant="secondary"
                          className="text-xs"
                          style={program.organization.accentColor ? {
                            backgroundColor: `${program.organization.accentColor}15`,
                            color: program.organization.accentColor,
                          } : undefined}
                        >
                          {program.organization.name}
                        </Badge>
                      )}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="default"
                        size="sm"
                        className="flex-1"
                        onClick={() => router.push(`/dashboard/programs/${program.id}`)}
                      >
                        <Eye className="mr-2 h-4 w-4" />
                        Voir
                      </Button>
                      {user?.role === 'PRO' && user.id === program.createdBy.id && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => router.push(`/dashboard/programs/${program.id}/edit`)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                      )}
                      {user?.role === 'USER' && program.createdBy && (
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleContactNutritionist(program.createdBy.id)}
                          disabled={contactingNutritionist === program.createdBy.id}
                        >
                          <MessageSquare className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                    {user?.role === 'USER' && program.createdBy && (
                      <div className="text-sm text-muted-foreground">
                        Nutritionniste: {program.createdBy.name || program.createdBy.email}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {programs.length === 0 && !loading && (
            <div className="col-span-full">
              <Card>
                <CardHeader>
                  <CardTitle>Aucun programme</CardTitle>
                  <CardDescription>
                    {selectedOrgFilter === 'all'
                      ? 'Aucun programme nutritionnel disponible pour le moment'
                      : `Aucun programme nutritionnel pour l'organisation "${organizations.find((o) => o.id === selectedOrgFilter)?.name || 'sélectionnée'}"`}
                  </CardDescription>
                </CardHeader>
              </Card>
            </div>
          )}
        </div>
      )}

      <ProgramGeneratorForm
        open={isFormOpen}
        onOpenChange={setIsFormOpen}
        type="NUTRITION"
        onSuccess={() => {
          fetchPrograms();
        }}
      />


    </div>
  );
}
