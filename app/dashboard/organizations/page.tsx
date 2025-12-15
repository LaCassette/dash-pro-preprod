'use client';
export const runtime = 'edge';


import { useEffect, useState } from 'react';
import { useUser } from '@/hooks/use-user';
import { useTranslations } from 'next-intl';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Plus, Building2, Users, Edit, Trash2, Settings } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { Badge } from '@/components/ui/badge';
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
      role: string;
    };
  }>;
}

export default function OrganizationsPage() {
  const { user } = useUser();
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [editOrg, setEditOrg] = useState<Organization | null>(null);
  const [deleteOrg, setDeleteOrg] = useState<Organization | null>(null);
  const { toast } = useToast();
  const t = useTranslations('organizations');
  const tCommon = useTranslations('common');

  useEffect(() => {
    if (user?.role === 'PRO') {
      fetchOrganizations();
    }
  }, [user]);

  async function fetchOrganizations() {
    try {
      const response = await fetch('/api/organizations');
      if (!response.ok) throw new Error('Failed to fetch');
      const data = await response.json();
      setOrganizations(data);
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de charger les organisations',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!deleteOrg) return;

    try {
      const response = await fetch(`/api/organizations/${deleteOrg.id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete');
      toast({
        title: 'Succès',
        description: 'Organisation supprimée avec succès',
      });
      setDeleteOrg(null);
      fetchOrganizations();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de supprimer l\'organisation',
        variant: 'destructive',
      });
    }
  }

  if (user?.role !== 'PRO') {
    return (
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle>{t('accessDenied')}</CardTitle>
            <CardDescription>
              {t('accessDeniedDescription')}
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-6">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">{t('title')}</h1>
          <p className="text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>
        <CreateOrganizationDialog
          open={open}
          onOpenChange={setOpen}
          onSuccess={fetchOrganizations}
        />
      </div>

      {loading ? (
        <div>Chargement...</div>
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {organizations.map((org) => {
            // Obtenir la couleur de bordure de l'organisation
            const borderColor = org.accentColor || (org.logo ? undefined : '#3b82f6');

            return (
              <Card
                key={org.id}
                style={borderColor ? {
                  borderColor: borderColor,
                  borderWidth: '2px',
                } : undefined}
              >
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Building2 className="h-5 w-5" />
                      <CardTitle>{org.name}</CardTitle>
                    </div>
                    {org.owner.id === user?.id && (
                      <Badge variant="outline">{t('owner')}</Badge>
                    )}
                  </div>
                  <CardDescription>
                    {t('owner')}: {org.owner.name || org.owner.email}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {org.members.length} {t('member')}{org.members.length > 1 ? 's' : ''}
                    </div>
                    <div className="flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.location.href = `/dashboard/organizations/${org.id}`}
                      >
                        <Settings className="mr-2 h-4 w-4" />
                        {t('manage')}
                      </Button>
                      {org.owner.id === user?.id && (
                        <>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setEditOrg(org)}
                          >
                            <Edit className="mr-2 h-4 w-4" />
                            {t('edit')}
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setDeleteOrg(org)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            {t('delete')}
                          </Button>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
          {organizations.length === 0 && (
            <Card>
              <CardHeader>
                <CardTitle>{t('noOrganizations')}</CardTitle>
                <CardDescription>
                  {t('createFirst')}
                </CardDescription>
              </CardHeader>
            </Card>
          )}
        </div>
      )}

      {editOrg && (
        <EditOrganizationDialog
          organization={editOrg}
          onClose={() => setEditOrg(null)}
          onSuccess={fetchOrganizations}
        />
      )}

      <AlertDialog open={!!deleteOrg} onOpenChange={(open) => !open && setDeleteOrg(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Supprimer l'organisation</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer "{deleteOrg?.name}" ? Cette action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

function CreateOrganizationDialog({
  open,
  onOpenChange,
  onSuccess,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState('');
  const [logo, setLogo] = useState('');
  const [accentColor, setAccentColor] = useState('#3b82f6');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Erreur',
        description: 'L\'image ne doit pas dépasser 2MB',
        variant: 'destructive',
      });
      return;
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erreur',
        description: 'Le fichier doit être une image',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      // Redimensionner l'image à 200x200
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 200, 200);
          const base64 = canvas.toDataURL('image/png');
          setLogo(base64);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch('/api/organizations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          logo: logo || null,
          accentColor: accentColor || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to create');
      toast({
        title: 'Succès',
        description: 'Organisation créée avec succès',
      });
      setName('');
      setLogo('');
      setAccentColor('#3b82f6');
      onOpenChange(false);
      onSuccess();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de créer l\'organisation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Créer une organisation
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Créer une organisation</DialogTitle>
          <DialogDescription>
            Créez une nouvelle organisation pour regrouper des utilisateurs
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Nom de l'organisation"
              required
            />
          </div>
          <div>
            <Label htmlFor="logo">Logo (optionnel)</Label>
            <div className="space-y-2">
              <Input
                id="logo-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {getValidImageUrl(logo) && (
                <div className="relative w-32 h-32 border rounded">
                  <img
                    src={getValidImageUrl(logo)!}
                    alt="Logo preview"
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => setLogo('')}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="accentColor">Couleur d'accentuation</Label>
            <div className="flex items-center gap-2">
              <Input
                id="accentColor"
                type="color"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={accentColor}
                onChange={(e) => setAccentColor(e.target.value)}
                placeholder="#3b82f6"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              Créer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function EditOrganizationDialog({
  organization,
  onClose,
  onSuccess,
}: {
  organization: Organization;
  onClose: () => void;
  onSuccess: () => void;
}) {
  const [name, setName] = useState(organization.name);
  const [logo, setLogo] = useState(organization.logo || '');
  const [accentColor, setAccentColor] = useState(organization.accentColor || '#3b82f6');
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  async function handleImageUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Vérifier la taille (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      toast({
        title: 'Erreur',
        description: 'L\'image ne doit pas dépasser 2MB',
        variant: 'destructive',
      });
      return;
    }

    // Vérifier le type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Erreur',
        description: 'Le fichier doit être une image',
        variant: 'destructive',
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      // Redimensionner l'image à 200x200
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, 200, 200);
          const base64 = canvas.toDataURL('image/png');
          setLogo(base64);
        }
      };
      img.src = result;
    };
    reader.readAsDataURL(file);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(`/api/organizations/${organization.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          logo: logo || null,
          accentColor: accentColor || null,
        }),
      });

      if (!response.ok) throw new Error('Failed to update');
      toast({
        title: 'Succès',
        description: 'Organisation mise à jour avec succès',
      });
      onClose();
      onSuccess();
    } catch (error) {
      toast({
        title: 'Erreur',
        description: 'Impossible de mettre à jour l\'organisation',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Dialog open={true} onOpenChange={(open) => !open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Modifier l'organisation</DialogTitle>
          <DialogDescription>
            Mettez à jour les informations de l'organisation
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="name">Nom</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
          <div>
            <Label htmlFor="logo-edit">Logo (optionnel)</Label>
            <div className="space-y-2">
              <Input
                id="logo-edit-file"
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="cursor-pointer"
              />
              {getValidImageUrl(logo) && (
                <div className="relative w-32 h-32 border rounded">
                  <img
                    src={getValidImageUrl(logo)!}
                    alt="Logo preview"
                    className="w-full h-full object-contain rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    className="absolute top-0 right-0"
                    onClick={() => setLogo('')}
                  >
                    ×
                  </Button>
                </div>
              )}
            </div>
          </div>
          <div>
            <Label htmlFor="accentColor-edit">Couleur d'accentuation</Label>
            <div className="flex items-center gap-2">
              <Input
                id="accentColor-edit"
                type="color"
                value={accentColor || '#3b82f6'}
                onChange={(e) => setAccentColor(e.target.value)}
                className="w-20 h-10"
              />
              <Input
                type="text"
                value={accentColor || '#3b82f6'}
                onChange={(e) => setAccentColor(e.target.value)}
                placeholder="#3b82f6"
                pattern="^#[0-9A-Fa-f]{6}$"
              />
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
            >
              Annuler
            </Button>
            <Button type="submit" disabled={loading}>
              Enregistrer
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
