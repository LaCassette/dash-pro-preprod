'use client';
export const runtime = 'edge';

'use client';


import { useState, useEffect } from 'react';
import { useUser } from '@/hooks/use-user';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { UserCheck, UserX, Loader2, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface PendingPro {
  id: string;
  email: string;
  name: string | null;
  picture: string | null;
  createdAt: string;
  proStatus: 'PENDING' | 'ACTIVE' | 'REJECTED';
}

export default function ProsPage() {
  const { user } = useUser();
  const { toast } = useToast();
  const [pendingPros, setPendingPros] = useState<PendingPro[]>([]);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState<string | null>(null);

  useEffect(() => {
    if (user?.role === 'ADMIN') {
      fetchPendingPros();
    }
  }, [user]);

  const fetchPendingPros = async () => {
    try {
      const response = await fetch('/api/admin/pros');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setPendingPros(data);
    } catch (error) {
      console.error('Error fetching pending pros:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les professionnels en attente',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async (proId: string) => {
    setProcessing(proId);
    try {
      const response = await fetch(`/api/admin/pros/${proId}/approve`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to approve');
      
      toast({
        title: 'Succès',
        description: 'Le professionnel a été approuvé avec succès',
      });
      
      fetchPendingPros();
    } catch (error) {
      console.error('Error approving pro:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible d\'approuver le professionnel',
        variant: 'destructive',
      });
    } finally {
      setProcessing(null);
    }
  };

  const handleReject = async (proId: string) => {
    setProcessing(proId);
    try {
      const response = await fetch(`/api/admin/pros/${proId}/reject`, {
        method: 'POST',
      });
      
      if (!response.ok) throw new Error('Failed to reject');
      
      toast({
        title: 'Succès',
        description: 'Le professionnel a été rejeté',
      });
      
      fetchPendingPros();
    } catch (error) {
      console.error('Error rejecting pro:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de rejeter le professionnel',
        variant: 'destructive',
      });
    } finally {
      setProcessing(null);
    }
  };

  if (user?.role !== 'ADMIN') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Vous devez être administrateur pour accéder à cette page.
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="container mx-auto p-6">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
        </div>
      </div>
    );
  }

  const pending = pendingPros.filter((p) => p.proStatus === 'PENDING');
  const active = pendingPros.filter((p) => p.proStatus === 'ACTIVE');
  const rejected = pendingPros.filter((p) => p.proStatus === 'REJECTED');

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Validation des Professionnels</h1>
        <p className="text-muted-foreground">
          Validez ou rejetez les demandes d'accès professionnel
        </p>
      </div>

      <div className="grid gap-6">
        {/* En attente */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              <CardTitle>En attente ({pending.length})</CardTitle>
            </div>
            <CardDescription>
              Professionnels en attente de validation
            </CardDescription>
          </CardHeader>
          <CardContent>
            {pending.length === 0 ? (
              <p className="text-sm text-muted-foreground">
                Aucun professionnel en attente
              </p>
            ) : (
              <div className="space-y-4">
                {pending.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between rounded-lg border p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Avatar>
                        <AvatarImage src={pro.picture || undefined} />
                        <AvatarFallback>
                          {pro.name?.charAt(0).toUpperCase() || pro.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="font-semibold">{pro.name || 'Sans nom'}</p>
                        <p className="text-sm text-muted-foreground">{pro.email}</p>
                        <p className="text-xs text-muted-foreground mt-1">
                          Inscrit le {new Date(pro.createdAt).toLocaleDateString('fr-FR')}
                        </p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleReject(pro.id)}
                        disabled={processing === pro.id}
                      >
                        {processing === pro.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <UserX className="h-4 w-4 mr-2" />
                            Rejeter
                          </>
                        )}
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handleApprove(pro.id)}
                        disabled={processing === pro.id}
                      >
                        {processing === pro.id ? (
                          <Loader2 className="h-4 w-4 animate-spin" />
                        ) : (
                          <>
                            <UserCheck className="h-4 w-4 mr-2" />
                            Approuver
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Approuvés */}
        {active.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-green-500" />
                <CardTitle>Approuvés ({active.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {active.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={pro.picture || undefined} />
                        <AvatarFallback>
                          {pro.name?.charAt(0).toUpperCase() || pro.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{pro.name || 'Sans nom'}</p>
                        <p className="text-xs text-muted-foreground">{pro.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-50 text-green-700 border-green-200 dark:bg-green-950 dark:text-green-300 dark:border-green-800">
                      Actif
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Rejetés */}
        {rejected.length > 0 && (
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <XCircle className="h-5 w-5 text-red-500" />
                <CardTitle>Rejetés ({rejected.length})</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {rejected.map((pro) => (
                  <div
                    key={pro.id}
                    className="flex items-center justify-between rounded-lg border p-3"
                  >
                    <div className="flex items-center gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={pro.picture || undefined} />
                        <AvatarFallback>
                          {pro.name?.charAt(0).toUpperCase() || pro.email.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium">{pro.name || 'Sans nom'}</p>
                        <p className="text-xs text-muted-foreground">{pro.email}</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800">
                      Rejeté
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}

