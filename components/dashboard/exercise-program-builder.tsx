'use client';

import { useEffect, useState, useCallback, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Slider } from '@/components/ui/slider';
import {
    Plus,
    Trash2,
    Dumbbell,
    GripVertical,
    Loader2,
    Save,
    Search,
    Filter,
    X,
    Star,
    Zap,
    Target,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useOrganization } from '@/hooks/use-organization';

interface Exercise {
    id: string;
    name: string;
    nameEn: string | null;
    muscleGroup: string;
    equipmentType: string;
    difficulty: number;
    instructions: string | null;
    secondaryMuscles?: string | null;
}

interface SelectedExercise {
    tempId: string;
    exercise: Exercise;
    sets: number;
    reps: string;
    rest: number;
    notes: string;
}

interface ExerciseProgramBuilderProps {
    onSave?: (program: { name: string; description: string; exercises: SelectedExercise[] }) => void;
    initialExercises?: SelectedExercise[];
    clientId?: string;
}

const muscleGroupLabels: Record<string, string> = {
    CHEST: 'Pectoraux', BACK: 'Dos', SHOULDERS: 'Épaules', BICEPS: 'Biceps',
    TRICEPS: 'Triceps', FOREARMS: 'Avant-bras', ABS: 'Abdos', OBLIQUES: 'Obliques',
    QUADRICEPS: 'Quadriceps', HAMSTRINGS: 'Ischio-jambiers', GLUTES: 'Fessiers',
    CALVES: 'Mollets', LOWER_BACK: 'Lombaires', TRAPS: 'Trapèzes',
    FULL_BODY: 'Full Body', CARDIO: 'Cardio', STRETCHING: 'Étirements',
};

const muscleGroupIcons: Record<string, string> = {
    CHEST: '🏋️', BACK: '🔙', SHOULDERS: '💪', BICEPS: '💪',
    TRICEPS: '💪', FOREARMS: '🤲', ABS: '🎯', OBLIQUES: '🎯',
    QUADRICEPS: '🦵', HAMSTRINGS: '🦵', GLUTES: '🍑',
    CALVES: '🦶', LOWER_BACK: '🔙', TRAPS: '💪',
    FULL_BODY: '🏃', CARDIO: '❤️', STRETCHING: '🧘',
};

const equipmentLabels: Record<string, string> = {
    MACHINE: 'Machine', BARBELL: 'Barre', DUMBBELL: 'Haltères', CABLES: 'Câbles',
    BODYWEIGHT: 'Poids du corps', KETTLEBELL: 'Kettlebell', RESISTANCE_BAND: 'Élastiques',
    CARDIO_MACHINE: 'Cardio', SMITH_MACHINE: 'Smith Machine', PULLUP_BAR: 'Barre de traction',
    BENCH: 'Banc', NONE: 'Aucun',
};

const difficultyLabels: Record<number, { label: string; color: string }> = {
    1: { label: 'Débutant', color: 'bg-green-500' },
    2: { label: 'Facile', color: 'bg-lime-500' },
    3: { label: 'Intermédiaire', color: 'bg-yellow-500' },
    4: { label: 'Avancé', color: 'bg-orange-500' },
    5: { label: 'Expert', color: 'bg-red-500' },
};

