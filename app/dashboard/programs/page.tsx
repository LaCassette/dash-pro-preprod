'use client';
export const runtime = 'edge';

'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    Plus,
    Dumbbell,
    Apple,
    Search,
    Calendar,
    User,
    Building2,
    MoreVertical,
    Eye,
    Pencil,
    Trash2,
    Loader2,
    FileText,
} from 'lucide-react';
import { useOrganization } from '@/hooks/use-organization';
import { useTranslations } from 'next-intl';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
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

interface Program {
    id: string;
    name: string;
    description: string | null;
    type: 'SPORT' | 'NUTRITION';
    content: string;
    createdAt: string;
    updatedAt: string;
    createdBy: {
        id: string;
        name: string | null;
        email: string;
    } | null;
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

export default function ProgramsPage() {
    const { toast } = useToast();
    const { activeOrganization } = useOrganization();
    const t = useTranslations('trainings');
    const tCommon = useTranslations('common');

    const [loading, setLoading] = useState(true);
    const [programs, setPrograms] = useState<Program[]>([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [typeFilter, setTypeFilter] = useState<string>('ALL');
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [programToDelete, setProgramToDelete] = useState<string | null>(null);
    const [deleting, setDeleting] = useState(false);

    const fetchPrograms = useCallback(async () => {
        try {
            setLoading(true);
            const params = new URLSearchParams();
            if (activeOrganization?.id) {
                params.append('organizationId', activeOrganization.id);
            }

            const res = await fetch(`/api/programs?${params.toString()}`);
            if (res.ok) {
                const data = await res.json();
                setPrograms(data);
            }
        } catch (error) {
            console.error('Error fetching programs:', error);
        } finally {
            setLoading(false);
        }
    }, [activeOrganization?.id]);

    useEffect(() => {
        fetchPrograms();
    }, [fetchPrograms]);

    const handleDelete = async () => {
        if (!programToDelete) return;

        setDeleting(true);
        try {
            const res = await fetch(`/api/programs/${programToDelete}`, {
                method: 'DELETE',
            });

            if (res.ok) {
                toast({ title: 'Programme supprimé', description: 'Le programme a été supprimé' });
                setPrograms(programs.filter(p => p.id !== programToDelete));
            } else {
                throw new Error('Failed to delete');
            }
        } catch (error) {
            toast({ title: 'Erreur', description: 'Impossible de supprimer le programme', variant: 'destructive' });
        } finally {
            setDeleting(false);
            setDeleteDialogOpen(false);
            setProgramToDelete(null);
        }
    };

    // Filter programs
    const filteredPrograms = programs.filter(p => {
        const matchesSearch = searchQuery === '' ||
            p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (p.description && p.description.toLowerCase().includes(searchQuery.toLowerCase()));
        const matchesType = typeFilter === 'ALL' || p.type === typeFilter;
        return matchesSearch && matchesType;
    });

    const sportPrograms = filteredPrograms.filter(p => p.type === 'SPORT');
    const nutritionPrograms = filteredPrograms.filter(p => p.type === 'NUTRITION');

    const parseExercises = (content: string): number => {
        try {
            const parsed = JSON.parse(content);
            return parsed.exercises?.length || 0;
        } catch {
            return 0;
        }
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('fr-FR', {
            day: 'numeric',
            month: 'short',
            year: 'numeric',
        });
    };

    const ProgramCard = ({ program }: { program: Program }) => {
        const exerciseCount = program.type === 'SPORT' ? parseExercises(program.content) : 0;
        const isSport = program.type === 'SPORT';

        return (
            <Card className="group hover:border-primary/30 transition-all">
                <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                            <div className={`p-2 rounded-lg ${isSport ? 'bg-blue-500/10' : 'bg-green-500/10'}`}>
                                {isSport ? (
                                    <Dumbbell className={`h-5 w-5 text-blue-500`} />
                                ) : (
                                    <Apple className={`h-5 w-5 text-green-500`} />
                                )}
                            </div>
                            <div>
                                <CardTitle className="text-lg">{program.name}</CardTitle>
                                <Badge variant={isSport ? 'default' : 'secondary'} className="mt-1">
                                    {isSport ? 'Sport' : 'Nutrition'}
                                </Badge>
                            </div>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100">
                                    <MoreVertical className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/programs/${program.id}`}>
                                        <Eye className="h-4 w-4 mr-2" /> Voir
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem asChild>
                                    <Link href={`/dashboard/programs/${program.id}/edit`}>
                                        <Pencil className="h-4 w-4 mr-2" /> Modifier
                                    </Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem
                                    className="text-destructive"
                                    onClick={() => {
                                        setProgramToDelete(program.id);
                                        setDeleteDialogOpen(true);
                                    }}
                                >
                                    <Trash2 className="h-4 w-4 mr-2" /> Supprimer
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </CardHeader>
                <CardContent className="space-y-3">
                    {program.description && (
                        <p className="text-sm text-muted-foreground line-clamp-2">
                            {program.description}
                        </p>
                    )}

                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                        {isSport && exerciseCount > 0 && (
                            <div className="flex items-center gap-1">
                                <Dumbbell className="h-3 w-3" />
                                <span>{exerciseCount} exercices</span>
                            </div>
                        )}
                        <div className="flex items-center gap-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(program.createdAt)}</span>
                        </div>
                        {program.user && (
                            <div className="flex items-center gap-1">
                                <User className="h-3 w-3" />
                                <span>{program.user.name || program.user.email}</span>
                            </div>
                        )}
                    </div>

                    {program.organization && (
                        <div className="flex items-center gap-1 text-xs">
                            <Building2 className="h-3 w-3" />
                            <span
                                className="px-2 py-0.5 rounded text-white"
                                style={{ backgroundColor: program.organization.accentColor || '#6b7280' }}
                            >
                                {program.organization.name}
                            </span>
                        </div>
                    )}
                </CardContent>
            </Card>
        );
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <div>
                        <h1 className="text-2xl font-bold">Programmes</h1>
                        <p className="text-muted-foreground">
                            Gérez vos programmes sportifs et nutritionnels
                        </p>
                    </div>
                </div>
                <Button asChild>
                    <Link href="/dashboard/programs/builder">
                        <Plus className="h-4 w-4 mr-2" />
                        Créer un programme
                    </Link>
                </Button>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-primary/10">
                                <FileText className="h-6 w-6 text-primary" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{programs.length}</p>
                                <p className="text-sm text-muted-foreground">Total programmes</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-blue-500/10">
                                <Dumbbell className="h-6 w-6 text-blue-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{sportPrograms.length}</p>
                                <p className="text-sm text-muted-foreground">Programmes sportifs</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="pt-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 rounded-lg bg-green-500/10">
                                <Apple className="h-6 w-6 text-green-500" />
                            </div>
                            <div>
                                <p className="text-2xl font-bold">{nutritionPrograms.length}</p>
                                <p className="text-sm text-muted-foreground">Programmes nutritionnels</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        placeholder="Rechercher un programme..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
                <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-full sm:w-[180px]">
                        <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="ALL">Tous les types</SelectItem>
                        <SelectItem value="SPORT">Sport</SelectItem>
                        <SelectItem value="NUTRITION">Nutrition</SelectItem>
                    </SelectContent>
                </Select>
            </div>

            {/* Programs Grid */}
            {filteredPrograms.length === 0 ? (
                <Card className="py-12">
                    <CardContent className="flex flex-col items-center justify-center text-center">
                        <FileText className="h-12 w-12 text-muted-foreground/30 mb-4" />
                        <h3 className="text-lg font-medium">Aucun programme</h3>
                        <p className="text-muted-foreground mb-4">
                            {searchQuery || typeFilter !== 'ALL'
                                ? 'Aucun programme ne correspond à vos critères'
                                : 'Créez votre premier programme pour commencer'}
                        </p>
                        {!searchQuery && typeFilter === 'ALL' && (
                            <Button asChild>
                                <Link href="/dashboard/programs/builder">
                                    <Plus className="h-4 w-4 mr-2" />
                                    Créer un programme
                                </Link>
                            </Button>
                        )}
                    </CardContent>
                </Card>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredPrograms.map((program) => (
                        <ProgramCard key={program.id} program={program} />
                    ))}
                </div>
            )}

            {/* Delete Dialog */}
            <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Supprimer le programme ?</AlertDialogTitle>
                        <AlertDialogDescription>
                            Cette action est irréversible. Le programme sera définitivement supprimé.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={deleting}>Annuler</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDelete} disabled={deleting} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
                            {deleting ? <Loader2 className="h-4 w-4 animate-spin mr-2" /> : null}
                            Supprimer
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
