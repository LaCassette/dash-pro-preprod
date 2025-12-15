'use client';
export const runtime = 'edge';

'use client';


/**
 * Page de gestion des organisations pour les utilisateurs USER.
 * 
 * Permet aux utilisateurs de:
 * - Voir leurs organisations
 * - Accepter des invitations
 * - Voir leurs demandes d'adhésion en attente
 * - Rechercher et demander à rejoindre de nouvelles organisations
 */

import { useEffect, useState, useMemo } from 'react';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { useToast } from '@/hooks/use-toast';
import { Building2, Mail, UserPlus, Check, X, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { getValidImageUrl } from '@/lib/image-utils';

interface Organization {
  id: string;
  name: string;
  logo: string | null;
  accentColor: string | null;
  owner: {
    id: string;
    name: string | null;
    email: string;
  };
  members: Array<{
    user: {
      id: string;
      name: string | null;
      email: string;
    };
  }>;
}

interface Invitation {
  id: string;
  email: string;
  status: 'PENDING' | 'ACCEPTED' | 'CANCELLED';
  organization: {
    id: string;
    name: string;
    logo: string | null;
    accentColor: string | null;
    owner?: {
      id: string;
      name: string | null;
      email: string;
    };
  };
  invitedBy: {
    id: string;
    name: string | null;
    email: string;
  };
  user?: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
  };
  createdAt: string;
}

interface Request {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  organization: {
    id: string;
    name: string;
    logo: string | null;
    accentColor: string | null;
  };
  createdAt: string;
}

