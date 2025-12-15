'use client';
export const runtime = 'edge';

'use client';

import { useEffect, useState, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useUser } from '@/hooks/use-user';
import { useToast } from '@/hooks/use-toast';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { SidebarTrigger } from '@/components/ui/sidebar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    ChevronLeft,
    Plus,
    Dumbbell,
    Clock,
    Calendar,
    Play,
    CheckCircle2,
    Trash2,
    Loader2,
    Target,
    Timer,
    Star,
} from 'lucide-react';

interface Exercise {
    id: string;
    name: string;
    nameEn: string | null;
    muscleGroup: string;
    equipmentType: string;
    difficulty: number;
}

interface SessionExercise {
    id: string;
    exercise: Exercise;
    sets: number | null;
    reps: string | null;
    weight: number | null;
    duration: number | null;
    restTime: number | null;
    completed: boolean;
}

interface WorkoutSession {
    id: string;
    name: string;
    description: string | null;
    sessionType: string;
    scheduledAt: string | null;
    startedAt: string | null;
    completedAt: string | null;
    status: string;
    duration: number | null;
    rating: number | null;
    exercises: SessionExercise[];
}

interface WorkoutStats {
    totalSessions: number;
    completedThisWeek: number;
    completedThisMonth: number;
    averageDuration: number;
    recentSessions: Array<{
        id: string;
        name: string;
        duration: number;
        completedAt: string;
        rating: number;
    }>;
}

const muscleGroupLabels: Record<string, string> = {
    CHEST: 'Pectoraux', BACK: 'Dos', SHOULDERS: 'Épaules', BICEPS: 'Biceps',
    TRICEPS: 'Triceps', FOREARMS: 'Avant-bras', ABS: 'Abdos', OBLIQUES: 'Obliques',
    QUADRICEPS: 'Quadriceps', HAMSTRINGS: 'Ischio-jambiers', GLUTES: 'Fessiers',
    CALVES: 'Mollets', LOWER_BACK: 'Lombaires', TRAPS: 'Trapèzes',
    FULL_BODY: 'Full Body', CARDIO: 'Cardio', STRETCHING: 'Étirements',
};

const statusColors: Record<string, string> = {
    PLANNED: 'bg-blue-100 text-blue-800',
    IN_PROGRESS: 'bg-yellow-100 text-yellow-800',
    COMPLETED: 'bg-green-100 text-green-800',
    CANCELLED: 'bg-gray-100 text-gray-800',
    SKIPPED: 'bg-red-100 text-red-800',
};

