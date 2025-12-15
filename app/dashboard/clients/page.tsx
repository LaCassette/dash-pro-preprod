'use client';
export const runtime = 'edge';

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
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Users,
  Plus,
  Dumbbell,
  Apple,
  MessageSquare,
  Search,
  Filter,
  FileText,
  Mail,
  AlertTriangle
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { UserProfileForm } from '@/components/dashboard/user-profile-form';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ProgramGeneratorForm } from '@/components/dashboard/program-generator-form';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Organization {
  id: string;
  name: string;
  accentColor: string | null;
  members: Array<{
    user: {
      id: string;
      name: string | null;
      email: string;
      role: string;
    };
  }>;
}

interface Program {
  id: string;
  name: string;
  description: string | null;
  type: 'SPORT' | 'NUTRITION';
  createdAt: string;
  user: {
    id: string;
    name: string | null;
    email: string;
  } | null;
  organization: {
    id: string;
    name: string;
    accentColor: string | null;
  } | null;
}

interface Client {
  id: string;
  name: string | null;
  email: string;
  programs: Program[];
  organization: Organization | null;
}

export default function ClientsPage() {
  const { user } = useUser();
  const { activeOrganization, getAccentColor } = useOrganization();
  const { subscription } = useSubscription();
  const { theme } = useTheme();
  const router = useRouter();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [programs, setPrograms] = useState<Program[]>([]);
  const [clients, setClients] = useState<Client[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'SPORT' | 'NUTRITION'>('all');
  const [selectedOrgFilter, setSelectedOrgFilter] = useState<string>('all');
  const [createProgramOpen, setCreateProgramOpen] = useState(false);
  const [programType, setProgramType] = useState<'SPORT' | 'NUTRITION'>('SPORT');
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string | null>(null);
  const [profileType, setProfileType] = useState<'SPORT' | 'NUTRITION'>('SPORT');
  const [sendingMessage, setSendingMessage] = useState<string | null>(null);
  const [showExportAlert, setShowExportAlert] = useState(false);
  const { toast } = useToast();

  const isDark = theme === 'dark';
  const accentColor = getAccentColor(isDark);

  // Vérifier si le PRO a un abonnement actif (TRIAL ou ACTIVE)
  const hasActiveSubscription = subscription &&
    (subscription.status === 'TRIAL' || subscription.status === 'ACTIVE');

  useEffect(() => {
    // Vérifier si l'alerte d'export a déjà été affichée
    const hasSeenAlert = localStorage.getItem('hasSeenExportAlert');
    if (!hasSeenAlert && user?.role === 'PRO') {
      setShowExportAlert(true);
      localStorage.setItem('hasSeenExportAlert', 'true');
    }
  }, [user]);

  useEffect(() => {
    if (user?.role === 'PRO') {
      fetchData();
    }
  }, [user, activeOrganization]);

  async function fetchData() {
    try {
      const [orgsResponse, programsResponse] = await Promise.all([
        fetch('/api/organizations'),
        fetch(`/api/programs${activeOrganization ? `?organizationId=${activeOrganization.id}` : ''}`),
      ]);

      if (!orgsResponse.ok || !programsResponse.ok) throw new Error('Failed to fetch');

      const orgs = await orgsResponse.json();
      const progs = await programsResponse.json();

      setOrganizations(orgs);
      setPrograms(progs);

      // Construire la liste des clients avec leurs programmes et organisations
      const clientsMap = new Map<string, Client>();

      orgs.forEach((org: Organization) => {
        org.members.forEach((member) => {
          const memberUser = member.user;
          if (memberUser.id !== user?.id && memberUser.role === 'USER') {
            if (!clientsMap.has(memberUser.id)) {
              clientsMap.set(memberUser.id, {
                id: memberUser.id,
                name: memberUser.name,
                email: memberUser.email,
                programs: [],
                organization: org,
              });
            }
          }
        });
      });

      // Ajouter les programmes à chaque client
      progs.forEach((prog: Program) => {
        if (prog.user) {
          const client = clientsMap.get(prog.user.id);
          if (client) {
            client.programs.push(prog);
          }
        }
      });

      setClients(Array.from(clientsMap.values()));
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  const filteredClients = clients.filter((client) => {
    const matchesSearch =
      client.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesOrg = selectedOrgFilter === 'all' || client.organization?.id === selectedOrgFilter;

    if (filterType === 'all') {
      return matchesSearch && matchesOrg;
    }

    const hasProgramType = client.programs.some((p) => p.type === filterType);
    return matchesSearch && matchesOrg && hasProgramType;
  });

  async function handleSendMessage(clientId: string) {
    setSendingMessage(clientId);
    try {
      const response = await fetch('/api/chats/direct', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: clientId }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create chat');
      }

      const chat = await response.json();
      router.push(`/dashboard/messaging?chatId=${chat.id}`);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de créer la conversation',
        variant: 'destructive',
      });
    } finally {
      setSendingMessage(null);
    }
  }


  if (user?.role !== 'PRO') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Cette page est réservée aux professionnels.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  const totalClients = clients.length;
  const totalPrograms = programs.length;
  const sportPrograms = programs.filter((p) => p.type === 'SPORT').length;
  const nutritionPrograms = programs.filter((p) => p.type === 'NUTRITION').length;

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Alerte d'export */}
      <AlertDialog open={showExportAlert} onOpenChange={setShowExportAlert}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Restrictions d'exportation
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>
                En tant que professionnel, vous n'avez <strong>pas le droit</strong> d'exporter ou d'externaliser les contacts de vos clients en dehors de la plateforme Atletia.
              </p>
              <p>
                Cette restriction est en place pour protéger la confidentialité et la sécurité des données de vos clients, conformément au RGPD et à nos conditions d'utilisation.
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Toute violation de cette règle peut entraîner la suspension de votre compte professionnel.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowExportAlert(false)}>
              J'ai compris
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <SidebarTrigger />
          <div>
            <h1
              className="text-3xl font-bold"
              style={{ color: accentColor }}
            >
              Gestion des Clients
            </h1>
            <p className="text-muted-foreground">
              Gérez vos clients et leurs programmes personnalisés
            </p>
          </div>
        </div>
        {hasActiveSubscription ? (
          <Dialog open={createProgramOpen} onOpenChange={setCreateProgramOpen}>
            <DialogTrigger asChild>
              <Button style={{ backgroundColor: accentColor, color: isDark ? '#020617' : '#f8fafc' }}>
                <Plus className="mr-2 h-4 w-4" />
                Créer un programme
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Créer un nouveau programme</DialogTitle>
                <DialogDescription>
                  Générez un programme sportif ou nutritionnel personnalisé pour votre client
                </DialogDescription>
              </DialogHeader>
              <div className="mb-4">
                <Select value={programType} onValueChange={(v) => setProgramType(v as 'SPORT' | 'NUTRITION')}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="SPORT">Programme Sportif</SelectItem>
                    <SelectItem value="NUTRITION">Programme Nutritionnel</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <ProgramGeneratorForm
                open={createProgramOpen}
                onOpenChange={setCreateProgramOpen}
                type={programType}
                onSuccess={() => {
                  setCreateProgramOpen(false);
                  fetchData();
                }}
              />
            </DialogContent>
          </Dialog>
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
            Créer un programme
          </Button>
        )}
      </div>

      {/* Statistiques */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Clients</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalClients}</div>
            <p className="text-xs text-muted-foreground">
              {filteredClients.length} affichés
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Programmes</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalPrograms}</div>
            <p className="text-xs text-muted-foreground">
              Tous types confondus
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmes Sport</CardTitle>
            <Dumbbell className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{sportPrograms}</div>
            <p className="text-xs text-muted-foreground">
              {totalPrograms > 0 ? Math.round((sportPrograms / totalPrograms) * 100) : 0}% du total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Programmes Nutrition</CardTitle>
            <Apple className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nutritionPrograms}</div>
            <p className="text-xs text-muted-foreground">
              {totalPrograms > 0 ? Math.round((nutritionPrograms / totalPrograms) * 100) : 0}% du total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filtres et recherche */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Rechercher un client par nom ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType} onValueChange={(v) => setFilterType(v as any)}>
              <SelectTrigger className="w-full md:w-[180px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type de programme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Tous les types</SelectItem>
                <SelectItem value="SPORT">Sport uniquement</SelectItem>
                <SelectItem value="NUTRITION">Nutrition uniquement</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedOrgFilter} onValueChange={setSelectedOrgFilter}>
              <SelectTrigger className="w-full md:w-[200px]">
                <SelectValue placeholder="Organisation" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Toutes les organisations</SelectItem>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Liste des clients */}
      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="text-muted-foreground">Chargement...</div>
        </div>
      ) : filteredClients.length === 0 ? (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <Users className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
              <h3 className="text-lg font-semibold mb-2">Aucun client trouvé</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedOrgFilter !== 'all' || filterType !== 'all'
                  ? 'Aucun client ne correspond à vos critères de recherche.'
                  : 'Vos clients apparaîtront ici une fois qu\'ils rejoindront vos organisations.'}
              </p>
            </div>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredClients.map((client) => {
            const clientOrg = client.organization;
            const clientAccentColor = clientOrg?.accentColor || accentColor;

            return (
              <Card
                key={client.id}
                className="hover:shadow-lg transition-shadow"
                style={{
                  borderLeft: `4px solid ${clientAccentColor}`,
                }}
              >
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full flex items-center justify-center text-white font-semibold"
                        style={{ backgroundColor: clientAccentColor }}
                      >
                        {client.name ? client.name.charAt(0).toUpperCase() : client.email.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <CardTitle className="text-lg">
                          {client.name || client.email.split('@')[0]}
                        </CardTitle>
                        <CardDescription className="flex items-center gap-1 mt-1">
                          <Mail className="h-3 w-3" />
                          {client.email}
                        </CardDescription>
                      </div>
                    </div>
                    {clientOrg && (
                      <Badge variant="outline" className="text-xs">
                        {clientOrg.name}
                      </Badge>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Statistiques du client */}
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      <FileText className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">Programmes:</span>
                      <span className="font-semibold">{client.programs.length}</span>
                    </div>
                    <div className="flex gap-1">
                      <Badge variant="outline" className="text-xs">
                        <Dumbbell className="h-3 w-3 mr-1" />
                        {client.programs.filter((p) => p.type === 'SPORT').length}
                      </Badge>
                      <Badge variant="outline" className="text-xs">
                        <Apple className="h-3 w-3 mr-1" />
                        {client.programs.filter((p) => p.type === 'NUTRITION').length}
                      </Badge>
                    </div>
                  </div>

                  {/* Liste des programmes */}
                  {client.programs.length > 0 && (
                    <ScrollArea className="h-32">
                      <div className="space-y-2">
                        {client.programs.slice(0, 3).map((program) => (
                          <div
                            key={program.id}
                            className="flex items-center justify-between p-2 rounded-md bg-muted/50 hover:bg-muted transition-colors cursor-pointer"
                            onClick={() => router.push(`/dashboard/programs/${program.id}`)}
                          >
                            <div className="flex items-center gap-2 flex-1 min-w-0">
                              {program.type === 'SPORT' ? (
                                <Dumbbell className="h-4 w-4 flex-shrink-0" style={{ color: clientAccentColor }} />
                              ) : (
                                <Apple className="h-4 w-4 flex-shrink-0" style={{ color: clientAccentColor }} />
                              )}
                              <span className="text-sm font-medium truncate">{program.name}</span>
                            </div>
                            <Badge variant="outline" className="text-xs ml-2">
                              {program.type}
                            </Badge>
                          </div>
                        ))}
                        {client.programs.length > 3 && (
                          <p className="text-xs text-muted-foreground text-center pt-1">
                            +{client.programs.length - 3} autre{client.programs.length - 3 > 1 ? 's' : ''}
                          </p>
                        )}
                      </div>
                    </ScrollArea>
                  )}

                  {/* Actions */}
                  <div className="flex flex-col gap-2 pt-2 border-t">
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setProfileType('SPORT');
                          setProfileOpen(true);
                        }}
                        className="text-xs"
                      >
                        <Dumbbell className="mr-1 h-3 w-3" />
                        Sport
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setSelectedClientId(client.id);
                          setProfileType('NUTRITION');
                          setProfileOpen(true);
                        }}
                        className="text-xs"
                      >
                        <Apple className="mr-1 h-3 w-3" />
                        Nutrition
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSendMessage(client.id)}
                      disabled={sendingMessage === client.id}
                      className="w-full"
                      style={{
                        borderColor: clientAccentColor,
                        color: clientAccentColor,
                      }}
                    >
                      <MessageSquare className="mr-2 h-4 w-4" />
                      {sendingMessage === client.id ? 'Création...' : 'Envoyer un message'}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      )}

      {/* Dialog pour les profils */}
      {selectedClientId && (
        <UserProfileForm
          open={profileOpen}
          onOpenChange={(open) => {
            setProfileOpen(open);
            if (!open) {
              setSelectedClientId(null);
            }
          }}
          userId={selectedClientId}
          type={profileType}
          onSuccess={() => {
            fetchData();
          }}
        />
      )}
    </div>
  );
}