export default function UserOrganizationsPage() {
  const { user } = useUser();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [requestDialogOpen, setRequestDialogOpen] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (user?.role === 'USER') {
      fetchData();
    }
  }, [user]);

  async function fetchData() {
    try {
      // Récupérer toutes les organisations (pour permettre la recherche)
      const [orgsResponse, invitationsResponse, requestsResponse] = await Promise.all([
        fetch('/api/organizations/public'),
        fetch('/api/invitations'),
        fetch('/api/requests'),
      ]);

      if (orgsResponse.ok) {
        const orgs = await orgsResponse.json();
        setOrganizations(orgs);
      }

      if (invitationsResponse.ok) {
        const invs = await invitationsResponse.json();
        setInvitations(invs);
      }

      if (requestsResponse.ok) {
        const reqs = await requestsResponse.json();
        setRequests(reqs);
      }
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

  async function handleAcceptInvitation(organizationId: string, invitationId: string) {
    try {
      const response = await fetch(
        `/api/organizations/${organizationId}/invitations/${invitationId}`,
        {
          method: 'POST',
        }
      );

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to accept');
      }

      toast({
        title: 'Succès',
        description: 'Invitation acceptée avec succès',
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'accepter l\'invitation',
        variant: 'destructive',
      });
    }
  }

  async function handleRequestJoin(organizationId: string) {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/request`, {
        method: 'POST',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to request');
      }

      toast({
        title: 'Succès',
        description: 'Demande envoyée avec succès',
      });
      setRequestDialogOpen(null);
      fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'envoyer la demande',
        variant: 'destructive',
      });
    }
  }

  // Filtrer les organisations dont l'utilisateur est membre
  // La structure members peut être Array<{ user: { id } }> ou Array<{ userId }>
  // Utiliser useMemo pour optimiser les calculs
  // IMPORTANT: Tous les hooks doivent être appelés avant tout return conditionnel
  const myOrganizations = useMemo(() => {
    if (!user) return [];
    return organizations.filter((org) => {
      // Vérifier si l'utilisateur est le propriétaire
      if (org.owner.id === user.id) return true;
      // Vérifier si l'utilisateur est membre
      return org.members.some((m: any) => {
        // Support des deux structures possibles (API peut retourner différentes structures)
        if (m.user?.id) return m.user.id === user.id;
        if (m.userId) return m.userId === user.id;
        return false;
      });
    });
  }, [organizations, user]);

  const pendingInvitations = useMemo(() => {
    if (!user) return [];
    return invitations.filter(
      (inv) =>
        inv.status === 'PENDING' &&
        (inv.email === user.email || inv.user?.id === user.id)
    );
  }, [invitations, user]);

  const pendingRequests = useMemo(() => {
    if (!user) return [];
    return requests.filter((req) => req.status === 'PENDING');
  }, [requests, user]);

  // Filtrer les organisations disponibles (non membres, pas de demande en attente, pas d'invitation)
  const availableOrganizations = useMemo(() => {
    if (!user) return [];
    return organizations.filter((org) => {
      // Exclure si l'utilisateur est déjà membre
      const isMember =
        org.owner.id === user.id ||
        org.members.some((m: any) => {
          if (m.user?.id) return m.user.id === user.id;
          if (m.userId) return m.userId === user.id;
          return false;
        });
      if (isMember) return false;

      // Exclure si une demande est en attente
      const hasPendingRequest = pendingRequests.some(
        (req) => req.organization.id === org.id && req.status === 'PENDING'
      );
      if (hasPendingRequest) return false;

      // Exclure si une invitation est en attente
      const hasPendingInvitation = pendingInvitations.some(
        (inv) => inv.organization.id === org.id && inv.status === 'PENDING'
      );
      if (hasPendingInvitation) return false;

      // Filtrer par terme de recherche
      return org.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
  }, [organizations, user, pendingRequests, pendingInvitations, searchTerm]);

  // Vérification d'accès après tous les hooks
  if (user?.role !== 'USER') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Cette page est réservée aux utilisateurs.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Mes Organisations</h1>
        <p className="text-muted-foreground">
          Gérez vos organisations, invitations et demandes d'adhésion
        </p>
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="space-y-6">
          {/* Mes organisations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="h-5 w-5" />
                Mes Organisations ({myOrganizations.length})
              </CardTitle>
              <CardDescription>
                Organisations dont vous êtes membre
              </CardDescription>
            </CardHeader>
            <CardContent>
              {myOrganizations.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {myOrganizations.map((org) => (
                    <Card key={org.id}>
                      <CardHeader>
                        <CardTitle>{org.name}</CardTitle>
                        <CardDescription>
                          Propriétaire: {org.owner.name || org.owner.email}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <UserPlus className="h-4 w-4" />
                          {/* Compter les membres (structure peut varier) */}
                          {org.members.length > 0
                            ? `${org.members.length} membre${org.members.length > 1 ? 's' : ''}`
                            : 'Aucun membre'}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Vous n'êtes membre d'aucune organisation pour le moment.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Invitations en attente */}
          {pendingInvitations.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Mail className="h-5 w-5" />
                  Invitations en attente ({pendingInvitations.length})
                </CardTitle>
                <CardDescription>
                  Invitations que vous avez reçues
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingInvitations.map((invitation) => (
                    <div
                      key={invitation.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {getValidImageUrl(invitation.organization.logo) && (
                          <img
                            src={getValidImageUrl(invitation.organization.logo)!}
                            alt={invitation.organization.name}
                            className="w-12 h-12 rounded object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <div className="font-medium">{invitation.organization.name}</div>
                          <div className="text-sm text-muted-foreground">
                            Invité par {invitation.invitedBy.name || invitation.invitedBy.email}
                          </div>
                        </div>
                      </div>
                      <Button
                        onClick={() =>
                          handleAcceptInvitation(invitation.organization.id, invitation.id)
                        }
                      >
                        <Check className="mr-2 h-4 w-4" />
                        Accepter
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Demandes en attente */}
          {pendingRequests.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="h-5 w-5" />
                  Demandes en attente ({pendingRequests.length})
                </CardTitle>
                <CardDescription>
                  Demandes d'adhésion en attente de validation
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        {getValidImageUrl(request.organization.logo) && (
                          <img
                            src={getValidImageUrl(request.organization.logo)!}
                            alt={request.organization.name}
                            className="w-12 h-12 rounded object-contain"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.style.display = 'none';
                            }}
                          />
                        )}
                        <div>
                          <div className="font-medium">{request.organization.name}</div>
                          <div className="text-sm text-muted-foreground">
                            En attente de validation
                          </div>
                        </div>
                      </div>
                      <Badge variant="outline">En attente</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {/* Organisations disponibles */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Search className="h-5 w-5" />
                Organisations disponibles
              </CardTitle>
              <CardDescription>
                Recherchez et demandez à rejoindre une organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  placeholder="Rechercher une organisation..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {availableOrganizations.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {availableOrganizations.map((org) => {
                    const hasPendingRequest = pendingRequests.some(
                      (req) => req.organization.id === org.id && req.status === 'PENDING'
                    );
                    const isMember = myOrganizations.some((o) => o.id === org.id);

                    return (
                      <Card key={org.id}>
                        <CardHeader>
                          <div className="flex items-center gap-3">
                            {getValidImageUrl(org.logo) && (
                              <img
                                src={getValidImageUrl(org.logo)!}
                                alt={org.name}
                                className="w-10 h-10 rounded object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                }}
                              />
                            )}
                            <CardTitle className="flex-1">{org.name}</CardTitle>
                          </div>
                          <CardDescription>
                            Propriétaire: {org.owner.name || org.owner.email}
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <div className="space-y-3">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <UserPlus className="h-4 w-4" />
                              {org.members.length} membre{org.members.length > 1 ? 's' : ''}
                            </div>
                            {isMember ? (
                              <Badge>Membre</Badge>
                            ) : hasPendingRequest ? (
                              <Badge variant="outline">Demande envoyée</Badge>
                            ) : (
                              <Dialog
                                open={requestDialogOpen === org.id}
                                onOpenChange={(open) =>
                                  setRequestDialogOpen(open ? org.id : null)
                                }
                              >
                                <DialogTrigger asChild>
                                  <Button variant="outline" className="w-full">
                                    <UserPlus className="mr-2 h-4 w-4" />
                                    Demander à rejoindre
                                  </Button>
                                </DialogTrigger>
                                <DialogContent>
                                  <DialogHeader>
                                    <DialogTitle>Demander à rejoindre</DialogTitle>
                                    <DialogDescription>
                                      Voulez-vous demander à rejoindre "{org.name}" ?
                                    </DialogDescription>
                                  </DialogHeader>
                                  <div className="flex justify-end gap-2">
                                    <Button
                                      variant="outline"
                                      onClick={() => setRequestDialogOpen(null)}
                                    >
                                      Annuler
                                    </Button>
                                    <Button onClick={() => handleRequestJoin(org.id)}>
                                      Envoyer la demande
                                    </Button>
                                  </div>
                                </DialogContent>
                              </Dialog>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  {searchTerm
                    ? 'Aucune organisation trouvée'
                    : 'Aucune organisation disponible'}
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