export default function ClientSessionsPage() {
    const params = useParams();
    const router = useRouter();
    const { user } = useUser();
    const { toast } = useToast();
    const clientId = params.id as string;

    const [sessions, setSessions] = useState<WorkoutSession[]>([]);
    const [stats, setStats] = useState<WorkoutStats | null>(null);
    const [exercises, setExercises] = useState<Record<string, Exercise[]>>({});
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [createDialogOpen, setCreateDialogOpen] = useState(false);
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('');
    const [selectedExercises, setSelectedExercises] = useState<Array<{
        exerciseId: string;
        exercise: Exercise;
        sets: number;
        reps: string;
        weight: number;
        restTime: number;
    }>>([]);

    const [formData, setFormData] = useState({
        name: '',
        description: '',
        sessionType: 'STRENGTH',
        scheduledAt: '',
    });

    const fetchData = useCallback(async () => {
        try {
            const [sessionsRes, statsRes, exercisesRes] = await Promise.all([
                fetch(`/api/workout-sessions/users/${clientId}`),
                fetch(`/api/workout-sessions/users/${clientId}/stats`),
                fetch('/api/exercises/grouped'),
            ]);

            if (sessionsRes.ok) {
                const data = await sessionsRes.json();
                setSessions(data.sessions || []);
            }
            if (statsRes.ok) {
                setStats(await statsRes.json());
            }
            if (exercisesRes.ok) {
                setExercises(await exercisesRes.json());
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
    }, [clientId, toast]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleAddExercise = (exercise: Exercise) => {
        setSelectedExercises(prev => [...prev, {
            exerciseId: exercise.id,
            exercise,
            sets: 3,
            reps: '10',
            weight: 0,
            restTime: 60,
        }]);
    };

    const handleRemoveExercise = (index: number) => {
        setSelectedExercises(prev => prev.filter((_, i) => i !== index));
    };

    const handleCreateSession = async (e: React.FormEvent) => {
        e.preventDefault();
        if (selectedExercises.length === 0) {
            toast({
                title: 'Erreur',
                description: 'Ajoutez au moins un exercice',
                variant: 'destructive',
            });
            return;
        }

        setSaving(true);
        try {
            const res = await fetch(`/api/workout-sessions/users/${clientId}`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    exercises: selectedExercises.map(ex => ({
                        exerciseId: ex.exerciseId,
                        sets: ex.sets,
                        reps: ex.reps,
                        weight: ex.weight || null,
                        restTime: ex.restTime,
                    })),
                }),
            });

            if (!res.ok) throw new Error('Failed to create');

            toast({ title: 'Session créée', description: 'La session a été planifiée' });
            setCreateDialogOpen(false);
            setFormData({ name: '', description: '', sessionType: 'STRENGTH', scheduledAt: '' });
            setSelectedExercises([]);
            fetchData();
        } catch (error) {
            toast({
                title: 'Erreur',
                description: 'Impossible de créer la session',
                variant: 'destructive',
            });
        } finally {
            setSaving(false);
        }
    };

    if (user?.role !== 'PRO') {
        return (
            <div className="container mx-auto p-6">
                <Card>
                    <CardHeader><CardTitle>Accès refusé</CardTitle></CardHeader>
                </Card>
            </div>
        );
    }

    return (
        <div className="container mx-auto p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <SidebarTrigger />
                    <Button variant="ghost" size="icon" onClick={() => router.back()}>
                        <ChevronLeft className="h-5 w-5" />
                    </Button>
                    <div>
                        <h1 className="text-2xl font-bold">Sessions d'entraînement</h1>
                        <p className="text-muted-foreground">Création et suivi des workouts</p>
                    </div>
                </div>
                <Dialog open={createDialogOpen} onOpenChange={setCreateDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" />
                            Nouvelle session
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Créer une session d'entraînement</DialogTitle>
                            <DialogDescription>Sélectionnez les exercices et configurez la session</DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleCreateSession} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="name">Nom de la session</Label>
                                    <Input
                                        id="name"
                                        value={formData.name}
                                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                        placeholder="Push Day"
                                        required
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="sessionType">Type</Label>
                                    <Select value={formData.sessionType} onValueChange={(v) => setFormData({ ...formData, sessionType: v })}>
                                        <SelectTrigger>
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="STRENGTH">Force</SelectItem>
                                            <SelectItem value="HYPERTROPHY">Hypertrophie</SelectItem>
                                            <SelectItem value="CARDIO">Cardio</SelectItem>
                                            <SelectItem value="HIIT">HIIT</SelectItem>
                                            <SelectItem value="MOBILITY">Mobilité</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="space-y-2 col-span-2">
                                    <Label htmlFor="scheduledAt">Date planifiée</Label>
                                    <Input
                                        id="scheduledAt"
                                        type="datetime-local"
                                        value={formData.scheduledAt}
                                        onChange={(e) => setFormData({ ...formData, scheduledAt: e.target.value })}
                                    />
                                </div>
                            </div>

                            {/* Exercise Selector */}
                            <div className="border rounded-lg p-4 space-y-4">
                                <Label>Ajouter des exercices</Label>
                                <div className="flex gap-2">
                                    <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                                        <SelectTrigger className="w-[200px]">
                                            <SelectValue placeholder="Groupe musculaire" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {Object.keys(exercises).map((group) => (
                                                <SelectItem key={group} value={group}>
                                                    {muscleGroupLabels[group] || group}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {selectedMuscleGroup && exercises[selectedMuscleGroup] && (
                                    <ScrollArea className="h-[200px] border rounded p-2">
                                        <div className="space-y-1">
                                            {exercises[selectedMuscleGroup].map((ex) => (
                                                <button
                                                    key={ex.id}
                                                    type="button"
                                                    onClick={() => handleAddExercise(ex)}
                                                    className="w-full text-left p-2 hover:bg-muted rounded flex justify-between items-center"
                                                >
                                                    <span>{ex.name}</span>
                                                    <Badge variant="outline">{ex.equipmentType}</Badge>
                                                </button>
                                            ))}
                                        </div>
                                    </ScrollArea>
                                )}
                            </div>

                            {/* Selected Exercises */}
                            {selectedExercises.length > 0 && (
                                <div className="space-y-2">
                                    <Label>Exercices sélectionnés ({selectedExercises.length})</Label>
                                    <div className="space-y-2">
                                        {selectedExercises.map((ex, idx) => (
                                            <div key={idx} className="flex items-center gap-2 p-2 border rounded">
                                                <span className="flex-1 font-medium">{ex.exercise.name}</span>
                                                <Input
                                                    type="number"
                                                    value={ex.sets}
                                                    onChange={(e) => {
                                                        const updated = [...selectedExercises];
                                                        updated[idx].sets = parseInt(e.target.value);
                                                        setSelectedExercises(updated);
                                                    }}
                                                    className="w-16"
                                                    placeholder="Sets"
                                                />
                                                <span>x</span>
                                                <Input
                                                    value={ex.reps}
                                                    onChange={(e) => {
                                                        const updated = [...selectedExercises];
                                                        updated[idx].reps = e.target.value;
                                                        setSelectedExercises(updated);
                                                    }}
                                                    className="w-20"
                                                    placeholder="Reps"
                                                />
                                                <Button type="button" variant="ghost" size="icon" onClick={() => handleRemoveExercise(idx)}>
                                                    <Trash2 className="h-4 w-4 text-red-500" />
                                                </Button>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <Button type="submit" className="w-full" disabled={saving || selectedExercises.length === 0}>
                                {saving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                                Créer la session
                            </Button>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Stats Cards */}
            {stats && (
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Sessions totales</CardTitle>
                            <Dumbbell className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.totalSessions}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Cette semaine</CardTitle>
                            <Target className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completedThisWeek}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Ce mois</CardTitle>
                            <Calendar className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.completedThisMonth}</div>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <CardTitle className="text-sm font-medium">Durée moyenne</CardTitle>
                            <Timer className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{stats.averageDuration} min</div>
                        </CardContent>
                    </Card>
                </div>
            )}

            {/* Sessions List */}
            {loading ? (
                <div className="flex items-center justify-center py-12">
                    <Loader2 className="h-8 w-8 animate-spin" />
                </div>
            ) : sessions.length === 0 ? (
                <Card>
                    <CardContent className="py-12 text-center">
                        <Dumbbell className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                        <h3 className="text-lg font-semibold mb-2">Aucune session</h3>
                        <p className="text-muted-foreground mb-4">Créez la première session d'entraînement</p>
                        <Button onClick={() => setCreateDialogOpen(true)}>
                            <Plus className="mr-2 h-4 w-4" />
                            Créer une session
                        </Button>
                    </CardContent>
                </Card>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {sessions.map((session) => (
                        <Card key={session.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <CardTitle className="text-lg">{session.name}</CardTitle>
                                        <CardDescription>{session.sessionType}</CardDescription>
                                    </div>
                                    <Badge className={statusColors[session.status]}>
                                        {session.status === 'COMPLETED' && <CheckCircle2 className="h-3 w-3 mr-1" />}
                                        {session.status === 'IN_PROGRESS' && <Play className="h-3 w-3 mr-1" />}
                                        {session.status}
                                    </Badge>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                    <span className="flex items-center gap-1">
                                        <Dumbbell className="h-4 w-4" />
                                        {session.exercises.length} exercices
                                    </span>
                                    {session.duration && (
                                        <span className="flex items-center gap-1">
                                            <Clock className="h-4 w-4" />
                                            {session.duration} min
                                        </span>
                                    )}
                                </div>
                                {session.scheduledAt && (
                                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                                        <Calendar className="h-4 w-4" />
                                        {new Date(session.scheduledAt).toLocaleDateString('fr-FR', {
                                            day: 'numeric',
                                            month: 'short',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </div>
                                )}
                                {session.rating && (
                                    <div className="flex items-center gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <Star
                                                key={i}
                                                className={`h-4 w-4 ${i < session.rating! ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}`}
                                            />
                                        ))}
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
