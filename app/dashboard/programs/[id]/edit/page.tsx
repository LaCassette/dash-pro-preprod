'use client';
export const runtime = 'edge';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useTheme } from 'next-themes';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import {
    ArrowLeft,
    Save,
    Eye,
    Edit,
    Loader2,
    Dumbbell,
    Apple,
    Bold,
    Italic,
    Heading1,
    Heading2,
    Heading3,
    List,
    ListOrdered,
    Quote,
    Code,
    Table,
    Trash2,
    Undo,
    Redo,
    Link,
    Plus,
    GripVertical,
    Clock,
    Repeat,
    ChevronUp,
    ChevronDown,
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from '@/components/ui/alert-dialog';

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
    };
    user: {
        id: string;
        name: string | null;
        email: string;
    } | null;
}

interface ParsedExercise {
    name: string;
    exerciseId?: string;
    muscleGroup: string;
    series: number;
    reps: string;
    rest: string;
    notes?: string;
    order: number;
}

interface Exercise {
    id: string;
    name: string;
    muscleGroup: string;
    equipmentType: string;
    difficulty: number;
}

const muscleGroupLabels: Record<string, string> = {
    CHEST: 'Pectoraux', BACK: 'Dos', SHOULDERS: 'Épaules', BICEPS: 'Biceps',
    TRICEPS: 'Triceps', FOREARMS: 'Avant-bras', ABS: 'Abdos', OBLIQUES: 'Obliques',
    QUADRICEPS: 'Quadriceps', HAMSTRINGS: 'Ischio-jambiers', GLUTES: 'Fessiers',
    CALVES: 'Mollets', LOWER_BACK: 'Lombaires', TRAPS: 'Trapèzes',
    FULL_BODY: 'Full Body', CARDIO: 'Cardio', STRETCHING: 'Étirements',
};

const muscleGroupColors: Record<string, string> = {
    CHEST: 'bg-red-500', BACK: 'bg-blue-500', SHOULDERS: 'bg-orange-500', BICEPS: 'bg-purple-500',
    TRICEPS: 'bg-pink-500', FOREARMS: 'bg-amber-500', ABS: 'bg-green-500', OBLIQUES: 'bg-lime-500',
    QUADRICEPS: 'bg-cyan-500', HAMSTRINGS: 'bg-teal-500', GLUTES: 'bg-rose-500',
    CALVES: 'bg-sky-500', LOWER_BACK: 'bg-indigo-500', TRAPS: 'bg-violet-500',
    FULL_BODY: 'bg-gray-500', CARDIO: 'bg-red-400', STRETCHING: 'bg-emerald-500',
};

function ToolbarButton({
    onClick,
    icon: Icon,
    label,
    disabled = false
}: {
    onClick: () => void;
    icon: React.ElementType;
    label: string;
    disabled?: boolean;
}) {
    return (
        <button
            type="button"
            onClick={onClick}
            disabled={disabled}
            className="p-2 hover:bg-muted rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            title={label}
        >
            <Icon className="h-4 w-4" />
        </button>
    );
}

