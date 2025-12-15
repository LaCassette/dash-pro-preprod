'use client';
export const runtime = 'edge';

'use client';


import { useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useOrganization } from '@/hooks/use-organization';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, RefreshCw } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SidebarTrigger } from '@/components/ui/sidebar';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

export default function MigrateProgramsPage() {
  const { user } = useUser();
  const { organizations } = useOrganization();
  const { toast } = useToast();
  const [selectedOrgId, setSelectedOrgId] = useState<string>('');
  const [migrating, setMigrating] = useState(false);
  const [result, setResult] = useState<{ updated: number; message: string } | null>(null);

  async function handleMigrate() {
    if (!selectedOrgId) {
      toast({
        title: 'Erreur',
        description: 'Veuillez sélectionner une organisation',
        variant: 'destructive',
      });
      return;
    }

    setMigrating(true);
    setResult(null);

    try {
      const response = await fetch('/api/programs/migrate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          organizationId: selectedOrgId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to migrate programs');
      }

      const data = await response.json();
      setResult(data);

      toast({
        title: 'Succès',
        description: data.message,
      });
    } catch (error) {
      console.error('Error migrating programs:', error);
      toast({
        title: 'Erreur',
        description: error instanceof Error ? error.message : 'Impossible de migrer les programmes',
        variant: 'destructive',
      });
    } finally {
      setMigrating(false);
    }
  }

  if (user?.role !== 'PRO') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>Accès refusé</CardTitle>
            <CardDescription>
              Cette page est réservée aux professionnels
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="flex items-center gap-2 mb-6">
        <SidebarTrigger />
        <div>
          <h1 className="text-3xl font-bold">Migration des programmes</h1>
          <p className="text-muted-foreground">
            Migrez vos programmes existants vers une organisation
          </p>
        </div>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle>Migrer les programmes</CardTitle>
          <CardDescription>
            Cette action va associer tous vos programmes sans organisation à l'organisation sélectionnée.
            Les programmes existants avec une organisation ne seront pas modifiés.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Organisation cible</label>
            <Select value={selectedOrgId} onValueChange={setSelectedOrgId}>
              <SelectTrigger>
                <SelectValue placeholder="Sélectionner une organisation" />
              </SelectTrigger>
              <SelectContent>
                {organizations.map((org) => (
                  <SelectItem key={org.id} value={org.id}>
                    {org.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button
            onClick={handleMigrate}
            disabled={!selectedOrgId || migrating}
            className="w-full"
          >
            {migrating ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Migration en cours...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" />
                Migrer les programmes
              </>
            )}
          </Button>

          {result && (
            <div className="p-4 bg-muted rounded-lg">
              <p className="text-sm font-medium">Résultat de la migration</p>
              <p className="text-sm text-muted-foreground mt-1">{result.message}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

