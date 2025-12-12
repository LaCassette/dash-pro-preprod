'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useToast } from '@/hooks/use-toast';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Loader2, Save, Trash2 } from 'lucide-react';
import dynamic from 'next/dynamic';
import '@uiw/react-md-editor/markdown-editor.css';

// Import dynamique pour éviter les erreurs SSR
const MDEditor = dynamic(() => import('@uiw/react-md-editor'), { ssr: false });

const programSchema = z.object({
  name: z.string().min(1, 'Le nom est requis'),
  description: z.string().optional(),
  content: z.string().min(1, 'Le contenu est requis'),
});

type ProgramFormData = z.infer<typeof programSchema>;

interface ProgramEditorProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  programId: string;
  initialData?: {
    name: string;
    description: string | null;
    content: string;
  };
  onSuccess?: () => void;
  onDelete?: () => void;
}

export function ProgramEditor({
  open,
  onOpenChange,
  programId,
  initialData,
  onSuccess,
  onDelete,
}: ProgramEditorProps) {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [loadingData, setLoadingData] = useState(false);

  const form = useForm<ProgramFormData>({
    resolver: zodResolver(programSchema),
    defaultValues: {
      name: '',
      description: '',
      content: '',
    },
  });

  useEffect(() => {
    if (open && programId) {
      if (initialData) {
        form.reset({
          name: initialData.name,
          description: initialData.description || '',
          content: initialData.content,
        });
      } else {
        fetchProgram();
      }
    }
  }, [open, programId, initialData]);

  async function fetchProgram() {
    setLoadingData(true);
    try {
      const response = await fetch(`/api/programs/${programId}`);
      if (!response.ok) {
        throw new Error('Failed to fetch program');
      }
      const data = await response.json();
      form.reset({
        name: data.name,
        description: data.description || '',
        content: data.content,
      });
    } catch (error) {
      console.error('Error fetching program:', error);
      toast({
        title: 'Erreur',
        description: 'Impossible de charger le programme',
        variant: 'destructive',
      });
    } finally {
      setLoadingData(false);
    }
  }

  async function onSubmit(data: ProgramFormData) {
    setLoading(true);
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update program');
      }

      toast({
        title: 'Succès',
        description: 'Programme mis à jour avec succès',
      });

      onSuccess?.();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Impossible de mettre à jour le programme',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete() {
    if (!confirm('Êtes-vous sûr de vouloir supprimer ce programme ? Cette action est irréversible.')) {
      return;
    }

    setDeleting(true);
    try {
      const response = await fetch(`/api/programs/${programId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to delete program');
      }

      toast({
        title: 'Succès',
        description: 'Programme supprimé avec succès',
      });

      onDelete?.();
      onOpenChange(false);
    } catch (err) {
      toast({
        title: 'Erreur',
        description: err instanceof Error ? err.message : 'Impossible de supprimer le programme',
        variant: 'destructive',
      });
    } finally {
      setDeleting(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl w-[95vw] h-[95vh] max-h-[95vh] !flex !flex-col !grid-cols-none gap-0 p-0 overflow-hidden">
        <div className="flex-shrink-0 p-6 border-b">
          <DialogHeader>
            <DialogTitle>Modifier le programme</DialogTitle>
            <DialogDescription>
              Modifiez le contenu du programme en markdown
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-hidden">
              <div className="h-full overflow-y-auto px-6 py-6 space-y-4">
                {loadingData ? (
                  <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                  </div>
                ) : (
                  <>
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nom du programme *</FormLabel>
                          <FormControl>
                            <Input {...field} placeholder="Nom du programme" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description (optionnel)</FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              placeholder="Description du programme"
                              rows={2}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="content"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Contenu (Markdown) *</FormLabel>
                          <FormControl>
                            <div className="min-h-[400px] [&_.w-md-editor]:bg-background [&_.w-md-editor-text]:text-foreground [&_.w-md-editor-text]:bg-background">
                              <MDEditor
                                value={field.value}
                                onChange={(value) => field.onChange(value || '')}
                                preview="edit"
                                hideToolbar={false}
                              />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                )}
              </div>
            </div>

            <div className="flex-shrink-0 p-6 border-t bg-background">
              <DialogFooter className="flex items-center justify-between">
                <Button
                  type="button"
                  variant="destructive"
                  onClick={handleDelete}
                  disabled={loading || deleting || loadingData}
                >
                  {deleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Suppression...
                    </>
                  ) : (
                    <>
                      <Trash2 className="mr-2 h-4 w-4" />
                      Supprimer
                    </>
                  )}
                </Button>
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => onOpenChange(false)}
                    disabled={loading || deleting}
                  >
                    Annuler
                  </Button>
                  <Button type="submit" disabled={loading || deleting || loadingData}>
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Sauvegarde...
                      </>
                    ) : (
                      <>
                        <Save className="mr-2 h-4 w-4" />
                        Sauvegarder
                      </>
                    )}
                  </Button>
                </div>
              </DialogFooter>
            </div>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}