export default function ProgramEditPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();

    const [program, setProgram] = useState<Program | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [deleting, setDeleting] = useState(false);

    // Form state
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');

    // Exercises state (parsed from JSON)
    const [exercises, setExercises] = useState<ParsedExercise[]>([]);
    const [markdownContent, setMarkdownContent] = useState('');
    const [hasExercisesJson, setHasExercisesJson] = useState(false);

    // Exercise library
    const [exerciseLibrary, setExerciseLibrary] = useState<Record<string, Exercise[]>>({});
    const [loadingLibrary, setLoadingLibrary] = useState(false);
    const [showAddExercise, setShowAddExercise] = useState(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');

    // Editor state
    const [activeTab, setActiveTab] = useState<'exercises' | 'notes' | 'preview'>('exercises');
    const [hasChanges, setHasChanges] = useState(false);

    useEffect(() => {
        if (params.id) {
            fetchProgram(params.id as string);
        }
    }, [params.id]);

    // Parse content to separate JSON exercises from markdown
    const parseContent = useCallback((content: string) => {
        try {
            const parsed = JSON.parse(content);
            if (parsed.exercises && Array.isArray(parsed.exercises)) {
                setExercises(parsed.exercises);
                setHasExercisesJson(true);
                setMarkdownContent(parsed.notes || '');
                return;
            }
        } catch {
            // Not JSON or no exercises
        }
        setHasExercisesJson(false);
        setExercises([]);
        setMarkdownContent(content);
    }, []);

    // Combine exercises and markdown back to content
    const buildContent = useCallback(() => {
        if (hasExercisesJson || exercises.length > 0) {
            return JSON.stringify({
                exercises: exercises,
                notes: markdownContent || undefined,
            });
        }
        return markdownContent;
    }, [exercises, markdownContent, hasExercisesJson]);

    // Track changes
    useEffect(() => {
        if (program) {
            const currentContent = buildContent();
            const changed =
                name !== program.name ||
                description !== (program.description || '') ||
                currentContent !== program.content;
            setHasChanges(changed);
        }
    }, [name, description, exercises, markdownContent, program, buildContent]);

    async function fetchProgram(id: string) {
        setLoading(true);
        try {
            const response = await fetch(`/api/programs/${id}`);
            if (!response.ok) {
                if (response.status === 404) {
                    toast({ title: 'Erreur', description: 'Programme non trouvé', variant: 'destructive' });
                    router.push('/dashboard');
                    return;
                }
                throw new Error('Failed to fetch program');
            }
            const data = await response.json();

            if (user && data.createdBy.id !== user.id) {
                toast({ title: 'Accès refusé', description: 'Vous ne pouvez pas modifier ce programme', variant: 'destructive' });
                router.push(`/dashboard/programs/${id}`);
                return;
            }

            setProgram(data);
            setName(data.name);
            setDescription(data.description || '');
            parseContent(data.content);
        } catch (error) {
            console.error('Error fetching program:', error);
            toast({ title: 'Erreur', description: 'Impossible de charger le programme', variant: 'destructive' });
            router.push('/dashboard');
        } finally {
            setLoading(false);
        }
    }

    async function fetchExerciseLibrary() {
        if (Object.keys(exerciseLibrary).length > 0) return;
        setLoadingLibrary(true);
        try {
            const res = await fetch('/api/exercises/grouped');
            if (res.ok) {
                setExerciseLibrary(await res.json());
            }
        } catch (error) {
            console.error('Error loading exercises:', error);
        } finally {
            setLoadingLibrary(false);
        }
    }

    const handleSave = async () => {
        if (!program || !name.trim()) {
            toast({ title: 'Erreur', description: 'Le nom du programme est requis', variant: 'destructive' });
            return;
        }

        setSaving(true);
        try {
            const response = await fetch(`/api/programs/${program.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: name.trim(),
                    description: description.trim() || null,
                    content: buildContent(),
                }),
            });

            if (!response.ok) throw new Error('Failed to save program');

            const updatedProgram = await response.json();
            setProgram(updatedProgram);
            setHasChanges(false);

            toast({ title: 'Succès', description: 'Programme sauvegardé' });
        } catch (error) {
            console.error('Error saving program:', error);
            toast({ title: 'Erreur', description: 'Impossible de sauvegarder le programme', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    const handleDelete = async () => {
        if (!program) return;
        setDeleting(true);
        try {
            const response = await fetch(`/api/programs/${program.id}`, { method: 'DELETE' });
            if (!response.ok) throw new Error('Failed to delete program');
            toast({ title: 'Succès', description: 'Programme supprimé' });
            router.push('/dashboard/programs');
        } catch (error) {
            console.error('Error deleting program:', error);
            toast({ title: 'Erreur', description: 'Impossible de supprimer', variant: 'destructive' });
        } finally {
            setDeleting(false);
        }
    };

    // Exercise management
    const addExercise = (exercise: Exercise) => {
        const newExercise: ParsedExercise = {
            name: exercise.name,
            exerciseId: exercise.id,
            muscleGroup: exercise.muscleGroup,
            series: 3,
            reps: '10',
            rest: '60s',
            notes: '',
            order: exercises.length,
        };
        setExercises([...exercises, newExercise]);
        setHasExercisesJson(true);
        setShowAddExercise(false);
        toast({ title: 'Exercice ajouté', description: exercise.name });
    };

    const updateExercise = (index: number, field: keyof ParsedExercise, value: any) => {
        const updated = [...exercises];
        updated[index] = { ...updated[index], [field]: value };
        setExercises(updated);
    };

    const removeExercise = (index: number) => {
        setExercises(exercises.filter((_, i) => i !== index));
    };

    const moveExercise = (index: number, direction: 'up' | 'down') => {
        if ((direction === 'up' && index === 0) || (direction === 'down' && index === exercises.length - 1)) return;
        const newIndex = direction === 'up' ? index - 1 : index + 1;
        const updated = [...exercises];
        [updated[index], updated[newIndex]] = [updated[newIndex], updated[index]];
        updated.forEach((ex, i) => ex.order = i);
        setExercises(updated);
    };

    if (loading) {
        return (
            <div className="w-full min-w-0 p-6">
                <div className="flex items-center justify-center min-h-[400px]">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            </div>
        );
    }

    if (!program) return null;

    const isSport = program.type === 'SPORT';

    return (
        <div className="w-full min-w-0 p-6 h-screen flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                    <SidebarTrigger />
                    <Button variant="ghost" onClick={() => {
                        if (hasChanges) {
                            if (confirm('Modifications non sauvegardées. Quitter ?')) {
                                router.push(`/dashboard/programs/${program.id}`);
                            }
                        } else {
                            router.push(`/dashboard/programs/${program.id}`);
                        }
                    }}>
                        <ArrowLeft className="mr-2 h-4 w-4" /> Retour
                    </Button>
                    <Badge variant={isSport ? 'default' : 'secondary'}>
                        {isSport ? 'Sportif' : 'Nutritionnel'}
                    </Badge>
                </div>

                <div className="flex items-center gap-2">
                    {hasChanges && <span className="text-sm text-muted-foreground">Modifications non sauvegardées</span>}
                    <Button onClick={handleSave} disabled={saving || !hasChanges}>
                        {saving ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Save className="mr-2 h-4 w-4" />}
                        Sauvegarder
                    </Button>
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button variant="destructive" disabled={deleting}>
                                <Trash2 className="mr-2 h-4 w-4" /> Supprimer
                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Supprimer le programme ?</AlertDialogTitle>
                                <AlertDialogDescription>Cette action est irréversible.</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Annuler</AlertDialogCancel>
                                <AlertDialogAction onClick={handleDelete}>Supprimer</AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                </div>
            </div>

            {/* Form Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div className="space-y-2">
                    <Label htmlFor="name">Nom du programme</Label>
                    <Input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nom du programme" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="description">Description (optionnelle)</Label>
                    <Input id="description" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
                </div>
            </div>

            {/* Main Content */}
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="flex-1 flex flex-col">
                <TabsList className="w-fit">
                    <TabsTrigger value="exercises" className="gap-2">
                        <Dumbbell className="h-4 w-4" /> Exercices ({exercises.length})
                    </TabsTrigger>
                    <TabsTrigger value="notes" className="gap-2">
                        <Edit className="h-4 w-4" /> Notes
                    </TabsTrigger>
                    <TabsTrigger value="preview" className="gap-2">
                        <Eye className="h-4 w-4" /> Aperçu
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="exercises" className="flex-1 mt-4">
                    <Card className="h-full">
                        <CardHeader className="pb-3">
                            <div className="flex items-center justify-between">
                                <CardTitle>Exercices du programme</CardTitle>
                                <Dialog open={showAddExercise} onOpenChange={(open) => {
                                    setShowAddExercise(open);
                                    if (open) fetchExerciseLibrary();
                                }}>
                                    <DialogTrigger asChild>
                                        <Button size="sm"><Plus className="h-4 w-4 mr-2" /> Ajouter un exercice</Button>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-2xl max-h-[80vh]">
                                        <DialogHeader>
                                            <DialogTitle>Bibliothèque d'exercices</DialogTitle>
                                        </DialogHeader>
                                        {loadingLibrary ? (
                                            <div className="flex items-center justify-center py-8"><Loader2 className="h-6 w-6 animate-spin" /></div>
                                        ) : (
                                            <div className="space-y-4">
                                                <select
                                                    className="w-full p-2 rounded border bg-background"
                                                    value={selectedMuscleGroup}
                                                    onChange={(e) => setSelectedMuscleGroup(e.target.value)}
                                                >
                                                    <option value="">Choisir un groupe musculaire</option>
                                                    {Object.keys(exerciseLibrary).map((group) => (
                                                        <option key={group} value={group}>
                                                            {muscleGroupLabels[group] || group} ({exerciseLibrary[group].length})
                                                        </option>
                                                    ))}
                                                </select>
                                                {selectedMuscleGroup && (
                                                    <ScrollArea className="h-[400px]">
                                                        <div className="space-y-2 pr-4">
                                                            {exerciseLibrary[selectedMuscleGroup]?.map((ex) => (
                                                                <div
                                                                    key={ex.id}
                                                                    className="flex items-center justify-between p-3 rounded-lg border hover:bg-muted cursor-pointer"
                                                                    onClick={() => addExercise(ex)}
                                                                >
                                                                    <div>
                                                                        <p className="font-medium">{ex.name}</p>
                                                                        <Badge variant="outline" className="text-xs mt-1">
                                                                            {muscleGroupLabels[ex.muscleGroup]}
                                                                        </Badge>
                                                                    </div>
                                                                    <Plus className="h-4 w-4" />
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </ScrollArea>
                                                )}
                                            </div>
                                        )}
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </CardHeader>
                        <CardContent>
                            {exercises.length === 0 ? (
                                <div className="text-center py-12 text-muted-foreground">
                                    <Dumbbell className="h-12 w-12 mx-auto mb-4 opacity-30" />
                                    <p>Aucun exercice dans ce programme</p>
                                    <p className="text-sm">Cliquez sur "Ajouter un exercice" pour commencer</p>
                                </div>
                            ) : (
                                <ScrollArea className="h-[calc(100vh-400px)]">
                                    <div className="space-y-3 pr-4">
                                        {exercises.map((ex, idx) => (
                                            <div key={`${ex.exerciseId || ex.name}-${idx}`} className="p-4 rounded-lg border bg-card space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex flex-col gap-1">
                                                            <button onClick={() => moveExercise(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-muted rounded disabled:opacity-30">
                                                                <ChevronUp className="h-3 w-3" />
                                                            </button>
                                                            <button onClick={() => moveExercise(idx, 'down')} disabled={idx === exercises.length - 1} className="p-1 hover:bg-muted rounded disabled:opacity-30">
                                                                <ChevronDown className="h-3 w-3" />
                                                            </button>
                                                        </div>
                                                        <Badge variant="secondary">{idx + 1}</Badge>
                                                        <span className="font-semibold">{ex.name}</span>
                                                        <Badge className={`${muscleGroupColors[ex.muscleGroup]} text-white text-xs`}>
                                                            {muscleGroupLabels[ex.muscleGroup] || ex.muscleGroup}
                                                        </Badge>
                                                    </div>
                                                    <Button variant="ghost" size="icon" onClick={() => removeExercise(idx)}>
                                                        <Trash2 className="h-4 w-4 text-destructive" />
                                                    </Button>
                                                </div>
                                                <div className="grid grid-cols-3 gap-3">
                                                    <div>
                                                        <Label className="text-xs">Séries</Label>
                                                        <Input
                                                            type="number"
                                                            value={ex.series}
                                                            onChange={(e) => updateExercise(idx, 'series', parseInt(e.target.value) || 0)}
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs">Répétitions</Label>
                                                        <Input
                                                            value={ex.reps}
                                                            onChange={(e) => updateExercise(idx, 'reps', e.target.value)}
                                                            className="h-9"
                                                        />
                                                    </div>
                                                    <div>
                                                        <Label className="text-xs">Repos</Label>
                                                        <Input
                                                            value={ex.rest}
                                                            onChange={(e) => updateExercise(idx, 'rest', e.target.value)}
                                                            className="h-9"
                                                        />
                                                    </div>
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Notes (optionnel)</Label>
                                                    <Input
                                                        value={ex.notes || ''}
                                                        onChange={(e) => updateExercise(idx, 'notes', e.target.value)}
                                                        placeholder="Notes pour cet exercice..."
                                                        className="h-9"
                                                    />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </ScrollArea>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="notes" className="flex-1 mt-4">
                    <Card className="h-full flex flex-col">
                        <CardHeader className="pb-2">
                            <CardTitle>Notes et instructions</CardTitle>
                            <CardDescription>Ajoutez des notes en Markdown pour accompagner les exercices</CardDescription>
                        </CardHeader>
                        <CardContent className="flex-1">
                            <Textarea
                                value={markdownContent}
                                onChange={(e) => setMarkdownContent(e.target.value)}
                                placeholder="Rédigez des notes en Markdown..."
                                className="h-full min-h-[400px] resize-none font-mono text-sm"
                            />
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="preview" className="flex-1 mt-4">
                    <Card className="h-full overflow-auto">
                        <CardHeader>
                            <CardTitle>Aperçu du programme</CardTitle>
                        </CardHeader>
                        <CardContent>
                            {exercises.length > 0 && (
                                <div className="space-y-4 mb-8">
                                    <h3 className="text-lg font-semibold flex items-center gap-2">
                                        <Dumbbell className="h-5 w-5" /> {exercises.length} Exercices
                                    </h3>
                                    <div className="space-y-2">
                                        {exercises.map((ex, idx) => (
                                            <div key={idx} className="p-3 rounded-lg border flex items-center gap-4">
                                                <Badge>{idx + 1}</Badge>
                                                <div className="flex-1">
                                                    <span className="font-medium">{ex.name}</span>
                                                    <Badge variant="outline" className="ml-2 text-xs">
                                                        {muscleGroupLabels[ex.muscleGroup]}
                                                    </Badge>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                                    <span><Repeat className="h-3 w-3 inline mr-1" />{ex.series}×{ex.reps}</span>
                                                    <span><Clock className="h-3 w-3 inline mr-1" />{ex.rest}</span>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                            {markdownContent && (
                                <div className="prose prose-sm max-w-none dark:prose-invert">
                                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{markdownContent}</ReactMarkdown>
                                </div>
                            )}
                            {exercises.length === 0 && !markdownContent && (
                                <p className="text-muted-foreground text-center py-8">Aucun contenu à afficher</p>
                            )}
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
