'use client';
export const runtime = 'edge';


/**
 * Page de détail d'une organisation.
 * 
 * Permet de:
 * - Voir les membres de l'organisation
 * - Pour les PROs propriétaires: inviter des utilisateurs, gérer les invitations et demandes
 * - Pour les USERs: demander à rejoindre l'organisation, accepter des invitations
 */

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
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
import { useToast } from '@/hooks/use-toast';
import { Building2, Users, Mail, UserPlus, Check, X, ArrowLeft } from 'lucide-react';

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
      role: string;
    };
  }>;
}

interface Invitation {
  id: string;
  email: string;
  status: 'PENDING' | 'ACCEPTED' | 'CANCELLED';
  user: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
  } | null;
  createdAt: string;
}

interface Request {
  id: string;
  status: 'PENDING' | 'APPROVED' | 'REJECTED';
  user: {
    id: string;
    name: string | null;
    email: string;
    picture: string | null;
  };
  createdAt: string;
}

export default function OrganizationDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user } = useUser();
  const [organization, setOrganization] = useState<Organization | null>(null);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [inviteOpen, setInviteOpen] = useState(false);
  const [requestOpen, setRequestOpen] = useState(false);
  const [inviteEmail, setInviteEmail] = useState('');
  const [processingRequest, setProcessingRequest] = useState<string | null>(null);
  const [confirmAction, setConfirmAction] = useState<{ requestId: string; action: 'approve' | 'reject' } | null>(null);
  const { toast } = useToast();

  const organizationId = params.id as string;
  const isPro = user?.role === 'PRO';
  const isOwner = organization?.owner.id === user?.id;

  useEffect(() => {
    if (user) {
      fetchData();
    }
  }, [user, organizationId]);

  async function fetchData() {
    try {
      // D'abord récupérer l'organisation pour vérifier si l'utilisateur est propriétaire
      const orgResponse = await fetch(`/api/organizations/${organizationId}`);
      
      if (!orgResponse.ok) throw new Error('Failed to fetch organization');
      const org = await orgResponse.json();
      setOrganization(org);

      // Vérifier si l'utilisateur est propriétaire après avoir récupéré l'organisation
      const userIsOwner = org.owner.id === user?.id;
      const userIsPro = user?.role === 'PRO';

      // Récupérer les invitations et demandes en parallèle si l'utilisateur est PRO
      const promises: Promise<Response | null>[] = [];
      
      if (userIsPro) {
        promises.push(fetch(`/api/organizations/${organizationId}/invitations`));
      } else {
        promises.push(Promise.resolve(null));
      }

      if (userIsPro && userIsOwner) {
        promises.push(fetch(`/api/organizations/${organizationId}/requests`));
      } else {
        promises.push(Promise.resolve(null));
      }

      const [invitationsResponse, requestsResponse] = await Promise.all(promises);

      if (invitationsResponse) {
        if (invitationsResponse.ok) {
          const invs = await invitationsResponse.json();
          setInvitations(invs);
        }
      }

      if (requestsResponse) {
        if (requestsResponse.ok) {
          const reqs = await requestsResponse.json();
          console.log('Requests fetched:', reqs);
          setRequests(reqs);
        } else {
          console.error('Failed to fetch requests:', requestsResponse.status, await requestsResponse.text());
        }
      } else {
        console.log('Requests not fetched - userIsPro:', userIsPro, 'userIsOwner:', userIsOwner);
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les données',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleInvite() {
    if (!inviteEmail.trim()) {
      toast({
        title: 'Erreur',
        description: 'Veuillez entrer un email',
        variant: 'destructive',
      });
      return;
    }

    // Validation basique de l'email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(inviteEmail)) {
      toast({
        title: 'Erreur',
        description: 'Format d\'email invalide',
        variant: 'destructive',
      });
      return;
    }

    try {
      const response = await fetch(`/api/organizations/${organizationId}/invite`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: inviteEmail.trim() }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to invite');
      }

      toast({
        title: 'Succès',
        description: 'Invitation envoyée',
      });
      setInviteEmail('');
      setInviteOpen(false);
      fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'envoyer l\'invitation',
        variant: 'destructive',
      });
    }
  }

  async function handleRequest() {
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
        description: 'Demande envoyée',
      });
      setRequestOpen(false);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible d\'envoyer la demande',
        variant: 'destructive',
      });
    }
  }

  async function handleAcceptInvitation(invitationId: string) {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/invitations/${invitationId}`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to accept');
      toast({
        title: 'Succès',
        description: 'Invitation acceptée',
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'accepter l\'invitation',
        variant: 'destructive',
      });
    }
  }

  async function handleCancelInvitation(invitationId: string) {
    try {
      const response = await fetch(`/api/organizations/${organizationId}/invitations/${invitationId}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to cancel');
      toast({
        title: 'Succès',
        description: 'Invitation annulée',
      });
      fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible d\'annuler l\'invitation',
        variant: 'destructive',
      });
    }
  }

  async function handleRequestAction(requestId: string, action: 'approve' | 'reject') {
    setProcessingRequest(requestId);
    try {
      const response = await fetch(`/api/organizations/${organizationId}/requests/${requestId}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to process request');
      }
      
      toast({
        title: 'Succès',
        description: action === 'approve' 
          ? 'La demande a été approuvée et l\'utilisateur a été ajouté à l\'organisation'
          : 'La demande a été rejetée',
      });
      
      // Rafraîchir les données
      await fetchData();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de traiter la demande',
        variant: 'destructive',
      });
    } finally {
      setProcessingRequest(null);
      setConfirmAction(null);
    }
  }

  function handleRequestActionClick(requestId: string, action: 'approve' | 'reject') {
    setConfirmAction({ requestId, action });
  }

  // Utiliser useMemo pour optimiser les calculs
  // IMPORTANT: Tous les hooks doivent être appelés avant tout return conditionnel
  const pendingInvitations = useMemo(
    () => invitations.filter((i) => i.status === 'PENDING'),
    [invitations]
  );
  const pendingRequests = useMemo(() => {
    const filtered = requests.filter((r) => r.status === 'PENDING');
    console.log('All requests:', requests);
    console.log('Pending requests:', filtered);
    return filtered;
  }, [requests]);
  
  // Filtrer les invitations de l'utilisateur (pour les USERs)
  const myInvitations = useMemo(() => {
    if (!user || user.role !== 'USER') return [];
    return pendingInvitations.filter(
      (i) => i.email === user.email || i.user?.id === user.id
    );
  }, [pendingInvitations, user]);

  // Vérifications après tous les hooks
  if (loading) {
    return <div className="container mx-auto p-6">Chargement...</div>;
  }

  if (!organization) {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Organisation introuvable</CardTitle>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <Button
        variant="ghost"
        onClick={() => router.push('/dashboard/organizations')}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Retour
      </Button>

      <div className="mb-6">
        <h1 className="text-3xl font-bold">{organization.name}</h1>
        <p className="text-muted-foreground">Gestion des membres et invitations</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Membres */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Membres ({organization.members.length})
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {organization.members.map((member) => (
              <div key={member.user.id} className="flex items-center justify-between p-2 border rounded">
                <div>
                  <div className="font-medium">{member.user.name || member.user.email}</div>
                  <div className="text-sm text-muted-foreground">{member.user.email}</div>
                </div>
                <Badge variant="outline">{member.user.role}</Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            {isPro && isOwner && (
              <Dialog open={inviteOpen} onOpenChange={setInviteOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full">
                    <UserPlus className="mr-2 h-4 w-4" />
                    Inviter un utilisateur
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Inviter un utilisateur</DialogTitle>
                    <DialogDescription>
                      Entrez l'email de l'utilisateur à inviter
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        type="email"
                        value={inviteEmail}
                        onChange={(e) => setInviteEmail(e.target.value)}
                        placeholder="user@example.com"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" onClick={() => setInviteOpen(false)}>
                        Annuler
                      </Button>
                      <Button onClick={handleInvite}>Inviter</Button>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
            )}

            {user?.role === 'USER' && !organization.members.some((m) => m.user.id === user.id) && (
              <Dialog open={requestOpen} onOpenChange={setRequestOpen}>
                <DialogTrigger asChild>
                  <Button variant="outline" className="w-full">
                    <Mail className="mr-2 h-4 w-4" />
                    Demander à rejoindre
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Demander à rejoindre</DialogTitle>
                    <DialogDescription>
                      Voulez-vous demander à rejoindre cette organisation ?
                    </DialogDescription>
                  </DialogHeader>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline" onClick={() => setRequestOpen(false)}>
                      Annuler
                    </Button>
                    <Button onClick={handleRequest}>Envoyer la demande</Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </CardContent>
        </Card>

        {/* Invitations en attente (PRO seulement) */}
        {isPro && isOwner && pendingInvitations.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Mail className="h-5 w-5" />
                Invitations en attente ({pendingInvitations.length})
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {pendingInvitations.map((invitation) => (
                <div key={invitation.id} className="flex items-center justify-between p-2 border rounded">
                  <div>
                    <div className="font-medium">{invitation.user?.name || invitation.email}</div>
                    <div className="text-sm text-muted-foreground">{invitation.email}</div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCancelInvitation(invitation.id)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        )}

        {/* Demandes en attente (PRO seulement) */}
        {isPro && isOwner && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <UserPlus className="h-5 w-5" />
                Demandes d'adhésion ({pendingRequests.length})
              </CardTitle>
              <CardDescription>
                Gérez les demandes des utilisateurs souhaitant rejoindre votre organisation
              </CardDescription>
            </CardHeader>
            <CardContent>
              {pendingRequests.length > 0 ? (
                <div className="space-y-3">
                  {pendingRequests.map((request) => (
                    <div
                      key={request.id}
                      className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex-1">
                        <div className="font-medium">{request.user.name || request.user.email}</div>
                        <div className="text-sm text-muted-foreground">{request.user.email}</div>
                        {request.createdAt && (
                          <div className="text-xs text-muted-foreground mt-1">
                            Demandé le {new Date(request.createdAt).toLocaleDateString('fr-FR', {
                              day: 'numeric',
                              month: 'long',
                              year: 'numeric',
                            })}
                          </div>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="default"
                          size="sm"
                          onClick={() => handleRequestActionClick(request.id, 'approve')}
                          disabled={processingRequest === request.id}
                          className="gap-2"
                        >
                          {processingRequest === request.id ? (
                            <>Chargement...</>
                          ) : (
                            <>
                              <Check className="h-4 w-4" />
                              Accepter
                            </>
                          )}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRequestActionClick(request.id, 'reject')}
                          disabled={processingRequest === request.id}
                          className="gap-2"
                        >
                          {processingRequest === request.id ? (
                            <>Chargement...</>
                          ) : (
                            <>
                              <X className="h-4 w-4" />
                              Refuser
                            </>
                          )}
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <UserPlus className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>Aucune demande en attente</p>
                  <p className="text-sm mt-2">
                    Les utilisateurs peuvent demander à rejoindre votre organisation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        )}

        {/* Mes invitations (USER seulement) */}
        {user?.role === 'USER' && (
          <Card>
            <CardHeader>
              <CardTitle>Mes invitations</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {myInvitations.length > 0 ? (
                myInvitations.map((invitation) => (
                  <div key={invitation.id} className="flex items-center justify-between p-2 border rounded">
                    <div>
                      <div className="font-medium">{organization.name}</div>
                      <div className="text-sm text-muted-foreground">Invitation en attente</div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleAcceptInvitation(invitation.id)}
                    >
                      Accepter
                    </Button>
                  </div>
                ))
              ) : (
                <p className="text-sm text-muted-foreground">Aucune invitation</p>
              )}
            </CardContent>
          </Card>
        )}
      </div>

      {/* Dialog de confirmation pour accepter/refuser */}
      <AlertDialog open={!!confirmAction} onOpenChange={(open) => !open && setConfirmAction(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {confirmAction?.action === 'approve' ? 'Accepter la demande' : 'Refuser la demande'}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {confirmAction?.action === 'approve' ? (
                <>
                  Êtes-vous sûr de vouloir accepter cette demande ? L'utilisateur sera ajouté comme membre de votre organisation.
                </>
              ) : (
                <>
                  Êtes-vous sûr de vouloir refuser cette demande ? Cette action ne peut pas être annulée.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (confirmAction) {
                  handleRequestAction(confirmAction.requestId, confirmAction.action);
                }
              }}
              className={confirmAction?.action === 'reject' ? 'bg-destructive text-destructive-foreground hover:bg-destructive/90' : ''}
            >
              {confirmAction?.action === 'approve' ? 'Accepter' : 'Refuser'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