export function ExerciseProgramBuilder({ onSave, initialExercises = [], clientId }: ExerciseProgramBuilderProps) {
    const { toast } = useToast();
    const { activeOrganization } = useOrganization();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [allExercises, setAllExercises] = useState<Exercise[]>([]);
    const [exercisesByGroup, setExercisesByGroup] = useState<Record<string, Exercise[]>>({});
    const [selectedExercises, setSelectedExercises] = useState<SelectedExercise[]>(initialExercises);
    const [programName, setProgramName] = useState('');
    const [programDescription, setProgramDescription] = useState('');

    // Filters state
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMuscleGroup, setSelectedMuscleGroup] = useState<string>('ALL');
    const [selectedEquipment, setSelectedEquipment] = useState<string>('ALL');
    const [difficultyRange, setDifficultyRange] = useState<number[]>([1, 5]);
    const [showFilters, setShowFilters] = useState(false);

    const fetchExercises = useCallback(async () => {
        try {
            const res = await fetch('/api/exercises/grouped');
            if (res.ok) {
                const grouped = await res.json();
                setExercisesByGroup(grouped);
                // Flatten all exercises for global filtering
                const all = Object.values(grouped).flat() as Exercise[];
                setAllExercises(all);
            }
        } catch (error) {
            toast({ title: 'Erreur', description: 'Impossible de charger les exercices', variant: 'destructive' });
        } finally {
            setLoading(false);
        }
    }, [toast]);

    useEffect(() => {
        fetchExercises();
    }, [fetchExercises]);

    // Get unique equipment types from exercises
    const availableEquipment = useMemo(() => {
        const types = new Set(allExercises.map(ex => ex.equipmentType));
        return Array.from(types).sort();
    }, [allExercises]);

    // Filter exercises based on all criteria
    const filteredExercises = useMemo(() => {
        return allExercises.filter(ex => {
            // Search filter
            const matchesSearch = searchQuery === '' ||
                ex.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                (ex.nameEn && ex.nameEn.toLowerCase().includes(searchQuery.toLowerCase()));

            // Muscle group filter
            const matchesMuscle = selectedMuscleGroup === 'ALL' || ex.muscleGroup === selectedMuscleGroup;

            // Equipment filter
            const matchesEquipment = selectedEquipment === 'ALL' || ex.equipmentType === selectedEquipment;

            // Difficulty filter
            const matchesDifficulty = ex.difficulty >= difficultyRange[0] && ex.difficulty <= difficultyRange[1];

            return matchesSearch && matchesMuscle && matchesEquipment && matchesDifficulty;
        });
    }, [allExercises, searchQuery, selectedMuscleGroup, selectedEquipment, difficultyRange]);

    // Group filtered exercises by muscle group for display
    const groupedFilteredExercises = useMemo(() => {
        const grouped: Record<string, Exercise[]> = {};
        filteredExercises.forEach(ex => {
            if (!grouped[ex.muscleGroup]) {
                grouped[ex.muscleGroup] = [];
            }
            grouped[ex.muscleGroup].push(ex);
        });
        return grouped;
    }, [filteredExercises]);

    const handleAddExercise = (exercise: Exercise) => {
        // Check if already added
        if (selectedExercises.some(ex => ex.exercise.id === exercise.id)) {
            toast({ title: 'Déjà ajouté', description: 'Cet exercice est déjà dans votre programme', variant: 'destructive' });
            return;
        }
        const newExercise: SelectedExercise = {
            tempId: `temp-${Date.now()}-${Math.random()}`,
            exercise,
            sets: 3,
            reps: '10',
            rest: 60,
            notes: '',
        };
        setSelectedExercises([...selectedExercises, newExercise]);
        toast({ title: 'Exercice ajouté', description: exercise.name });
    };

    const handleRemoveExercise = (tempId: string) => {
        setSelectedExercises(selectedExercises.filter(ex => ex.tempId !== tempId));
    };

    const handleUpdateExercise = (tempId: string, field: keyof SelectedExercise, value: string | number) => {
        setSelectedExercises(selectedExercises.map(ex =>
            ex.tempId === tempId ? { ...ex, [field]: value } : ex
        ));
    };

    const handleSave = async () => {
        if (!programName.trim()) {
            toast({ title: 'Erreur', description: 'Veuillez saisir un nom de programme', variant: 'destructive' });
            return;
        }
        if (selectedExercises.length === 0) {
            toast({ title: 'Erreur', description: 'Ajoutez au moins un exercice', variant: 'destructive' });
            return;
        }

        setSaving(true);
        try {
            const content = {
                exercises: selectedExercises.map((ex, idx) => ({
                    name: ex.exercise.name,
                    exerciseId: ex.exercise.id,
                    muscleGroup: ex.exercise.muscleGroup,
                    series: ex.sets,
                    reps: ex.reps,
                    rest: `${ex.rest}s`,
                    notes: ex.notes,
                    order: idx,
                })),
            };

            const res = await fetch('/api/programs', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name: programName,
                    description: programDescription,
                    type: 'SPORT',
                    content: JSON.stringify(content),
                    userId: clientId || null,
                    organizationId: activeOrganization?.id || null,
                }),
            });

            if (!res.ok) throw new Error('Failed to save');

            toast({ title: 'Programme créé', description: 'Le programme a été sauvegardé' });

            if (onSave) {
                onSave({ name: programName, description: programDescription, exercises: selectedExercises });
            }

            setProgramName('');
            setProgramDescription('');
            setSelectedExercises([]);
        } catch (error) {
            toast({ title: 'Erreur', description: 'Impossible de sauvegarder', variant: 'destructive' });
        } finally {
            setSaving(false);
        }
    };

    const clearFilters = () => {
        setSearchQuery('');
        setSelectedMuscleGroup('ALL');
        setSelectedEquipment('ALL');
        setDifficultyRange([1, 5]);
    };

    const hasActiveFilters = searchQuery !== '' || selectedMuscleGroup !== 'ALL' || selectedEquipment !== 'ALL' ||
        difficultyRange[0] !== 1 || difficultyRange[1] !== 5;

    if (loading) {
        return (
            <div className="flex items-center justify-center py-8">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="grid gap-6 lg:grid-cols-2">
            {/* Left: Exercise Library */}
            <Card className="h-fit">
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <Dumbbell className="h-5 w-5 text-primary" />
                            <CardTitle>Bibliothèque d'exercices</CardTitle>
                        </div>
                        <Badge variant="secondary" className="text-sm">
                            {filteredExercises.length} exercices
                        </Badge>
                    </div>
                    <CardDescription>Filtrez et ajoutez des exercices à votre programme</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Search Bar */}
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Rechercher un exercice..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-10"
                        />
                        {searchQuery && (
                            <Button
                                variant="ghost"
                                size="icon"
                                className="absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7"
                                onClick={() => setSearchQuery('')}
                            >
                                <X className="h-4 w-4" />
                            </Button>
                        )}
                    </div>

                    {/* Filter Toggle */}
                    <div className="flex items-center gap-2">
                        <Button
                            variant={showFilters ? "secondary" : "outline"}
                            size="sm"
                            onClick={() => setShowFilters(!showFilters)}
                            className="gap-2"
                        >
                            <Filter className="h-4 w-4" />
                            Filtres
                            {hasActiveFilters && (
                                <Badge variant="destructive" className="h-5 w-5 p-0 flex items-center justify-center text-xs">
                                    !
                                </Badge>
                            )}
                        </Button>
                        {hasActiveFilters && (
                            <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                                Réinitialiser
                            </Button>
                        )}
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <div className="p-4 rounded-lg border bg-muted/30 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                {/* Muscle Group Filter */}
                                <div className="space-y-2">
                                    <Label className="text-xs flex items-center gap-1">
                                        <Target className="h-3 w-3" /> Groupe musculaire
                                    </Label>
                                    <Select value={selectedMuscleGroup} onValueChange={setSelectedMuscleGroup}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Tous" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">Tous les groupes</SelectItem>
                                            {Object.keys(exercisesByGroup).map((group) => (
                                                <SelectItem key={group} value={group}>
                                                    {muscleGroupIcons[group]} {muscleGroupLabels[group] || group}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Equipment Filter */}
                                <div className="space-y-2">
                                    <Label className="text-xs flex items-center gap-1">
                                        <Dumbbell className="h-3 w-3" /> Équipement
                                    </Label>
                                    <Select value={selectedEquipment} onValueChange={setSelectedEquipment}>
                                        <SelectTrigger className="h-9">
                                            <SelectValue placeholder="Tous" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="ALL">Tous les équipements</SelectItem>
                                            {availableEquipment.map((equip) => (
                                                <SelectItem key={equip} value={equip}>
                                                    {equipmentLabels[equip] || equip}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            {/* Difficulty Slider */}
                            <div className="space-y-3">
                                <Label className="text-xs flex items-center gap-1">
                                    <Zap className="h-3 w-3" /> Difficulté: {difficultyLabels[difficultyRange[0]]?.label} - {difficultyLabels[difficultyRange[1]]?.label}
                                </Label>
                                <Slider
                                    value={difficultyRange}
                                    onValueChange={setDifficultyRange}
                                    min={1}
                                    max={5}
                                    step={1}
                                    className="w-full"
                                />
                                <div className="flex justify-between text-xs text-muted-foreground">
                                    <span>Débutant</span>
                                    <span>Expert</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Exercise List */}
                    <ScrollArea className="h-[400px]">
                        {filteredExercises.length === 0 ? (
                            <div className="flex flex-col items-center justify-center py-12 text-center">
                                <Dumbbell className="h-12 w-12 text-muted-foreground/30 mb-4" />
                                <p className="text-muted-foreground font-medium">Aucun exercice trouvé</p>
                                <p className="text-sm text-muted-foreground/70">Essayez de modifier vos filtres</p>
                            </div>
                        ) : (
                            <div className="space-y-4 pr-4">
                                {Object.entries(groupedFilteredExercises).map(([group, exercises]) => (
                                    <div key={group}>
                                        <div className="flex items-center gap-2 mb-2 sticky top-0 bg-background/95 backdrop-blur py-1">
                                            <span className="text-lg">{muscleGroupIcons[group]}</span>
                                            <h4 className="font-semibold text-sm">{muscleGroupLabels[group] || group}</h4>
                                            <Badge variant="outline" className="text-xs">{exercises.length}</Badge>
                                        </div>
                                        <div className="space-y-2">
                                            {exercises.map((ex) => {
                                                const isSelected = selectedExercises.some(s => s.exercise.id === ex.id);
                                                return (
                                                    <div
                                                        key={ex.id}
                                                        className={`group flex items-center justify-between p-3 rounded-lg border transition-all cursor-pointer ${isSelected
                                                            ? 'bg-primary/10 border-primary/30'
                                                            : 'hover:bg-muted/50 hover:border-primary/20'
                                                            }`}
                                                        onClick={() => !isSelected && handleAddExercise(ex)}
                                                    >
                                                        <div className="flex-1 min-w-0">
                                                            <div className="flex items-center gap-2">
                                                                <p className="font-medium truncate">{ex.name}</p>
                                                                {isSelected && (
                                                                    <Badge variant="secondary" className="text-xs shrink-0">
                                                                        Ajouté
                                                                    </Badge>
                                                                )}
                                                            </div>
                                                            <div className="flex flex-wrap gap-1 mt-1.5">
                                                                <Badge variant="outline" className="text-xs">
                                                                    {equipmentLabels[ex.equipmentType] || ex.equipmentType}
                                                                </Badge>
                                                                <Badge
                                                                    className={`text-xs text-white ${difficultyLabels[ex.difficulty]?.color || 'bg-gray-500'}`}
                                                                >
                                                                    <Star className="h-3 w-3 mr-1" />
                                                                    {difficultyLabels[ex.difficulty]?.label || `Niveau ${ex.difficulty}`}
                                                                </Badge>
                                                            </div>
                                                        </div>
                                                        {!isSelected && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity shrink-0 ml-2"
                                                            >
                                                                <Plus className="h-4 w-4" />
                                                            </Button>
                                                        )}
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollArea>
                </CardContent>
            </Card>

            {/* Right: Selected Exercises & Program Details */}
            <div className="space-y-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Détails du programme</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label>Nom du programme</Label>
                            <Input
                                value={programName}
                                onChange={(e) => setProgramName(e.target.value)}
                                placeholder="Ex: Push Day, Full Body..."
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Description (optionnel)</Label>
                            <Textarea
                                value={programDescription}
                                onChange={(e) => setProgramDescription(e.target.value)}
                                placeholder="Description du programme..."
                                rows={2}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center justify-between">
                            Exercices sélectionnés
                            <Badge variant={selectedExercises.length > 0 ? "default" : "secondary"}>
                                {selectedExercises.length}
                            </Badge>
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {selectedExercises.length === 0 ? (
                            <div className="text-center py-8">
                                <Dumbbell className="h-12 w-12 text-muted-foreground/30 mx-auto mb-4" />
                                <p className="text-muted-foreground">Ajoutez des exercices depuis la bibliothèque</p>
                            </div>
                        ) : (
                            <ScrollArea className="h-[350px] pr-4">
                                <div className="space-y-3">
                                    {selectedExercises.map((ex, idx) => (
                                        <div key={ex.tempId} className="p-3 rounded-lg border bg-muted/20 space-y-3">
                                            <div className="flex items-center justify-between">
                                                <div className="flex items-center gap-2">
                                                    <GripVertical className="h-4 w-4 text-muted-foreground cursor-grab" />
                                                    <Badge variant="secondary">{idx + 1}</Badge>
                                                    <span className="font-medium">{ex.exercise.name}</span>
                                                </div>
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    onClick={() => handleRemoveExercise(ex.tempId)}
                                                    className="h-8 w-8 hover:bg-destructive/10"
                                                >
                                                    <Trash2 className="h-4 w-4 text-destructive" />
                                                </Button>
                                            </div>
                                            <div className="grid grid-cols-3 gap-2">
                                                <div>
                                                    <Label className="text-xs">Séries</Label>
                                                    <Input
                                                        type="number"
                                                        value={ex.sets}
                                                        onChange={(e) => handleUpdateExercise(ex.tempId, 'sets', parseInt(e.target.value) || 0)}
                                                        className="h-8"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Répétitions</Label>
                                                    <Input
                                                        value={ex.reps}
                                                        onChange={(e) => handleUpdateExercise(ex.tempId, 'reps', e.target.value)}
                                                        className="h-8"
                                                    />
                                                </div>
                                                <div>
                                                    <Label className="text-xs">Repos (s)</Label>
                                                    <Input
                                                        type="number"
                                                        value={ex.rest}
                                                        onChange={(e) => handleUpdateExercise(ex.tempId, 'rest', parseInt(e.target.value) || 0)}
                                                        className="h-8"
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        )}

                        <Button
                            onClick={handleSave}
                            disabled={saving || selectedExercises.length === 0}
                            className="w-full mt-4"
                        >
                            {saving ? (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            ) : (
                                <Save className="mr-2 h-4 w-4" />
                            )}
                            Sauvegarder le programme
                        </Button>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
